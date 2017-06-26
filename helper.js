var context;
var queue;
var WIDTH = 1300;
var HEIGHT = 500;
var mouseXPosition;
var mouseYPosition;
var stage;
var animation;
var animation2;
var animation3;
var spriteSheet;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 5.9;
var enemyYSpeed = 7.0;
var mex = 0;
var mey = 0;
var score;
var xloc = 265;
var yloc = 240;
var poured = false;
window.onload = function()
{
    /*
     *      Set up the Canvas with Size and height
     *	
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    /*
     *      Set up the Asset Queue and load sounds
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    /*
     *      Create a load manifest for all assets
     *
     */
    queue.loadManifest([
        
        {id: 'background', src: 'assets/song.mp3'},
        {id: 'cakesheet', src: 'assets/cake.png'},
        {id: 'booze', src: 'assets/jack.png'},
        {id: 'beer', src: 'assets/beer.png'},
        {id: 'table', src: 'assets/table.png'},
        {id: 'glass', src: 'assets/shotglass5.png'},
        {id: 'glass2', src: 'assets/shotglass4.png'},
        {id: 'glassfi', src: 'assets/shotglass5fill.png'},
        {id: 'glass2fi', src: 'assets/shotglass4fill.png'},
    ]);
    queue.load();
}

function queueLoaded(event)
{
	score = 0;
	scoreText = new createjs.Text("SHOT COUNTER!!! " + score.toString(), "30px Arial", "#0000");
	screenText = new createjs.Text("Whoa, that might be a little too much for you!", "30px Arial", "#0000");
	screen2Text = new createjs.Text("STAAAAHHHHHP!!!", "35px Arial", "#0000");
    scoreText.x = 800;
    scoreText.y = 10;
    screenText.x = 600;
    screenText.y = 300;
    
    // Play background sound
    alert("Turn Your Sound Up!!!");
    alert("Try Using Your Arrow Keys!");
    createjs.Sound.play("background", {loop: -1});
   
    // Create spritesheets
    
    spriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('cakesheet')],
        "frames": {"width": 220, "height": 221}
    });
    boozeSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('booze')],
        "frames": {"width": 209, "height": 292}
    });
    beerSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('beer')],
        "frames": {"width": 244, "height": 203}
    });
    tabSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('table')],
        "frames": {"width": 260, "height": 220}
    });
    glassSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('glass')],
        "frames": {"width": 100, "height": 100}
    });
    glass2Sheet = new createjs.SpriteSheet({
        "images": [queue.getResult('glass2')],
        "frames": {"width": 60, "height": 60}
    });
    glassfillSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('glassfi')],
        "frames": {"width": 100, "height": 100}
    });
    glass2fillSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('glass2fi')],
        "frames": {"width": 60, "height": 60}
    });


    // Create sprites
    
    createSprite();


    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    // Set up events AFTER the game is loaded
   // window.onmousemove = handleMouseMove;
    //window.onmousedown = handleMouseDown;
}

function createSprite()
{
	animation = new createjs.Sprite(spriteSheet);
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation2 = new createjs.Sprite(boozeSheet);
    animation2.x = enemyXPos;
    animation2.y = enemyYPos;
    animation2.regx = 200;
	animation3 = new createjs.Sprite(beerSheet);
    animation3.x = enemyXPos;
    animation3.y = enemyYPos;
    mytable = new createjs.Sprite(tabSheet);
    stage.addChildAt(animation, animation2, animation3, 0);
   
    
}


function tickEvent()
{

	if(enemyXPos < (WIDTH - 380) && enemyXPos > 0)
	{
		enemyXPos += enemyXSpeed;
	} else 
	{
		enemyXSpeed = enemyXSpeed * (-1);
		enemyXPos += enemyXSpeed;
	}
	if(enemyYPos < HEIGHT - 50 && enemyYPos > 0)
	{
		enemyYPos += enemyYSpeed;
	} else
	{
		enemyYSpeed = enemyYSpeed * (-1);
		enemyYPos += enemyYSpeed;
	}
	mex += 20;
	mey += 2;

	if(animation3.x > WIDTH){
		mex = 0;
	}
	if(animation3.y > HEIGHT){
		mey = 0;
	}

	animation.x = enemyXPos;
	animation.y = enemyYPos;

	animation3.x = (Math.sin(enemyXPos) * 200) + mex;
	animation3.y = (Math.cos(enemyXPos) * 200) + mey;

	if(animation2.x > WIDTH){
		animation2.x = 0;
		if(poured = false){
			alert("You can't get another glass until you have filled the last one!");
		}
		else if(score <= 7){
			score += 1;
    		scoreText.text = "SHOT COUNTER! " + score.toString();
    	}
	}
	if(animation2.y > HEIGHT + 70){
		animation2.y = 0;
		if(poured = false){
			alert("You can't get another glass until you have filled the last one!");
		}
		else if(score <= 7){
			score += 1;
    		scoreText.text = "SHOT COUNTER! " + score.toString();
    	}
	}
	if(animation2.x < 0){
		animation2.x = WIDTH;
    	if(poured = false){
			alert("You can't get another glass until you have filled the last one!");
		}
		else if(score <= 7){
			score += 1;
    		scoreText.text = "SHOT COUNTER! " + score.toString();
    	}
	}
	if(animation2.y < 0){
		animation2.y = HEIGHT + 50;
    	if(poured = false){
			alert("You can't get another glass until you have filled the last one!");
		}
		else if(score <= 7){
			score += 1;
    		scoreText.text = "SHOT COUNTER! " + score.toString();
    	}
	}
	if(score > 0 && mytable.y < HEIGHT - 220){
		stage.addChild(scoreText);
		stage.addChild(mytable);
		mytable.x = 300;
		for (var i = 0; i < 10; i++) {
			mytable.y += 2;
		}
		stage.removeChild(animation3);
	}
	//Put the glasses on the table
	if(score == 1){
		firstglass = new createjs.Sprite(glassSheet);
		stage.addChild(firstglass);
		firstglass.x = xloc;
    	firstglass.y = yloc;
	}
	if(score == 2){
		secondglass = new createjs.Sprite(glass2Sheet);
		stage.addChild(secondglass);
		secondglass.x = 350;
		secondglass.y = 285;
	}
	if(score == 3){
		thirdglass = new createjs.Sprite(glass2Sheet);
		stage.addChild(thirdglass);
		thirdglass.x = 410;
		thirdglass.y = 250;
	}
	if(score == 4){
		
		fourthglass = new createjs.Sprite(glassSheet);
		stage.addChild(fourthglass);
		fourthglass.x = 355;
		fourthglass.y = 265;
	}
	if(score == 5){
		fifthglass = new createjs.Sprite(glass2Sheet);
		stage.addChild(fifthglass);
		fifthglass.x = 450;
		fifthglass.y = 250;
		stage.addChild(screenText);
	}
	if(score == 6){
		sixthglass = new createjs.Sprite(glassSheet);
		stage.addChild(sixthglass);
		sixthglass.x = 385;
		sixthglass.y = 255;
		stage.removeChild(screenText);
		screenText.x = 300;
		screenText.y = 50;
		screenText.text = "Like, you should probably stop."
		stage.addChild(screenText);
	}
	if(score == 7){
		seventhglass = new createjs.Sprite(glass2Sheet);
		stage.addChild(seventhglass);
		seventhglass.x = 465;
		seventhglass.y = 275;
		stage.removeChild(screenText);
		screen2Text.x = 600;
		screen2Text.y = 150;
		stage.addChild(screen2Text);
	}
	if(score == 8){
		eighthglass = new createjs.Sprite(glassSheet);
		stage.addChild(eighthglass);
		eighthglass.x = 325;
		eighthglass.y = 255;
		stage.removeChild(screen2Text);
		screen2Text.x = 600;
		screen2Text.y = 250;
		screen2Text.text = "Okay, no more for you."
		stage.addChild(screen2Text);
	}

	if(score > 6){
		screenText.x = Math.floor(Math.random() * 200);
		screenText.y = Math.floor(Math.random() * 200);
		screenText.text = "Jess is hopping on the L train!"
		stage.addChild(screenText);
	}
	
	
	if(score > 0 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glassfillSheet);
    	filledglass.x = xloc;
    	filledglass.y = yloc;
    	stage.addChild(filledglass);
    	stage.removeChild(firstglass);
	}
	if(score > 1 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glass2fillSheet);
    	filledglass.x = 350;
    	filledglass.y = 285;
    	stage.addChild(filledglass);
    	stage.removeChild(secondglass);
    	
	}
	if(score > 2 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glass2fillSheet);
    	filledglass.x = 410;
    	filledglass.y = 250;
    	stage.addChild(filledglass);
    	stage.removeChild(thirdglass);
	}
	if(score > 3 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glassfillSheet);
    	filledglass.x = 355;
    	filledglass.y = 265;
    	stage.addChild(filledglass);
    	stage.removeChild(fourthglass);
	}
	if(score > 4 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glass2fillSheet);
    	filledglass.x = 450;
    	filledglass.y = 250;
    	stage.addChild(filledglass);
    	stage.removeChild(fifthglass);
	}
	if(score > 5 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glassfillSheet);
    	filledglass.x = 385;
    	filledglass.y = 255;
    	stage.addChild(filledglass);
    	stage.removeChild(sixthglass);
	}
	if(score > 6 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glass2fillSheet);
    	filledglass.x = 465;
    	filledglass.y = 275;
    	stage.addChild(filledglass);
    	stage.removeChild(seventhglass);
	}
	if(score > 7 && animation2.x < (mytable.x + 100) && animation2.y < (mytable.y + 100) &&
		animation2.x > (mytable.x - 150) && animation2.y > (mytable.y - 150)){
		filledglass = new createjs.Sprite(glassfillSheet);
    	filledglass.x = 325;
    	filledglass.y = 255;
    	stage.addChild(filledglass);
    	stage.removeChild(eighthglass);
	}
	
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        animation2.y-= 20;
    }
    else if (e.keyCode == '40') {
        // down arrow
        animation2.y += 20;
    }
    else if (e.keyCode == '37') {
       // left arrow
       animation2.x -= 20;
    }
    else if (e.keyCode == '39') {
       // right arrow
       animation2.x += 20;
    }

}