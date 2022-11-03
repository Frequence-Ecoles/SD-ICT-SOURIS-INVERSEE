var cursor = document.getElementById('cursor');
var cursorX,
  cursorY;

var time = 15000;
var addTime = 2500;
let objectsArray = [];

let asteroidX = 40;
let asteroidY = 80;

let earthX = document.body.clientWidth * 0.50;
let earthY = document.body.clientHeight * 0.90;
let earthRayon = 125;

let asteroidVelocity = 1;
let defeat = false;
let victory = false;

let asteroidsDestroyedDisplay = document.getElementById('destroyedAsteroids');

const mainContainer = document.getElementById('mainContainer');

// inverted cursor move

// console.log(document.clientWidth);
document.addEventListener("mousemove", function(e) {

  cursorX = document.body.clientWidth - e.pageX;
  // cursorY = document.body.clientHeight - e.pageY;
  cursorY = e.pageY;

  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  // console.log(cursorX, cursorY);
})

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const playableArea = document.getElementById('playable-area');

let objectsCount = 0;
let reqAnim;

// set up the detection of distance between two elements

function getPositionAtCenter(element) {
  const {top, left, width, height} = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

// define the asteroids objects

class Object {

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.backgroundColor = "green";
    this.alreadyClicked = false;

    var object = document.createElement('div');
    object.classList.add('pointThis');
    object.id = "asteroid" + this.id;

    object.style.left = this.x + "px";
    object.style.top = this.y + "px";

    playableArea.appendChild(object);
    this.object = object;

  }

  detectClick() {

    if (!this.alreadyClicked) {
      let asteroidToDelete = document.getElementById('asteroid' + this.id);
      this.backgroundColor = "blue";
      asteroidToDelete.classList.add('displayNone');
      this.alreadyClicked = true;
      winCount++;

    }

  }

  update() {
    // definition of direction, by calculating the vector
    let vectorX = earthX - this.x;
    let vectorY = earthY - this.y;

    let vectorCoeff = vectorX / vectorY;
    // calculating angle of the vector
    var angle = Math.atan2(vectorX, vectorY);
    var degrees = 180 * angle / Math.PI;
    let finalAngle = (360 + Math.round(degrees)) % 360;
    // console.log(360 - finalAngle);

    let asteroid = document.getElementById('asteroid' + this.id);
    this.x += 1 * vectorCoeff * asteroidVelocity;
    this.y += 1 * asteroidVelocity;
    asteroid.style.left = this.x + "px";
    asteroid.style.top = this.y + "px";
    asteroid.style.transform = 'rotate(calc(360deg - ' + finalAngle + 'deg))';

    let distance = getDistanceBetweenElements(asteroid, document.getElementById('earth'));
    if (distance < 150) {
      userDefeat()
    }

  }

}

function animate() {
  // console.log('executed once');
  for (var i = 0; i < objectsArray.length; i++) {
    objectsArray[i].update();
  }
  if (defeat) {
    cancelAnimationFrame(reqAnim);
  } else {
    reqAnim = requestAnimationFrame(animate)
  }

}

//  creation des objets
let objectsSpawnSpeed = 3000;
//

const generateObjects = () => {

  if (objectsCount < 30) {
    objectsArray.push(new Object(getRandomInt(-250, document.body.clientWidth + 250), -100, objectsCount));
    objectsCount++;
  }

  if (objectsSpawnSpeed > 500) {
    objectsSpawnSpeed -= 75;
  }

  console.log(objectsSpawnSpeed + "||" + objectsCount);
}

// settimeout acceleration
function startGeneratingObjects() {
  if (defeat == false) {

    setTimeout(function() {
      // objectsSpawnSpeed -= 100;
      generateObjects();
      startGeneratingObjects();
      asteroidVelocity+=0.01;
    }, objectsSpawnSpeed);
  }

}

startGeneratingObjects();

reqAnim = requestAnimationFrame(animate)

// click trigger

var winCount = 0;

document.addEventListener('click', function() {
  // generation of the explosion
  let explosion = document.createElement('div');
  explosion.classList.add('explosion');
  explosion.style.left = cursorX - 25 + "px";
  explosion.style.top = cursorY - 25 + "px";
  mainContainer.appendChild(explosion);
  window.setTimeout(function() {
    explosion.remove();
  }, 560);

  // detection of matched asteroids
  for (var i = 0; i < objectsArray.length; i++) {
    if (asteroidX > objectsArray[i].x - cursorX && objectsArray[i].x - cursorX > -asteroidX && asteroidY > objectsArray[i].y - cursorY && objectsArray[i].y - cursorY > -asteroidY) {

      // console.log(objectsArray[i].x - cursorX)
      // objectsArray[i].object.style.backgroundColor = "blue";
      objectsArray[i].detectClick();
      time += addTime;

      // maj display count of destroyed asteroids
      asteroidsDestroyedDisplay.firstElementChild.innerHTML = winCount;

      //
      if (winCount == 30) {
        userVictory()
      }

    }
  }
})

// timer

const timer = document.getElementById('timer');

// END TAB display

const endTab = document.getElementById('end-tab');
const victoryEndText = document.getElementById('victory-end-text');
const defeatEndText = document.getElementById('defeat-end-text');

// DEFEAT
const userDefeat = () => {

  let earth = document.getElementById('earth');
  earth.style.background = ' url("../assets/destroyed-earth.png") no-repeat center center / cover';

  cancelAnimationFrame(reqAnim);
  defeat = true;
  endTab.classList.remove('displayNone')
  defeatEndText.classList.remove('displayNone')

}

// VICTORY
const userVictory = () => {
  cancelAnimationFrame(reqAnim);
  victory = true;
  endTab.classList.remove('displayNone')
  victoryEndText.classList.remove('displayNone')
}
