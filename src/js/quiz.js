/**
 - верхняя панель
    содержит список вопросов и текущий счёт игры
 - блок с текущим вопросом
    содержит аудиоплеер с записью голоса птицы и заглушки на месте названия и изображения птицы.
    Когда игрок выбирает правильный ответ,
    в блоке отображаются название и изображение птицы, голос которой звучал
 - блок с вариантами ответов
    содержит список с названиями шести разных птиц
 - блок с описанием птицы
    содержит приглашение послушать плеер и выбрать птицу из списка.
    Когда игрок выбирает вариант ответа, в блоке отображаются данные о выбранной птице:
    изображение, русское и латинское название, аудиозапись голоса, краткая информация
*/

import '../styles/quiz.scss';
import Element from './class/Element';
import Button from './class/Button';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';

import ShowList from '../db/TVShowList';

const header = new Header();
const main = new Element(document.body, 'main', 'main');
const bgMatrix = new BackgroundVideo();
const footer = new Footer();

const game = {
  info: new Element(main.el, 'div', 'game-info'),
  question: new Element(main.el, 'div', 'question'),
  answers: new Element(main.el, 'div', 'answers'),
  nextButton: new Button(main.el, null, 'button next-button interactive', 'next'),
};

const placeholders = ['first', 'second', 'third', 'fourth', 'fifth', 'six'];

Object.assign(game.info, {
  categories: new Element(game.info.el, 'div', 'categories'),
  score: new Element(game.info.el, 'div', 'score', 'score: 00'),
});

Object.assign(
  game.info.categories,
  placeholders.map((v) => new Element(game.info.categories.el, 'div', 'category', v)),
);

Object.assign(game.question, {
  img: new Element(game.question.el, 'div', 'question__img', 'img'),
  player: new Element(game.question.el, 'div', 'question__player', 'player'),
});

Object.assign(game.answers, {
  options: new Element(game.answers.el, 'div', 'options'),
  description: new Element(game.answers.el, 'div', 'description', 'play song and guess tv-show'),
});

Object.assign(
  game.answers.options,
  placeholders.map((v) => new Element(game.answers.options.el, 'div', 'option', v)),
);

console.log(ShowList);
