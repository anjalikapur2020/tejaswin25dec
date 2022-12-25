var playbutton,waitimg
var gameState="wait"
var enemies,enemyGroup

function preload(){
waitimg=loadImage("ASSERTS/SCREEN1.gif")
waitimg2=loadImage("ASSERTS/SCREEN2.gif")
roadimages=loadImage("ASSERTS/ROADIMAGES.png")
enemyimages=loadImage("ASSERTS/TANKER/ENEMY.png")


gun1img=loadImage("ASSERTS/TANKER/TANKER-1.png")
gun2img=loadImage("ASSERTS/TANKER/TANKER-2.png")
gun3img=loadImage("ASSERTS/TANKER/TANKER-3.png")


gun1imgleft=loadImage("ASSERTS/TANKER/TANKER-1-left.png")
gun2imgleft=loadImage("ASSERTS/TANKER/TANKER-2-left.png")
gun3imgleft=loadImage("ASSERTS/TANKER/TANKER-3-left.png")


gun1imgup=loadImage("ASSERTS/TANKER/TANKER-1-up.png")
gun2imgup=loadImage("ASSERTS/TANKER/TANKER-2 - up.png")
gun3imgup=loadImage("ASSERTS/TANKER/TANKER-3 - up.png")


gun1imgdown=loadImage("ASSERTS/TANKER/TANKER-1-down.png")
gun2imgdown=loadImage("ASSERTS/TANKER/TANKER-2 -down.png")
gun3imgdown=loadImage("ASSERTS/TANKER/TANKER-3 -down.png")

playerbulletimg=loadImage("ASSERTS/TANKER/playerbullet.png")
enemybulletimg=loadImage("ASSERTS/TANKER/enemybullet.png")

}

function setup(){
    createCanvas(windowWidth, windowHeight)

road=createSprite(width/2,height/2,width,height)
road.addImage(roadimages)
road.visible=false
road.scale=1.5


playbutton=createImg("play.png")
playbutton.position(width/4,height/2)

gun1=createImg("ASSERTS/TANKER/TANKER-1.png")
gun2=createImg("ASSERTS/TANKER/TANKER-2.png")
gun3=createImg("ASSERTS/TANKER/TANKER-3.png")



gun1.position(width/3-200,height-300)
gun2.position(width/2-200,height-300)
gun3.position(width/3+300,height-300)


gun1.hide()
gun2.hide()
gun3.hide()


nextbutton=createImg("play.png")
nextbutton.position(width-200,height-200)
 nextbutton.hide()




player=createSprite(100,height-100)
player.visible=false

playerbullet=createSprite(player.x,player.y)
playerbullet.visible=false
playerbullet.scale=0.4


enemyGroup=new Group()
bulletGroup=new Group()


}

function draw(){
    if (gameState==="wait"){
background(waitimg)
}


if(playbutton.mousePressed(()=>{
    gameState="weaponselect"
}))


if (gameState==="weaponselect"){
    background(waitimg2)
    playbutton.hide()

gun1.show()
gun2.show()
gun3.show()
// gun4.show()







}
if (gun1.mousePressed(() => {
    gun1.position(width/2-250,height/4)
    gun1.size( 500,300)
    fill("red")
    gameState="gunselected"
    gun2.hide()
    gun3.hide()
    nextbutton.show()
    player.addImage("right",gun1img)
    player.addImage("left",gun1imgleft)
    player.addImage("up",gun1imgup)
    player.addImage("down",gun1imgdown)
     
}))






if (gun2.mousePressed(() => {
    gun2.position(width/2-250,height/4)
    gun2.size( 500,300)
    fill("red")
    gameState="gunselected"
    gun1.hide()
    gun3.hide()
    nextbutton.show()
    player.addImage("right",gun2img)
    player.addImage("left",gun2imgleft)
    player.addImage("up",gun2imgup)
    player.addImage("down",gun2imgdown)

}))

if (gun3.mousePressed(() => {
    gun3.position(width/2-250,height/4)
    gun3.size( 500,300)
    fill("red")
    gameState="gunselected"
    gun1.hide()
    gun2.hide()
    nextbutton.show()
    player.addImage("right",gun3img)
    player.addImage("left",gun3imgleft)
    player.addImage("up",gun3imgup)
    player.addImage("down",gun3imgdown)

}))

if (nextbutton.mousePressed(() => {
    gameState="play"
    gun1.hide()
    gun2.hide()
    gun3.hide()

    
}))




if(gameState==="play"){
    background(0)
     nextbutton.hide()
     player.visible=true
     road.visible=true
     road.velocityX=-4

     if(road.x<=width/2){
        road.x=road.width/1.5
     }

spawnenemies()
spawnplrBullet()

// tanker movement
// player.debug=true


if(player.x<=20){
    player.x=width-50
    player.changeImage("left")
}

if(player.x>width){
    player.x=50
    player.changeImage("right")

}

if(player.y>height-50){
    player.y=height-100
    player.changeImage("down")

}

if(player.y<50){
    player.y=80
    player.changeImage("up")

}


}




drawSprites()
if(gameState==="gunselected"){
    textSize(100)
    stroke("yellow")
    strokeWeight(2)
    text("WEAPON SELECTED",100,height/2+height/4)
    // nextbutton.hide()

}


if(gameState==="play"){
    textSize(40)
    fill("red")
    text("Press Space Bar and Direction Key to shoot Bullets",width/4,height/2)
}


}

function spawnenemies(){
    if(frameCount%90 === 0){
        enemyy=Math.round(random(100,height-100))
        enemies=createSprite(width,enemyy)
        enemies.velocityX =-6
        enemies.addImage(enemyimages)
        enemies.scale=0.4
        enemyGroup.add(enemies)
    }
}


if (enemyimages.isTouching(gun1)) {
    enemyimages.destroyEach();
  }


  function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        player.velocityX = 0
        player.velocityY = 3
        player.changeImage("down")


    }
    if (keyCode === UP_ARROW) {
        player.velocityX = 0
        player.velocityY = -3
        player.changeImage("up")


    }
    if (keyCode === RIGHT_ARROW) {
        player.velocityX = 3
        player .velocityY = 0
        player.changeImage("right")


    }
    if (keyCode === LEFT_ARROW) {
        player.velocityX = -3
        player.velocityY = 0
        player.changeImage("left")

    }
  
   

}
function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        player.velocityX = 0
        player.velocityY = 0

    }
    if (keyCode === UP_ARROW) {
        player.velocityX = 0
        player.velocityY =0

    }
    if (keyCode === RIGHT_ARROW) {
        player.velocityX =0
        player .velocityY = 0

    }
    if (keyCode === LEFT_ARROW) {
        player.velocityX = 0
        player.velocityY = 0

    }
  
}

function shootbullets(){
if(keyDown("space")){
    playerbullet.visible=true
   playerbullet.addImage(playerbulletimg)
   playerbullet.velocityX=5
   playerbullet.depth=player.depth-1
}

}


function spawnplrBullet(){

    var bullet =createSprite(player.position.x,player.position.y-17,10,1)
    bullet.addImage(playerbulletimg)
    bullet.scale=0.4
    bullet.depth=player.depth-1
    bullet.visible=false
    
       if(keyDown("space") && keyDown("RIGHT_ARROW") ){
        bullet.visible=true
        bullet.velocityX = 5
        player.x=player.x+0
        }
    
        if(keyDown("space") && keyDown("LEFT_ARROW") ){
            bullet.visible=true
            bullet.velocityX = -5
            }

            if(keyDown("space") && keyDown("UP_ARROW") ){
                bullet.visible=true
                bullet.velocityY = -5
                }
    
                if(keyDown("space") && keyDown("DOWN_ARROW") ){
                    bullet.visible=true
                    bullet.velocityY = 5
                    }
            
    
            bullet.lifetime = 200 ; 
            bulletGroup.add(bullet)
        
    }
    
