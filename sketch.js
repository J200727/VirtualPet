var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var abtn,fbtn;
var time,alyssa;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkcarton=loadImage("Milk carton.png");
  dogbowl=loadImage("food bowl.png");
  foodbowl=loadImage("dog bowl.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
 
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  foodStock=database.ref('Food Count');
 abtn=createSprite(860,350,20,20);
 abtn.addImage(foodbowl)
 abtn.scale=0.3
  fbtn=createSprite(950,350,20,20);
  fbtn.addImage(dogbowl)
  fbtn.scale=0.3
  database.ref("Time").on("value",function(d){alyssa=d})
}

function draw() {
  background(46,139,87);
  drawSprites();
  fill(225,225,254);
  stroke("black");
  textSize(20);
  text("Food remaining:"+foodS,170,70);
  text("last fed time:"+alyssa,170,100)
  textSize(30);
  foodStock.on("value",readStock);
  text("LEO",780,100)

  
  displayFood()
  if(mousePressedOver(abtn)){
    
    foodS+=1
    database.ref("/").update({"Food Count":foodS})
    dog.addImage(sadDog)
  }
  if(mousePressedOver(fbtn)){
    time=new Date()
    alyssa=time.toLocaleDateString()+" "+time.toLocaleTimeString()
    database.ref("/").update({"Time":alyssa})
    foodS-=1
    database.ref("/").update({"Food Count":foodS})
    dog.addImage(happyDog)
  }
 
}
//function to read values form DB

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  //database.ref('/').update({
    
 // })
  
}
function displayFood(){
  var x=100,y=100;
for(var i=0;i<foodS;i++){
  if(i>0&&i%10==0){
    x=100
    y+=50
  }
  image(milkcarton,x,y,35,42)
  x+=30
}
}
