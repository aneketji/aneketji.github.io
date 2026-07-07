// ==========================
// JARVIS V3
// ==========================

const micBtn = document.getElementById("micBtn");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("jarvisInput");

// Welcome
window.addEventListener("load", () => {

    setTimeout(() => {

        if (typeof speechSynthesis !== "undefined") {
            speechSynthesis.resume();
        }

        if (typeof welcomeVoice === "function") {
            welcomeVoice();
        }

    }, 3000);

});

// ------------------
// MIC
// ------------------

micBtn.onclick = () => {

    micBtn.style.transform = "scale(1.12)";

    if (typeof startListening === "function") {

        startListening();

    }

    setTimeout(() => {

        micBtn.style.transform = "scale(1)";

    },300);

};

// ------------------
// SEND
// ------------------

sendBtn.onclick = () => {

    const msg = input.value.trim();

    if(!msg) return;

    if(typeof askJarvis==="function"){

        askJarvis(msg);

    }

    input.value="";

};

// ------------------
// ENTER
// ------------------

input.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        sendBtn.click();

    }

});
