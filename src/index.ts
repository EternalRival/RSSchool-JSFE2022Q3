import 'normalize.css';
import './assets/styles/styles.scss';
import { App } from './app/app';
import { selfCheck } from './selfcheck/checklist';

console.log(selfCheck.student);
console.log(selfCheck.mentor);

const app = new App();
app.run();
