// TODOs
// * grid on and off
// * numbers to the rows and cols?
// * make the random minos work
// * no need for the text area (maybe in a accordion)
// * multiselect
// * import function


// global variable defines which mino will be added when you press in the playfield 
let currentMino = "80";
let emptyMino = "2F";

//
window.onload = function() {
    document.getElementById("80").click();
    getMinoList();
}

// this function copies the contents from the textarea into the clipboard
function copyText() {
    let textarea = document.getElementById("minoList");
    textarea.select();
    document.execCommand("copy");

    // show the toast (snackbar)
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

const checkbox = document.getElementById("allowConfig");
const vramgrid = document.getElementById("vramgrid");
checkbox.addEventListener("change", function() {
    if (this.checked) {
        vramgrid.style.display = "none";
    } else {
        vramgrid.style.display = "grid";
    }
});

// add the values to the textarea
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

// this function changes the image
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
 
// When certain keys are pressed, select the corresponding cells
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
            cell = document.getElementById("24");
        }else if(event.code == "Minus" || event.code == "NumpadSubtract"){
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

// Create the playfield (left)
for (let i = 0; i < 180; i++) {
    let playfieldcell = document.createElement("div");
    if(i < 80){
        playfieldcell.classList.add("noStack");
    }else{
        playfieldcell.classList.add("stack");
        let img = document.createElement("img");
        img.src = "images/green/" + emptyMino + ".png";
        img.style.width = "100%"; // this belongs in the CSS!
        img.style.height = "100%";
        playfieldcell.appendChild(img);
        playfieldcell.addEventListener("click", function(event){
            if(event.ctrlKey) img.src = "images/green/" + emptyMino + ".png";
            else img.src = "images/green/" + currentMino + ".png";
            getMinoList();
        });
    }
    playfieldcell.classList.add("playfieldcell");
    document.querySelector(".playfieldgrid").appendChild(playfieldcell);
}

// Create the vram-grid (right)
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
  };
  document.querySelector(".vramgrid").appendChild(cell);
}