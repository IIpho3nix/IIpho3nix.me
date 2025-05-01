const { Marked } = globalThis.marked;
const { markedHighlight } = globalThis.markedHighlight;

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const removeBlockComments = (text) => {
  return text.replace(/\/\_[\s\S]*?\_\//g, "").trim();
};
let params = new URLSearchParams(document.location.search);

if (params.get("file") == null || params.get("title") == null) {
  params.set("file", "error.md");
  params.set("title", "Error");
}

fetch("../blog/" + params.get("file"))
  .then((res) => res.text())
  .then((text) => {
    let markdown = removeBlockComments(text);
    document.getElementById("plaintext").innerHTML = DOMPurify.sanitize(
      marked.parse(markdown) + "<br />"
    );

    document.getElementById("blog-title").innerText = params.get("title");
  });

const links = document.querySelectorAll("a");
links.forEach((link) => {
  link.target = "_top";
});

document.getElementById("content").style.display = "block";
