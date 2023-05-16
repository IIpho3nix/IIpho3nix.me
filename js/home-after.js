var searchEngineSelect = document.getElementById('search-engine');
var savedSearchEngine = localStorage.getItem('searchEngine');
if (savedSearchEngine) {
    searchEngineSelect.value = savedSearchEngine;
}

searchEngineSelect.addEventListener('change', () => {
    var selectedSearchEngine = searchEngineSelect.value;
    localStorage.setItem('searchEngine', selectedSearchEngine);
});
