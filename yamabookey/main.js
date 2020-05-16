var ketinggian=0;
var height  =-15;
var height2 = 35;
var height3 =-65;
var grammar = ['fruit', 'hello', 'black'];
var rMon = [];
var lMon = [];
var allMonster = [];
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

    var spriteMat = new THREE.SpriteMaterial({map:getTexture("bg.png")});
    var backGround = new THREE.Sprite(spriteMat);
    backGround.position.set(0,0,0);
    backGround.scale.set(window.innerWidth,window.innerHeight,5);
    scene.add(backGround); //ADD BACKGROUND

    var spriteMat = new THREE.SpriteMaterial({map:getTexture("rkt.png")});
    var roket = new THREE.Sprite(spriteMat);
    roket.position.set(0,0,0);
    roket.scale.set(2.5,2.5,2.5);
    scene.add(roket); //ADD ROCKET
    
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m2.png")}));
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m1.png")}));
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m3.png")}));
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m4.png")}));
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m5.png")}));
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m6.png")}));
    rMon.push(new THREE.SpriteMaterial({map:getTexture("Kanan/m7.png")}));

    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m1.png")}));
    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m2.png")}));
    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m3.png")}));
    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m4.png")}));
    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m5.png")}));
    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m6.png")}));
    lMon.push(new THREE.SpriteMaterial({map:getTexture("Kiri/m7.png")}));

    var rMonsTexture = new THREE.ImageUtils.loadTexture( 'monsterAnim.png' );
	kanan = new TextureAnimator( rMonsTexture, 7, 1, 7, 100 ); // texture, #horiz, #vert, #total, duration.
    var rMonsMaterial = new THREE.SpriteMaterial( { map: rMonsTexture } );
    
    var lMonsTexture = new THREE.ImageUtils.loadTexture( 'monsterAnimL.png' );
	kiri = new TextureAnimator( lMonsTexture, 7, 1, 7, 100 ); // texture, #horiz, #vert, #total, duration.
    var lMonsMaterial = new THREE.SpriteMaterial( { map: lMonsTexture } );

	// var runner = new THREE.Sprite(rMonsMaterial);
    // runner.position.set(0,0,0);
    // runner.scale.set(3,3,3);
    // scene.add(runner);

    // var tes = new THREE.Sprite(lMonsMaterial);
    // tes.position.set(2,2,2);
    // tes.scale.set(3,3,3);
    // scene.add(tes);
    
    // function animateMonster()
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
        allMonster.push(new momon(monster, "hello",arah,0));
        scene.add(monster);
    };

    var moveEnemy = function(delta, speed){ //foreach(item in array)
        allMonster.forEach(mon => {
            if(mon.monster.position.x < -0.1){
                mon.monster.position.x += speed * delta;
            }
            else if(mon.monster.position.x > 0.1){
                mon.monster.position.x -= speed * delta;
            }
            else{
                
                scene.remove(mon.monster);
                allMonster.pop(mon.monster);
            }
        });
    };
    
    var spriteMat2 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite2 = new THREE.Sprite(spriteMat2);
    var spriteMat3 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite3 = new THREE.Sprite(spriteMat3);
    var spriteMat4 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite4 = new THREE.Sprite(spriteMat4);

    // var ruler = function(x,y){
    //     sprite2.position.set(x,y,0);
    //     sprite2.scale.set(1,5,1);
    //     scene.add(sprite2);
    // };
    // var ruler2 = function(x,y){
    //     sprite3.position.set(x,y,0);
    //     sprite3.scale.set(1,5,1);
    //     scene.add(sprite3);
    // };
    
    var ruler = function(x,y,z){
        z.position.set(x,y,0);
        z.scale.set(1,5,1);
        scene.add(z);
    }
    var delta = 0;
    var timeToSpawn=5;
    var timetoheight=1;
    var timetoheight2=0.3;

    //fungsi update
    var update = function(){
        delta = clock.getDelta();
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

    var freeze = false;
    document.addEventListener('keydown', onKeydown, false);
    function onKeydown(event) {
        if (event.keyCode == 32) {
            if (freeze == true) freeze = false;
            else freeze = true;
        }
    }

    //fungsi render
    var render = function(){
        renderer.render(scene,camera);
        tinggi();
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
}

main();

function speechCorrect(output) 
{
    console.log("dari mainjs = " + output );
    console.log(allMonster.length);
    for (let i = 0; i < allMonster.length; i++) 
    {
        console.log(allMonster[i].text);
        if(allMonster[i].text == output)
        {
            scene.remove(allMonster[i].monster);
            allMonster.splice(i, 1);
            break;
        }
    }
}