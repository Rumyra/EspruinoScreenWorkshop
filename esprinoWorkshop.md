# Getting your Esprino up and running

Install the Espruino Web IDE - [you can find it here](https://chrome.google.com/webstore/detail/espruino-web-ide/bleoifhkdalbjfbobjackfdifdneehpo) on the Chrome Web Store.

### The IDE

Just a quick intro to the IDE. There’s an orange connect button on the top left, so when you have your Espruino plugged in to your computer, you can click that to connect it. There’s a console on the left which works much like any console or terminal. Just type code in and watch it run. Down the middle are a number of action buttons that do things such as open and save code as well as upload it to run on your Espruino. And last but not least, on the right is the code editor, this is where you edit the file(s) for your project to run on your device.

PIC HERE?

It’s pretty straight forward and now we’ve got that out the way we can crack on with a bit of code.

## Task One: Beginner Screen & Button

### Get the screen up and running

Grab this ‘Simple Screen’ starter code below and paste it into the IDE on the right hand side. (If you want to delve deeper into the screen starter code check out [this link which goes through it in more depth](http://www.espruino.com/Pico+LCD+Hello+World) )

	A5.write(0); // GND
	A7.write(1); // VCC
	A6.write(1); // Turn on the backlight
	
	var g; // Define g globally, so that it can be used by other functions
	
	function onInit() {
		// Setup SPI
		var spi = new SPI();
		spi.setup({ sck:B1, mosi:B10 });/
		/ Initialise the LCD
		g = require("PCD8544").connect(spi,B13,B14,B15, function() {
    		// When it's initialised, clear it and write some text
    		g.clear();
    		g.drawString("Hello World!",0,0);
    		// send the graphics to the display
    		g.flip();
    });
	}


Now hook up all the electronics. You want to place the Espruino on the breadboard with the USB connector on the left, with the top pins on the top half and the bottom pins on the bottom half. Now you want to place the screen above it, with the screens pins  lined up with the right side of the Espruino, (so ‘Gnd’ on the screen is inline with the far right pin on the Espruino).

PIC HERE?

Connect the Espruino with your computer’s USB port and click on the orange connect/disconnect button on the top left of the IDE. Select the correct USB port, usually indicated by ‘Esprino Board’ being shown underneath the name of the port. The IDE should tell you the Espruino has been connected and the connect/disconnect button on the top left should turn green.

Now upload your code! The up facing arrow button in the middle of the IDE does this, so go ahead and click that. Your screen should turn on and say ‘Hello World’.

If it doesn’t try some simple (I don’t mean bug fixing.. what do I mean?). Check the Espruino and board are in the bread board correctly and the Espruino is connected to the USB port ok. Once in the IDE make sure you copy and pasted the code correctly and the Espruino is connected and the code is uploading.

### Grab a button

Now let’s add a button. When we press the button we want the text to change from ‘Hello World!’ to ‘Hello Fullstack!’.

Place the button along the bottom, with the left side matching the third pin along on the Espruino and the right side matching the fifth. If you’re not sure which way round to place your button it only fits one way, you shouldn’t need to force it. So that’s pretty simple :)

Now it’s connected to 3.3v and digital 4 pin. Type `digitalRead(B4, “input_pulldown”)` into the left hand side of the IDE, (the console), and press enter. You should get a value of 0 returned. Now press down the button and run the command again, (you can press the up arrow just like a normal console), and you should get a reading of 1. Great our button works!

For our ‘pressing button’ code we’re going to use Espruinos own `setWatch` function, which uses Espruinos hardware to call a function if something changes.



### Now it’s your turn.

How would you alter the code so if you pressed the button a third time it greeted yourself: `Hello Joe Bloggs!`

## Task two: Super charging the button

So that’s the basics. But what about something fun to run? Rather than just changing the text when we press the button we could run a whole game! This is JavaScript after all!

Replace all the code in the right hand editor with the below and upload it onto your Espruino.




Now we have a fully fledged working version of flappy bird!

### Now it’s your turn

How would you get the game to restart after it says ‘Game Over’?  Could you add a running total to the code so you could keep score within the game?

## Task 3: Adding more buttons

Let’s add 3 more buttons to our existing set up, so we can have an up, a down, a left and a right.

This is where it gets a little more complicated. It may be easiest to refer to the picture below.

The third pin from the left is our 3.3 volt pin, all our buttons need this power on one of their pins. The other side of each of our buttons will go to one of the other pins to the right of this third pin. So the other side of the ‘left’ button with be connected to the forth pin from the left, the other side of the ‘right’ button will be connected to the fifth pin from the left and so on.





