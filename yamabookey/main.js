var ketinggian=0;
var height=4.8;
var height2=-0.2;
function main(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var spriteMap = new THREE.TextureLoader().load("bg.png");
    var spriteMat = new THREE.SpriteMaterial({map:spriteMap});
    var sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(0,0,0);
    sprite.scale.set(window.innerWidth,window.innerHeight,5);
    scene.add(sprite);

    var spriteMap = new THREE.TextureLoader().load("rkt.png");
    var spriteMat = new THREE.SpriteMaterial({map:spriteMap});
    var sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(0,0,0);
    sprite.scale.set(2.5,2.5,2.5);
    scene.add(sprite); 

    camera.position.z = 3;
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    var spawnEnemy = function(posY,posX){
        var spriteMap1 = new THREE.TextureLoader().load("mon.png");
        var spriteMat1 = new THREE.SpriteMaterial({map:spriteMap1});
        var sprite1 = new THREE.Sprite(spriteMat1);
        sprite1.position.set(posX,posY,0);
        sprite1.scale.set(5,5,5);
        scene.add(sprite1);
    };
    
    var spriteMap2 = new THREE.TextureLoader().load("Asset.png");
    var spriteMat2 = new THREE.SpriteMaterial({map:spriteMap2});
    var sprite2 = new THREE.Sprite(spriteMat2);
    var ruler = function(x,y){
        sprite2.position.set(x,y,0);
        sprite2.scale.set(1,5,1);
        scene.add(sprite2);
    };
    var spriteMap3 = new THREE.TextureLoader().load("Asset.png");
    var spriteMat3 = new THREE.SpriteMaterial({map:spriteMap2});
    var sprite3 = new THREE.Sprite(spriteMat3);
    var ruler2 = function(x,y){
        sprite3.position.set(x,y,0);
        sprite3.scale.set(1,5,1);
        scene.add(sprite3);
    };
    var clock = new THREE.Clock();
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
            if(leftRight==0) x = -3;
            else x = 3; 
            spawnEnemy(getRandomInt(4)-2, x);
            timeToSpawn=10;
        }
        timetoheight-=delta; //waktu kecepatan tinggi
        if(timetoheight<0){
            ketinggian+=10;
            timetoheight=0.5;
        }
        timetoheight2-=delta;
        if(timetoheight2<0){
            timetoheight2=0.05;
            ruler(-3.4,4.8-height%10);
            height+=0.1;
            ruler2(-3.4,4.8-height2%10);
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