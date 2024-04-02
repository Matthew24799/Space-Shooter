const canvas = document.querySelector("#playArea");
const ctx = canvas.getContext("2d");

    const FxPlayerHit = new Audio("sounds/playerHit.wav");
    const FxExplosion = new Audio("sounds/Explosion.wav");
    const FxShoot = new Audio("https://github.com/Matthew24799/Space-Shooter/blob/main/sounds/Shoot.wav?raw=true");
    const FxHit = new Audio("sounds/Hit.wav");
    let asteroids = [];
    let bullets = [];
    const playerHeight = 45;
    const playerWidth = 43;
    let playerX = (canvas.width - playerWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let asteroidRadius = 10;
    let asteroidSpeed = 5;
    let spawnInterval = 1000; 

    let scoreHigh;
    const saveKey = "highScore"
    let scoreStr = localStorage.getItem(saveKey)
    if(scoreStr == null) {
      scoreHigh = 0;
    } else {
      scoreHigh = parseInt(scoreStr)
    }
    let currentScore = 0;
    let lives = 3;
   
    
    
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    document.addEventListener("keyup", event => {
      if (event.code === "Space") {
        shooting();
        FxShoot.play();
      }
    })
    
    function keyDownHandler(e) {
      if (e.key === "right" || e.key === "d") {
          rightPressed = true;
      } else if (e.key === "left" || e.key === "a") {
          leftPressed = true;
      }
  };

  function keyUpHandler(e) {
          if (e.key === "right" || e.key === "d") {
              rightPressed = false;
          } else if (e.key === "left" || e.key === "a") {
              leftPressed = false;
          }
  };

  function scoreBoard() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(`Lives: ${lives}`, 40, 30);

    ctx.fillText(`score: ${currentScore}`, 440, 30);
    
    ctx.fillText(`highScore: ${scoreHigh}`,190,30);
  }


  function detectCollision() {
    bullets.forEach((bullet, bulletIndex) => {
      asteroids.forEach((asteroid, asteroidIndex) => {
        const distanceX = bullet.x - asteroid.x;
        const distanceY = bullet.y - asteroid.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if ( distance < asteroidRadius + 5) {
          FxHit.play();
          bullets.splice(bulletIndex,1);
          asteroids.splice(asteroidIndex,1);

          if (lives > 0) {
          currentScore++;
          console.log(currentScore);
          };

          if (currentScore > scoreHigh ) {
            scoreHigh = currentScore;
            localStorage.setItem(saveKey, scoreHigh);
          };
          
        }
      })
    })
  };

  function drawBullet() {
    bullets.forEach(bullet => {
      ctx.fillStyle = "red";
      ctx.fillRect(bullet.x, bullet.y, 10, 10);
      
    });
    
  };

  function shooting() {
    let bulletX = playerX + playerWidth / 2 -2;
    let bulletY = canvas.height - playerHeight -32;
    bullets.push({ x: bulletX, y: bulletY });
  };
 
    function spawnAsteroid() {
      let asteroidX = Math.random() * canvas.width;
      let asteroidY = 0;
      asteroids.push({ x: asteroidX, y: asteroidY });

    }

    

    function drawPlayer () { 
      if (lives > 0) {
        

      ctx.strokeRect(playerX, 830, playerWidth, playerHeight);
      ctx.stroke();
      ctx.strokeStyle = "white";
      }
    };

    function drawAsteroids() {
      asteroids.forEach(asteroid => {
          ctx.beginPath();
          ctx.arc(asteroid.x, asteroid.y, asteroidRadius, 0, Math.PI * 2);
          ctx.stroke(); 
          ctx.strokeStyle = "white";
      });
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreBoard()
    drawPlayer();
    drawAsteroids();
    detectCollision();
    

    if (lives > 0) {
    drawBullet();
    
    bullets.forEach((bullet, bulletIndex) => {
      bullet.y -= 5;

      if (bullet.y < 0) {
        bullets.splice(bulletIndex, 1);
      };
    })
  };
    asteroids.forEach((asteroid, index) => {
        asteroid.y += asteroidSpeed;

       // Check collision with player
      
       const distanceX = playerX + playerWidth / 2 - asteroid.x;
       const distanceY = canvas.height - playerHeight / 2 - asteroid.y;
       const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

       if (distance < asteroidRadius + playerHeight / 2) {
          FxPlayerHit.play();
            // Removes Asteroid from array
           asteroids.splice(index, 1); 
           if (lives > 0) {
           lives--
           };
       }
      
    });       

    if (lives === 0) {
      gameOver();
      lives === 0
     }

    
  if (rightPressed) {
    playerX += 7;
    if (playerX + playerWidth > canvas.width) {
      playerX = canvas.width - playerWidth;
    }
  } else if (leftPressed) {
    playerX -= 7;
    if (playerX < 0) {
      playerX = 0;

    }
  }
    };

    


    function gameOver() {
      ctx.fillStyle = "white";
      ctx.font = "50px ariel"; 
      ctx.fillText("Game Over!", 170, 400); 

      ctx.fillText("restarts soon :3", 150, 500);
    }
    
    setInterval(restart, 5000)
    function restart() {
    if (lives === 0) {
      console.log("worked");
      setTimeout(window.location.reload(), 3000);
    
   
    }};

    setInterval(spawnAsteroid, spawnInterval);
    setInterval(draw, 10);

    