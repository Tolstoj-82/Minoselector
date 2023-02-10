const piecesGrid = document.querySelector("#piecesGrid");
const pieceTypes = ["L", "J", "I", "O", "Z", "S", "T"];
var currentIndex = 1;
const imgPath = "images/tetrominos/";
var warningShown = false;

// mapping for the pieces and orientations 
const orientations = ["", "E", "S", "W"];
let mapping = {};
for (let i = 0; i < pieceTypes.length; i++) {
    for (let j = 0; j < orientations.length; j++) {
      let type = pieceTypes[i];
      let orientation = orientations[j];
      let decimalValue = (i * orientations.length) + j;
      let hexValue = decimalValue.toString(16).padStart(2, '0').toUpperCase();
      mapping[`${type}${orientation}`] = `${hexValue}`;
    }
  }

// load in the piece sequence from the textarea
function loadInPieceSequence(pieces){

    const splitPieces = pieces.match(/.{1,2}/g);
    const decodedPieces = [];
        
    for (let i = 0; i < splitPieces.length; i++) {
      const value = splitPieces[i];
      let decimalValue = parseInt(value, 16);
      let pieceIndex = Math.floor(decimalValue / orientations.length);
      let orientationIndex = decimalValue % orientations.length;
      let pieceType = pieceTypes[pieceIndex];
      let orientation = orientations[orientationIndex];
      decodedPieces.push(pieceType + orientation);
    }

    const table = document.getElementById("piecesGrid");
    
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    currentIndex = 0;

    for (let i = 0; i < decodedPieces.length; i++) {
        addRowToTable(i+1, true, decodedPieces[i]);
    }

    // make sure the system knows where it is
    currentIndex = decodedPieces.length+1;
    addRowToTable(currentIndex, true, "");
    renumberRows();
}

// rotate the piece by 90° CW
function rotate(id) {
    let image = document.getElementById(id);
    let imageName = image.src.split("/").pop().split(".")[0];
    
    let newImageName = "";
    if (imageName.startsWith("I") || imageName.startsWith("S") || imageName.startsWith("Z")) {
        newImageName = (imageName.length === 1) ? imageName + "E" : imageName.slice(0, -1);
    } else if (imageName.startsWith("O")) {
        return;
    } else {
        if (imageName.length === 1) {
            newImageName = imageName + "E";
        } else {
            let lastLetter = imageName[imageName.length - 1];
            let index = orientations.indexOf(lastLetter);
            if (index === orientations.length - 1) {
                newImageName = imageName.slice(0, -1);
            } else {
                newImageName = imageName.slice(0, -1) + orientations[index + 1];
            }
        }
    }
    
    image.src = imgPath + newImageName + ".png";
    getCurrentConfiguration();
}

// letter to image tag, or vice versa
function swapLetterAndImage(value) {
    if (value.includes("<img")) {
      let startIndex = value.indexOf('src="') + 5 + imgPath.length;
      let endIndex = value.indexOf('.png');
      return value.substring(startIndex, endIndex);
    } else if(value == "*") {
        return "*";
    }else{
        // WHERE IS THAT EVEN USED? --> AT THE BEGINNING, WHICH IS WRONG ANYWAY
        return `<img src="${imgPath}${value}.png" style="width:100%; height:100%;">`;
    }
  }
  
// button press to clear the sequence
function clearPieceSequence(){
    var table = document.getElementById("piecesGrid");
    if (table.rows.length > 1) {
        if (confirm("This will clear the piece sequence above. Continue?")) {
            removePieces();
        }
    }
}

// not the most elegant way to do this, but ok :)
function removePieces(){
    let table = document.querySelector("#piecesGrid");
    let rows = table.getElementsByTagName("tr");
    for (let i = (rows.length-1); i >= 0 ; i--) {
        rows[i].querySelector(".third-column").click();
    }
}

// create the piece sequence
function getPieceSequence() {
    let table = document.querySelector("#piecesGrid");
    let rows = table.getElementsByTagName("tr");
    let values = [];

    for (let i = 0; i < rows.length; i++) {
        let secondColumn = swapLetterAndImage(rows[i].querySelector(".second-column").innerHTML);
        if(secondColumn !== "*"){
            values.push(mapping[secondColumn] || secondColumn);
        }
    }

    let result = values.join("");
    return result;
}

// adds a row to the pieces table
function addRowToTable(currentIndex, isAutomatic, imgData) {
    const newRow = piecesGrid.insertRow();
    newRow.id = `piece-${currentIndex}`;
  
    const firstColumn = newRow.insertCell();
    firstColumn.textContent = currentIndex;
    firstColumn.classList.add("first-column");
  
    const secondColumn = newRow.insertCell();
    secondColumn.classList.add("second-column");
      
    if (isAutomatic && imgData != "") {
      secondColumn.innerHTML = `<img src="${imgPath}${imgData}.png" class="tetromino" id="img-${currentIndex}" onclick="rotate('img-${currentIndex}')">`;
      secondColumn.setAttribute("contenteditable", false);
    } else {
      secondColumn.textContent = "*";
      secondColumn.setAttribute("contenteditable", true);
    }
  
    const thirdColumn = newRow.insertCell();
    thirdColumn.classList.add("third-column");
    secondColumn.focus();
  

    if (!isAutomatic) {
        const lastSecondRow = document.getElementById(`piece-${currentIndex - 1}`).querySelector(".second-column");
        const content = lastSecondRow.textContent;    
        lastSecondRow.innerHTML = `<img src="${imgPath}${imgData}${content}.png" class="tetromino" id="img-${currentIndex - 1}" onclick="rotate('img-${currentIndex - 1}')">`;
    }
  
    if (!isAutomatic) {
      const lastThirdRow = document.getElementById(`piece-${currentIndex - 1}`).querySelector(".third-column");
      lastThirdRow.innerHTML = "&times;";
    }else if(isAutomatic && imgData != ""){
        thirdColumn.innerHTML = "&times;";  
    }
  }

// renumber the rows of the pieces grid
function renumberRows() {
    const table = document.querySelector("#piecesGrid");
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].id = "piece-" + (i + 1).toString();
        rows[i].querySelector(".first-column").innerHTML = i + 1;
        currentIndex = i + 1;

        // also renumber the image-ID if there is an image
        for (let i = 0; i < rows.length; i++) {
            let img = rows[i].querySelector("img");
            if (img) {
              let id = `img-${i + 1}`;
              img.id = id;
              img.setAttribute("onclick", `rotate('${id}')`);
            }
          }
    }
    getCurrentConfiguration();
}

// when you click into the pieces grid...
piecesGrid.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("second-column")) {
        if (target.textContent === "*") {
            target.setAttribute("contenteditable", true);
            target.textContent = "";
            target.focus();
        }
    }else if(target.classList.contains("third-column")){

        if (target.innerHTML != "") {
            const parentRow = target.parentNode;
            const parentRowId = parentRow.id;
            //delete a row
            let table = document.getElementById("piecesGrid");
            let rowToDelete = document.getElementById(parentRowId.toString());
            table.deleteRow(rowToDelete.rowIndex);
            renumberRows();
        }

    }
    getCurrentConfiguration();
});

piecesGrid.addEventListener("keydown", function(event) {
    
    //important to be able to use capital letters
    if(event.key === 'Shift') return;
    
    // delete the last entry
    if(event.key === 'Backspace'){
        let table = document.getElementById("piecesGrid");
        let lastRow = table.rows.length - 2;
        if(lastRow > -1){
            table.deleteRow(lastRow);
            renumberRows();
            getCurrentConfiguration();
        }        
        return;
    }
    const target = event.target;
    if (target.classList.contains("second-column")) {

        // event listener for all the tetromino letters
        const lowerCaseTypes = pieceTypes.map(type => type.toLowerCase());
        if (lowerCaseTypes.includes(event.key.toLowerCase())) {
    
            currentIndex++;

            event.preventDefault();
            target.textContent = event.key.toUpperCase();
            target.setAttribute("contenteditable", false);
            const nextRow = target.parentElement.nextElementSibling;

            if (!nextRow) {
                // make this its own function
                addRowToTable(currentIndex, false, "");
                getCurrentConfiguration();
                
            } else {
                nextRow.querySelector(".second-column").setAttribute("contenteditable", true);
                nextRow.querySelector(".second-column").click();
            }
        } else {
            if(!warningShown) alert("Only the letters L,J,I,O,Z,S or T are allowed!\n\nInfo: This message will not be shown again until you refresh the browser!");
            warningShown = true;
            event.preventDefault();
        
        }
        if(currentIndex > 256){
            alert("There can only be 256 Tetrominoes!");
            
            //delete the last coumn
            let table = document.getElementById("piecesGrid");
            let rowToDelete = document.getElementById("257");
            table.deleteRow(rowToDelete.rowIndex);
        }
    }
});