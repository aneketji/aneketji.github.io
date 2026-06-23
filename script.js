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