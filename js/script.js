var cursor = document.getElementById('cursor');
var cursorX, cursorY;

var time = 15000;
var addTime = 2500;
let objectsArray = [];

let asteroidX = 40;
let asteroidY = 80;

const mainContainer = document.getElementById('mainContainer');


// inverted cursor move

console.log(document.clientWidth);
document.addEventListener("mousemove", function(e) {

  cursorX = document.body.clientWidth - e.pageX;
  // cursorY = document.body.clientHeight - e.pageY;
  cursorY = e.pageY;


  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  // console.log(cursorX, cursorY);
})

const getRandomInt = (min, max) =>  {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

const playableArea = document.getElementById('playable-area');
//
// setInterval(function() {
//  let goPointThis = document.createElement('div');
//  goPointThis.classList.add('pointThis');
//  playableArea.appendChild(goPointThis);
//  goPointThis.addEventListener("click", function() {
//    this.style.backgroundColor = "blue";
//  })
// }, 1000);

let objectsCount = 0;
let reqAnim;


class Object {

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.backgroundColor = "green";

    var object = document.createElement('div');
    object.classList.add('pointThis');
    object.id = "asteroid" + this.id;

    object.style.left = this.x + "px";
    object.style.top = this.y + "px";


    playableArea.appendChild(object);
    this.object = object;

  }

  detectClick(){
    // if ( 25 > this.x - cursorX > -25 && 25 > this.y - cursorY > -25 ) {
      let asteroidToDelete = document.getElementById('asteroid' + this.id);
      this.backgroundColor = "blue";
      asteroidToDelete.remove();
    // }
  }

  update(){
    let asteroid = document.getElementById('asteroid' + this.id);
    // this.x+=0.1;
    this.y+=0.5;
    asteroid.style.left = this.x + "px";
    asteroid.style.top = this.y + "px";
    console.log(this.x);

    if (asteroidX > this.x - cursorX && this.x - cursorX > -asteroidX
    && asteroidY > this.y - cursorY && this.y - cursorY > -asteroidY) {
      asteroid.classList.add('targeted');
    } else {
      asteroid.classList.remove('targeted');

    }

  }

}

function  animate(){
  console.log('executed once');
  for (var i = 0; i < objectsArray.length; i++) {
    objectsArray[i].update();
  }
  reqAnim = requestAnimationFrame(animate)

}


// creation des objets

let createObjects = setInterval(function () {

  objectsArray.push(new Object(getRandomInt(0, document.body.clientWidth - 70), getRandomInt(100, document.body.clientHeight/3), objectsCount));

  objectsCount++;
}, 3000);

reqAnim = requestAnimationFrame(animate)


// click trigger

var winCount = 0;

document.addEventListener('click', function(){
  // generation of the explosion
  let explosion = document.createElement('div');
  explosion. classList.add('explosion');
  explosion.style.left = cursorX - 25 + "px";
  explosion.style.top = cursorY - 25 + "px";
  mainContainer.appendChild(explosion);
  window.setTimeout(function(){
    explosion.remove();
  }, 560);

  // detection of matched asteroids
  for (var i = 0; i < objectsArray.length; i++) {
    if (asteroidX > objectsArray[i].x - cursorX && objectsArray[i].x - cursorX > -asteroidX
    && asteroidY > objectsArray[i].y - cursorY && objectsArray[i].y - cursorY > -asteroidY) {

      console.log(objectsArray[i].x - cursorX)
      objectsArray[i].object.style.backgroundColor = "blue";
      time += addTime;
      winCount++;

      if (winCount == 10) {
        // stop animation, timer and object creation
        cancelAnimationFrame(reqAnim);
        clearInterval(timerCounting);
        clearInterval(createObjects);

        var tasgagne = document.createElement('h1')
        tasgagne.innerHTML = "C'EST GAGNÉ !";
        tasgagne.classList.add('tasgagne');
        mainContainer.appendChild(tasgagne);
      }

    }
  }
})

// timer

const timer = document.getElementById('timer');


var timerCounting = setInterval(function () {
    time -= 100;

    timer.innerHTML = "Temps restant : " + time/1000 + "s";

    if (time <=  0) {
      // stop animation, timer and object creation

      cancelAnimationFrame(reqAnim);
      console.log
      clearInterval(timerCounting);
      clearInterval(createObjects);
      var tasperdu = document.createElement('h1')
      tasperdu.innerHTML = "PERDU !";
      tasperdu.classList.add('tasperdu');
      mainContainer.appendChild(tasperdu);
    }

}, 100);


console.log(objectsArray);
