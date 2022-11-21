import Element from './Element';

export default class Player extends Element {
  #audio;

  #elements = {};

  constructor(parent, src, className, options) {
    super(parent, 'div', `${className} player player_disabled`);
    const playButton = new Element(this.el, 'div', 'player__button player__play-button');
    const progressBarLabel = new Element(this.el, 'label', 'player__bar-label player__progress-bar-label');
    const progressBar = new Element(progressBarLabel.el, 'input', 'player__bar player__progress-bar');
    const duration = new Element(this.el, 'div', 'player__duration');
    Object.assign(duration, {
      current: new Element(duration.el, 'div', 'player__duration-current', '00:00'),
      separator: new Element(duration.el, 'div', 'player__duration-separator', '/'),
      max: new Element(duration.el, 'div', 'player__duration-max', '00:00'),
    });
    const volumeButton = new Element(this.el, 'div', 'player__button player__volume-button');
    const volumeBarLabel = new Element(this.el, 'label', 'player__bar-label player__volume-bar-label');
    const volumeBar = new Element(volumeBarLabel.el, 'input', 'player__bar player__volume-bar');

    [progressBar.el, volumeBar.el].forEach((v) => Object.assign(v, { type: 'range', step: 'any' }));
    progressBar.el.value = 0;

    playButton.el.onclick = () => this.play();
    volumeButton.el.onclick = () => this.#mute();

    Object.assign(this.#elements, {
      playButton: playButton.el,
      progressBar: progressBar.el,
      current: duration.current.el,
      max: duration.max.el,
      volumeButton: volumeButton.el,
      volumeBar: volumeBar.el,
    });

    src.then((path) => {
      this.#audio = new Audio(path);
      Object.assign(this.#audio, { ...options });
      this.#audio.onloadedmetadata = () => this.#init();
    });
  }

  #getFormattedTime(s) {
    const minutes = `${Math.floor(s / 60)}`.padStart(2, 0);
    const seconds = `${Math.floor(s % 60)}`.padStart(2, 0);
    return `${minutes}:${seconds}`;
  }

  #init() {
    this.#elements.max.textContent = this.#getFormattedTime(this.#audio.duration);
    this.#elements.progressBar.max = this.#audio.duration;

    Object.assign(this.#audio, {
      onvolumechange: () => {
        this.#elements.volumeBar.value = this.#audio.volume * 100;
      },
      ontimeupdate: () => {
        this.#elements.current.textContent = this.#getFormattedTime(this.#audio.currentTime);
        this.#elements.progressBar.value = this.#audio.currentTime;
      },
    });

    Object.assign(this.#elements.progressBar, {
      oninput: () => {
        this.#audio.currentTime = this.#elements.progressBar.value;
      },
      ontouchstart: () => this.pause(),
      onmousedown: () => this.pause(),
      ontouchend: () => this.play(),
      onmouseup: () => this.play(),
    });
    Object.assign(this.#elements.volumeBar, {
      value: this.#audio.volume * 100,
      oninput: () => {
        this.#audio.volume = this.#elements.volumeBar.value / 100;
      },
    });

    this.el.classList.remove('player_disabled');
  }

  play() {
    this.#audio.play();
    this.#elements.playButton.classList.add('player__play-button_pause');
    this.#elements.playButton.onclick = () => this.pause();
  }

  pause() {
    this.#audio.pause();
    this.#elements.playButton.classList.remove('player__play-button_pause');
    this.#elements.playButton.onclick = () => this.play();
  }

  #mute() {
    const { classList } = this.#elements.volumeButton;

    if (this.#audio.muted) classList.remove('player__volume-button_muted');
    else classList.add('player__volume-button_muted');

    this.#audio.muted = !this.#audio.muted;
  }
}
