/** Основная страница
 Стартовая страница определяет общее впечатление о приложении.
   Приветствуется художественное оформление, анимации, фоновое видео и другие эффекты,
   привлекающие внимание пользователя
 */
import '../styles/main.scss';
import Element from './class/Element';
import Anchor from './class/Anchor';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';

const header = new Header();

const main = new Element(document.body, 'main', 'main');
const bgMatrix = new BackgroundVideo();
const startGame = new Anchor(main.el, './quiz', 'start-game interactive', 'Start Game');

const footer = new Footer();
