// LOADER

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");
        const mainContent = document.getElementById("main-content");

        if(loader){
            loader.style.display = "none";
        }

        if(mainContent){
            mainContent.style.display = "block";
            mainContent.style.opacity = "1";
        }

    }, 3000);

});

// TYPING EFFECT

const typingText = [
    "BCA Student",
    "Java Developer",
    "Python Programmer",
    "Web Developer",
    "Future Software Engineer"
];

let textIndex = 0;
let charIndex = 0;

const typingElement = document.getElementById("typing");

function typeEffect() {

    if (!typingElement) return;

    if (charIndex < typingText[textIndex].length) {

        typingElement.textContent += typingText[textIndex].charAt(charIndex);
        charIndex++;

        setTimeout(typeEffect, 100);

    } else {

        setTimeout(eraseEffect, 1500);

    }
}

function eraseEffect() {

    if (charIndex > 0) {

        typingElement.textContent =
            typingText[textIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(eraseEffect, 50);

    } else {

        textIndex++;

        if (textIndex >= typingText.length) {
            textIndex = 0;
        }

        setTimeout(typeEffect, 500);
    }
}

if (typingElement) {
    typeEffect();
}

// SCROLL REVEAL

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            section.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealSections);
revealSections();

// CARD HOVER EFFECT

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform =
            `perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});

// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

// CURSOR GLOW

document.addEventListener("mousemove", (e) => {

    let glow = document.querySelector(".cursor-glow");

    if (!glow) {

        glow = document.createElement("div");
        glow.classList.add("cursor-glow");

        glow.style.position = "absolute";
        glow.style.width = "15px";
        glow.style.height = "15px";
        glow.style.borderRadius = "50%";
        glow.style.background = "#00c3ff";
        glow.style.pointerEvents = "none";
        glow.style.boxShadow = "0 0 20px #00c3ff";

        document.body.appendChild(glow);
    }

    glow.style.left = e.pageX + "px";
    glow.style.top = e.pageY + "px";

});
/* =========================================
   ANEKET 13 MONTH COUNTDOWN
========================================= */


/*
   TODAY:
   20 August 2026

   13 MONTHS LATER:
   20 September 2027
*/

const countdownTarget =
    new Date("2027-09-20T00:00:00").getTime();


const countdownScreen =
    document.getElementById("countdownScreen");

const startButton =
    document.getElementById("startCountdown");

const countdownSound =
    document.getElementById("countdownSound");


let countdownStarted = false;


/* =========================================
   CALCULATE CALENDAR DIFFERENCE
========================================= */

function getCountdownDifference(){

    const now = new Date();

    const target = new Date(countdownTarget);

    if(now.getTime() >= target.getTime()){

        return {

            months:0,
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
            finished:true

        };

    }


    let months =
        (target.getFullYear() - now.getFullYear()) * 12
        +
        (target.getMonth() - now.getMonth());


    let monthDate =
        new Date(now);

    monthDate.setMonth(
        monthDate.getMonth() + months
    );


    if(monthDate > target){

        months--;

        monthDate =
            new Date(now);

        monthDate.setMonth(
            monthDate.getMonth() + months
        );

    }


    const remaining =
        target.getTime() - monthDate.getTime();


    const days =
        Math.floor(
            remaining /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                remaining %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                remaining %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                remaining %
                (1000 * 60)
            ) /
            1000
        );


    return {

        months,
        days,
        hours,
        minutes,
        seconds,
        finished:false

    };

}


/* =========================================
   UPDATE TIMER
========================================= */

function updateCountdown(){

    const time =
        getCountdownDifference();


    document.getElementById("countMonths")
        .textContent =
        String(time.months)
        .padStart(2,"0");


    document.getElementById("countDays")
        .textContent =
        String(time.days)
        .padStart(2,"0");


    document.getElementById("countHours")
        .textContent =
        String(time.hours)
        .padStart(2,"0");


    document.getElementById("countMinutes")
        .textContent =
        String(time.minutes)
        .padStart(2,"0");


    document.getElementById("countSeconds")
        .textContent =
        String(time.seconds)
        .padStart(2,"0");


    /* COUNTDOWN FINISHED */

    if(time.finished){

        clearInterval(countdownInterval);


        if(countdownSound){

            countdownSound.pause();

            countdownSound.currentTime = 0;

        }


        countdownScreen.style.opacity = "0";


        setTimeout(() => {

            countdownScreen.style.display =
                "none";

        },1000);

    }

}


/* =========================================
   SOUND
========================================= */

function playCountdownSound(){

    if(!countdownStarted){

        return;

    }


    if(!countdownSound){

        return;

    }


    countdownSound.currentTime = 0;


    const playPromise =
        countdownSound.play();


    if(playPromise !== undefined){

        playPromise.catch(error => {

            console.log(
                "Countdown sound blocked:",
                error
            );

        });

    }

}


/* =========================================
   START COUNTDOWN
========================================= */

startButton.addEventListener(
    "click",
    async function(){

        countdownStarted = true;


        /*
           Browser ko audio permission
           dene ke liye pehle user click.
        */

        try{

            countdownSound.currentTime = 0;

            await countdownSound.play();

            countdownSound.pause();

            countdownSound.currentTime = 0;

        }

        catch(error){

            console.log(
                "Audio permission:",
                error
            );

        }


        startButton.textContent =
            "COUNTDOWN STARTED";


        startButton.disabled = true;


        startButton.style.opacity =
            "0.6";


        updateCountdown();


        /*
           Har second timer update
        */

        countdownInterval =
            setInterval(

                updateCountdown,

                1000

            );


        /*
           Har second sound
        */

        soundInterval =
            setInterval(

                playCountdownSound,

                1000

            );

    }
);


/* =========================================
   INITIAL TIMER
========================================= */

updateCountdown();


/*
   Timer variables
*/

let countdownInterval;

let soundInterval;
