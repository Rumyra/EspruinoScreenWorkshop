A5.write(0); // GND
A7.write(1); // VCC
A6.write(1); // Turn on the backlight

pinMode(B3, "input_pulldown"); // left
pinMode(B4, "input_pulldown"); // right
pinMode(B5, "input_pulldown"); // up
pinMode(B6, "input_pulldown"); // down

var g; // Define g globally, so that it can be used by other functions
var x=42, y=24; // starting point for drawing

function onInit() {
  // Setup SPI
  var spi = new SPI();
  spi.setup({ sck:B1, mosi:B10 });
  g = require("PCD8544").connect(spi,B13,B14,B15, function() {
    onFrame();
  });
}

function onFrame() {
  if (digitalRead(B3)) x--;
if (digitalRead(B3)) console.log('left');
  if (digitalRead(B4)) x++;
  if (digitalRead(B3)) console.log('right');
  if (digitalRead(B5)) y++;
  if (digitalRead(B3)) console.log('up');
  if (digitalRead(B6)) y--;
  if (digitalRead(B3)) console.log('down');

  g.setPixel(x,y,1);
  g.flip();
}

onInit();