// Fetches Ayouba's public repos client-side (no backend, no build step) and
// renders a hand-picked selection, in this order. Descriptions/stars/language
// still come live from the API, so editing a repo on GitHub updates the card
// here automatically — only the *set* of repos shown is curated.
// Cached in localStorage for an hour to stay well under GitHub's
// unauthenticated rate limit (60 req/h/IP).
(function () {
  var container = document.getElementById("github-repos");
  if (!container) return;

  var USERNAME = "Starkillere";
  var CURATED_REPOS = [
    "TIPE-detection-informations-cachees",
    "osint-reportgen",
    "TCT-tisseo-nfc-security-audit",
    "StegCrypt",
    "IGLY",
    "Premier",
  ];
  var CACHE_KEY = "gh-repos-cache-v2";
  var CACHE_TTL = 60 * 60 * 1000;

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
      var byName = {};
      repos.forEach(function (r) { byName[r.name] = r; });
      var curated = CURATED_REPOS.map(function (name) { return byName[name]; }).filter(Boolean);
      writeCache(curated);
      renderRepos(curated);
    })
    .catch(showError);
})();
