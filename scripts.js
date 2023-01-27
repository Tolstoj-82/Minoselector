// TODOs
// * multiselect (kinda)
// * make sure if ctrl is pressed, it adds minos regardless
// * grid on and off
// * is there a way to distinguish between one cell chosen and multiple? (probably not necessary!)
// * highlight if a row is full
// * center properly
// * no need for the text area (maybe in a accordion)
// * import function


// global variable defines which mino will be added when you press in the playfield 
var currentMino = "80";
let emptyMino = "2F";

//
window.onload = function() {
    document.getElementById("80").click();
    addMatrix();
    document.querySelectorAll('.ui-state-default').forEach(e => e.addEventListener("mousedown", clickHandler));
    document.addEventListener("keydown", currentMino);
    document.addEventListener("mouseup", getMinoList());
}

//select Ramdom Minotype
function getRandomMino(){
    return (Math.floor(Math.random() * 8) + 80).toString();
}

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
        //vramgrid.style.display = "none";
    } else {
        //vramgrid.style.display = "grid";
        let selectedCell = document.querySelector('.cell.selected');
        let selectedCellId = selectedCell.id;
        currentMino = selectedCellId.toUpperCase();
    }
});

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// change that!!! remove if you press ctrl
$( function(){
  $("#selectable").selectable({
    stop: function(){
      var mino = "mino";
      var remove = false;
      $(".ui-selected", this).each(function(i, el){
        if(document.getElementById("allowConfig").checked) currentMino = getRandomMino();
        if(i === 0 && this.classList.contains("mino")) remove = true;
        //if(i === 0 && this.classList.contains("mino") && event.ctrlKey) remove = true;
        if(!this.classList.contains("noStack")){
            if(remove){
                this.classList.remove(mino);
                $(el).find('img').attr('src', 'images/green/' + emptyMino + '.png');
            }
            else{
                this.classList.add(mino);
                $(el).find('img').attr('src', 'images/green/' + currentMino + '.png');
            }
        }
      });
      getMinoList();
    }
    });  
});

// assign a new class to a clicked mino
function clickHandler() {

  thisEl = document.getElementById(this.id);
  classList = thisEl.className;

  val = "0,0,0,0.5";
  if(classList.includes("mino")){
    val = "255,255,255,0.8";
  }
}

// add the playfield matrix
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
            }
        ol.appendChild(li);
        
        currentRow++;
        
        // create a new row
        if(currentCol == 10){
            currentCol = 0;
            currentRow++;
        }
    }
    getMinoList();
}