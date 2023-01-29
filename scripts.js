// TODOs
// * make sure if ctrl is pressed, it adds minos regardless
// * no need for the text area (maybe in a accordion)
// * import functionality

/*******************************************************************************
 (1) GLOBAL VARIABLES AND INITIAL SET-UP
*******************************************************************************/
// global variable defines which mino will be added when you press in the playfield 
var currentMino = "80";
let emptyMino = "2F";

//
document.addEventListener("DOMContentLoaded", function() {
//window.onload = function() {
    document.getElementById("80").click();
    addMatrix();
    document.querySelectorAll('.ui-state-default').forEach(e => e.addEventListener("mousedown", clickHandler));
    document.addEventListener("keydown", currentMino);
    document.addEventListener("mouseup", getMinoList());
});

/*******************************************************************************
 (2) EVENT LISTENERS
*******************************************************************************/

// Checkbox (check / uncheck)
const checkbox = document.getElementById("allowConfig");
const vramgrid = document.getElementById("vramgrid");
checkbox.addEventListener("change", function() {
    if (this.checked) {
        // make vramgrid border grey
        document.getElementById("vramgrid").style.borderColor = "rgb(224, 224, 224)";
    } else {
        // make vramgrid border green
        document.getElementById("vramgrid").style.borderColor = "rgb(158, 210, 144)";
        let selectedCell = document.querySelector('.cell.selected');
        let selectedCellId = selectedCell.id;
        currentMino = selectedCellId.toUpperCase();
    }
});

// Key presses
document.addEventListener("keydown", function(event) {
        //alert(event.code);
        let cell = null;
        if(event.code >= "Numpad1" && event.code <= "Numpad8"){
            // numbers 1-8 select the standard minos
            cell = document.getElementById((event.key.charCodeAt(0)-49+128).toString(16).padStart(2, "0"));
        }else if(event.code >= "KeyA" && event.code <= "KeyZ"){
            // letters select letter minos 
            cell = document.getElementById((event.key.charCodeAt(0)-"A".charCodeAt(0) -22).toString(16).padStart(2, "0"));
        }else if((event.code >= "Digit0" && event.code <= "Digit9")){
            // numpad selects numbers 
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
                changeBg(c.id, "green");
            });
            cell.classList.add("selected");
            changeBg(cell.id, "grey");
            currentMino = cell.id;
        }
});

/*******************************************************************************
 (2) FUNCTIONS
*******************************************************************************/

// display the toast
function displayToast(id){
    var toast = document.getElementById(id);
    toast.classList.add("show");
    setTimeout(function(){
        toast.classList.remove("show");; 
    }, 3000);
}

// counts the occupied minos in a row
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

//select Ramdom Minotype
function getRandomMino(){
    return (Math.floor(Math.random() * 8) + 80).toString();
}

// add the mino list to the textarea
function getMinoList() {
    let imageNames = "";
    let stackCells = document.querySelectorAll(".stack");
    stackCells.forEach(function(cell) {
        let cellImage = cell.querySelector("img").src;
        let startIndex = cellImage.indexOf("green/") + 6;
        let endIndex = cellImage.indexOf(".png");
        let imageName = cellImage.substring(startIndex, endIndex).toUpperCase();
        imageNames += imageName + ",";
    });
    let minoList = document.querySelector("#minoList");
    minoList.value = imageNames.slice(0, -1);
}

// copy the textarea to the clipboard
function copyText() {
    let textarea = document.getElementById("minoList");
    textarea.select();
    document.execCommand("copy");

    // show the toast (minos copied)
    displayToast("minoAdded");
}

// changes the image in the VRAM Grid
// > green -> grey: color = 'grey'
// > grey -> green: color = 'green'
function changeBg(id, toColor) {
    let cell = document.getElementById(id);
    let currentBg = cell.style.backgroundImage;
    if (toColor == "green") {
        let newBg = currentBg.replace("green", "grey");
        cell.style.backgroundImage = newBg;
    } else if (toColor == "grey") {
        let newBg = currentBg.replace("grey", "green");
        cell.style.backgroundImage = newBg;
    }
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
    getMinoList();
}

// import a CSV file
function csvToPlayfield(textarea) {
  
    // Split the csv data into an array of values
    var data = textarea.value;
    var values = data.split(',');

    // check if the number of values is 100 and if each value is a 2-digit hexadecimal number
    if (values.length !== 100 || !values.every(val => /^[0-9A-F]{2}$/i.test(val.trim())) ) {
        displayToast("errorImport");
        return;
    }

    // remove all classes excpt stack and ui-selectee
    $('.stack').removeClass(function(index, className) {
        return (className.match(/(^|\s)(?!ui-selectee|stack)\S+/g) || []).join(' ');
    });

    // Loop through the stack and add the image
    var stackDivs = document.getElementsByClassName("stack");    
    for (var i = 0; i < stackDivs.length; i++) {
        var div = stackDivs[i];
        var img = div.getElementsByTagName("img")[0];
        img.src = "images/green/" + values[i] + ".png";

        //div.classList.add("ui-selectee");
        if(values[i] != "2F") div.classList.add("mino");
    }

    displayToast("successImport");
    getMinoList();
    textarea.value = "";
}

/*******************************************************************************
 (4) START OF THE PROGRAM
*******************************************************************************/

// Create the VRAM Grid (right)
for (let i = 0; i < 256; i++) {
    let hexId = i.toString(16).padStart(2, "0");
    let cell = document.createElement("div");
    cell.classList.add("cell");
    if(i >= 128 && i <= 135){
        cell.classList.add("standard");
    }
    cell.id = hexId;
    cell.style.backgroundImage = 'url("images/grey/'+hexId+'.png")';
    cell.onclick = function() {
        document.querySelectorAll(".cell").forEach(function(c) {
            c.classList.remove("selected");
            changeBg(c.id, "green");
        });
        this.classList.add("selected");
        changeBg(this.id, "grey");
        currentMino = this.id;
        document.getElementById("allowConfig").checked = false;
        document.getElementById("vramgrid").style.borderColor = "rgb(158, 210, 144)";
  };
  document.querySelector(".vramgrid").appendChild(cell);
}

// Given the user selectiom, add minos to the playfield
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
                        //if(event.ctrlKey){
                        //    this.classList.add(mino);
                        //    $(el).find('img').attr('src', 'images/green/' + currentMino + '.png');    
                        //}else{
                            this.classList.remove(mino);    
                            $(el).find('img').attr('src', 'images/green/' + emptyMino + '.png');
                        //}
                    }else{
                        this.classList.add(mino);
                        $(el).find('img').attr('src', 'images/green/' + currentMino + '.png');
                    }
                }
            });

            // update the mino list
            getMinoList();
            
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
    });  
});

// what is this needed for?
// assign a new class to a clicked mino
function clickHandler() {

    thisEl = document.getElementById(this.id);
    classList = thisEl.className;

    // this is not in use... keep it?
    val = "0,0,0,0.5";
    if(classList.includes("mino")){
        val = "255,255,255,0.8";
    }
} 