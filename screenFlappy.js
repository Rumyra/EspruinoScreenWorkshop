A5.write(0); // GND
A7.write(1); // VCC
A6.write(0); // Turn on the backlight

var g; // Define g globally, so that it can be used by other functions

var birdPos; // bird screen position
var birdVel; // bird velocity
var obstacles; // array of obstacles for flappy bird


function onInit() {
  // Setup SPI
  var spi = new SPI();
  spi.setup({ sck:B1, mosi:B10 });
  clearInterval();
  // Initialise the LCD
  g = require("PCD8544").connect(spi,B13,B14,B15, function() {
     gameStart();    
  });
}

function gameStart() {
  birdPos = g.getHeight()/2;
  birdVel = 0;
  obstacles = [
    { x: g.getWidth()/2, y: 20, h: 15 },
    { x: g.getWidth(), y: 30, h: 10 }
  ];
  setInterval(onFrame, 50);
}

function gameOver() {
  clearInterval();
  g.clear();
  g.drawString("GAME OVER!", 20, 20);
  g.flip();
}

function onFrame() {
  // Step animation for bird
  birdPos += birdVel;
  birdVel = birdVel*0.9 + 0.1;
  // Step animation for obstacles
  obstacles.forEach(function(o) {
    o.x -= 1;
  });
  if (obstacles[0].x < -5) {
    obstacles.shift(); // remove first
    obstacles.push({ // add new
      x : 84,
      y : 10+Math.random()*24,
      h : 8+Math.random()*15
    });
  }
  // Test
  if (birdPos > g.getHeight()) return gameOver();
  if (obstacles[0].x < 8 && (
        birdPos<obstacles[0].y-obstacles[0].h ||
        birdPos>obstacles[0].y+obstacles[0].h)) return gameOver();

  // Draw!
  g.clear();
  // bird
  g.fillRect(0, birdPos-2, 4, birdPos+2);
  // obstacles
  obstacles.forEach(function(o) {
    g.drawRect(o.x-5, -1, o.x+5, o.y - o.h); // top
    g.drawRect(o.x-5, o.y + o.h, o.x+5, g.getHeight()); // bottom
  });
  g.flip();
}

pinMode(B4, "input_pulldown");
setWatch(function() {
  birdVel -= 2;
}, B4, { edge:"rising", repeat:true, debounce: 50});

