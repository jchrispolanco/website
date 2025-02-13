document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById("pacman");
  var canvas = document.createElement("canvas");
  
  var gridSize = 20;
  var mazeWidth = 56;  // New width (40 columns)
  var mazeHeight = 30; // New height (20 rows)
  
  canvas.width = mazeWidth * gridSize;  // 40 columns * 20px
  canvas.height = mazeHeight * gridSize;  // 20 rows * 20px
  container.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  var pacman = {
    x: gridSize,
    y: gridSize,
    radius: gridSize / 2,
    speed: gridSize,
    direction: null
  };

  var ghostSpeed = gridSize / 10;
  var ghosts = [
    { x: 10 * gridSize, y: 10 * gridSize, radius: gridSize / 2, color: "red", direction: "left" },
    { x: 20 * gridSize, y: 15 * gridSize, radius: gridSize / 2, color: "pink", direction: "right" },
    { x: 30 * gridSize, y: 20 * gridSize, radius: gridSize / 2, color: "cyan", direction: "up" },
    { x: 40 * gridSize, y: 25 * gridSize, radius: gridSize / 2, color: "orange", direction: "down" }
  ];
  
  var maze = [];
  for (var i = 0; i < 30; i++) {  // 30 rows
    var row = [];
    for (var j = 0; j < 56; j++) {  // 56 columns
      if (i === 0 || j === 0 || i === 29 || j === 55) {
        row.push(1);  // Outer wall
      } else if (
        (i % 2 === 0 && j % 4 === 0) ||  // Create a grid-like structure for the core
        (i > 5 && i < 25 && (j === 10 || j === 45)) ||  // Vertical pathways
        (i === 15 && j > 10 && j < 45 && j % 3 !== 0) ||  // Horizontal corridor with gaps
        (i % 6 === 0 && j > 5 && j < 50 && j % 5 === 0)  // Additional maze complexity
      ) {
        row.push(1);  // Wall
      } else {
        row.push(0);  // Path
      }
    }
    maze.push(row);
  }
    
  var pellets = [];
  var powerPellets = [];
  var pelletCount = 0;
  for (var i = 0; i < maze.length; i++) {
    for (var j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 0) {
        pellets.push({ x: j * gridSize, y: i * gridSize });
      } else if (maze[i][j] === 2) {
        powerPellets.push({ x: j * gridSize, y: i * gridSize });
      }
    }
  }

  function drawMaze() {
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    for (var i = 0; i < maze.length; i++) {
      for (var j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === 1) {
          ctx.fillStyle = "blue";
          ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
        }
      }
    }
    ctx.restore();
  }

  function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x + pacman.radius, pacman.y + pacman.radius, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x + pacman.radius, pacman.y + pacman.radius);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  function drawGhosts() {
    ghosts.forEach(function (ghost) {
      var centerX = ghost.x + ghost.radius;
      var centerY = ghost.y + ghost.radius;
  
      // Draw rounded top
      ctx.beginPath();
      ctx.arc(centerX, centerY - ghost.radius / 2, ghost.radius, Math.PI, 0, false);
      ctx.lineTo(centerX + ghost.radius, centerY + ghost.radius - 5);
  
      // Draw wavy bottom
      for (let i = 1; i <= 3; i++) {
        ctx.arc(
          centerX + ghost.radius - (i * (ghost.radius / 1.5)),
          centerY + ghost.radius - 5,
          ghost.radius / 3,
          0,
          Math.PI,
          i % 2 === 0
        );
      }
  
      ctx.closePath();
      ctx.fillStyle = ghost.color;
      ctx.fill();
  
      // Draw ghost eyes
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(centerX - ghost.radius / 3, centerY - ghost.radius / 3, ghost.radius / 4, 0, 2 * Math.PI);
      ctx.arc(centerX + ghost.radius / 3, centerY - ghost.radius / 3, ghost.radius / 4, 0, 2 * Math.PI);
      ctx.fill();
  
      // Draw pupils (directional eyes)
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(centerX - ghost.radius / 3 + ghost.radius / 10, centerY - ghost.radius / 3, ghost.radius / 8, 0, 2 * Math.PI);
      ctx.arc(centerX + ghost.radius / 3 + ghost.radius / 10, centerY - ghost.radius / 3, ghost.radius / 8, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
  

  function drawPellets() {
    pellets.forEach(function(pellet) {
      ctx.beginPath();
      ctx.arc(pellet.x + gridSize / 2, pellet.y + gridSize / 2, gridSize / 6, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    });
  }

  function drawPowerPellets() {
    powerPellets.forEach(function(pellet) {
      ctx.beginPath();
      ctx.arc(pellet.x + gridSize / 2, pellet.y + gridSize / 2, gridSize / 3, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    });
  }

  function updatePacman() {
    var nextX = pacman.x;
    var nextY = pacman.y;
    switch (pacman.direction) {
      case "right":
        nextX += pacman.speed;
        break;
      case "left":
        nextX -= pacman.speed;
        break;
      case "up":
        nextY -= pacman.speed;
        break;
      case "down":
        nextY += pacman.speed;
        break;
    }
    
    // Check if Pac-Man's next position is within maze boundaries and not a wall
    if (
      nextX >= 0 && nextX < canvas.width &&
      nextY >= 0 && nextY < canvas.height &&
      maze[Math.floor(nextY / gridSize)][Math.floor(nextX / gridSize)] !== 1
    ) {
      pacman.x = nextX;
      pacman.y = nextY;
    }
  }

  function updateGhosts() {
    ghosts.forEach(function (ghost) {
      var gridX = Math.floor(ghost.x / gridSize);
      var gridY = Math.floor(ghost.y / gridSize);
  
      // Only change direction when the ghost is at the center of a grid cell
      if (ghost.x % gridSize === 0 && ghost.y % gridSize === 0) {
        var validDirections = [];
  
        // Check all four possible directions for validity (not a wall)
        if (maze[gridY][gridX + 1] !== 1) validDirections.push("right");
        if (maze[gridY][gridX - 1] !== 1) validDirections.push("left");
        if (maze[gridY - 1] && maze[gridY - 1][gridX] !== 1) validDirections.push("up");
        if (maze[gridY + 1] && maze[gridY + 1][gridX] !== 1) validDirections.push("down");
  
        // Randomly pick a new valid direction
        if (validDirections.length > 0) {
          ghost.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
        }
      }
  
      // Move ghost in the chosen direction
      switch (ghost.direction) {
        case "right":
          ghost.x += gridSize / 10;
          break;
        case "left":
          ghost.x -= gridSize / 10;
          break;
        case "up":
          ghost.y -= gridSize / 10;
          break;
        case "down":
          ghost.y += gridSize / 10;
          break;
      }
    });
  }
    
  function checkCollisions() {
    // Check for collisions with pellets
    pellets = pellets.filter(function (pellet) {
      var dx = (pacman.x + pacman.radius) - (pellet.x + gridSize / 2);
      var dy = (pacman.y + pacman.radius) - (pellet.y + gridSize / 2);
      var distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < pacman.radius / 2) {  // Adjust collision threshold for pellet eating
        pelletCount++;
        document.getElementById("pelletCount").innerText = "Pellets Eaten: " + pelletCount;
        return false;  // Pellet is eaten and removed from the array
      }
      return true;
    });
  
    // Check for collisions with ghosts
    ghosts.forEach(function (ghost) {
      var dx = (pacman.x + pacman.radius) - (ghost.x + ghost.radius);
      var dy = (pacman.y + pacman.radius) - (ghost.y + ghost.radius);
      var distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < pacman.radius * 0.8) {  // Accurate ghost collision detection
        if (ghost.color === "blue") {
          // Pac-Man eats the ghost
          ghost.x = 5 * gridSize;
          ghost.y = 5 * gridSize;
          ghost.color = ["red", "pink", "cyan", "orange"][Math.floor(Math.random() * 4)];
        } else {
          alert("Game Over");
          document.location.reload();
        }
      }
    });
  }
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPacman();
    drawGhosts();
    drawPellets();
    drawPowerPellets();
    updatePacman();
    updateGhosts();
    checkCollisions();
    requestAnimationFrame(gameLoop);
  }

  document.addEventListener("keydown", function(e) {
    switch (e.key) {
      case "ArrowRight":
        pacman.direction = "right";
        break;
      case "ArrowLeft":
        pacman.direction = "left";
        break;
      case "ArrowUp":
        pacman.direction = "up";
        break;
      case "ArrowDown":
        pacman.direction = "down";
        break;
    }
  });

  // Add a display for the pellet count
  var pelletCountDisplay = document.createElement("div");
  pelletCountDisplay.id = "pelletCount";
  pelletCountDisplay.style.color = "white";
  pelletCountDisplay.style.fontFamily = "'Press Start 2P', cursive";
  pelletCountDisplay.style.marginTop = "20px";
  pelletCountDisplay.innerText = "Pellets Eaten: 0";
  container.appendChild(pelletCountDisplay);

  gameLoop();
});