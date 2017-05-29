(function (window) {

  /* Game settings */

  var settings = {}; // Containes all game settings
  settings.FPS = 60;
  settings.roundStart = 20;
  settings.roundUpTimer = settings.FPS * 10;
  settings.roundUpSpawn = 1;
  settings.speedScale = 1.2;
  settings.roundModifier = 0.05;
  settings.playerDotSpeed = 20; // lower = faster respond
  settings.spawnFrame = 10;
  settings.godmode = false; // Debug mode


  /* World settings */
  /* DO NOT CHANGE BELOW */

  var world = {};
  // Player Dots
  world.playerList = [];
  world.playerLength = 0;
  // Enemy Dots
  world.dotList = [];
  world.dotNum = 1;
  world.dotLength = 0;
  world.spwanDist = 15;
  // Miscellaneous
  world.frame = 0; // Frames since the start of the game
  world.space = false; // for game pause
  world.score = 0;

  // Controller settings
  var mouse = {};
  mouse.x = 0;
  mouse.y = 0;
  mouse.leftClick = false;

  // skill settings
  var skill = {};
  skill.q = false;
  skill.w = false;
  skill.e = false;


  /* Start game */

  // World Creation
  starter(world);
  var scoreBoard = document.getElementById('score')
  // PlayerSpawn
  // need to change for multiplayer
  var player = new Player(settings, world);
  world.playerList.push(player);
  world.playerLength = world.playerList.length;

  // Dot enemy spawn
  function dotSpawn() {
    if (world.frame < settings.spawnFrame * settings.roundStart) {
      if (world.frame % settings.spawnFrame === 0) {
        var i = world.frame / settings.spawnFrame;
        world.dotList[i] = new Dots(i, settings, world);
      }
      world.dotLength = world.dotList.length;
    }
    // round up??
  }

  // Draw movement
  function drawMovements() {
    world.playerList.map(function(e,i,arr) {
      collision.call(e, world.dotList, world, true);
      return e.drawPlayerMove(mouse);
    });
    world.dotList.map(function(e) {
      return e.drawDotMove();
    });
  }

  // Render Loops
  (function animloop() {
    requestAnimFrame(animloop);
    drawMovements();
    if (true) {
      dotSpawn();
      scoring(scoreBoard, world);
    }
    world.frame++;
    world.score = Math.floor(world.frame / settings.FPS)
  }());

  // Event Listening
  function getMousePos(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  (function () {
    document.addEventListener('mousemove', getMousePos, false);
  }());

}(window));
