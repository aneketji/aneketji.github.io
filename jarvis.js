// ==========================
// JARVIS
// ==========================

const micBtn = document.getElementById("micBtn");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("jarvisInput");

// Welcome after page is visible
window.addEventListener("load", () => {

    setTimeout(() => {

        if (typeof speechSynthesis !== "undefined") {
            speechSynthesis.resume();
        }

        if (typeof welcomeVoice === "function") {
            welcomeVoice();
        }

    }, 3500);

});



// Mic click
micBtn.addEventListener("click", () => {

    micBtn.style.transform = "scale(1.15)";

    if (typeof startListening === "function") {
        startListening();
    }

    setTimeout(() => {

        micBtn.style.transform = "scale(1)";

    }, 300);

});

sendBtn.addEventListener("click", () => {

    const msg = input.value.trim();

    if (msg === "") return;

    askJarvis(msg);

    input.value = "";

});

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendBtn.click();

    }

});
