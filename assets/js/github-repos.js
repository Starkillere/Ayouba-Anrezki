// Fetches Ayouba's public repos client-side (no backend, no build step) and
// renders the most-starred ones. Cached in localStorage for an hour to stay
// well under GitHub's unauthenticated rate limit (60 req/h/IP).
(function () {
  var container = document.getElementById("github-repos");
  if (!container) return;

  var USERNAME = "Starkillere";
  var CACHE_KEY = "gh-repos-cache-v1";
  var CACHE_TTL = 60 * 60 * 1000;
  var MAX_REPOS = 6;

  var errorText = container.dataset.errorText;
  var emptyText = container.dataset.emptyText;

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }

  function renderRepos(repos) {
    if (!repos.length) {
      container.innerHTML = '<p class="empty-state">' + escapeHtml(emptyText) + "</p>";
      return;
    }
    container.innerHTML = repos
      .map(function (repo) {
        var lang = repo.language
          ? '<span class="repo-lang"><span class="repo-lang-dot"></span>' + escapeHtml(repo.language) + "</span>"
          : "";
        var desc = repo.description ? '<p class="repo-card-desc">' + escapeHtml(repo.description) + "</p>" : "";
        return (
          '<a class="repo-card" href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer">' +
          '<h3 class="repo-card-name">' + escapeHtml(repo.name) + "</h3>" +
          desc +
          '<p class="repo-card-meta">' + lang + '<span class="repo-stars">★ ' + repo.stargazers_count + "</span></p>" +
          "</a>"
        );
      })
      .join("");
  }

  function showError() {
    container.innerHTML =
      '<p class="empty-state">' + escapeHtml(errorText) +
      ' <a href="https://github.com/' + USERNAME + '" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>';
  }

  function readCache() {
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cached && Date.now() - cached.time < CACHE_TTL) return cached.repos;
    } catch (e) {
      /* localStorage unavailable or corrupt entry: fall through to a fresh fetch */
    }
    return null;
  }

  function writeCache(repos) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), repos: repos }));
    } catch (e) {
      /* storage full/unavailable: caching is an optimization, not required */
    }
  }

  var cached = readCache();
  if (cached) {
    renderRepos(cached);
    return;
  }

  fetch("https://api.github.com/users/" + USERNAME + "/repos?per_page=100&type=owner")
    .then(function (res) {
      if (!res.ok) throw new Error("GitHub API error " + res.status);
      return res.json();
    })
    .then(function (repos) {
      var top = repos
        .filter(function (r) { return !r.fork && !r.archived; })
        .sort(function (a, b) { return b.stargazers_count - a.stargazers_count; })
        .slice(0, MAX_REPOS);
      writeCache(top);
      renderRepos(top);
    })
    .catch(showError);
})();
