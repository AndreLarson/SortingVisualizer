const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
const c = canvas.getContext('2d');
const SIZE = 40;
const GAP_SIZE = 5;
const WIDTH = (canvas.width / SIZE) - GAP_SIZE;
const DELAY = 100;
const INNER_DELAY = DELAY / SIZE;
var recX = 0;
var shapes = new Array(SIZE);

function createArr(isReverse) {
  for (var i = 0; i < shapes.length; i++) {
    var temp = (isReverse ? 5 * ((shapes.length - i) + 2) : 5 * (i + 2));
    const HEIGHT = temp;
    var rectangle = {myX : recX, myY : canvas.height - HEIGHT, myWidth : WIDTH, myHeight : HEIGHT};
    shapes[i] = rectangle;
    recX += WIDTH + 5;
  }
  draw();
  buttonVisibility(1, 0, 0, 0);
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
    setTimeout(draw, INNER_DELAY, i, min);
    if (i < shapes.length - 1) {
      selectionSort(++i);
    } else {

    }
  }, DELAY)
}

function insertionSort(i) {
  setTimeout(function() {
    var temp = shapes[i].myHeight
    for (var j = i - 1; j >= 0 && temp < shapes[j].myHeight; j--) {
      draw(j, j + 1);
      swap(j, j + 1);
    }
    setTimeout(draw, INNER_DELAY, j, j + 1);
    if (i < shapes.length - 1) {
      insertionSort(++i);
    } else {

    }
  }, DELAY)
}

function bubbleSortOuter(n) {
  setTimeout(function() {
    bubbleSortInner(0, n);
    if (n > 0) {
      bubbleSortOuter(--n);
    } else {

    }
  }, DELAY)
}

function bubbleSortInner(i, j) {
  setTimeout(function() {
    if (shapes[i].myHeight > shapes[i + 1].myHeight) {
      setTimeout(draw, INNER_DELAY / 2, i, i + 1);
      swap(i, i + 1);
      setTimeout(draw, INNER_DELAY / 2, i, i + 1);
    }
    if (i + 1 < j) {
      bubbleSortInner(++i, j);
    } else {
    }
  }, INNER_DELAY)
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

function getSize() {
  return SIZE;
}

function reset() {
  for(var i = 0; i < shapes.length; i++) {
    shapes[i] = null;
  }
  recX = 0;
  c.clearRect(0, 0, canvas.width, canvas.height);
  buttonVisibility(0, 1, 1, 1);
}

function buttonVisibility(a, b, c, d) {
  var arr = ["block", "none"];
  document.getElementById('dropdownGen').style.display=arr[a];
  document.getElementById('reset').style.display=arr[b];
  document.getElementById('shuffle').style.display=arr[c];
  document.getElementById('algos').style.display=arr[d];
}
