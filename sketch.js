
//Create variables here
var database;
var dog, dogNormal;
var happyDog, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;



function preload()
{
  //load images here\
  dogNormal = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png");


  feed = createButton("feed the dog");
  feed.position(600, 700);
  feed.mousePressed(dogFeed);

  addFood = createButton("Add food");
  addFood.position(800, 700);
  addFood.mousePressed(Foodadd)
}

function setup() {
  database = firebase.database();
	createCanvas(800, 800);
  
  dog = createSprite(400,400,5,5);
  dog.addImage(dogNormal);
  

 

foodObj = new Food();


}


function draw() {  
  console.log(foodObj.foodStock)
background(46,139,87);

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
 
})


  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(20);
  if(lastFed >= 12){
    text("Last Fed :" + lastFed%12 + "PM", 600,50);
  }else if(lastFed === 0){
    text("Last Fed : 12 AM", 600,50);
  }else{
    text("Last Fed :" + lastFed%12 + "AM", 600,50);
  }
  
text("Food: " +  foodObj.foodStock,500,50);
textSize(15)

}

/*function readStock(data){
 foodS = data.val();
 console.log(fedTime)
}*/

function Foodadd(){
  foodObj.foodStock++;
  database.ref('/').update({
    food: foodObj.foodStock
  })
  
}
function dogFeed(){
  hour();

  dog.addImage(dogHappy)
  foodObj.updateFoodStock(foodObj.getFoodStock());
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
  
  
}