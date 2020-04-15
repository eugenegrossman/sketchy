//select the container div
const container = document.querySelector('#container');

//make grid function & assign children 
function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
    //   cell.innerText = (c + 1);
      container.appendChild(cell).className = "grid-item";
    };
  };
  
  makeRows(16, 16);

//hover over cells and changes css
cells = document.getElementsByClassName('grid-item');

for(var i=0; i< cells.length; i++) {
    cells[i].addEventListener("mouseover", bind(i));
}

function bind(i) {
 return function() {
     cells[i].classList.toggle('hovering',true);
     console.log("you mousedover region number " + i);
 };
}