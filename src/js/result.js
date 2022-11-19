/**
 - Отображается после завершения викторины, содержит набранные в ходе игры баллы
 - Если набрано не максимально возможное количество баллов,
    игроку предлагается пройти викторину ещё раз. Есть кнопка перенаправляющая к началу игры.
 - Если набрано максимально возможное количество баллов,
    выводится поздравление и уведомление об окончании игры (этот пункт не проверяется)
 */

import '../styles/result.scss';
import Element from './class/Element';
import Anchor from './class/Anchor';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';
import TVShowList from '../db/TVShowList';

const header = new Header();

const main = new Element(document.body, 'main', 'main');
const bgMatrix = new BackgroundVideo();

const footer = new Footer();

const congratulations = new Element(main.el, 'div', 'congratulations');

const getUserPoints = () => +localStorage.getItem('erdev__songbird-score') ?? 0;

const getMaxPoints = (list) => {
  const questions = Object.values(list);
  const answersPerQuestion = questions.flat().length / questions.length;
  return questions.length * (answersPerQuestion - 1);
};

const isPerfectResult = getUserPoints() === getMaxPoints(TVShowList);

Object.assign(congratulations, {
  heading: new Element(congratulations.el, 'div', 'congratulations__heading', 'Congratulations!'),
  resultText: new Element(
    congratulations.el,
    'div',
    'congratulations__result-text',
    `You completed the quiz and scored
    ${getUserPoints()} out of ${getMaxPoints(TVShowList)}
    possible points`,
  ),
  restartLink: new Anchor(
    congratulations.el,
    `${isPerfectResult ? './' : './quiz'}`,
    'congratulations__restart interactive',
    `${isPerfectResult ? 'Main menu' : 'Try Again'}`,
  ),
});
