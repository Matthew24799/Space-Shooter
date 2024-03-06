const canvas = document.querySelector("#playArea");
const ctx = canvas.getContext("2d");
    let asteroids = []
    const playerHeight = 45;
    const playerWidth = 43;
    let playerX = (canvas.width - playerWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
   let asteroidRadius = 10;
    let asteroidSpeed = 5;
    let spawnInterval = 1000;
    let lives = 3;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);


    
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


  function bullet() {
    ctx.rect(10, 20, 150, 100);
    
  }
 
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
    drawPlayer();
    drawAsteroids();
    bullet();
    
    asteroids.forEach((asteroid, index) => {
        asteroid.y += asteroidSpeed;

       // Check collision with player
       if (lives > 0) {
       const distanceX = playerX + playerWidth / 2 - asteroid.x;
       const distanceY = canvas.height - playerHeight / 2 - asteroid.y;
       const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

       if (distance < asteroidRadius + playerHeight / 2) {
            // Removes Asteroid from array
           asteroids.splice(index, 1);
           lives--
           console.log(`HIT: ${lives}`);
       }
      };

      
    });       

     

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
    
    setInterval(spawnAsteroid, spawnInterval);
    setInterval(draw, 10);

    