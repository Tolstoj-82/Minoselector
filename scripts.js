///////////////////////////////////////////////////////////////////////////////
//
// TOLSTOJ 2023 (with the help of ChatGPT)
//
///////////////////////////////////////////////////////////////////////////////

// TODOs
// * maybe pass the JSON instead of adding it to the clipboard? Ask Toni
// * Refactor the code! There is a lot to improve
// * getCurrentConfiguration() is called too often!
// * Make it responsive - e.g. change the minosize to 16 if the screen is too small
// * make sure if ctrl is pressed, it adds minos regardless

/*******************************************************************************
 (1) GLOBAL VARIABLES AND INITIAL SET-UP
*******************************************************************************/

// global variables defines initial mino and empty mino
var currentMino = "87";
let emptyMino = "2F";
let currentJSON; // stores the current configuration in the JSON format

// do this, once all DOM elements have been loaded 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById(currentMino).click();
    getDropdownOptions();
    addMatrix();
});

/*******************************************************************************
 (2) EVENT LISTENERS
*******************************************************************************/

// when a garbage well is selected
document.querySelector("#garbage-well").addEventListener("change", function() {
    getCurrentConfiguration();
});

// selected playfield to textarea
document.getElementById("dropdown").addEventListener("change", function() {
    var value = this.value.trim();
    document.getElementById("importCsv").value = "";
    document.getElementById("importCsv").value += value + "\n";
});

// Checkbox (check / uncheck)
const checkbox = document.getElementById("allowConfig");
const vramgrid = document.getElementById("vramgrid");
checkbox.addEventListener("change", function() {
    if (this.checked) {
        
        // make vramgrid border grey
        document.getElementById("vramgrid").style.borderColor = "rgb(224, 224, 224)";
        toggleColor(null, "grey");
    } else {
        
        // make vramgrid border green
        document.getElementById("vramgrid").style.borderColor = "rgb(158, 210, 144)";
        let selectedCell = document.querySelector('.cell.selected');
        let selectedCellId = selectedCell.id;
        currentMino = selectedCellId.toUpperCase();
        toggleColor(null, "green");
    }
});

// Track Key presses
document.addEventListener("keydown", function(event) {
    
    // Disable key press listener when the focus is in a textarea or the piece selection
    let isActive = document.activeElement;
    let pieceContainer = document.getElementById("pieceContainer");
    let isInsideTextarea = isActive.tagName === 'TEXTAREA';
    let isInsidePieceContainer = pieceContainer.contains(isActive);
    if (isInsideTextarea || isInsidePieceContainer) return;
    
    let cell = null;
    if(event.code >= "Numpad1" && event.code <= "Numpad8"){
        // numbers 1-8 select the standard minos
        cell = document.getElementById((event.key.charCodeAt(0)-49+128).toString(16).padStart(2, "0"));
    }else if(event.code >= "KeyA" && event.code <= "KeyZ"){
        // letters
        cell = document.getElementById((event.key.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 10).toString(16).padStart(2, "0"));
    }else if((event.code >= "Digit0" && event.code <= "Digit9")){
        // numpad 
        cell = document.getElementById((event.key.charCodeAt(0)-48).toString(16).padStart(2, "0"));
    }else if(event.code == "Period" || event.code == "NumpadDecimal"){
        // the dot
        cell = document.getElementById("24");
    }else if(event.code == "Minus" || event.code == "NumpadSubtract"){
        // the dash
        cell = document.getElementById("25");
    }
    
    if(cell != null){
        document.querySelectorAll(".cell").forEach(function(c) {
            c.classList.remove("selected");          
            toggleColor(c.id, "grey");
        });
        cell.classList.add("selected");
        toggleColor(cell.id, "green");
        currentMino = cell.id;

        //uncheck the random checkbox
        if (document.getElementById("allowConfig").checked) {
            document.getElementById("allowConfig").click();
            }
    }
});

/*******************************************************************************
 (2) FUNCTIONS
*******************************************************************************/

// counts the occupied minos in a row (1 of 2)
function countMinoInRow(rowNumber) {
    var minoCount = 0;
    var elements = document.getElementsByClassName("row-" + rowNumber);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains("mino")) {
            minoCount++;
        }
    }
    return minoCount;
}

// checks all rows (2 of 2)
function checkAllRows(){
    
    // check each row and make sure it's not full
    let nMino;
    let isFull = false;
    for(let i=1; i<=10; i++){
        nMino = countMinoInRow(i); 
        let rows = document.getElementsByClassName("row-" + i);
        if(nMino == 10){
            for(let j = 0; j < rows.length; j++) rows[j].classList.add("clear");
            isFull = true;
        }else{
            for(let j = 0; j < rows.length; j++) rows[j].classList.remove("clear");
        }
    }
    if(isFull){    
        // show toast (full rows)
        displayToast("rowsFull");
    }
}

// if random is chosen, make the selected mino grey and vice versa
function toggleColor(id, color) {
    let element = id ? document.getElementById(id) : document.getElementsByClassName("selected")[0];
    let currentBg = element.style.backgroundImage;
    let newBg = (color === "green") ? currentBg.replace("/grey/", "/green/") : currentBg.replace("/green/", "/grey/");
    element.style.backgroundImage = newBg;
    if (!id && color === "grey") {
        element.style.border = "2px solid grey";
    } else {
        element.style.removeProperty("border");
    }
}

// displays the pre-defined playfields (in playfields.js) 
function getDropdownOptions(){
    for (var i = 0; i < playfields.length; i++) {
        var item = playfields[i];
        var display = item.name;
        var value = JSON.stringify(item);
        var option = "<option value='" + value + "'>" + display + "</option>";
        document.getElementById("dropdown").innerHTML += option;
    }
}


// display a toast
// if it is called because rows are full, it waits 10 seconds before it's called again
// waits for the last toast to disappear, before the next is shown
let toastQueue = [];
let canCall = true;

function displayToast(id) {
  toastQueue.push(id);

  if (toastQueue.length === 1) {
    showNextToast();
  }
}

function showNextToast() {
  if (!toastQueue.length) return;

  let id = toastQueue[0];
  if (id !== 'rowsFull' || canCall) {
    if (id === 'rowsFull') {
      canCall = false;
      setTimeout(() => {
        canCall = true;
      }, 10000);
    }
    var toast = document.getElementById(id);
    toast.classList.add("show");
    setTimeout(function() {
      toast.classList.remove("show");
      toastQueue.shift();
      showNextToast();
    }, 2500);
  }
}

//select Ramdom Minotype
function getRandomMino(){
    return (Math.floor(Math.random() * 8) + 80).toString();
}

// add the mino list to the textarea
function getCurrentConfiguration() {
    let garbage = "";
    
    // get the garbage
    let stackCells = document.querySelectorAll(".stack");
    stackCells.forEach(function(cell) {
        let cellImage = cell.querySelector("img").src;
        let startIndex = cellImage.indexOf("green/") + 6;
        let endIndex = cellImage.indexOf(".png");
        let newGarbage = cellImage.substring(startIndex, endIndex).toUpperCase();
        garbage += newGarbage;
    });
    
    // get the pieces
    let pieces = getPieceSequence();

    // get the well
    let well = document.querySelector("#garbage-well").value;

    let data = {};
    if (pieces !== "") data["pieces"] = pieces;
    if (garbage !== "") data["garbage"] = garbage;
    if (well !== "") data["well"] = well;

    currentJSON = JSON.stringify(data);
}


// copy the textarea to the clipboard
function copyText() {
    navigator.clipboard.writeText(currentJSON);

    // show the toast (minos copied)
    displayToast("minoAdded");
}

// create the playfield
function addMatrix(){
    ol = document.getElementById("selectable");
    rows = 18;
    cols = 10;
    currentRow = 1;
    currentCol = 0;
 
    for(i=1; i<=180; i++){
        li = document.createElement("li");

            if(i<=80){
                li.classList.add("noStack");
            }else{
                let img = document.createElement("img");
                img.src = "images/green/" + emptyMino + ".png";
                li.appendChild(img);
                li.classList.add("stack");
                li.classList.add("row-"+(currentRow-8));
            }
        ol.appendChild(li);
        
        currentCol++;
        
        // create a new row
        if(currentCol == 10){
            currentCol = 0;
            currentRow++;
        }
    }
    getCurrentConfiguration();
}

// import JSON file (1 of 2)
function actualImport(values, pieces, textarea, garbageWell){

    // set the garbage well selector to ""
    document.querySelector("#garbage-well").selectedIndex = 0;
        
    // remove all classes except stack, ui-selectee and row-{#}
    $('.stack').removeClass(function(index, className) {
        return (className.match(/(^|\s)(?!ui-selectee|stack|row-)\S+/g) || []).join(' ');
    });

    // Loop through the stack and add the image
    var stackDivs = document.getElementsByClassName("stack");    
    for (var i = 0; i < stackDivs.length; i++) {
        var div = stackDivs[i];
        var img = div.getElementsByTagName("img")[0];
        img.src = "images/green/" + values[i] + ".png";

        if(values[i].toUpperCase() != emptyMino) div.classList.add("mino");
    }

    displayToast("successImport");
    getCurrentConfiguration();
    textarea.value = "";
    checkAllRows();
    
    // removes the pieces to be generated
    removePieces();
    if(pieces != "") loadInPieceSequence(pieces);

    // if there was a garbage well, select it
    var select = document.querySelector("#garbage-well");

    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value === garbageWell) {
            select.selectedIndex = i;
            break;
        }
    } 

}

// import a JSON file (2 of 2)
function jsonToPlayfield(textarea) {
    // Extract the content of the textarea
    var dataString = textarea.value.trim();

    // Parse the content as JSON
    var data = JSON.parse(dataString);

    // Extract the values and pieces from the data
    var values = [];
    var pieces = data.hasOwnProperty("pieces") ? data.pieces : "";
    var garbage = data.hasOwnProperty("garbage") ? data.garbage : "";
    var garbageWell = data.hasOwnProperty("well") ? data.well : "";

    // Split the garbage string into 100 2-digit values
    for (var i = 0; i < garbage.length; i += 2) {
        values.push(garbage.substr(i, 2));
    }

    // Check if the number of values is 100
    if (values.length !== 100) {
        displayToast("errorImport");
        return;
    }

    // Check if each value is a 2-digit hexadecimal number
    if (!values.every(val => /^[0-9A-F]{2}$/i.test(val.trim()))) {
        displayToast("errorImport");
        return;
    }

    // Check if the piece sequence makes sense
    var minoDivs = document.getElementsByClassName("mino");
    var gridRows = document.querySelectorAll("#piecesGrid tr");
    if (minoDivs.length > 0 || gridRows.length > 1){
        var confirm = window.confirm("Your current playfield and piece sequence will be overwritten. Continue?");
        if (confirm == true){
            actualImport(values, pieces, textarea, garbageWell);
        }
    }else{
        actualImport(values, pieces, textarea, garbageWell);
    }
    getCurrentConfiguration();
}

// Should that be inside a function?
// Create the VRAM Grid (right)
for (let i = 0; i < 256; i++) {
    let hexId = i.toString(16).padStart(2, "0");
    let cell = document.createElement("div");
    cell.classList.add("cell");
    if(i >= 128 && i <= 135){
        cell.classList.add("standard");
    }
    cell.id = hexId;
    cell.style.backgroundImage = 'url("images/grey/' + hexId + '.png")';
    cell.onclick = function() {
        document.querySelectorAll(".cell").forEach(function(c) {
            c.classList.remove("selected");
            toggleColor(c.id, "grey");
        });
        this.classList.add("selected");
        toggleColor(this.id, "green");
        currentMino = this.id;
        document.getElementById("allowConfig").checked = false;
        document.getElementById("vramgrid").style.borderColor = "rgb(158, 210, 144)";
  };
  document.querySelector(".vramgrid").appendChild(cell);
}

// Given the user selection, add minos to the playfield
// TODO: Ctrl-key inverses remove <-> add (green and red border)
$( function(){
    $("#selectable").selectable({
        stop: function(){
            var mino = "mino";
            var remove = false;
            $(".ui-selected", this).each(function(i, el){
                if(document.getElementById("allowConfig").checked) currentMino = getRandomMino();
                if(i === 0 && this.classList.contains("mino")) remove = true;
                if(!this.classList.contains("noStack")){
                    if(remove){
                        this.classList.remove(mino);    
                        $(el).find('img').attr('src', 'images/green/' + emptyMino + '.png');
                    }else{
                        
                        // make sure 2F is not treated as a mino
                        if(currentMino.toUpperCase() == emptyMino) this.classList.remove(mino);
                        else this.classList.add(mino);
                        $(el).find('img').attr('src', 'images/green/' + currentMino + '.png');
                    }
                }
            });

            // update the mino list
            getCurrentConfiguration(); 
            checkAllRows();
        }
    });  
});