import '../styles/main.scss';
import Element from './class/Element';
import Anchor from './class/Anchor';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';

const header = new Header();
const main = new Element(document.body, 'main', 'main');
const bgMatrix = new BackgroundVideo();
const footer = new Footer();

const startGame = new Anchor(main.el, './quiz', 'start-game main-menu interactive', 'Start Game');
const gallery = new Anchor(main.el, './gallery', 'gallery main-menu interactive', 'Gallery');
const result = localStorage.getItem('erdev__songbird-score') && new Anchor(main.el, './result', 'result main-menu interactive', 'Last Result');
