// global variable defines which mino will be added when you press in the playfield 
let currentMino; 

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
    if ((event.keyCode >= 49 && event.keyCode <= 56) || (event.keyCode >= 65 && event.keyCode <= 90)) { 
        let cell;
    
        if(event.keyCode >= 49 && event.keyCode <= 56)

            // keys 1 - 7 activate the standard minos
             cell = document.getElementById((event.keyCode-49+128).toString(16).padStart(2, "0"));
        else
            // keys A-Z activate minos A-Z
            cell = document.getElementById((event.keyCode-65+10).toString(16).padStart(2, "0"));
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