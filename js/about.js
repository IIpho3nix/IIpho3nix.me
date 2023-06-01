const buttons = document.querySelectorAll(".contact a");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 200);
  });
});
