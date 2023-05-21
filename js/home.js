const search = () => {
  var query = document.getElementById("search-input").value;
  var selectedEngine = document.getElementById("search-engine").value;

  var searchUrl;
  switch (selectedEngine) {
    case "google":
      searchUrl =
        "https://www.google.com/search?q=" + encodeURIComponent(query);
      break;
    case "bing":
      searchUrl = "https://www.bing.com/search?q=" + encodeURIComponent(query);
      break;
    case "duckduckgo":
      searchUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
      break;
    case "startpage":
      searchUrl =
        "https://www.startpage.com/do/search?query=" +
        encodeURIComponent(query);
      break;
    case "you":
      searchUrl = "https://you.com/search?q=" + encodeURIComponent(query);
      break;
    case "youtube":
      searchUrl =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(query);
      break;
    case "steam":
      searchUrl =
        "https://store.steampowered.com/search/?term=" +
        encodeURIComponent(query);
      break;
    case "github":
      searchUrl =
        "https://github.com/search?q=" +
        encodeURIComponent(query) +
        "&type=repositories";
      break;
    default:
      searchUrl = "";
      break;
  }

  window.open(searchUrl, "_top");
};

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});
