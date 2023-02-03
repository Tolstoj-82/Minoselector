const piecesGrid = document.querySelector("#piecesGrid");
const pieceTypes = ["L", "J", "I", "O", "Z", "S", "T"];

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

var currentIndex = 1;
const imgPath = "images/tetrominos/";
var warningShown = false;

// rotate the piece by 90° CW
function rotate(id) {
    let image = document.getElementById(id);
    let imageName = image.src.split("/").pop().split(".")[0];
    
    let newImageName = "";
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
    
    image.src = imgPath + newImageName + ".png";
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
      return `<img src="${imgPath}${value}.png" style="width:100%; height:100%;">`; ////////////////////////////
    }
  }
  
// displays the piece sequence in a div --> replace ASAP
function displayPieceSequence(){
    let sequence = getPieceSequence();
    let outputDiv = document.getElementById("pieceOutput");

    outputDiv.innerHTML = sequence;
    removePieces();
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

    let result = values.join(", ");
    return result.endsWith(", ") ? result.slice(0, -2) : result;
}


// renumber the rows of the pieces grid
function renumberRows() {
    const table = document.querySelector("#piecesGrid");
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].id = "piece-" + (i + 1).toString();
        rows[i].querySelector(".first-column").innerHTML = i + 1;
        currentIndex = i + 1;

        // also renumber the image-ID
        rows[i].querySelector("img").id = "img-" + (i + 1).toString();
        rows[i].querySelector("img").setAttribute("onclick", "rotate('img-" + (i + 1).toString()+"')");
    }
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
                //if(confirm("Do you want to delete row " + parentRowId + "?")){...}
                let table = document.getElementById("piecesGrid");
                let rowToDelete = document.getElementById(parentRowId.toString());
                table.deleteRow(rowToDelete.rowIndex);
                renumberRows();
        }

    }
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
                const newRow = piecesGrid.insertRow();
                newRow.id = "piece-" + currentIndex.toString();

                const firstColumn = newRow.insertCell();
                firstColumn.textContent = currentIndex;
                firstColumn.classList.add("first-column");

                const secondColumn = newRow.insertCell();                        
                secondColumn.classList.add("second-column");
                secondColumn.setAttribute("contenteditable", true);
                secondColumn.textContent = "*";

                const thirdColumn = newRow.insertCell();
                thirdColumn.classList.add("third-column");
                secondColumn.focus();
                
                // add an "X" (&ntimes;) to the previous element
                const lastSecondRow = document.getElementById(`piece-${currentIndex - 1}`).querySelector(".second-column");
                const content = lastSecondRow.textContent;
                if (pieceTypes.includes(content)) {
                  lastSecondRow.innerHTML = `<img src="${imgPath}${content}.png" class="tetromino" id="img-${currentIndex - 1}" onclick="rotate('img-${currentIndex - 1}')">`;
                }

                lastThirdRow = document.getElementById("piece-"+(currentIndex-1).toString()).querySelector(".third-column");
                lastThirdRow.innerHTML = "&times;";
                
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