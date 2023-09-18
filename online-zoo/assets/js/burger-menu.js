const getByClass = document.getElementsByClassName.bind(document);
const burgerButton = getByClass("burger-menu")[0];
const burgerClose = getByClass("burger-menu-close")[0];
const burgerBackground = getByClass("burger-menu-background")[0];
const burgerContainer = getByClass("burger-menu-container")[0];

[burgerButton, burgerClose, burgerBackground].forEach(
  node => (node.onclick = toggleBurgerMenu)
);

function toggleBurgerMenu() {
  burgerContainer.classList.toggle("visible");
}
