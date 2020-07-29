//Create variables here
var database;
var dog, dogNormal;
var happyDog, foodS, foodStock;

function preload()
{
  //load images here\
  dogNormal = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(800, 800);
  
  dog = createSprite(400,400,5,5);
  dog.addImage(dogNormal);
  

 foodStock = database.ref('food');
 foodStock.on("value", readStock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
}
  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(20);
text("Food: " + foodS,500,50);
textSize(15)
text("Press the up arrow to feed the dog! Wait for the dog to tell you the food stock before feeding!",10,20);
}

function readStock(data){
 foodS = data.val();
}
function writeStock(x){
if(x<=0){
  x = 0;
}else{
  x=x-1;
}

  database.ref('/').update({
food:x
  })
}
