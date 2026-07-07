// =====================================
// JARVIS AI V4 - PART 1
// =====================================

const GEMINI_API_KEY = "AIzaSyDuOBz49OSv13cucQ6ppI3HJtaLXfynVN";

const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function askJarvis(message){

    console.log("USER:", message);

    const text = message.toLowerCase().trim();

    // ==========================
    // PERSONAL IDENTITY
    // ==========================

    if(
        text.includes("your name") ||
        text.includes("what is your name") ||
        text.includes("tumhara naam") ||
        text.includes("aapka naam") ||
        text.includes("who are you") ||
        text.includes("tum kon ho") ||
        text.includes("aap kon ho")
    ){

        const reply =
        "My name is Jarvis. I am your personal AI assistant.";

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

        const reply =
        "I was developed by Aneket Baliyan.";

        speak(reply);

        return;
    }

    if(
        text.includes("who is aneket") ||
        text.includes("aneket kaun hai")
    ){

        const reply =
        "Aneket Baliyan is a BCA student, programmer, web developer, Android developer and AI enthusiast. He developed me as his personal AI assistant.";

        speak(reply);

        return;
    }

    // ==========================
    // WEBSITE COMMANDS
    // ==========================

    if(text.includes("project")){

        speak("Opening Projects.");

        document.getElementById("projects")
        .scrollIntoView({
            behavior:"smooth"
        });

        return;
    }

    if(text.includes("about")){

        speak("Opening About section.");

        document.getElementById("about")
        .scrollIntoView({
            behavior:"smooth"
        });

        return;
    }

    if(text.includes("skill")){

        speak("Opening Skills.");

        document.getElementById("skills")
        .scrollIntoView({
            behavior:"smooth"
        });

        return;
    }

    if(text.includes("education")){

        speak("Opening Education.");

        document.getElementById("education")
        .scrollIntoView({
            behavior:"smooth"
        });

        return;
    }

    if(text.includes("contact")){

        speak("Opening Contact.");

        document.getElementById("contact")
        .scrollIntoView({
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

    // ===========
    // PART 2
    // ===========
    // ==========================
    // SMART WEBSITE KNOWLEDGE
    // ==========================

    if(
        text.includes("what can you do") ||
        text.includes("tum kya kar sakte ho") ||
        text.includes("help")
    ){

        const reply =
        "I can answer your questions, control this website, open sections like About, Skills, Projects, Education and Contact, and help you with programming, AI and general knowledge.";

        speak(reply);

        return;

    }

    if(
        text.includes("skills") ||
        text.includes("what are your skills")
    ){

        const reply =
        "Aneket has skills in Java, Python, C Plus Plus, HTML, CSS, JavaScript, Android Development and Machine Learning.";

        speak(reply);

        return;

    }

    if(
        text.includes("education") ||
        text.includes("study")
    ){

        const reply =
        "Aneket is currently pursuing Bachelor of Computer Applications at Galgotias University.";

        speak(reply);

        return;

    }

    if(
        text.includes("contact")
    ){

        const reply =
        "You can contact Aneket using the Contact section of this website.";

        speak(reply);

        return;

    }

    if(
        text.includes("portfolio")
    ){

        const reply =
        "This portfolio was designed and developed by Aneket Baliyan to showcase his projects, skills and AI assistant.";

        speak(reply);

        return;

    }

    if(
        text.includes("resume")
    ){

        const reply =
        "You can download Aneket's resume from this website if it is available.";

        speak(reply);

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

You are NOT Google Gemini.

You are the personal AI assistant developed by Aneket Baliyan.

Rules:

1. Never say you are Gemini.

2. Never say you are a language model.

3. Always introduce yourself as Jarvis.

4. If asked who created you, answer:
"I was developed by Aneket Baliyan."

5. Detect the user's language automatically.
If the user speaks Hindi, reply in Hindi.
If the user speaks Hinglish, reply in Hinglish.
If the user speaks English, reply in English.

6. Keep replies natural, friendly and short.

User Question:

${message}
`
                    }]

                }]

            })

        });

        const data = await response.json();

            if (!response.ok) {

            throw new Error("Gemini API Error");

        }

        if (
            !data.candidates ||
            !data.candidates[0] ||
            !data.candidates[0].content
        ) {

            speak("Sorry, I couldn't understand that.");

            return;

        }

        const reply =
        data.candidates[0].content.parts[0].text;

        console.log("JARVIS:", reply);

        // Chat Box me message dikhao
        if(typeof addBotMessage === "function"){

            addBotMessage(reply);

        }

        // Voice me bolo
        speak(reply);

    }

    catch(error){

        console.log(error);

        const reply =
        "Sorry, I am having trouble connecting right now.";

        if(typeof addBotMessage === "function"){

            addBotMessage(reply);

        }

        speak(reply);

    }

}
