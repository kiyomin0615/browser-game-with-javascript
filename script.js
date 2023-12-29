window.addEventListener("load", function () {
  const canvasEl = this.document.getElementById("canvas1");
  const context = canvasEl.getContext("2d");
  canvasEl.width = 1500;
  canvasEl.height = 500;

  class InputHandler {}

  class Projectile {}

  class Particle {}

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 1;
    }

    update() {
      this.y += this.speedY;
    }

    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  class Enemy {}

  class Layer {}

  class Background {}

  class UI {}

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
    }

    update() {
      this.player.update();
    }

    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvasEl.width, canvasEl.height);

  // animation loop
  function animate() {
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    game.update();
    game.draw(context);
    requestAnimationFrame(animate);
  }

  animate();
});
