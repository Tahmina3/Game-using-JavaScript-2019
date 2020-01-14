var player;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var spacePressed = false;

function setPlayerDirection(dir) {
	//Display the walk animation for the correct direction, remove the other directions
	//to ensure the player does not have both "left" and "right" applied at the same time
	player.classList.remove('up');
	player.classList.remove('left');
	player.classList.remove('right');
	player.classList.remove('down');

	player.classList.add(dir);
}

function keyUp(event) {
	if (event.keyCode == 37) {
		leftPressed = false;
	}

	if (event.keyCode == 39) {
		rightPressed = false;
	}

	if (event.keyCode == 38) {
		upPressed = false;
	}

	if (event.keyCode == 40) {
		downPressed = false;
	}

	//Hide the weapon when the space bar is released
	if (event.keyCode == 32) {
		spacePressed = false;
		console.log('space is released');
		weapon[0].style.display = 'none';		
	}
}


function move() {
	var left = player.offsetLeft;
	var top = player.offsetTop;

	if (downPressed) {
		setPlayerDirection('down');
		top = top + 5;
	}

	if (upPressed) {
		setPlayerDirection('up');
		top = top - 5;
	}

	if (leftPressed) {
		setPlayerDirection('left');
		left = left - 2;
	}

	if (rightPressed) {
		setPlayerDirection('right');
		left = left + 5;
	}

	//Get the the element at the coordinates for where the play will move to
	//All 4 corners of the player are required to check there is no collision on any side
	var playerTopLeft = document.elementFromPoint(left, top);
	var playerTopRight = document.elementFromPoint(left+32, top);
	var playerBottomLeft = document.elementFromPoint(left, top+48);
	var playerBottomRight = document.elementFromPoint(left+32, top+48);

	//If the element that the player is about to walk over contains the class "blocking" then
	// the player is not moved.
	// The player will only be moved to coordinates `top` and `left` if the element in that position is not blocking
	if (!playerTopLeft.classList.contains('blocking') && !playerTopRight.classList.contains('blocking')
		&& !playerBottomLeft.classList.contains('blocking') && !playerBottomRight.classList.contains('blocking')) {
		player.style.left = left + 'px';
		player.style.top = top + 'px';
	}

	//If any of the keys are being pressed, display the walk animation
	if (leftPressed || rightPressed || upPressed || downPressed) {
		player.classList.add('walk');
		player.classList.remove('stand');
	}
	
	//Otherwise, no keys are being pressed, display stand
	else {
		player.classList.add('stand');
		player.classList.remove('walk');
	}
}    //move() closed



function keyDown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}

	if (event.keyCode == 39) {
		rightPressed = true;
	}

	if (event.keyCode == 38) {
		upPressed = true;
	}

	if (event.keyCode == 40) {
		downPressed = true;
	}

	if (event.keyCode == 32) {
		spacePressed = true;
	}


	//When the space bar is pressed, add the fire animation to the player and shows the weapon
	if (spacePressed==true) {
		console.log('space is pressed');
		
		player.classList.add('fire');
		weapon[0].style.display = 'block';


		//Add the arrow to the body of the game
		var arrow = document.createElement('div');
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(arrow);

		arrow.classList.add ('arrow');

		/*when player is facing up the arrow is facing up, when facing down
		arrow is facing down, when facing left arrow facing left and when facing right
		arrow facing right, the position of the arrow is at the center of the player, 
		but a little bit away from it */
		 if (player.classList.contains('up')){
			 arrow.classList.add('up');
			 arrow.style.left =  player.offsetLeft+ 'px';
			arrow.style.top = (player.offsetTop -player.offsetHeight/2) + 'px';
			var goingDown = -1;
			var goingRight = 0;
		 }

		 if (player.classList.contains('down')){
			arrow.classList.add('down');
			arrow.style.left =  (player.offsetLeft+ player.offsetWidth/2) + 'px';
			arrow.style.top = (player.offsetTop + player.offsetHeight) + 'px';
			goingDown = 1;
			goingRight = 0;
		}

		if (player.classList.contains('left')){
			arrow.classList.add('left');
			arrow.style.left =  (player.offsetLeft - arrow.offsetWidth) + 'px';
			arrow.style.top = (player.offsetTop + player.offsetHeight/2) + 'px';
			goingDown = 0;
			goingRight = -1;
		}

		if (player.classList.contains('right')){
			arrow.classList.add('right');
			arrow.style.left =  (player.offsetLeft+ player.offsetWidth + 2) + 'px';
			arrow.style.top = (player.offsetTop + player.offsetHeight/2) + 'px';
			goingDown = 0;
			goingRight = 1;
		}



		
   }   //spacePressed closed
	
	


	setInterval(function() {
	console.log('arrow moving');

	var left = arrow.offsetLeft;
	var top = arrow.offsetTop;

		
    var arrowTopLeft = document.elementFromPoint(left, top);
    var arrowTopRight = document.elementFromPoint(left+20, top);
    var arrowBottomLeft = document.elementFromPoint(left, top+10);
	var arrowBottomRight = document.elementFromPoint(left+20, top+10);
	
	//if the arrow doesn't contain blocking, move, otherwise stop
	 if (!arrowTopLeft.classList.contains('blocking') && !arrowTopRight.classList.contains('blocking')
	 && !arrowBottomLeft.classList.contains('blocking') && !arrowBottomRight.classList.contains('blocking') 
	 ) {
     arrow.style.left = (arrow.offsetLeft + goingRight) + 'px';
	 arrow.style.top = (arrow.offsetTop + goingDown) + 'px';
	 
	//when arrow shot the enemy, removes the enemy from the game showing the dead animation 
	if (arrowTopRight.classList.contains('enemy')) {
		var enemiesCount=0;
	    var enemy = document.getElementsByClassName('enemy');
						
		for (var i = 0; i < 9; i++)
		if (arrowTopRight.offsetLeft == enemy[i].offsetLeft && arrowTopRight.offsetTop == enemy[i].offsetTop) {
			enemy[i] = arrowTopRight;
			enemy[i].classList.add('dead');
			//enemiesCount= enemiesCount + 1;
			enemiesCount++;
			console.log(enemiesCount);
		}


		//NOT WORKING - when enemies are all removed, display you win message
		if (enemiesCount==9){
			var win = document.createElement('div');
	        win.style.width = '130px';
	        win.style.height = '200px';
	        win.style.backgroundColor = 'green';
	        win.style.color = 'yellow';
	        win.style.fontSize= '50' + 'px';
	        win.style.marginLeft = '10' + 'px';
			
	        var body = document.getElementsByTagName('body')[0];
	        body.appendChild(win);
	
	        var winText = document.createTextNode('You Win!');
	        win.appendChild(winText);
		}
	 }

	}
	

	});
	 
	}


function stop(){
	clearInterval(move);
}


//...change the player heads and body
function clickHead() {
	var heads = document.getElementsByClassName('head');
	heads[0].style.backgroundImage = 'url(images/' + this.id + '.png)';
}
			
function clickBody() {
var bodies = document.getElementsByClassName('body');
bodies[0].style.backgroundImage = 'url(images/' + this.id + '.png)';
}


//When heads are clicked or bodies are clicked...   (previous comment)
function playerBodyHead() {
var headsBody = document.getElementsByTagName('li');
console.log(headsBody.length);

for (var i = 0; i < 8; i++) {
headsBody[i].addEventListener('click', clickHead);
}

for (var i = 8; i < 14; i++) {
headsBody[i].addEventListener('click', clickBody);
}

}

function setHead0() {
var head = document.getElementsByClassName('head')[0];
head.style.backgroundImage = 'url(images/head0.png)';
}
function setHead1() {
var head = document.getElementsByClassName('head')[0];
head.style.backgroundImage = 'url(images/head1.png)';
}
function setHead2() {
var head = document.getElementsByClassName('head')[0];
head.style.backgroundImage = 'url(images/head2.png)';
}
function setHead3() {
var head = document.getElementsByClassName('head')[0];
head.style.backgroundImage = 'url(images/head3.png)';
}
function setHead4() {
var head = document.getElementsByClassName('head')[0];
head.style.backgroundImage = 'url(images/head4.png)';
}


//close right side bar (when X is clicked)
function closeAside() {
	var close = document.getElementsByTagName('aside');
    close[0].style.marginLeft = '1000' + 'px';
}

//show the right side bar again (when player is clicked)
function openAside() {
	var close = document.getElementsByTagName('aside');
	close[0].style.marginLeft = '-240' + 'px';
}


//Add a message to the game (when about is clicked)
function aboutGame() {
	var message = document.createElement('div');
	message.style.width = '220px';
	message.style.height = '800px';
	message.style.backgroundColor = 'transparent';
	message.style.color = 'black';
	message.style.fontWeight= 'bold';
	message.style.marginLeft = '20' + 'px';
	message.style.textAlign = 'justify';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(message);
	
	var textNode = document.createTextNode('Press the arrows to move the player. You can change the player\'s head and body. Press the space bar to shot an arrow.');
	message.appendChild(textNode);
}
 

//not working
function exitAbout() {
	var exitMessage = document.getElementsByTagName('message');
	message.style.marginLeft = '-200' + 'px';
}


function gameStart() {
	var exitSide = document.getElementById('closeside');
	exitSide.addEventListener('click', closeAside);
	
	var about = document.getElementById('about');
	about.addEventListener('click', aboutGame);

	var exitAbout = document.getElementById('player');
	exitAbout.addEventListener('click', exitAbout);

	player = document.getElementById('player');
	player.addEventListener('click', openAside);
	weapon = document.getElementsByClassName('weapon');
	setInterval(move, 10);
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);
	playerBodyHead();
}

document.addEventListener('DOMContentLoaded', gameStart);


