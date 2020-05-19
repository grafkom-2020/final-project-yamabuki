var ketinggian=0;
var died=0; //nyawa
var height  =-15;
var height2 = 35;
var height3 =-65;
var rMon = [];
var lMon = [];
var allMonster = [];
var fallen = [];
var STARTGAME = false;
var scene = new THREE.Scene();
var kanan,kiri;
function main(){
    // alert(65/10);
    var left = -window.innerWidth/250,right =window.innerWidth/250 ,
    top = window.innerHeight/250,bottom = -window.innerHeight/250; 

    var camera = new THREE.OrthographicCamera(left,right,top,bottom,0.1,1000);
    camera.position.z = 3;
    var clock = new THREE.Clock();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight,false);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize',function(){ // resize viewport
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width,height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    });

    function getTexture(path){
        return new THREE.TextureLoader().load(path);
    }

    var spriteMat = new THREE.SpriteMaterial({map:getTexture("box.png"), color:0xcdfcff});
    var backGround = new THREE.Sprite(spriteMat);
    backGround.position.set(0,0,0);
    backGround.scale.set(window.innerWidth,window.innerHeight,5);
    scene.add(backGround); //ADD BACKGROUND

    var spriteMat = new THREE.SpriteMaterial({map:getTexture("rkt.png")});
    var roket = new THREE.Sprite(spriteMat);
    roket.position.set(0,0,0);
    roket.scale.set(2.5,2.5,2.5);
    scene.add(roket); //ADD ROCKET

    var st = new THREE.SpriteMaterial({map:getTexture("title.png")});
    var title = new THREE.Sprite(st);
    title.scale.set(4,2,2);
    title.position.set(0,1,0);
    scene.add(title);

    var kalah = new THREE.SpriteMaterial({map:getTexture("gameover.png")});
    var lose = new THREE.Sprite(kalah);
    lose.scale.set(6,3,4);
    lose.position.set(0,0,0);
    // scene.add(title);

    var rMonsTexture = new THREE.ImageUtils.loadTexture( 'monsterAnim.png' );
	kanan = new TextureAnimator( rMonsTexture, 7, 1, 7, 100 ); // texture, #horiz, #vert, #total, duration.
    var rMonsMaterial = new THREE.SpriteMaterial( { map: rMonsTexture} );
    
    var lMonsTexture = new THREE.ImageUtils.loadTexture( 'monsterAnimL.png' );
	kiri = new TextureAnimator( lMonsTexture, 7, 1, 7, 100 ); // texture, #horiz, #vert, #total, duration.
    var lMonsMaterial = new THREE.SpriteMaterial( { map: lMonsTexture} );

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function momon(monster, text,arah,i) {
        this.monster = monster;
        this.text = text;
        this.arah = arah;
        //1 kanan, 2 kiri
        this.i = i
    }
    var grammar = ["baby", "basket", "black", "face", "final", "game", "go","hello","long","loud","now","salt","sugar","today","yellow"];
    function randomKataMonster()
    {
        var strKata, randint = getRandomInt(3);
        strKata = grammar[randint];
        console.log("random = " + grammar[randint]);
        return strKata;
    }
    
    function jatoh (){
        fallen.forEach(mon => {
            if(mon.position.y < -5){
                scene.remove(mon);
                fallen.pop(mon);
                allMonster.pop(mon);
            }
            // else if(mon.monster.position.x > 0.1){
            //     mon.monster.position.x -= speed * delta;
            // }
            else{
                mon.rotation=Math.PI/4;
                // mon.rotation.y+=Math.PI/4;
                mon.position.y-=0.1;
            }
        });
    }

    var monster = new THREE.Sprite(rMonsMaterial);
    monster.position.set(0,0,0);
    monster.scale.set(3,3,3);
    scene.add(monster);
    fallen.push(monster);

    var perut; var textperut;

    var spawnEnemy = function(posY,posX){
        if(posX<0){
            // var spriteMat = new THREE.SpriteMaterial({map:getTexture("mon.png")});
            var arah = 1;
            var monster = new THREE.Sprite(rMonsMaterial);
        }
        else{
            // var spriteMat = new THREE.SpriteMaterial({map:getTexture("monFlip.png")});
            var arah = 2;
            var monster = new THREE.Sprite(lMonsMaterial);
        }
        
        // var monster = new THREE.Sprite(spriteMap);
        monster.position.set(posX,posY,0);
        monster.scale.set(3,3,3);
        monster.needsUpdate = true;
        allMonster.push(new momon(monster, randomKataMonster(),arah,0));

        scene.add(monster);

        perut = new THREE.SpriteMaterial({map:getTexture("key/" + allMonster[0].text +".png")});
        textperut = new THREE.Sprite(perut);
        textperut.scale.set(0.2,0.2,0.2);
        textperut.position.set(posX,posY-0.3,1);
        scene.add(textperut);

    };

    var moveEnemy = function(delta, speed){ //foreach(item in array)
        allMonster.forEach(mon => {
            var yDistance = roket.position.y - mon.monster.position.y;
            if(yDistance > 0.1)
            {
                mon.monster.position.y += speed * delta;
                textperut.position.y += speed*delta;
            }
            else if(yDistance < 0.1)
            {
                mon.monster.position.y -= speed * delta;
                textperut.position.y -= speed*delta;
            }
            if(mon.monster.position.x < -0.1){
                mon.monster.position.x += speed * delta;
                textperut.position.x += speed*delta;
            }
            else if(mon.monster.position.x > 0.1){
                mon.monster.position.x -= speed * delta;
                textperut.position.x -= speed*delta;
            }
            else{
                textperut.position.x=10;
                died++; //nyawa
                scene.remove(mon.monster);
                allMonster.pop(mon.monster);
            }
        });
    };
    var roketBoost = [];
    var emission = 100;
    var boostColor = [0xFF0000,0xf86a1b,0xf70d1a,0xc92d06];
    for(i=0;i<emission;i++){
        var sb = new THREE.SpriteMaterial({map:getTexture("circle.png"), color: boostColor[getRandomInt(4)]});
        var spriteBoost = new THREE.Sprite(sb);
        var sz = getRandomInt(10)/30;
        spriteBoost.scale.set(sz,sz,0);
        spriteBoost.position.set(getRandomInt(10)/30 - 0.15,0,0);
        scene.add(spriteBoost);
        roketBoost.push(spriteBoost);
    }

    var randomFastParticlePosition = function(){
        pos = getRandomInt(right*2)-right;
        return pos;
    };

    var fastParticle = [];
    var fastEmission = 20;
    for(i=0;i<fastEmission;i++){
        var fp = new THREE.SpriteMaterial({map:getTexture("box.png")});
        var spriteFast = new THREE.Sprite(fp);
        spriteFast.scale.set(0.01,getRandomInt(10)/30+0.6,0);
        spriteFast.position.set(randomFastParticlePosition(),top,0);
        scene.add(spriteFast);
        fastParticle.push(spriteFast);
    }
    var inPlay = false;
    var rocketMove = function(t,delta){
        if(roket.position.y < Math.sin(t)/2 && !inPlay){
            roket.position.y+= 1 * delta;
        }
        else{
            inPlay = true;
            roket.position.y = Math.sin(t)/2 ;
        }
        roketBoost.forEach(r => {
            r.position.y -= getRandomInt(10)* delta;
            if(r.position.y<bottom){
                r.position.y = roket.position.y-1;
            }
        });
        
    };

    var rocketMoveBeforeStart = function(t,delta){
        roket.position.y = Math.sin(t)/2 - 1;
        roketBoost.forEach(r => {
            r.position.y -= getRandomInt(10)* delta;
            if(r.position.y<bottom){
                r.position.y = roket.position.y-1;
            }
        });
    };

    var fastEffectParticle = function(){
        fastParticle.forEach(f => {
            f.position.y -= getRandomInt(20)* delta;
            if(f.position.y<=bottom-1){
                f.position.x = randomFastParticlePosition();
                f.position.y = top+1;
            }
        });
    };

    var spriteMat2 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite2 = new THREE.Sprite(spriteMat2);
    var spriteMat3 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite3 = new THREE.Sprite(spriteMat3);
    var spriteMat4 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite4 = new THREE.Sprite(spriteMat4);

    var ruler = function(x,y,z){
        z.position.set(x,y,0);
        z.scale.set(1,5,1);
        scene.add(z);
    }

    var spriteLove1 = new THREE.SpriteMaterial({map:getTexture("love.png")});
    var love1 = new THREE.Sprite(spriteLove1);
    var spriteLove2 = new THREE.SpriteMaterial({map:getTexture("love.png")});
    var love2 = new THREE.Sprite(spriteLove2);
    var spriteLove3 = new THREE.SpriteMaterial({map:getTexture("love.png")});
    var love3 = new THREE.Sprite(spriteLove3);
    var gameover=false;
    var life = function(){
        if(died==0){
            love1.position.set(left+0.8,top-0.9,0);
            love1.scale.set(0.3,0.3,0);
            //scene.add(love1);
            love2.position.set(left+1.2,top-0.9,0);
            love2.scale.set(0.3,0.3,0);
            //scene.add(love2);
            love3.position.set(left+1.6,top-0.9,0);
            love3.scale.set(0.3,0.3,0);
            //scene.add(love3);
        }
        else if(died==1) scene.remove(love3);
        else if(died==2) scene.remove(love2);    
        else{
            scene.remove(love1);
            gameover=true;
            STARTGAME=false;
            scene.add(lose);
            console.log(gameover);
            console.log(STARTGAME);
            if(getHighscore() < ketinggian)
            {
                setHighscore(ketinggian);
            }
        }
    }

    var delta = 0;
    var timeToSpawn=5;
    var timetoheight=1;
    var timetoheight2=0.3;

    //fungsi update
    var update = function(){
        delta = clock.getDelta();
        // delta = 0.1;
        fastEffectParticle();
        
        if(!STARTGAME && !gameover){
            rocketMoveBeforeStart(clock.elapsedTime,delta);
        }
        else if (STARTGAME && !gameover){
            rocketMove(clock.elapsedTime, delta);
            kanan.update(1000 * delta);
            kiri.update(1000 * delta);
            timeToSpawn -= delta;
            if(timeToSpawn<0){
                var x,leftRight = getRandomInt(2);
                if(leftRight==0) x = -5;
                else x = 5; 
                spawnEnemy(getRandomInt(4)-2, x);
                timeToSpawn=10;
            }
            moveEnemy(delta, 0.5);
            timetoheight-=delta; //waktu kecepatan tinggi
            if(timetoheight<0){
                ketinggian+=10;
                timetoheight=0.5;
            }
            timetoheight2-=delta;
            if(timetoheight2<0){
                timetoheight2=0.05;
                // console.log(screen.width);
                // ruler(left+0.5,4.8-height%10,sprite2);
                // height+=0.1;
                // ruler2(left+0.5,4.8-height2%10,sprite3);
                // height2+=0.1;
                if (height  >= 85) height  = -65;
                if (height2 >= 85) height2 = -65;
                if (height3 >= 85) height3 = -65;
                
                ruler(left+0.5,-height/10 ,sprite2);
                ruler(left+0.5,-height2/10,sprite3);
                ruler(left+0.5,-height3/10,sprite4);

                height +=1;
                height2+=1;
                height3+=1;
            }
            jatoh();
        }  
        if (gameover){
            roket.position.y-=0.1;
            roketBoost.forEach(r => {
                r.position.y -= 0.1;
                // if(r.position.y<bottom){
                //     r.position.y = roket.position.y-1;
                // }
                
            });
            high();
        }
    };

    var text2 = document.createElement('div');
    var tinggi = function(){
        text2.style.position = 'absolute';
        text2.style.fontSize = 35;
        text2.style.fontWeight='bold';
        text2.innerHTML = ketinggian + ' m';
        text2.style.top = 45 + 'px';
        text2.style.left = 80 + 'px';
        document.body.appendChild(text2);
    }

    var text3 = document.createElement('div');
    var high = function(){
        text3.style.position = 'fixed';
        text3.style.fontSize = 35;
        text3.style.fontWeight='bold';
        text3.innerHTML = 'highscore = ' + getHighscore();
        text3.style.top = 45 + 'px';
        text3.style.right = 80 + 'px';
        text3.style.float = 'right';
        document.body.appendChild(text3);
    }
    high();

    var freeze = false;
    document.addEventListener('keydown', onKeydown, false);
    function onKeydown(event) {
        if(event.keyCode == 32 && !STARTGAME && !gameover){
            STARTGAME = true;
            document.body.removeChild(text3);
            scene.remove(title);
            scene.add(love1); scene.add(love2); scene.add(love3);
            return;
        }

        if(event.keyCode == 32 && !STARTGAME && gameover){
            console.log("masukgan");
            gameover = false;
            STARTGAME = false;
            died = 0;
            ketinggian = 0;
            scene.remove(lose);
            scene.add(title);

            // scene.add(love1); scene.add(love2); scene.add(love3);
            return;
        }
        // if (event.keyCode == 32) {
        //     if (freeze == true) freeze = false;
        //     else freeze = true;
        // }
    }
    
    //fungsi render
    var render = function(){
        renderer.render(scene,camera);
        tinggi();
        // high();
        if(!gameover)
            life();
    };

    var GameLoop = function(){
        requestAnimationFrame(GameLoop);
        if(!freeze){
            update();
            render();
        }  
    };
    function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}	
    GameLoop();

    function setHighscore(number) {
        localStorage.setItem('highscore', JSON.stringify(number));
    }
      
    function getHighscore() {
        var highscore = JSON.parse(localStorage.getItem('highscore'));
        if(highscore == null)
        {
            setHighscore(0);
            highscore = "0";
        }
            
        console.log(highscore);
        return highscore;
        // if(highscore > 120)
    }
}

main();

function speechCorrect(output) 
{
    console.log("dari mainjs = " + output );
    console.log("jumlah momon = " + allMonster.length);
    for (let i = 0; i < allMonster.length; i++) 
    {
        console.log(allMonster[i].text);
        if(allMonster[i].text == output)
        {
            // scene.remove(allMonster[i].monster);
            // allMonster.splice(i, 1);
            // break;
            fallen.push(allMonster[i].monster);
            break;
        }
    }
}