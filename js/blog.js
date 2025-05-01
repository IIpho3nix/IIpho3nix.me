fetch("../blog/list.txt")
  .then((res) => res.text())
  .then((listText) => {
    const files = listText.trim().split("\n");
    if (files.length == 0) return Promise.resolve([]);
    return Promise.all(
      files.map((file) =>
        fetch(`../blog/${file}`)
          .then((res) => res.text())
          .then((content) => ({ file, content }))
      )
    );
  })
  .then((blogs) => {
    blogs.forEach(({ file, content }) => {
      const metaMatch = content.match(/\/\_([\s\S]*?)\_\//);
      if (!metaMatch) return;

      const metaText = metaMatch[1];
      const meta = {};
      metaText.split("\n").forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length > 0) {
          meta[key.trim().toLowerCase()] = rest.join(":").trim();
        }
      });

      const container = document.createElement("a");
      container.href = `render.html?file=${file}&title=${meta["title"]}`;
      container.className = "blog-container";
      container.innerHTML = `
        <h2>${meta.title || "Untitled Blog"}</h2>
        <div class="description">${
          meta.description || "No description provided."
        }</div>
        <div class="meta">
          ${meta["read-time"] || ""} · ${meta.date || ""} <br> by ${
        meta.author || "Unknown"
      }
        </div>
      `;

      document.body.appendChild(container);
    });
  })
  .catch((err) => {
    console.error("Failed to load blogs:", err);
  });
