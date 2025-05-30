var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/users/IIpho3nix/repos", true);
xhr.responseType = "json";
xhr.onload = () => {
  xhr.response.sort((a, b) => b.stargazers_count - a.stargazers_count);
  for (let i = 0; i < xhr.response.length; i++) {
    document.getElementById(
      "projects"
    ).innerHTML += `<div class="horizontal"><a class="project" href="${
      xhr.response[i].html_url
    }" rel="noreferrer" target="_top" >
        <br>
        <h2>${xhr.response[i].name}</h2>
        <br>
        <p style="color: #dedede;">${
          xhr.response[i].description == null
            ? "No Description Found"
            : xhr.response[i].description
        }</p>
        <br>
        <p style="color: #dedede;">${xhr.response[i].stargazers_count} stars</p>
        <br>
        <p style="color: #dedede;">${xhr.response[i].watchers_count} watchers</p>
        <br>
        <p style="color: #dedede;"> License: ${
          xhr.response[i].license == null
            ? "Not Found"
            : xhr.response[i].license.name
        }</p>
        <br>
        <p style="color: #dedede;"> Last updated: ${new Date(
          Date.parse(xhr.response[i].updated_at)
        ).toDateString()}</p>
        <br>
        </a></div><br>`;
  }

  const buttons = document.querySelectorAll(".project");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, 200);
    });
  });

  particlesJS.load("particles-js", "../assets/particles.json", () => {
    console.log("particles.js config loaded");
  });
};
xhr.send();
