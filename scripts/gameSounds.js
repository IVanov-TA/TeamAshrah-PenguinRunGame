function menuBackground() {
	var menuBg = new Audio('./sounds/menuBackground.mp3');
	menuBg.loop = true;
	menuBg.volume = 0.3;
	menuBg.play();
}

function btnHovered() {
	var clicked = new Audio('./sounds/click.mp3');
	clicked.volume = 1;
	clicked.play();
}

function activeBackgroundSound() {
	var bgSound = new Audio('sounds/background.mp3');
	bgSound.loop = true;
	bgSound.volume = 0.40;
	bgSound.play();
}

function jumpSound() {
	var jump = new Audio('sounds/jump.mp3');
	jump.volume = 1;
	jump.play();	
}