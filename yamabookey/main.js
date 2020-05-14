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

    var clock = new THREE.Clock();
    var delta = 0;
    var timeToSpawn=5;
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
    };

    //fungsi render
    var render = function(){
        renderer.render(scene,camera);
    };

    var GameLoop = function(){
        requestAnimationFrame(GameLoop);

        update();
        render();
    };

    GameLoop();
}

main();