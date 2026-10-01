const screens = {
    question: document.getElementById("screen-question"),
    poem: document.getElementById("screen-poem"),
    eternity: document.getElementById("screen-eternity"),
    final: document.getElementById("screen-final")
};

const yesFirst = document.getElementById("yes-first");
const noFirst = document.getElementById("no-first");
const continuePoem = document.getElementById("continue-poem");

const yesSecond = document.getElementById("yes-second");
const noSecond = document.getElementById("no-second");

const noMessage = document.getElementById("no-message");
const noMessageSecond = document.getElementById("no-message-second");

const firstMessages = [
    "¿Segura? 🥺",
    "Piénsalo bien 🥺",
    "Ese botón no funciona 😌",
    "¿Y si mejor eliges el SÍ? ❤️",
    "Mi corazón dice que sí... 💗"
];

const secondMessages = [
    "¿Segura? 🥺",
    "Piénsalo bien 🥺",
    "Ese botón no funciona 😌",
    "La eternidad suena bonita contigo 💗",
    "Intenta con el SÍ, mi musa ✨"
];

let firstCount = 0;
let secondCount = 0;

// Cambiar de pantalla
function showScreen(screen) {
    Object.values(screens).forEach(item => item.classList.remove("active"));
    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Movimiento creativo del botón NO
function escapeButton(button, messageElement, messages, counterName) {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // En móvil se mantiene dentro de una zona visible.
    const maxX = Math.max(0, containerRect.width - buttonRect.width);
    const maxY = 100;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = (Math.random() * maxY) - maxY / 2;

    button.style.transform =
        `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg)`;

    const currentMessage = messages[counterName % messages.length];
    messageElement.textContent = currentMessage;
    button.textContent = currentMessage;

    button.classList.remove("shake");
    void button.offsetWidth;
    button.classList.add("shake");

    createSpark(button);
}

// Desktop: escapar al acercar el cursor
noFirst.addEventListener("mouseenter", () => {
    escapeButton(noFirst, noMessage, firstMessages, firstCount);
    firstCount++;
});

noSecond.addEventListener("mouseenter", () => {
    escapeButton(noSecond, noMessageSecond, secondMessages, secondCount);
    secondCount++;
});

// Móvil: escapar al intentar tocarlo
noFirst.addEventListener("touchstart", (event) => {
    event.preventDefault();
    escapeButton(noFirst, noMessage, firstMessages, firstCount);
    firstCount++;
}, { passive: false });

noSecond.addEventListener("touchstart", (event) => {
    event.preventDefault();
    escapeButton(noSecond, noMessageSecond, secondMessages, secondCount);
    secondCount++;
}, { passive: false });

// Por si alguien logra hacer click.
noFirst.addEventListener("click", (event) => {
    event.preventDefault();
    escapeButton(noFirst, noMessage, firstMessages, firstCount);
    firstCount++;
});

noSecond.addEventListener("click", (event) => {
    event.preventDefault();
    escapeButton(noSecond, noMessageSecond, secondMessages, secondCount);
    secondCount++;
});

// Primera respuesta SÍ
yesFirst.addEventListener("click", () => {
    createHeartExplosion();
    setTimeout(() => {
        showScreen(screens.poem);
    }, 500);
});

// Continuar después del poema
continuePoem.addEventListener("click", () => {
    createHeartExplosion();
    setTimeout(() => {
        showScreen(screens.eternity);
    }, 500);
});

// Segunda respuesta SÍ
yesSecond.addEventListener("click", () => {
    createHeartExplosion();
    setTimeout(() => {
        showScreen(screens.final);
        createFinalHearts();
    }, 700);
});

// Reiniciar
document.getElementById("restart").addEventListener("click", () => {
    noFirst.style.transform = "";
    noSecond.style.transform = "";
    noFirst.textContent = "No 🙈";
    noSecond.textContent = "No 🙈";
    noMessage.textContent = "";
    noMessageSecond.textContent = "";
    firstCount = 0;
    secondCount = 0;
    showScreen(screens.question);
});

// Corazones flotantes de fondo
const heartsContainer = document.getElementById("hearts-container");

function createBackgroundHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";

    const hearts = ["♥", "♡", "✦", "❤"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 16) + "px";
    heart.style.animationDuration = (7 + Math.random() * 8) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 16000);
}

setInterval(createBackgroundHeart, 900);

// Explosión de corazones
function createHeartExplosion() {
    const symbols = ["♥", "❤", "♡", "✦", "✨"];

    for (let i = 0; i < 28; i++) {
        const element = document.createElement("div");

        element.className = "spark";
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        element.style.left = "50%";
        element.style.top = "50%";

        const x = (Math.random() - 0.5) * 500;
        const y = (Math.random() - 0.5) * 500;

        element.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(.5)",
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.5)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 500,
                easing: "cubic-bezier(.17,.67,.34,1)",
                fill: "forwards"
            }
        );

        document.body.appendChild(element);

        setTimeout(() => element.remove(), 1500);
    }
}

// Pequeños destellos alrededor de un botón
function createSpark(button) {
    const rect = button.getBoundingClientRect();

    const spark = document.createElement("div");
    spark.className = "spark";
    spark.textContent = "✦";
    spark.style.left = rect.left + rect.width / 2 + "px";
    spark.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 1000);
}

// Lluvia final de corazones
function createFinalHearts() {
    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            createBackgroundHeart();
        }, i * 90);
    }
}
