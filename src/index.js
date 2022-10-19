import generateJoke from "./generateJoke.js";
import "./styles/main.scss";
console.log(generateJoke());
console.log(generateJoke(), generateJoke());

document.body.innerHTML = generateJoke();


console.log("www");
let div = document.createElement("div");
div.innerHTML = "kegk";
document.body.append(div);
