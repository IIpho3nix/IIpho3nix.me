if (window.location.search !== "") {
  if (window.location.search.substring(1).startsWith("intrl=")) {
    document.getElementById("frame").src =
      "http://" +
      location.host +
      "/html/" +
      window.location.search.substring(7) +
      ".html";
  }
}
