// =====================================
// JARVIS AI
// =====================================

const GEMINI_API_KEY = "AIzaSyDuOBz49OSv13cucQ6ppI3HJtaLXfynVN";

const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function askJarvis(message){

    console.log("AI RECEIVED:", message);

    const text = message.toLowerCase().trim();

    // ==========================
    // PERSONAL QUESTIONS
    // ==========================

    if(
        text.includes("your name") ||
        text.includes("who are you") ||
        text.includes("tumhara naam") ||
        text.includes("aapka naam") ||
        text.includes("tum kon ho") ||
        text.includes("aap kon ho")
    ){

        const reply = "My name is Jarvis. I am your personal AI assistant.";

        speak(reply);

        return;
    }

    if(
        text.includes("who made you") ||
        text.includes("who created you") ||
        text.includes("who developed you") ||
        text.includes("kisne banaya") ||
        text.includes("tumhe kisne banaya")
    ){

        const reply = "I was developed by Aneket Baliyan.";

        speak(reply);

        return;
    }

    // ==========================
    // WEBSITE COMMANDS
    // ==========================

    if(text.includes("project")){

        speak("Opening Projects.");

        document.getElementById("projects").scrollIntoView({
            behavior:"smooth"
        });

        return;

    }

    if(text.includes("about")){

        speak("Opening About.");

        document.getElementById("about").scrollIntoView({
            behavior:"smooth"
        });

        return;

    }

    if(text.includes("skill")){

        speak("Opening Skills.");

        document.getElementById("skills").scrollIntoView({
            behavior:"smooth"
        });

        return;

    }

    if(text.includes("education")){

        speak("Opening Education.");

        document.getElementById("education").scrollIntoView({
            behavior:"smooth"
        });

        return;

    }

    if(text.includes("contact")){

        speak("Opening Contact.");

        document.getElementById("contact").scrollIntoView({
            behavior:"smooth"
        });

        return;

    }

    if(text.includes("home")){

        speak("Going Home.");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        return;

    }

    // ==========================
    // GEMINI AI
    // ==========================

    try{

        const response = await fetch(GEMINI_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[{

                    parts:[{

                        text:`
You are Jarvis.

You are a personal AI assistant developed by Aneket Baliyan.

Never say you are Google Gemini.

Never say you are a language model.

If someone asks your name, say:
"My name is Jarvis."

If someone asks who made you, say:
"I was developed by Aneket Baliyan."

Keep answers natural, friendly and short.

User Question:
${message}
`

                    }]

                }]

            })

        });

        const data = await response.json();

        if(data.candidates){

            const reply = data.candidates[0].content.parts[0].text;

            speak(reply);

        }else{

            speak("Sorry, I couldn't understand that.");

        }

    }

    catch(e){

        console.log(e);

        speak("Sorry, Jarvis is unavailable right now.");

    }

}
