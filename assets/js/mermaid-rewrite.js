// With this project's Jekyll config (kramdown, GFM input), ```mermaid fences
// render as <pre><code class="language-mermaid">...</code></pre>, but
// Mermaid.js only auto-detects <pre class="mermaid">. This rewrites one into
// the other before asking Mermaid to render.
// If this selector ever stops matching (kramdown/config change), write raw
// `<pre class="mermaid">...</pre>` directly in the post body instead.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre > code.language-mermaid")
    .forEach(function (codeEl) {
      var pre = document.createElement("pre");
      pre.className = "mermaid";
      pre.textContent = codeEl.textContent;
      codeEl.parentElement.replaceWith(pre);
    });

  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    mermaid.run({ querySelector: ".mermaid" });
  }
});
