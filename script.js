const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyX_0vkdD-AKauhfbHeuGKu3lUHsIplQNqolE7eEmbZH2H9yLAez9Uf4cxxK_4nOVUz/exec";

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const list = document.getElementById("list");
const counter = document.getElementById("counter");


// Cargar jugadores registrados
async function loadPlayers() {

    try {

        const response = await fetch(SCRIPT_URL);

        const players = await response.json();

        list.innerHTML = "";

        players.forEach((p, index) => {

            let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${p.player}</td>
                <td>${p.alliance}</td>
            </tr>
            `;

            list.innerHTML += row;

        });


        counter.innerHTML =
        players.length + " Players Registered<br>" +
        "등록된 참가자 " + players.length + "명";


    } catch (error) {

        console.log("Error loading players:", error);

    }

}


// Registrar jugador
form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const player = document.getElementById("player").value.trim();
    const alliance = document.getElementById("alliance").value.trim();


    if (!player || !alliance) {

        message.style.color = "#ff4d4d";

        message.innerHTML =
        "Please complete all fields.<br>모든 항목을 입력하세요.";

        return;

    }


    try {


        await fetch(SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            body: JSON.stringify({

                player: player,
                alliance: alliance

            })

        });


        message.style.color = "#7CFC00";

        message.innerHTML =
        "Registration Successful!<br>등록이 완료되었습니다!";


        form.reset();


        // Actualiza la lista después de registrar
        setTimeout(loadPlayers, 1000);



    } catch (error) {


        message.style.color = "#ff4d4d";

        message.innerHTML =
        "Connection error.<br>연결 오류가 발생했습니다.";


    }


});


// Cargar lista al abrir la página
loadPlayers();
