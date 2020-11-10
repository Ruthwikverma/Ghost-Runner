var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var ghost, ghoststanding;
var tower, towerimage;
var doors, doorsimage, doorsGroup;
var climbers, climbersimage, climbersGroup;
var invisibleblock, invisibleblockGroup;

function preload() {

  ghoststanding = loadImage("ghost-standing.png");
  //ghostjumping = loadImage("ghost-jumping.png");

  towerimage = loadImage("tower.png");

  doorsimage = loadImage("door.png");

  climbersimage = loadImage("climber.png");
  }

function setup() {
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage(towerimage);

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghoststanding);
  ghost.scale = 0.5

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleblockGroup = createGroup();
  
  }
function draw() {
  background(0);
  
 if(gamestate === PLAY) {
  if(keyDown("up")) {
    ghost.velocityY = -5;
    }

  if(keyDown("left")) {
    ghost.x = ghost.x - 2;
    }  

  if(keyDown("right")) {
    ghost.x = ghost.x + 2;
  }

    ghost.velocityY = ghost.velocityY + 0.5;

    spawnDoors();

  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }

  if(invisibleblockGroup.isTouching(ghost)|| ghost.y > 600) {
    gamestate = END;
  }
    
  drawSprites();
}

  if(gamestate === END) {
    fill("yellow");
    textSize(24);
    text("Game Over", 200,200);
     
  }
}   
function spawnDoors() {
  
  if(frameCount % 280 === 0) {
   doors = createSprite(200,-50);
   doors.addImage(doorsimage); 
   doors.x = Math.round(random(150,400))
   doors.velocityY = 3;
   doors.lifetime = 600;
   
   climbers = createSprite(200,10);
   climbers.addImage(climbersimage); 
   climbers.velocityY = 3;
   climbers.x = doors.x;
   climbers.lifetime = 600;  
     
   invisibleblock = createSprite(200,15);
   invisibleblock.x = doors.x;
   invisibleblock.width = climbers.width;
   invisibleblock.height = 2;
   invisibleblock.debug = true;
   invisibleblock.velocityY = 3;
   invisibleblock.lifetime = 600;
    
   ghost.depth = doors.depth; 
   ghost.depth = ghost.depth + 1;
  
   doorsGroup.add(doors);
   climbersGroup.add(climbers);
   invisibleblockGroup.add(invisibleblock); 
  }
}