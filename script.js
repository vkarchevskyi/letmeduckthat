const siteUrl = 'https://vkarchevskyi.github.io/letmeduckthat';

document.addEventListener("DOMContentLoaded", function () {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const query = params.q;

  if (query) {
    document
      .getElementById("search-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
      });

    startTypingAnimation(query);
  } else {
    registerButtonEvent();
  }
});

function startTypingAnimation(query) {
  const searchInput = document.getElementById("search-input");

  searchInput.focus();

  setTimeout(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < query.length) {
        searchInput.value += query[index];
        index++;
      } else {
        clearInterval(typingInterval);

        if (query) {
          window.location = getRedirectUrl(query);
        }
      }
    }, 150);
  }, 500);
}

function getRedirectUrl(query) {
  return "https://duckduckgo.com/?q=" + query;
}

function getSiteUrl(query) {
    return `${siteUrl}/?q=${query}`;
}

function registerButtonEvent() {
  document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const anchor = document.getElementById("new-url");
    const query = document.getElementById("search-input").value;

    anchor.href = getSiteUrl(query);
    anchor.innerHTML = getSiteUrl(query);

    document.getElementById('url-wrapper').style.visibility = 'visible';
  });
}
