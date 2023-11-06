// DOM Elements
const photos = document.querySelectorAll(".photos .box .image");
const targets = document.querySelectorAll(".targets .box");
const submitButton = document.getElementById("submit-button");

let draggedPhoto = null;

const cardSound = document.getElementById("gamecard")
const applauseSound = document.getElementById("applause")


// Add dragstart event listener to each photo
photos.forEach((photo) => {
    photo.addEventListener("dragstart", () => {
        draggedPhoto = photo;
    });
});

// Add dragover event listener to each target
targets.forEach((target) => {
    target.addEventListener("dragover", (e) => {
        e.preventDefault();
        cardSound.play();
    });

    target.addEventListener("dragenter", () => {
        target.classList.add("hovered");
    });

    target.addEventListener("dragleave", () => {
        target.classList.remove("hovered");
    });

    target.addEventListener("drop", () => {
        if (draggedPhoto) {
            target.appendChild(draggedPhoto);
            target.classList.remove("hovered");
            draggedPhoto = null;
        }
    });
});

// Function for the confetti animation
function celebrate() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

submitButton.addEventListener("click", () => {
    const correctPhotos = Array.from(targets).every((target) => {
        const correctPhotoId = target.getAttribute("data-correct-photo");
        const photoInTarget = target.querySelector(".image");
        return photoInTarget && photoInTarget.id === correctPhotoId;
    });

    if (correctPhotos) {
        celebrate(); // Call the confetti animation
        applauseSound.play();
        alert("Congratulations! Here's your coupon for 20% off: promo20.");
        applauseSound.pause();
    } else {
        alert("Not all photos are in the correct place.");
    }
});