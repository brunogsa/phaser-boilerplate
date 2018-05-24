const Phaser = require('phaser');

const Preloader = require('./Preloader');
const Title = require('./Title');

let game;

function resize() {
  const canvas = document.getElementById('game');

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = (windowWidth / gameRatio) + 'px';

  } else {

    canvas.style.width = (windowHeight * gameRatio) + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}

const Boot = {
  create: function() {
    // Initialize things here

    // Loading screen
    this.scene.switch('Preloader');
  },
};

window.onload = function() {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    canvas: document.getElementById('game'),
    width: 480,
    height: 640,

    scene: [
      Boot,
      Preloader,
      Title,
    ],
  });

  resize();
  window.addEventListener('resize', resize, false);
};
