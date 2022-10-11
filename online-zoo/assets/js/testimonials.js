import _ from "./utils.js";

const reviews = _.getByClass("reviews-container")[0];
const scrollbar = _.getByClass("range-scrollbar")[0];

class Review {
  constructor(card) {
    Object.assign(this, card);
  }
  generate() {
    const img = _.create("img"),
      [name, info, text] = Array.from(Array(3), () => _.create()),
      [wrapper, review, header, tail] = Array.from(Array(4), () => _.create());

    wrapper.className = "review-wrapper";
    review.className = "review";
    header.className = "review-header";
    img.className = "head";
    tail.className = "tail";
    name.className = "name";
    info.className = "info";
    text.className = "text";

    img.src = `./assets/images/testimonials/user-${this.userPic}.png`;
    img.alt = this.userPic;

    name.innerText = this.userName;
    info.innerText = `${this.location}\xa0\xa0•\xa0\xa0${this.date}`;
    text.innerText = this.text;

    wrapper.append(review);
    review.append(header, text);
    header.append(img, tail);
    tail.append(name, info);
    return wrapper;
  }
}

const reviewList = [
  {
    userPic: "michael",
    userName: "Michael John",
    location: "Local Austria",
    date: "Today",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.\nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "oskar",
    userName: "Oskar Samborsky",
    location: "Local Austria",
    date: "Yesterday",
    text: "Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "fredericka",
    userName: "Fredericka Michelin",
    location: "Local Austria",
    date: "Yesterday",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "mila",
    userName: "Mila Riksha",
    location: "Local Austria",
    date: "Yesterday",
    text: "My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "cecil",
    userName: "Cecil Smith",
    location: "Local Austria",
    date: "Yesterday",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "elijah",
    userName: "Elijah Forest",
    location: "Local Austria",
    date: "Yesterday",
    text: "Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "howard",
    userName: "Howard Duck",
    location: "Local Austria",
    date: "Yesterday",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "joe",
    userName: "Joe Dohn",
    location: "Local Austria",
    date: "Yesterday",
    text: "My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "leonard",
    userName: "Leonard Bard",
    location: "Local Austria",
    date: "Yesterday",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "monica",
    userName: "Monica Crow",
    location: "Local Austria",
    date: "Yesterday",
    text: "Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
  {
    userPic: "rachel",
    userName: "Rachel Parker",
    location: "Local Austria",
    date: "Yesterday",
    text: "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. \nThe best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.",
  },
].map(card => new Review(card));

reviews.innerHTML = null;
reviews.append(...reviewList.map(review => review.generate()));

function scroll(node, pos = 0) {
  node.style.transition = "transform linear 0.3s";
  node.style.transform = `translate(-${pos * getOffset(node)}px)`;
}
function getOffset(n) {
  return +getComputedStyle(n).columnGap.slice(0, -2) + n.firstChild.offsetWidth;
}
scrollbar.oninput = function () {
  scroll(reviews, this.value);
};
addEventListener("resize", handleResizeTestimonials);

function handleResizeTestimonials() {
  switch (reviews.offsetWidth) {
    case 1160:
      if (scrollbar.max != 7) scrollbar.max = 7;
      scroll(reviews, scrollbar.value);
      break;
    case 940:
      if (scrollbar.max != 8) scrollbar.max = 8;
      scroll(reviews, scrollbar.value);
      break;
    default:
      scroll(reviews, 0);
  }
  if (reviews.offsetWidth >= 940) {
    _.getByClass("popup-background")[0].remove();
    _.getByClass("popup")[0].remove();
  }
}

reviews.onclick = function (e) {
  if (reviews.offsetWidth < 940 && e.target.closest(".review-wrapper")) {
    const clone = e.target.closest(".review-wrapper").cloneNode(true);
    const background = document.createElement("div");
    const cloneWrapper = document.createElement("div");
    const closeButton = document.createElement("div");
    background.style.position = "fixed";
    background.style.width = "100vw";
    background.style.height = "100vh";
    background.style.backgroundColor = "#000000cc";
    background.style.zIndex = 5;

    background.className = "testimonials popup-background";
    cloneWrapper.className = "testimonials popup";
    closeButton.className = "testimonials popup-close-button";

    document.body.append(background, cloneWrapper);
    cloneWrapper.append(closeButton, clone);

    [background, closeButton].forEach(n => {
      n.onclick = () => {
        background.remove();
        cloneWrapper.remove();
      };
    });
  }
};
