document.getElementById("startBtn")
.addEventListener("click", () => {

    let player1 =
    document.getElementById("player1").value;

    let player2 =
    document.getElementById("player2").value;

    let emoji1 =
    document.getElementById("emoji1").value;

    let emoji2 =
    document.getElementById("emoji2").value;

    if(player1 === "" || player2 === ""){
        alert("Please enter both player names!");
        return;
    }

    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    localStorage.setItem("emoji1", emoji1);
    localStorage.setItem("emoji2", emoji2);

    window.location.href = "index.html";
});
