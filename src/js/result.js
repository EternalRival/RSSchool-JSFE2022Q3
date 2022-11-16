/**
 - Отображается после завершения викторины, содержит набранные в ходе игры баллы
 - Если набрано не максимально возможное количество баллов, игроку предлагается пройти викторину ещё раз. Есть кнопка перенаправляющая к началу игры.
 - Если набрано максимально возможное количество баллов, выводится поздравление и уведомление об окончании игры (этот пункт не проверяется)
 */

import '../styles/main.scss';
import Element from './class/Element';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';

const header = new Header();

const main = new Element(document.body, 'main', 'main');
const bgMatrix = new BackgroundVideo();

const footer = new Footer();
