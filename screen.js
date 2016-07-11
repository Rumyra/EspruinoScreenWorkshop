SPI1.setup({ sck:B3, mosi:B5 });

var g = require("PCD8544").connect(SPI1, B6 /*DC*/, B7 /*CE*/, B8 /*RST*/, function() {
  g.clear();
  g.drawString("Hello",0,0);
  g.drawLine(0,10,84,10);
  g.flip();
});