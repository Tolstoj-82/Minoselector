const piecesGrid = document.querySelector("#piecesGrid");
let currentIndex = 1;

//
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
    let mapping = { "L": "00", "J": "04", "I": "08", "O": "0C", "Z": "10", "S": "14", "T": "18"};

    for (let i = 0; i < rows.length; i++) {
        let secondColumn = rows[i].querySelector(".second-column").innerHTML;
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
    }
    // the last third row can only ever be an X if current Index = 256 
}

piecesGrid.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("second-column")) {
        if (target.textContent === "*") {
            target.setAttribute("contenteditable", true);
            target.textContent = "";
            target.focus();
        }
    }else if(target.classList.contains("third-column")){
           //alert(target.innerHTML);
            if (target.innerHTML != "") {
                const parentRow = target.parentNode;
                const parentRowId = parentRow.id;
                //if(confirm("Do you want to delete row " + parentRowId + "?")){
                    //delete a row
                    let table = document.getElementById("piecesGrid");
                    let rowToDelete = document.getElementById(parentRowId.toString());
                    table.deleteRow(rowToDelete.rowIndex);
                    renumberRows();
                //}
        }

    }
});

piecesGrid.addEventListener("keydown", function(event) {
    const target = event.target;
    if (target.classList.contains("second-column")) {
        if (
            event.key === "L" || event.key === "l" || 
            event.key === "J" || event.key === "j" ||
            event.key === "I" || event.key === "i" ||
            event.key === "O" || event.key === "o" ||
            event.key === "Z" || event.key === "z" ||
            event.key === "S" || event.key === "s" ||
            event.key === "T" || event.key === "t"
        ){
    
            currentIndex++;

            event.preventDefault();
            target.textContent = event.key.toUpperCase();
            target.setAttribute("contenteditable", false);
            const nextRow = target.parentElement.nextElementSibling;

            if (!nextRow) {
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
                // add an "X" to the previous element
                lastThirdRow = document.getElementById("piece-"+(currentIndex-1).toString()).querySelector(".third-column");
                lastThirdRow.innerHTML = "&times;";//
                
            } else {
                nextRow.querySelector(".second-column").setAttribute("contenteditable", true);
                nextRow.querySelector(".second-column").click();
            }
        } else {
            alert("Only the letters L,J,I,O,Z,S or T are allowed!");
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