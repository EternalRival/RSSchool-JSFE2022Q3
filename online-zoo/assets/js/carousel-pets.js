import _ from "./utils.js";

class PetCard {
  constructor(fileName, name, location, diet) {
    Object.assign(this, { fileName, name, location, diet });
  }
  generate() {
    const [img, diet] = Array.from(Array(2), () => _.create("img")),
      [name, location] = Array.from(Array(2), () => _.create("p")),
      [card, content, info, text] = Array.from(Array(4), () => _.create());
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

const carousel = _.getByClass("carousel")[0];
const button = {
  left: _.getByClass("carousel-control-left")[0],
  right: _.getByClass("carousel-control-right")[0],
};

onresize = () => resetStyles(carousel);
button.right.onclick = scroll;
button.left.onclick = scroll;

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
cards.shuffle = function () {
  Object.assign(this, _.shuffle(this));
};
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
cards.shuffle();
renderPets(carousel, cards);

resetStyles(carousel);

function scroll() {
  const direction = event.target === button.right ? 2 : 0;
  const timeout = 0.5;

  disableButtons(timeout * 1.1);

  playAnimation(carousel, direction, timeout).then(() => {
    replaceCards(direction);
    resetStyles(carousel);
    renderPets(carousel, cards);
  });
}
async function playAnimation(node, direction, timeout) {
  node.style.transition = `transform ${timeout}s`;
  node.style.transform = `translate(-${direction * getWidth(node)}px)`;
  await new Promise(_ => setTimeout(_, timeout * 1000));
}
function replaceCards(direction) {
  const offset = getWidth(carousel) < 640 ? 4 : 6;
  const hand = cards.splice(direction ? offset * 2 : 0, offset);
  cards.shuffle();
  cards.splice(offset, 0, ...hand);
}
function disableButtons(timeout = 0) {
  button.right.onclick = null;
  button.left.onclick = null;
  setTimeout(() => {
    button.right.onclick = scroll;
    button.left.onclick = scroll;
  }, timeout * 1000);
}
function getWidth(n) {
  return +getComputedStyle(n).columnGap.slice(0, -2) + n.offsetWidth;
}
function resetStyles(node) {
  node.style = null;
  node.style.transform = `translate(-${getWidth(carousel)}px)`;
}
function renderPets(node, children) {
  node.innerHTML = null;
  node.append(...children.map(child => child.generate()));
}
