var ketinggian=0;
var height=4.8;
var height2=-0.2;
var grammar = ['fruit', 'hello', 'black'];
var allMonster = [];
var scene = new THREE.Scene();

function main(){
    
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
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    function momon(monster, text) {
        this.monster = monster;
        this.text = text;
    }

    var spawnEnemy = function(posY,posX){
        if(posX<0){
            var spriteMat = new THREE.SpriteMaterial({map:getTexture("mon.png")});
        }
        else{
            var spriteMat = new THREE.SpriteMaterial({map:getTexture("monFlip.png")});
        }
        var monster = new THREE.Sprite(spriteMat);
        monster.position.set(posX,posY,0);
        monster.scale.set(3,3,3);
        allMonster.push(new momon(monster, "hello"));
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
            }
        });
    };
    
    var spriteMat2 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite2 = new THREE.Sprite(spriteMat2);
    var ruler = function(x,y){
        sprite2.position.set(x,y,0);
        sprite2.scale.set(1,5,1);
        scene.add(sprite2);
    };
    var spriteMat3 = new THREE.SpriteMaterial({map:getTexture("Asset.png")});
    var sprite3 = new THREE.Sprite(spriteMat3);
    var ruler2 = function(x,y){
        sprite3.position.set(x,y,0);
        sprite3.scale.set(1,5,1);
        scene.add(sprite3);
    };
    
    var delta = 0;
    var timeToSpawn=5;
    var timetoheight=1;
    var timetoheight2=0.3;

    //fungsi update
    var update = function(){
        delta = clock.getDelta();
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
            console.log(screen.width);
            ruler(left+0.5,4.8-height%10);
            height+=0.1;
            ruler2(left+0.5,4.8-height2%10);
            height2+=0.1;
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

    //fungsi render
    var render = function(){
        renderer.render(scene,camera);
        tinggi();
    };

    var GameLoop = function(){
        requestAnimationFrame(GameLoop);

        update();
        render();
    };
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