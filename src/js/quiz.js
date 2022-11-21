import '../styles/quiz.scss';
import Element from './class/Element';
import Button from './class/Button';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';

import TVShowCard from './class/TVShowCard';
import TVShowList from '../db/TVShowList';
import sounds from './components/game-sounds';

const header = new Header();
const main = new Element(document.body, 'main', 'main quiz');
const bgMatrix = new BackgroundVideo();
const footer = new Footer();

const quiz = {
  info: new Element(main.el, 'div', 'quiz__info'),
  question: new Element(main.el, 'div', 'quiz__question'),
  answers: new Element(main.el, 'div', 'quiz__answers'),
  nextButton: new Button(main.el, null, 'button quiz__next-button interactive', 'next'),
};

const placeholders = ['first', 'second', 'third', 'fourth', 'fifth', 'six'];

Object.assign(quiz.info, {
  categories: new Element(quiz.info.el, 'div', 'quiz__categories'),
  score: new Element(quiz.info.el, 'div', 'quiz__score', 'Score: 00'),
});

Object.assign(
  quiz.info.categories,
  placeholders.map((v) => new Element(quiz.info.categories.el, 'div', 'quiz__category', v)),
);

/* Object.assign(game.question, {
  img: new Element(game.question.el, 'div', 'question__img', 'img'),
  player: new Element(game.question.el, 'div', 'question__player', 'player'),
}); */

Object.assign(quiz.answers, {
  options: new Element(quiz.answers.el, 'div', 'quiz__options'),
  description: new Element(quiz.answers.el, 'div', 'quiz__description'),
});

Object.assign(
  quiz.answers.options,
  placeholders.map((v) => new Element(quiz.answers.options.el, 'div', 'quiz__option', v)),
);

class Game {
  #elements;

  #list;

  #round;

  #current;

  #isGuessed;

  #defaultDescription = 'play soundtrack and guess tv-show';

  #score;

  constructor(list, questions, score, currentQuestion, answers, description, nextButton) {
    this.#elements = {
      questions: questions.children,
      score,
      currentQuestion,
      answers: answers.children,
      description,
      nextButton,
    };
    this.#list = list;
  }

  init(round, isGuessed) {
    this.#setStrings(this.#elements.questions, Object.keys(this.#list));

    this.#score = 0;
    this.#round = round ?? 1;
    this.#isGuessed = isGuessed ?? false;

    this.#startRound();

    this.#elements.nextButton.onclick = () => this.#nextButtonClickHandler();
  }

  #renderScore() {
    const { score } = this.#elements;
    const text = score.textContent.split(' ')[0];
    score.textContent = `${text} ${this.#score.toString().padStart(2, 0)}`;
  }

  #nextButtonClickHandler() {
    if (this.#round < 6) {
      this.#round += 1;
      this.#startRound();
    } else {
      localStorage.setItem('erdev__songbird-score', this.#score);
      window.location.href = './result';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #setStrings(target, source) {
    for (let i = 0; i < target.length; i += 1) {
      Object.assign(target[i], { textContent: source[i] });
    }
  }

  #setCurrent() {
    const current = Object.entries(this.#list)[this.#round - 1];
    this.#current = { category: current[0], answers: current[1], try: 1 };
  }

  #startRound() {
    this.#setCurrent();
    this.#renderAnswers();
    this.#setQuestion();
    this.#renderQuestion();
    this.#renderDescription();
    this.#handleNextButtonState();
    this.#isGuessed = false;
  }

  #handleNextButtonState(state) {
    const disabled = state !== 'on';
    const { nextButton } = this.#elements;
    nextButton.disabled = disabled;
    if (disabled) nextButton.style = 'pointer-events: none';
    else nextButton.removeAttribute('style');
  }

  #renderAnswers() {
    this.#setStrings(
      this.#elements.answers,
      this.#current.answers.map((v) => v.getTitle()),
    );
    for (let i = 0; i < this.#elements.answers.length; i += 1) {
      this.#elements.answers[i].removeAttribute('iscorrectmark');
    }
  }

  #renderCategoryHighlight() {
    for (let i = 0; i < this.#elements.questions.length; i += 1) {
      const { classList } = this.#elements.questions[i];
      if (i === this.#round - 1) classList.add('quiz__category_active');
      else classList.remove('quiz__category_active');
    }
  }

  #renderQuestion() {
    this.#elements.currentQuestion.textContent = '';
    this.#current.question = new TVShowCard(this.#elements.currentQuestion, this.#current.correct);
    this.#current.question.title.el.textContent = '***';
    this.#current.question.img.el.classList.add('tv-show__image_hidden');
  }

  #setQuestion() {
    this.#renderCategoryHighlight();
    const random = Math.floor(Math.random() * this.#current.answers.length);
    this.#current.correct = this.#current.answers[random];
    this.#setAnswersClickEvents();
  }

  #setAnswersClickEvents() {
    for (let i = 0; i < this.#elements.answers.length; i += 1) {
      const isCorrect = this.#current.answers[i] === this.#current.correct;
      this.#elements.answers[i].onclick = () => this.#answerClickHandler(isCorrect, i);
    }
  }

  #answerClickHandler(isCorrect, id) {
    this.#renderDescription(id);
    if (this.#isGuessed) return;
    if (!this.#elements.answers[id].hasAttribute('iscorrectmark')) {
      if (isCorrect) {
        sounds.correct.play();
        this.#current.question.title.el.textContent = this.#current.correct.getTitle();
        this.#current.question.img.el.classList.remove('tv-show__image_hidden');
        this.#current.question.audio.pause();
        this.#handleNextButtonState('on');
        this.#isGuessed = true;
        this.#score += 6 - this.#current.try;
        this.#renderScore();
      } else {
        sounds.wrong.play();
        this.#current.try += 1;
      }
    }
    this.#elements.answers[id].setAttribute('iscorrectmark', isCorrect ? '✔️' : '❌');
  }

  #renderDescription(id) {
    if (!(id in this.#current.answers)) {
      this.#elements.description.textContent = this.#defaultDescription;
      return;
    }
    const clickedShow = this.#current.answers[id];
    this.#elements.description.textContent = '';
    this.#current.description = new TVShowCard(this.#elements.description, clickedShow);
  }
}

const game = new Game(
  TVShowList,
  quiz.info.categories.el,
  quiz.info.score.el,
  quiz.question.el,
  quiz.answers.options.el,
  quiz.answers.description.el,
  quiz.nextButton.el,
);
game.init();
