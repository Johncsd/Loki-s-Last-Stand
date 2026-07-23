const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyX_0vkdD-AKauhfbHeuGKu3lUHsIplQNqolE7eEmbZH2H9yLAez9Uf4cxxK_4nOVUz/exec";

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const player = document.getElementById("player").value.trim();
    const alliance = document.getElementById("alliance").value.trim();

    if (!player || !alliance) {
        message.style.color = "#ff4d4d";
        message.innerHTML = "Please complete all fields.<br>모든 항목을 입력하세요.";
        return;
    }

    try {

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                player: player,
                alliance: alliance
            })
        });


        message.style.color = "#7CFC00";

        message.innerHTML =
        "Registration Successful!<br>등록이 완료되었습니다!";

        form.reset();


    } catch (error) {

        console.log(error);

        message.style.color = "#ff4d4d";

        message.innerHTML =
        "Connection error.<br>연결 오류가 발생했습니다.";

    }

});
