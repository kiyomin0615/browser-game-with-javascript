window.addEventListener("load", function () {
  const canvasEl = this.document.getElementById("canvas1");
  const context = canvasEl.getContext("2d");
  canvasEl.width = 1500;
  canvasEl.height = 500;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowUp" || e.key === "ArrowDown") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === " ") {
          this.game.player.shootTop();
        }
        console.log(this.game.keys);
      });

      window.addEventListener("keyup", (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
        console.log(this.game.keys);
      });
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
    }

    update() {
      this.x += this.speed;

      if (this.x > this.game.width * 0.8) {
        this.markedForDeletion = true;
      }
    }

    draw(context) {
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  class Particle {}

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.maxSpeed = 3;
      this.projectiles = [];
    }

    update() {
      if (this.game.keys.includes("ArrowUp")) {
        this.speedY = -1;
      } else if (this.game.keys.includes("ArrowDown")) {
        this.speedY = 1;
      } else {
        this.speedY = 0;
      }
      this.y += this.speedY;

      this.projectiles.forEach((projectile) => {
        projectile.update();
      });

      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
    }

    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);

      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
    }

    shootTop() {
      if (this.game.ammo > 0) {
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 30)
        );
        this.game.ammo--;
      }
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
      this.inputHandler = new InputHandler(this);
      this.keys = [];
      this.ammo = 20;
      this.maxAmmo = 20;
      this.ammoTimer = 0;
      this.ammoInterval = 500;
    }

    update(deltaTime) {
      this.player.update();

      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) {
          this.ammo++;
        }
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }
    }

    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvasEl.width, canvasEl.height);

  let lastTime = 0;

  // animation loop
  function animate(timeStamp) {
    // requestAnimationFrame() passes timeStamp into callback
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(animate);
  }

  animate(0);
});
