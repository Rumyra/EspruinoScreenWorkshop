A5.write(0); // GND
A7.write(1); // VCC
A6.write(1); // Turn on the backlight

pinMode(B4, "input_pulldown");

var g, // Define g globally, so that it can be used by other functions
  presses = 0, // start press count at zero
  stringToDraw = 'Hello World'; // first string is hello world

function onInit() {
  // Setup SPI
  var spi = new SPI();
  spi.setup({ sck:B1, mosi:B10 });
  setWatch(function(e) {
    setString();
    // Initialise the LCD
    g = require("PCD8544").connect(spi,B13,B14,B15, function() {
      // When it's initialised, clear it and write some text
      g.clear();
      g.drawString(stringToDraw,0,0);
      // send the graphics to the display
      g.flip();
    });
  }, B4, { repeat: true, debounce : 50, edge: "rising" });
}

function setString() {
  console.log(presses);
  if (presses === 0) {
    sringToDraw = 'Hello World!';
  } else {
    sringToDraw = 'Hello Fullstack!';
  }
  if (presses>0) {presses=0;} else {presses++;}
}

onInit();