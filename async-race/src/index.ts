import 'normalize.css';
import './assets/styles/styles.scss';
import { App } from './app/app';
import { selfCheck } from './selfcheck/checklist';

console.info(selfCheck.student);
console.info(selfCheck.mentor);

const app = new App();
app.run();
