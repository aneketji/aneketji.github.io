// ==========================
// JARVIS V2 VOICE ENGINE
// ==========================

let jarvisVoice = null;

// -------------------------
// Load Voice
// -------------------------

function loadVoices() {

    const voices = speechSynthesis.getVoices();

    console.log("Available Voices:");

voices.forEach((voice, index) => {
    console.log(index + " : " + voice.name + " | " + voice.lang);
});

    // English male voice ko prefer karo
    jarvisVoice = voices.find(v =>
        v.lang.startsWith("en") &&
        v.name.toLowerCase().includes("david")
    );

    // Agar David nahi mila
    if (!jarvisVoice) {

        jarvisVoice = voices.find(v =>
            v.lang.startsWith("en")
        );

    }

}

speechSynthesis.onvoiceschanged = loadVoices;

loadVoices();

// -------------------------
// Speak
// -------------------------

function speak(text) {

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    utter.voice = jarvisVoice;

    utter.lang = "en-US";

    utter.rate = 0.9;

    utter.pitch = 0.75;

    utter.volume = 1;

    speechSynthesis.speak(utter);

}

// -------------------------
// Stop Speaking
// -------------------------

function stopVoice(){

    speechSynthesis.cancel();

}

// -------------------------
// Thinking Sound
// -------------------------

function thinking(){

    speak("Please wait.");

}

// -------------------------
// Welcome
// -------------------------

function welcomeVoice(){

    speak(
        "Welcome.\n\n" +
        "My name is Jarvis.\n\n" +
        "I am the personal assistant of Aniket.\n\n" +
        "How can I help you today?"
    );

}
// ==========================
// Voice Recognition
// ==========================

function startListening() {

    if (!('webkitSpeechRecognition' in window)) {

        speak("Sorry, your browser does not support voice recognition.");

        return;

    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    speak("I'm listening.");

setTimeout(() => {

    recognition.start();

}, 1800);


    recognition.onresult = function(event){

    const text = event.results[0][0].transcript;

    console.log("VOICE HEARD:", text);

    askJarvis(text);

};


recognition.onerror = function(event){

    console.log("Speech Error:", event.error);

};

recognition.onend = function(){

    console.log("Listening Finished");

};

}
