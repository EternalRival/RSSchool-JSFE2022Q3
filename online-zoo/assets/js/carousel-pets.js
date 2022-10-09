import _ from "./utils.js";

const create = (tag = "div") => document.createElement(tag);
const getByClass = document.getElementsByClassName.bind(document);
const carousel = getByClass("carousel")[0];
const button = {
  left: getByClass("carousel-control-left")[0],
  right: getByClass("carousel-control-right")[0],
};

class PetCard {
  constructor(fileName, name, location, diet) {
    Object.assign(this, { fileName, name, location, diet });
  }
  generate() {
    const [img, diet] = Array.from(Array(2), () => create("img")),
      [name, location] = Array.from(Array(2), () => create("p")),
      [card, content, info, text] = Array.from(Array(4), () => create());
    card.classList.add("pet-card", "border");
    content.className = "content";
    img.className = "pet-img";
    info.className = "pet-info";
    text.className = "text";
    name.className = "name";
    location.className = "location";
    diet.className = "diet";
    img.src = `./assets/images/pets/${this.fileName}.jpg`;
    img.alt = this.fileName;
    name.textContent = this.name;
    location.textContent = this.location;
    diet.src = `./assets/icons/${this.diet}.svg`;
    diet.alt = this.diet;

    card.append(content);
    content.append(img, info);
    info.append(text, diet);
    text.append(name, location);
    return card;
  }
}

const cards = [
  new PetCard(
    "giant-pandas",
    "giant pandas",
    "Native to Southwest China",
    "herbivore"
  ),
  new PetCard("eagles", "eagles", "Native to South America", "carnivore"),
  new PetCard("gorillas-1", "gorillas", "Native to Congo", "herbivore"),
  new PetCard(
    "alligators",
    "alligators",
    "Native to Southeastern US",
    "carnivore"
  ),
  new PetCard(
    "two-toed-sloth",
    "two-toed sloth",
    "Mesoamerica, South America",
    "herbivore"
  ),
  new PetCard("cheetahs", "cheetahs", "Native to Africa", "carnivore"),
  new PetCard("penguins", "penguins", "Native to Antarctica", "carnivore"),
  new PetCard("gorillas-2", "gorillas", "Native to Congo", "herbivore"),
];
const cardsCustom = [
  new PetCard(
    "lernaean-hydra",
    "lernaean hydra",
    "Native to South Greece",
    "carnivore"
  ),
  new PetCard("platypus", "platypus", "Native to Australia", "carnivore"),
  new PetCard("hyena", "hyena", "Native to Africa", "carnivore"),
  new PetCard("honey-badger", "honey badger", "Native to Africa", "carnivore"),
  new PetCard("graboid", "graboid", "Native to Western US", "carnivore"),
  new PetCard(
    "procoptodon",
    "procoptodon",
    "Native to South Australia",
    "herbivore"
  ),
  new PetCard("carbonemys", "carbonemys", "Native to Colombia", "carnivore"),
  new PetCard(
    "chacoan-peccary",
    "chacoan peccary",
    "Native to Gran Chaco",
    "herbivore"
  ),
  new PetCard(
    "pygmy-tarsier",
    "pygmy tarsier",
    "Native to Indonesia",
    "carnivore"
  ),
  new PetCard(
    "arakan-forest-turtle",
    "arakan forest turtle",
    "Native to Arakan Hills",
    "carnivore"
  ),
  new PetCard(
    "paraceratherium",
    "paraceratherium",
    "Native to South Asia",
    "herbivore"
  ),
  new PetCard("quokka", "quokka", "Native to SW Australia", "herbivore"),
];

cards.push(...cardsCustom);

console.log("cards", cards.length);
carousel.append(..._.shuffle(cards).map(card => card.generate()));

button.right.onclick = scroll;
button.left.onclick = scroll;

function scroll() {
  const direction = event.target === button.right ? 2 : 0;
  const timeout = 0.5;
  disableButtons(timeout);
  carousel.style.transition = `transform ${timeout}s`;
  carousel.style.transform = `translate(-${direction * getWidth(carousel)}px)`;

  resetStyles(carousel, timeout);
}
function disableButtons(timeout = 0) {
  button.left.disabled = true;
  button.right.disabled = true;
  setTimeout(() => {
    button.left.disabled = false;
    button.right.disabled = false;
  }, timeout * 1000);
}
function getWidth(n) {
  return +getComputedStyle(n).columnGap.slice(0, -2) + n.offsetWidth;
}
function resetStyles(node, s = 0) {
  setTimeout(() => {
    node.style = "";
    node.style.transform = `translate(-${getWidth(carousel)}px)`;
  }, s * 1000);
}
resetStyles(carousel);
onresize = () => resetStyles(carousel);

/*
перед или после скролла шафл карточек
*/
