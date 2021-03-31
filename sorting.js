const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
const SIZE = 40;
const GAP_SIZE = 5;
const WIDTH = (canvas.width / SIZE) - GAP_SIZE;
var recX = 0;
var shapes = new Array(SIZE);

function createArr() {
  for (var i = 0; i < shapes.length; i++) {
    const HEIGHT = 5 * (i + 2);
    var rectangle = {myX : recX, myY : canvas.height - HEIGHT, myWidth : WIDTH, myHeight : HEIGHT};
    shapes[i] = rectangle;
    recX += WIDTH + 5;
  }
  draw();
  document.getElementById('reset').style.display="block";
  document.getElementById('dropdownGen').style.display="none";
  document.getElementById('shuffle').style.display="none";
}

function shuffle(i) {
  setTimeout(function() {
    swap(i, Math.floor(Math.random() * shapes.length));
    draw();
    if (i < shapes.length - 1) {
      shuffle(++i);
    }
  }, 10)
}

function reverse() {
  for (var i = 0; i < shapes.length; i++) {
    const HEIGHT = 5 * ((shapes.length - i) + 2);
    var rectangle = {myX : recX, myY : canvas.height - HEIGHT, myWidth : WIDTH, myHeight : HEIGHT};
    shapes[i] = rectangle;
    recX += WIDTH + 5;
  }
  draw();
  document.getElementById('reset').style.display="block";
  document.getElementById('dropdownGen').style.display="none";
  document.getElementById('shuffle').style.display="none";
}

function selectionSort(i) {
  setTimeout(function() {
    var min = i;
    for (var j = i + 1; j < shapes.length; j++) {
      if (shapes[j].myHeight < shapes[min].myHeight) {
        min = j;
      }
    }
    draw(i, min);
    swap(i, min);
    setTimeout(draw, 700, i, min);
    if (i < shapes.length - 1) {
      selectionSort(++i);
    } else {

    }
  }, 100)
}

function insertionSort(i) {
  setTimeout(function() {
    var temp = shapes[i].myHeight
    for (var j = i - 1; j >= 0 && temp < shapes[j].myHeight; j--) {
      draw(j, j + 1);
      swap(j, j + 1);
    }
    setTimeout(draw, 700, j, j + 1);
    if (i < shapes.length - 1) {
      insertionSort(++i);
    } else {

    }
  }, 100)
}

function bubbleSort(i) {
  setTimeout(function() {
    var swap = true;
    for (var j = 0; j < i; j++) {
      if (shapes[j].myHeight > shapes[j + 1].myHeight) {
        swap(j, j + 1);
        swap = true;
      }
    }
    setTimeout(draw, 700, i, min);
    if (i > 0 && swap) {
      selectionSort(++i);
    } else {

    }
  }, 100)
}

function swap(j, k) {
  var temp = shapes[j].myX;
  shapes[j].myX = shapes[k].myX;
  shapes[k].myX = temp;
  temp = shapes[j];
  shapes[j] = shapes[k];
  shapes[k] = temp;
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var l = 0; l < shapes.length; l++) {
    c.fillStyle= "#bb86fc";
    drawRectangle(shapes[l]);
  }
}

function draw(i, j) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let l = 0; l < shapes.length; l++) {
    if (l == i || l == j) {
      c.fillStyle= "#1dddc9";
      drawRectangle(shapes[l]);
    } else {
      c.fillStyle= "#eec194";
      drawRectangle(shapes[l]);
    }
  }
}

function drawRectangle(rectangle) {
  c.fillRect(rectangle.myX, rectangle.myY, rectangle.myWidth, rectangle.myHeight);
}

function reset() {
  for(var i = 0; i < shapes.length; i++) {
    shapes[i] = null;
  }
  recX = 0;
  c.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('dropdownGen').style.display="block";
  document.getElementById('reset').style.display="none";
  document.getElementById('shuffle').style.display="block";
}
