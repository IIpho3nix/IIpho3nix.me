function search() {
    var query = document.getElementById("search-input").value;
    var selectedEngine = document.getElementById("search-engine").value;
    
    var searchUrl;
    if (selectedEngine === "google") {
        searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
    } else if (selectedEngine === "bing") {
        searchUrl = "https://www.bing.com/search?q=" + encodeURIComponent(query);
    } else if (selectedEngine === "duckduckgo") {
        searchUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
    } else if (selectedEngine === "startpage") {
        searchUrl = "https://www.startpage.com/do/search?query=" + encodeURIComponent(query);
    } else if (selectedEngine === "you") {
        searchUrl = "https://you.com/search?q=" + encodeURIComponent(query);
    }
    
    window.open(searchUrl, "_blank");
}

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        search();
    }
});