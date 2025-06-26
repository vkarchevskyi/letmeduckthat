const siteUrl = 'https://vkarchevskyi.github.io/letmeduckthat';
const sun = '☀️';
const moon = '🌙';

document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();

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

function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-toggle-icon');

  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = sun;
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = moon;
  }

  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const themeIcon = document.querySelector('.theme-toggle-icon');

  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    themeIcon.textContent = moon;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeIcon.textContent = sun;
  }
}
