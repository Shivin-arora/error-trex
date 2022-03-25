var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var PLAY=1;
var END=0;
var Gamestate=PLAY;
var game_over,restart;
var gameoverimg,restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}



function setup() {
  createCanvas(1200,500);
  
  trex = createSprite(50,461.5,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.velocityX=6;
  trex.addAnimation("collided",trex_collided);
  ground = createSprite(trex.x,480,1200,20);
  ground.addImage("ground",groundImage,ground.width/2,480,1200,20);
  
  
  
  invisibleGround = createSprite(trex.x,490,1200,10);
  //invisibleGround.x = invisibleGround.width /2;
  //invisibleGround.visible = false;
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  game_over=createSprite(600,100,10,10);
  game_over.addImage(gameoverimg);
  game_over.scale=0.5;
  game_over.visible=false;
  restart=createSprite(600,150,10,10);
  restart.addImage(restartimg);
  restart.scale=0.5;
  restart.visible=false;
}

function draw() {
  background(180);
  textSize(20);
  text("Score: "+ score,trex.x,50);
  invisibleGround.x=trex.x;
 
  if(Gamestate===PLAY){
    if(keyDown("space")) {
    trex.velocityY = -15;
  }
    camera.position.x=trex.x;
  //ground.velocityX = -(4+frameCount/60);
    //-(4+3*frameCount/60);
    score = score + Math.round(getFrameRate()/60);
  
    
  trex.velocityY = trex.velocityY + 0.8;

 
    
    
    spawnClouds();
  spawnObstacles();
    
    if(trex.isTouching(obstaclesGroup)){
    Gamestate=END;
  }
    
  }
  else if(Gamestate===END){
    ground.velocityX = 0;
    
    game_over.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(frameCount+1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    trex.velocityX=0;
    
    if(mousePressedOver(restart)){
     restarta();
    }
  }
  
 
 
  
  trex.collide(invisibleGround);
  console.log(frameCount);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(trex.x+500,120,40,60);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    //cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 1000
    //1200+frameCount*3
    
    
    ;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1200+frameCount*5,465,40,80);
    //obstacle.velocityX = -(4+frameCount/60);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 900;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



function restarta(){
  Gamestate=PLAY;
  game_over.visible=false;
  restart.visible=false;
  trex.changeAnimation("running", trex_running);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  frameCount=0;
  
  
}