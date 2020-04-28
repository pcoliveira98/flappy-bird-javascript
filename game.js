console.log('Hello World');

const sprites = new Image();
sprites.src = './sprites.png';

// const hit = new Audio();
// hit.src = 'efects/hit.wav';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const floor = {
    spriteX: 292,
    spriteY: 0,
    width: 224,
    height: 112,
    positionX: 0,
    positionY: canvas.height - 112,
    draw() {
        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY, //Sprite x e Sprite y
            168, 55, //Tamanho do recorte na Sprite
            floor.positionX, floor.positionY,
            floor.width, floor.height
        );

        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY, //Sprite x e Sprite y
            168, 55, //Tamanho do recorte na Sprite
            (floor.positionX + floor.width), floor.positionY,
            floor.width, floor.height
        );
    }
}

const background = {
    spriteX: 0,
    spriteY: 0,
    // width: 275,
    // height: 204,
    width: canvas.width,
    height: canvas.height - floor.height,
    positionX: 0,
    positionY: 0,
    draw() {
        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY, //Sprite x e Sprite y
            144, 256, //Tamanho do recorte na Sprite
            background.positionX, background.positionY,
            background.width, background.height
        );

        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY, //Sprite x e Sprite y
            144, 256, //Tamanho do recorte na Sprite
            (background.positionX + background.width), background.positionY,
            background.width, background.height
        );
    }
}

function hasImpact(flappyBird, floor) {
    const flappyHeight = flappyBird.positionY + flappyBird.height;

    if (flappyHeight >= floor.positionY) {
        return true;
    }

    return false;
}

function createFlappyBird() {
    const flappyBird = {
        spriteX: 3,
        spriteY: 490,
        width: 33,
        height: 24,
        positionX: 10,
        positionY: 50,
        gravity: 0.25,
        speed: 0,
        jump: 4.6,
        fly() {
            flappyBird.speed = - flappyBird.jump;
        },
        update() {
            if (hasImpact(flappyBird, floor)) {
                // hit.play();
                setTimeout(() => {
                    changeScreen(screens.begin);
                }, 500)
                return;
            }
            flappyBird.speed = flappyBird.speed + flappyBird.gravity;
            flappyBird.positionY = flappyBird.positionY + flappyBird.speed;
        },
        draw() {
            ctx.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, //Sprite x e Sprite y
                17, 12, //Tamanho do recorte na Sprite
                flappyBird.positionX, flappyBird.positionY,
                flappyBird.width, flappyBird.height
            );
        }
    }

    return flappyBird;
}

const getReady = {
    spriteX: 295,
    spriteY: 59,
    width: 174,
    height: 152,
    positionX: (canvas.width / 2) - 174 / 2,
    positionY: 50,
    // tap: {
    //     spriteX: 292,
    //     spriteY: 91,
    //     width: 92,
    //     height: 19,
    //     positionX: 0,
    //     positionY: 0,
    // },
    draw() {
        ctx.drawImage(
            sprites,
            getReady.spriteX, getReady.spriteY, //Sprite x e Sprite y
            92, 25, //Tamanho do recorte na Sprite
            getReady.positionX, getReady.positionY,
            getReady.width, getReady.height
        );
    }
}

// const tap = {
//     spriteX: 292,
//     spriteY: 91,
//     width: 174,
//     height: 152,
//     positionX: (canvas.width / 2) - 110 / 2,
//     positionY: 50,
//     draw() {
//         ctx.drawImage(
//             sprites,
//             tap.spriteX, tap.spriteY, //Sprite x e Sprite y
//             92, 25, //Tamanho do recorte na Sprite
//             tap.positionX, tap.positionY,
//             tap.width, tap.height
//         );
//     }
// },


/*
TELAS
*/

const global = {};
let activeScreen = {};

function changeScreen(newScreen) {
    activeScreen = newScreen;

    if (activeScreen.init()) {
        init();
    }
}

const screens = {
    begin: {
        init() {
            global.flappyBird = createFlappyBird();
        },
        update() {
            floor.draw();
            background.draw();
            global.flappyBird.draw();
            getReady.draw();
        },
        click() {
            changeScreen(screens.game);
        },
        draw() {

        }
    }
};


screens.game = {
    draw() {
        floor.draw();
        background.draw();
        global.flappyBird.draw();
    },
    click() {
        global.flappyBird.fly();
    },
    update() {
        global.flappyBird.update();
    }
}

function loop() {
    activeScreen.draw();
    activeScreen.update();
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (activeScreen.click) {
        activeScreen.click();
    }
})

changeScreen(screens.begin);

loop();