
var streak = 0;
var bestStreak = 0;
var doorClick = 0;
var previousDoor = 0;

var pictureIdA, pictureIdB, pictureIdC;


//////////set-up functions
function random(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function randomPicture(){
    pictureIdA = random(1,4);
    pictureIdB = pictureIdA; pictureIdC = pictureIdA;

    //lặp hoài tới chừng nào B != A thì ngưng
    while ( pictureIdB === pictureIdA ){
        pictureIdB = random(1,4);
    }
    while ( pictureIdC === pictureIdA || pictureIdC === pictureIdB ){
        pictureIdC = random(1,4);
    }
}

function showPicture(doorHTMLId, pictureId){
    if (pictureId == 0){
        document.getElementById(doorHTMLId).setAttribute("src", 'images/closed_door.svg');
    } else if (pictureId === 1){
        document.getElementById(doorHTMLId).setAttribute("src", 'images/beach.svg');
    } else if (pictureId === 2){
        document.getElementById(doorHTMLId).setAttribute("src", 'images/space.svg');
    } else if (pictureId === 3){
        document.getElementById(doorHTMLId).setAttribute("src", 'images/robot.svg');
    }
}



//Functions to do things after win/lose game
function win(){
    //change text of replay button
    //calculate current streak and best streak
    //display streak and best streak

    //1
    document.getElementById('replay-text').innerHTML = "You win! Wanna continues?";
    //2
    streak ++;
    if (streak > bestStreak){
        bestStreak = streak;
    }
    //3
    document.getElementById('current').innerHTML = streak;
    document.getElementById('best').innerHTML = bestStreak;
}
function lose(){
    //1
    document.getElementById('replay-text').innerHTML = "You lose! Wanna play again?";
    //2
    streak = 0;
    //3
    document.getElementById('current').innerHTML = streak;
    document.getElementById('best').innerHTML = bestStreak;
}

//check win/lose function
function checkWin(pictureId){
    if (previousDoor !== pictureId){
        doorClick ++;
        previousDoor = pictureId;
    }
     
    console.log('doorClick: ' + doorClick + '    ID: ' + pictureId + '    Pre: ' + previousDoor);
    if ((doorClick === 1) && (pictureId === 3)){
        lose();
    } else if ((doorClick === 2) && (pictureId === 3)){
        lose();
    } else if ((doorClick === 3) && (pictureId === 3)){
        win();

    }
}

//arrow function
//flag

//Intiniate the game
function init(){
    //create 3 closed doors
    showPicture('1st-door', 0);
    showPicture('2nd-door', 0);
    showPicture('3rd-door', 0);
    //create random picture for 3 doors
    randomPicture();
}



// main program

    init();

    //catch event and show the picture when users click the doors. Then check if they win or lose in this turn (callback checkWin();)
    document.getElementById('1st-door').addEventListener('click', event => {
        showPicture('1st-door', pictureIdA);
        checkWin(pictureIdA);
    });

    document.getElementById('2nd-door').addEventListener('click', event => {
        showPicture('2nd-door', pictureIdB);
        checkWin(pictureIdB);
    });
    document.getElementById('3rd-door').addEventListener('click', event => {
        showPicture('3rd-door', pictureIdC);
        checkWin(pictureIdC);
    });
    //replay the game
    document.getElementById('button').addEventListener('click', event => {
        doorClick = 0; previousDoor = 0;
        document.getElementById('replay-text').innerHTML = "This time you gonna winnnn!"; console.log('-------------');
        init();
    });





