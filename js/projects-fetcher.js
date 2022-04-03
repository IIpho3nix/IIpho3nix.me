var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/IIpho3nix/repos', true);
xhr.responseType = 'json';
xhr.onload = () => {
    for (let i = 0; i < xhr.response.length; i++) {
        document.body.innerHTML += `<div class="horizontal"><a class="project" href="${xhr.response[i].html_url}" rel="noreferrer" target="_top" >
        <br>
        <h2>${xhr.response[i].name}</h2>
        <br>
        <p>${xhr.response[i].description == null ? "No Description Found" : xhr.response[i].description}</p>
        <br>
        <p>${xhr.response[i].stargazers_count} stars</p>
        <br>
        <p>${xhr.response[i].watchers_count} watchers</p>
        <br>
        <p> License: ${xhr.response[i].license == null ? "Not Found" : xhr.response[i].license.name}</p>
        <br>
        <p> Last updated: ${new Date(Date.parse(xhr.response[i].updated_at)).toDateString()}</p>
        <br>
        </a></div><br>`;
    }
};
xhr.send();
