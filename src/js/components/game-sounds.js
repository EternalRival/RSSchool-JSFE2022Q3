import correct from '../../assets/sounds/correct.mp3';
import wrong from '../../assets/sounds/wrong.mp3';

class Sound {
  constructor(URI, options) {
    Object.assign(this, { URI, options });
  }

  play() {
    const sound = new Audio(this.URI);
    Object.assign(sound, { ...this.options });
    sound.play();
  }
}

export default {
  correct: new Sound(correct),
  wrong: new Sound(wrong),
};
