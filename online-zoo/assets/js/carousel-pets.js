import _ from "./utils.js";

class PetCard {
  constructor(card) {
    Object.assign(this, card);
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
    name.innerText = this.name;
    location.innerText = this.location;
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
addEventListener("resize", () => resetStyles(carousel));
button.right.onclick = scroll;
button.left.onclick = scroll;

const cardsBased = [
  {
    fileName: "giant-pandas",
    name: "giant pandas",
    location: "Native to Southwest China",
    diet: "herbivore",
  },
  {
    fileName: "eagles",
    name: "eagles",
    location: "Native to South America",
    diet: "carnivore",
  },
  {
    fileName: "gorillas-1",
    name: "gorillas",
    location: "Native to Congo",
    diet: "herbivore",
  },
  {
    fileName: "alligators",
    name: "alligators",
    location: "Native to Southeastern US",
    diet: "carnivore",
  },
  {
    fileName: "two-toed-sloth",
    name: "two-toed sloth",
    location: "Mesoamerica, South America",
    diet: "herbivore",
  },
  {
    fileName: "cheetahs",
    name: "cheetahs",
    location: "Native to Africa",
    diet: "carnivore",
  },
  {
    fileName: "penguins",
    name: "penguins",
    location: "Native to Antarctica",
    diet: "carnivore",
  },
  {
    fileName: "gorillas-2",
    name: "gorillas",
    location: "Native to Congo",
    diet: "herbivore",
  },
];

const cardsCustom = [
  {
    fileName: "lernaean-hydra",
    name: "lernaean hydra",
    location: "Native to South Greece",
    diet: "carnivore",
  },
  {
    fileName: "platypus",
    name: "platypus",
    location: "Native to Australia",
    diet: "carnivore",
  },
  {
    fileName: "hyena",
    name: "hyena",
    location: "Native to Africa",
    diet: "carnivore",
  },
  {
    fileName: "honey-badger",
    name: "honey badger",
    location: "Native to Africa",
    diet: "carnivore",
  },
  {
    fileName: "graboid",
    name: "graboid",
    location: "Native to Western US",
    diet: "carnivore",
  },
  {
    fileName: "procoptodon",
    name: "procoptodon",
    location: "Native to South Australia",
    diet: "herbivore",
  },
  {
    fileName: "carbonemys",
    name: "carbonemys",
    location: "Native to Colombia",
    diet: "carnivore",
  },
  {
    fileName: "chacoan-peccary",
    name: "chacoan peccary",
    location: "Native to Gran Chaco",
    diet: "herbivore",
  },
  {
    fileName: "pygmy-tarsier",
    name: "pygmy tarsier",
    location: "Native to Indonesia",
    diet: "carnivore",
  },
  {
    fileName: "arakan-forest-turtle",
    name: "arakan forest turtle",
    location: "Native to Arakan Hills",
    diet: "carnivore",
  },
  {
    fileName: "paraceratherium",
    name: "paraceratherium",
    location: "Native to South Asia",
    diet: "herbivore",
  },
  {
    fileName: "quokka",
    name: "quokka",
    location: "Native to SW Australia",
    diet: "herbivore",
  },
];

const cards = cardsBased.concat(cardsCustom).map(card => new PetCard(card));
cards.shuffle = function () {
  Object.assign(this, _.shuffle(this));
};

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
  node.style.transition = `transform ease-in-out ${timeout}s`;
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
