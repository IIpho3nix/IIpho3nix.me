if (window.location.search !== "") {
  window.location.href =
    "https://github.com/IIpho3nix/" + window.location.search.substring(1);
}

function redirect(path) {
  window.location.href = path;
}
