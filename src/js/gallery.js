import '../styles/gallery.scss';
import Element from './class/Element';
import Header from './components/header';
import Footer from './components/footer';
import BackgroundVideo from './components/background';
import TVShowCard from './components/tv-show-card';
import TVShowList from '../db/TVShowList';

const header = new Header();

const main = new Element(document.body, 'main', 'main');
const bgMatrix = new BackgroundVideo();

const footer = new Footer();

const gallery = Array.from(Object.values(TVShowList).flat(), (v) => new TVShowCard(main.el, v));
