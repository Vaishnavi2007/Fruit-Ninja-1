var PLAY=1;
var END=0;
var gameState=1;

var sword,swordImage;

var score;

var fruit1,fruit2,fruit3,fruit4;

var enemy, enemyImage;

var fruitGroup,enemyGroup,gameOver,gameOverImage;

var knife_sound;

var over_sound;


function preload(){
    swordImage= loadImage("sword.png");
  
    fruit1=loadImage("fruit1.png");
    fruit2=loadImage("fruit2.png");
    fruit3=loadImage("fruit3.png");
    fruit4=loadImage("fruit4.png");
  
    gameOverImage=loadImage("gameover.png");
  
    enemyImage=loadAnimation("alien1.png","alien2.png");
  
    knife_sound=loadSound("knifeSwooshSound.mp3");
  
    over_sound=loadSound("gameover.mp3");
  
}

function setup(){
createCanvas(400,400);
  
    
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;

  
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  
  score=0;
}


function draw(){
//background color
background("pink");  
  
  
   
  if(gameState===PLAY){
  fruits();
  enemy();
    
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+8;
      knife_sound.play();
    }
}
  

else if(gameState===END){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityEach(0);
      sword.addImage(gameOverImage);
      sword.scale=1.5;
      sword.x=200;
      sword.y=200;
}

  
  if(sword.isTouching(enemyGroup)){
    gameState=END;
    over_sound.play();
      
  } 
  
   
  drawSprites();

    
    fill("black");
    textSize(20);
    text("score: "+score,270,30);
}

function fruits(){
  
  if(frameCount%80===0){

    Fruit=createSprite(400,200,20,20);
    Fruit.scale=0.2;

    r=Math.round(random(1,4));

    if(r===1){

      Fruit.addImage(fruit1);

    }

    else if(r===2){

      Fruit.addImage(fruit2); 

    }

    else if(r===3){

      Fruit.addImage(fruit3); 

    }

    else{

      Fruit.addImage(fruit4); 

    }

    Fruit.y=Math.round(random(50,340));
    
    var rand=Math.round(random(1,2));
    if(rand===1){
      
      Fruit.x=400;
      Fruit.velocityX=-(7+4*score/4);
    
    }
    else{
     
      Fruit.x=0;
      Fruit.velocityX=(7+4*score/4);
      
    }
    Fruit.lifetime=60;
    fruitGroup.add(Fruit);    

  }
  
}


function enemy(){
if(frameCount % 200===0){
 var enemy=createSprite(400,200,20,20);
enemy.addAnimation("enemy",enemyImage);
enemy.y=Math.round(random(100,300));
enemy.velocityX=-(8+(score/10));
enemy.setLifetime=50;
  
  enemyGroup.add(enemy);
   
}

}