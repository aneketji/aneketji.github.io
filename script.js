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

const countdownTarget =
    new Date("2027-09-20T00:00:00").getTime();

const countdownScreen =
    document.getElementById("countdownScreen");

const countdownSound =
    document.getElementById("countdownSound");


let countdownInterval;


/* =========================================
   UPDATE COUNTDOWN
========================================= */

function updateCountdown(){

    const now =
        new Date().getTime();

    const distance =
        countdownTarget - now;


    if(distance <= 0){

        document.getElementById("countMonths")
            .textContent = "00";

        document.getElementById("countDays")
            .textContent = "00";

        document.getElementById("countHours")
            .textContent = "00";

        document.getElementById("countMinutes")
            .textContent = "00";

        document.getElementById("countSeconds")
            .textContent = "00";

        clearInterval(countdownInterval);

        countdownScreen.style.display =
            "none";

        return;
    }


    const totalSeconds =
        Math.floor(distance / 1000);


    const seconds =
        totalSeconds % 60;


    const totalMinutes =
        Math.floor(totalSeconds / 60);


    const minutes =
        totalMinutes % 60;


    const totalHours =
        Math.floor(totalMinutes / 60);


    const hours =
        totalHours % 24;


    const totalDays =
        Math.floor(totalHours / 24);


    const months =
        Math.floor(totalDays / 30);


    const days =
        totalDays % 30;


    document.getElementById("countMonths")
        .textContent =
        String(months).padStart(2,"0");


    document.getElementById("countDays")
        .textContent =
        String(days).padStart(2,"0");


    document.getElementById("countHours")
        .textContent =
        String(hours).padStart(2,"0");


    document.getElementById("countMinutes")
        .textContent =
        String(minutes).padStart(2,"0");


    document.getElementById("countSeconds")
        .textContent =
        String(seconds).padStart(2,"0");
}


/* =========================================
   AUTO START
========================================= */

window.addEventListener("load", () => {

    updateCountdown();

    countdownInterval =
        setInterval(updateCountdown,1000);


    /* Sound attempt */

    if(countdownSound){

        countdownSound.volume = 0.8;

        countdownSound.play()
            .then(() => {

                console.log(
                    "Countdown sound started"
                );

            })
            .catch(() => {

                console.log(
                    "Browser blocked autoplay sound"
                );

            });
    }

});
