/** Основная страница
 Стартовая страница определяет общее впечатление о приложении.
   Приветствуется художественное оформление, анимации, фоновое видео и другие эффекты,
   привлекающие внимание пользователя
 */
import '../styles/main.scss';
import Element from './class/Element';
import Header from './components/header';
import Footer from './components/footer';

const header = new Header();

const main = new Element(document.body, 'main', 'main', 'main');

const footer = new Footer();
