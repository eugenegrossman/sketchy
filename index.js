
const container = document.querySelector('.container'); //select the parent element of game
const parentBlock = document.createElement('div'); // Section to hold multiple divs
let defaultGridSize = 24; // Default grid size 
const gameButtons = document.querySelector('.game-buttons'); // Game buttons
let isRandomOn = false; 

function createParentBlock(size){
    parentBlock.setAttribute('class', 'parent-block');
    parentBlock.style.display = 'grid';

    parentBlock.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    parentBlock.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    //appends parent block to container
    container.appendChild(parentBlock);
};

function createChildrenBlock(size){
    //size of square eg. size = 16 is 16x16 = 254 child block created inside parent block
    for (i=0; i<size*size; i++){
        const childBlock = document.createElement('div');
        childBlock.setAttribute('class', 'child-block');
        childBlock.setAttribute('hovering', 'false');
        childBlock.style.filter = "brightness(100%)";

        //apends child block to parent block
        parentBlock.appendChild(childBlock);
    }
    setColorOnHover();
}

//random color functions : from https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
  }

//hovering with color functionality 
function setColorOnHover(){
    const childBlockArray = document.querySelectorAll('.child-block');

    childBlockArray.forEach((e) => {
        e.addEventListener('mouseover', () => {
            console.log(isRandomOn == true && e.getAttribute('hovering') == "false");
            if (isRandomOn == false){
                e.style.background = 'black';
            }else if (isRandomOn == true && e.getAttribute('hovering') == "false"){
                let randomColor = getRandomColor(); 
                e.style.backgroundColor = randomColor;
                e.setAttribute('hovering', 'true');
            } else {
                let brightness = parseInt(e.style.filter.match(/\d+/));
                e.style.filter = `brightness(${brightness - 10}%)`
            }
        });
    })
}

function resetGame() {
    while (parentBlock.hasChildNodes()) {
        parentBlock.removeChild(parentBlock.firstChild);
    }
}

function getInput() {
    do {
        defaultGridSize = parseInt(prompt("How many squares per side for the new grid?(eg. 10, please only numbers!"), 10);
    } while (isNaN(parseInt(defaultGridSize, 10)))
}

gameButtons.addEventListener('click', (e) => {
    resetGame();
    switch (e.target.className) {
        case "create-button":
            getInput();
            createParentBlock(defaultGridSize);
            break;
        case "colorize-button":
            isRandomOn = true;
            break;
        case 'clear-button':
            isRandomOn = false;
            break;
        default:
            console.log("input incorrect");
    }
    createChildrenBlock(defaultGridSize);
});

function gameInit() {
    createParentBlock(defaultGridSize);
    createChildrenBlock(defaultGridSize);

}
gameInit();
