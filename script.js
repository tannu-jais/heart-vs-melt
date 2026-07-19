console.log("Script Loaded");

// PLAYER DATA
let player1 = localStorage.getItem("player1");
let player2 = localStorage.getItem("player2");

let emoji1 = localStorage.getItem("emoji1");
let emoji2 = localStorage.getItem("emoji2");

// Redirect if game opened directly
if (!player1 || !player2 || !emoji1 || !emoji2) {
    window.location.href = "start.html";
}

// SOUNDS
let ting = new Audio("start.mp3");
let win = new Audio("gamewin.mp3");

// SCOREBOARD
let player1Score = 0;
let player2Score = 0;

// RANDOM GIFS
const winGifs = [
    "bubu-dudu-bubu-dudu-love.gif",
    "dudu-bubu-dudu.gif",
    "dudu.gif",
    "goma.gif",
    "Na.gif",
    "smiling.gif",
    "sseeyall.gif"
];

function showRandomGif() {

    let randomIndex =
    Math.floor(Math.random() * winGifs.length);

    let winnerGif =
    document.getElementById("winnerGif");

    winnerGif.src =
    winGifs[randomIndex];

    winnerGif.style.display =
    "block";

    winnerGif.style.width =
    "220px";
}

// GAME VARIABLES
let gameover = false;
let turn = emoji1;

// INITIAL UI
document.querySelector(".info").innerText =
"Turn for " + player1 + " " + emoji1;

document.getElementById("player1Score").innerText =
emoji1 + " " + player1 + " : " + player1Score;

document.getElementById("player2Score").innerText =
emoji2 + " " + player2 + " : " + player2Score;

// CHANGE TURN
function changeTurn() {

    return turn === emoji1
    ? emoji2
    : emoji1;
}

// WIN CHECK
function checkWin() {

    let boxtext =
    document.getElementsByClassName("boxtext");

    let wins = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for(let i=0;i<wins.length;i++){

        let a = wins[i][0];
        let b = wins[i][1];
        let c = wins[i][2];

        if(

            boxtext[a].innerText !== "" &&

            boxtext[a].innerText ===
            boxtext[b].innerText &&

            boxtext[b].innerText ===
            boxtext[c].innerText

        ){

            // Winner Animation

            boxtext[a].parentElement.classList.add(
            "winnerBox"
            );

            boxtext[b].parentElement.classList.add(
            "winnerBox"
            );

            boxtext[c].parentElement.classList.add(
            "winnerBox"
            );

            boxtext[a].classList.add(
            "winnerEmoji"
            );

            boxtext[b].classList.add(
            "winnerEmoji"
            );

            boxtext[c].classList.add(
            "winnerEmoji"
            );

            gameover = true;

            let winnerEmoji =
            boxtext[a].innerText;

            let winnerName =
            winnerEmoji === emoji1
            ? player1
            : player2;

            // SCORE UPDATE

            if(winnerEmoji === emoji1){
                player1Score++;
            }
            else{
                player2Score++;
            }

            document.getElementById("player1Score").innerText =
            emoji1 + " " + player1 + " : " + player1Score;

            document.getElementById("player2Score").innerText =
            emoji2 + " " + player2 + " : " + player2Score;

            // SCORE CARD ANIMATION

            let scoreCard =
            document.querySelector(".scoreCard");

            scoreCard.style.transform =
            "scale(1.08)";

            setTimeout(() => {

                scoreCard.style.transform =
                "scale(1)";

            },300);

            // WIN MESSAGE

            document.querySelector(".info").innerText =
            "🏆 " +
            winnerName +
            " Won! " +
            winnerEmoji;

            win.play();

            showRandomGif();

            return true;
        }
    }

    return false;
}

// DRAW CHECK
function checkDraw() {

    let boxtext =
    document.getElementsByClassName("boxtext");

    let filled = true;

    Array.from(boxtext).forEach(box => {

        if(box.innerText === ""){
            filled = false;
        }

    });

    if(filled && !gameover){

        gameover = true;

        document.getElementById("drawPopup")
        .style.display = "flex";

        let winnerGif =
        document.getElementById("winnerGif");

        winnerGif.src = "";

        winnerGif.style.display =
        "none";

        winnerGif.style.width =
        "0px";
    }
}

// GAME LOGIC
let boxes =
document.getElementsByClassName("box");

Array.from(boxes).forEach(box => {

    let boxtext =
    box.querySelector(".boxtext");

    box.addEventListener("click", () => {

        if(gameover){
            return;
        }

        if(boxtext.innerText === ""){

            boxtext.innerText =
            turn;

            ting.play();

            let winnerFound =
            checkWin();

            if(!winnerFound){
                checkDraw();
            }

            if(!gameover){

                turn =
                changeTurn();

                let currentPlayer =
                turn === emoji1
                ? player1
                : player2;

                document.querySelector(".info").innerText =
                "Turn for " +
                currentPlayer +
                " " +
                turn;
            }
        }

    });

});

// RESET GAME
document.getElementById("reset")
.addEventListener("click", () => {

    let boxtexts =
    document.querySelectorAll(".boxtext");

    boxtexts.forEach(box => {

        box.innerText = "";

        box.parentElement.classList.remove(
        "winnerBox"
        );

        box.classList.remove(
        "winnerEmoji"
        );

    });

    gameover = false;

    turn = emoji1;

    document.querySelector(".info").innerText =
    "Turn for " +
    player1 +
    " " +
    emoji1;

    let winnerGif =
    document.getElementById("winnerGif");

    winnerGif.src = "";

    winnerGif.style.display =
    "none";

    winnerGif.style.width =
    "0px";

    document.getElementById("drawPopup")
    .style.display = "none";

});

// CLOSE DRAW POPUP
document.getElementById("closePopup")
.addEventListener("click", () => {

    document.getElementById("drawPopup")
    .style.display = "none";

});
document.getElementById("upgradeBtn").addEventListener("click",()=>{
    window.open(
        "https://tannu-jais.github.io/heart-vs-melt-v2/","_blank"
);
});
