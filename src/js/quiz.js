/** 
 - верхняя панель
    содержит список вопросов и текущий счёт игры
 - блок с текущим вопросом
    содержит аудиоплеер с записью голоса птицы и заглушки на месте названия и изображения птицы. Когда игрок выбирает правильный ответ, в блоке отображаются название и изображение птицы, голос которой звучал
 - блок с вариантами ответов
    содержит список с названиями шести разных птиц
 - блок с описанием птицы
    содержит приглашение послушать плеер и выбрать птицу из списка. Когда игрок выбирает вариант ответа, в блоке отображаются данные о выбранной птице: изображение, русское и латинское название, аудиозапись голоса, краткая информация
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
