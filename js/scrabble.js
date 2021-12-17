/*
    Course: COMP.4610 GUI Programming I
    Name: William Zouzas
    Email: william_zouzas@student.uml.edu
    Date Created: 11/27/2021

    File: scrabble.js
    GUI Assignment: HW5 Implementing a Bit of Scrabble with Drag-and-Drop (with Extra Credits)
    File Description: This JavaScript file is used to implement a Scrabble game. jQuery UI is used to make the letter tiles in the game draggable so that they can be placed on a board. The user places the letters on droppable squares. Their score is totaled and shown to them.

    Copyright (c) 2021 by William. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
    Updated by WZ on 12/16/21
*/

//Letters
//Source: https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
//https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse_Test.html
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "images/Scrabble_Tile_A.jpg" } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_B.jpg"  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_C.jpg"  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/Scrabble_Tile_D.jpg"  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "image" : "images/Scrabble_Tile_E.jpg" } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_F.jpg"  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3, "image" : "images/Scrabble_Tile_G.jpg"  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_H.jpg"  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "images/Scrabble_Tile_I.jpg"  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/Scrabble_Tile_J.jpg"  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/Scrabble_Tile_K.jpg"  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/Scrabble_Tile_L.jpg"  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_M.jpg"  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "images/Scrabble_Tile_N.jpg"  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8, "image" : "images/Scrabble_Tile_O.jpg"  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_P.jpg"  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/Scrabble_Tile_Q.jpg"  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "images/Scrabble_Tile_R.jpg"  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/Scrabble_Tile_S.jpg"  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "images/Scrabble_Tile_T.jpg"  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/Scrabble_Tile_U.jpg"  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_V.jpg"  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_W.jpg"  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/Scrabble_Tile_X.jpg"  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_Y.jpg"  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/Scrabble_Tile_Z.jpg"  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/Scrabble_Tile_Blank.jpg"  } ;

//Initialize score
var currentScore = 0;

//Variable for target squares array
var targetSquaresArray = [];

//Variable for letter tile array
var tileArray = [];

//Initialize targetSquares array
//Note: after pressing the Restart button, use targetSquares[i] = null to keep array length the same (7)
function initializeTargetSquares() {
    for (let i=0; i<7; i++) {
        targetSquaresArray.push(null);
    }
}

//Display 7 tiles in tile rack using for-loop
$(function() {

    //Add letter tiles to letter holder
    for(var i=0; i<7; i++) {

        //Randomly select letter tile based on distribution of letters
        var letterIndex = randomNumber();
        
        //Push to tile array
        tileArray.push(letterIndex);

        addLetterTiles(letterIndex);
    }

    //Initialize target square array
    initializeTargetSquares();

    $("#tiles img").draggable( {
        revert: true
    });
});

//Droppable
$("#board img").droppable( {
    drop : handleDropEvent
});

//Handle Drop Event
//Source: https://jqueryui.com/position/
//Source: https://api.jqueryui.com/draggable/#option-revert
function handleDropEvent(event, ui) {
    var draggable = ui.draggable;

    //Get the index of the target square that the letter tile is placed on
    //Source (last character of a string): https://www.delftstack.com/howto/javascript/get-last-character-of-a-string-in-javascript/
    //Source (parse): https://www.w3schools.com/jsref/jsref_parseint.asp    
    var targetIndex = parseInt($(this).attr('id').substr(-1));
    
    //Before adding letter to square, check if the target is empty
    //If the target is empty, add the letter tile to the square
    //Calculate current score if letter tile is placed properly (calculate function is placed below this section of code)
    if (targetSquaresArray[targetIndex] == null) {       
        
        //Call function to check if tile is being placed in valide square
        checkSquareNeighbor(targetIndex, draggable.attr('data-letter'));

        //If the letter was added to a square after the function call above, then place letter on square
        if (targetSquaresArray[targetIndex] == draggable.attr('data-letter')) {
            
            //Do NOT revert letter tile back to tile holder
            //Allow it to stay on square
            draggable.draggable({
                revert: false
            });

            //Get position of dropped tile
            draggable.position( {
                of: $(this)
            });
        }
    }
}

//Check targetSquares array
//Make sure letter tile is being dropped next to another letter (if it is not the first tile)
function checkSquareNeighbor(targetIndex, tileLetter) {

    // When new tile is placed, check if it is the FIRST tile - if so, it can be placed anywhere
    // If first tile is placed, do NOT update score (words must be at least 2 characters)
    var letterCount = 0;
    for (let i=0; i<7; i++) {
        //check if null
        if (targetSquaresArray[i] != null){
            letterCount++;
        }
    }

    //If there are no other letters yet placed on the squares, add tile to square
    if(letterCount == 0) {
        targetSquaresArray[targetIndex] = tileLetter;
        return;
    }

    //If letter tile is placed on first square (index=0), only check to the right
    if (targetIndex == 0) {
        if (targetSquaresArray[targetIndex+1] != null) {
            targetSquaresArray[targetIndex] = tileLetter;
            return;
        }
    }

    //If letter tile is placed on last square (index=6), only check to the left
    if (targetIndex == 6) {
        if (targetSquaresArray[targetIndex-1] != null) {
            targetSquaresArray[targetIndex] = tileLetter;
            return;
        }
    }

    // When another tile is placed, check if it is placed next to another letter
    // If placed ADJACENT to another letter (targetSquares[i-1] != null || targetSquares[i+1] != null), place letter on square
    //  Allow score to be updated for letter
    if (targetSquaresArray[targetIndex-1] != null || targetSquaresArray[targetIndex+1] != null) {
        targetSquaresArray[targetIndex] = tileLetter;
        return;
    }
}

//Calculate current score
function calculateScore() {
    var boardScore = 0;
    var multiplier = 1;

    //Calculate board score
    for (let i=0; i<7; i++) {
        
        //Check if target square has a letter tile
        if (targetSquaresArray[i] != null) {
            
            //Add letter tile value to board score
            boardScore += ScrabbleTiles[targetSquaresArray[i]]["value"];
            
            //If letter tile lands on double word, multiply score of board by 2
            //If letter tiles are on both double word squares, multiply by 2 again
            if(i==1 || i==5) {
                multiplier *= 2;
            }
        }
    }

    boardScore *= multiplier; //Multiply score by multiplier (x1, x2, or x4)

    return boardScore;
}

//Update the total current score that is displayed to the user
function updateScoreDisplay() {
    document.getElementById("current-score").innerHTML = currentScore;
}

//Add letter tiles to the tile rack
//Source: https://www.w3schools.com/jsref/met_document_createattribute.asp
//Source (Piazza): https://piazza.com/class/kszfv79leje3th?cid=94
function addLetterTiles(letterIndex) {
    
    var img = document.createElement("img");
    img.src = ScrabbleTiles[letterIndex]["image"];
    
    var att = document.createAttribute("data-letter");       
    att.value = letterIndex;
    img.setAttributeNode(att);

    //Append tile image to tile rack
    var tileRack = document.getElementById("tiles");
    tileRack.appendChild(img);
}

//Select 7 Random Letter Tiles
//Source: https://reactgo.com/javascript-ascii-to-characters/
//Source: https://www.asciitable.com
function randomNumber() {

    let out = [];

    // Loop through the master entries.
    for (let i = 0; i < 26; i++) {
        // Push the value over and over again according to its weight.
        letter = String.fromCharCode(i+65);

        for (let j = 0; j < ScrabbleTiles[letter]["number-remaining"]; j++) {
            out.push(letter);
        }
    }

    // Add underscore
    for (let j = 0; j < ScrabbleTiles["_"]["number-remaining"]; ++j) {
        out.push("_");
    }

    return out[Math.floor(Math.random() * out.length)];
}

//Next word button
$('#nextWord').on('click', function() {
    
    //Calculate the score of the board and update total score
    //Check if there are at least 2 letters in the squares to calculate the score
    var letterCount = 0;
    for (let i=0;i<7;i++) {
        if(targetSquaresArray[i] != null) {
            letterCount++;
        }
    }

    //Only calculate score for words with at least 2 letters
    if(letterCount >= 2) {
        currentScore += calculateScore();
        updateScoreDisplay();
    }
    else {
        return;
    }

    $('#tiles img').remove();


    //Remove letter tiles from board (targetSquareArray)
    for (let i=0;i<7;i++) {
        if (targetSquaresArray[i] != null) {

            var letterIndex = randomNumber();
        
            //Push to tile array
            //Add new letters to the tile rack so there are 7 letters for the next try
            tileArray[i] = letterIndex;
            addLetterTiles(letterIndex);
        
            //Reset array where letter tile was stored to null
            targetSquaresArray[i] = null;
        }
        else {
            addLetterTiles(tileArray[i]); 
        }
    }

    //Make letter tiles draggable again
    $("#tiles img").draggable( {
        revert: true
    });
});

//Restart
$('#restart').on('click', function() {

    //Initialize score
    currentScore = 0;
    updateScoreDisplay();

    //Variable for target squares array
    targetSquaresArray = [];

    //Variable for letter tile array
    tileArray = [];

    $('#tiles img').remove();

    //Add letter tiles to letter holder
    for(var i=0; i<7; i++) {

        //Randomly select letter tile based on distribution of letters
        var letterIndex = randomNumber();
        
        //Push to tile array
        tileArray.push(letterIndex);

        addLetterTiles(letterIndex);
    }

    //Initialize target square array
    initializeTargetSquares();

    $("#tiles img").draggable( {
        revert: true
    });
});
