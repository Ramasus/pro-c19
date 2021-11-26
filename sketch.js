var PLAY = 1;
var END = 0;
var gameState = PLAY;

var kid, kid_running, kid_collided;
var invisibleGround;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var ground, groundImg, invisibleGround;

var score = 0;
var gameOverImg, restartImg;

function preload(){

  kid_running = loadImage("Running2.png");
  groundImg = loadImage("Background.png");

  obstacle1 = loadImage("Obstaculo1.png");
  obstacle2 = loadImage("Obstaculo2.png");
  obstacle3 = loadImage("Obstaculo3.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {

  ground = createSprite(200, 100, 600, 200);
  ground.addImage(groundImg);

  createCanvas(400, 200);
  kid = createSprite(50, 200, 20, 20);  
  kid.addImage(kid_running);
  kid.scale = 0.25;
  kid.setCollider("rectangle",0,0, 60,500);
  kid.debug = true;

  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver = createSprite(250, 100);
  gameOver.addImage(gameOverImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(50, 210, 10000, 1); 
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();

}

function draw() {

  background(255);
  drawSprites();

  if (gameState == PLAY) {

    ground.velocityX = -5;
    
    if (ground.x < 150){
      ground.x = ground.width/2;
    }

  kid.collide(invisibleGround);

  gameOver.visible = false;
  restart.visible = false;

  if(keyDown("space") && kid.y >= 140) {
    kid.velocityY = -12;
  }  
  kid.velocityY = kid.velocityY + 0.8

  spawnObstacles();

  if(obstaclesGroup.isTouching(kid)){
    kid.velocityY = -12;
    gameState = END;
  }
 }

if (gameState === END) {   
  gameOver.visible = true;
  restart.visible = true;
  
  if(mousePressedOver(restart)) {
    reset();
  }
 
  ground.velocityX = 0;
  kid.velocityY = 0

  obstaclesGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(0);   
 }
}

function reset(){

  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  ground.setvelocityX = -5;

  obstaclesGroup.destroyEach();
}


function spawnObstacles() {
  if (frameCount % 60 == 0) {
    var obstacle = createSprite(500, 190, 20, 20);
    obstacle.velocityX = -(6 + score/ 100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
       break;
      case 2: obstacle.addImage(obstacle2);
       break;
      case 3: obstacle.addImage(obstacle3);
       break;
      default: break;
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstacle.setCollider("circle", 0, 0, 20);
    obstacle.debug = true;
    
    obstaclesGroup.add(obstacle);
  }
}