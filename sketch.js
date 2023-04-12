var bg,bgImg;
var player, shooterImg, shooter_shooting;
var Fantasminha, FantasminhaImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3

var zombieGroup;

var gameState = "play"

var bala = 70;

function preload(){
  
  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")

  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")

  FantasminhaImg = loadImage("fantasminha.png")

  bgImg = loadImage("bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);


  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
 


player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = true
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-110,40,20,20)
    heart2.visible = true
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.visible = true
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    balasGroup = new Group();
    zombieGroup = new Group();
}

function draw() {
  background(0); 

if (gameState == "play"){
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(life===3){ 
  heart3.visible = true 
  heart1.visible = false 
  heart2.visible = false }
  if(life===2){ heart2.visible = true
  heart1.visible = false 
 heart3.visible = false }
  if(life===1){ heart1.visible = true
 heart3.visible = false
  heart2.visible = false } 
}

if(life===0){
  heart1.visible = false 
  heart3.visible = false
  heart2.visible = false
  player.destroy();
  gameState = "lost"; }

  if (gameState == "lost"){
  textSize (100)
  fill ("yellow")
  text("Fim da caçada", 200, 200)
  zombieGroup.destroyEach()
  }

if(keyWentDown("space")){
  
  bala = createSprite (displayWidth-1150, player.y-30, 22, 13)
  bala.velocityX = 20

  balasGroup.add(bala);
  player.addImage(shooter_shooting);
  bala = bala-1;
}


else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(player)){
  
  for(var i=0;i<zombieGroup.length;i++){     
      
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
         } 
   }



}

if(zombieGroup.isTouching(balasGroup)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(balasGroup)){
       zombieGroup[i].destroy()
       } 
 }
}


enemy();

drawSprites();
}




function enemy(){
  if(frameCount%50===0){

    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(FantasminhaImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
