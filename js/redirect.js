if (window.location.search !== "") {
  console.log(window.location.search);
  if (!window.location.search.substring(1).startsWith("intrl=")) {
    window.location.href =
      "https://github.com/IIpho3nix/" + window.location.search.substring(1);
  }
}
