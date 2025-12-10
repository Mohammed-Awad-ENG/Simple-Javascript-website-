document.querySelector(".toggle-settings").addEventListener("click", () => {
    document.querySelector(".settings-box").classList.toggle("open");
    document
        .querySelector(".settings-box .toggle-settings i")
        .classList.toggle("fa-spin");
});
// ----------------------------------
// switch color & --main-color localStorage
const colorList = document.querySelectorAll(".color-list li");
colorList.forEach((li) => {
    li.addEventListener("click", () => {
        colorList.forEach((li) => li.classList.remove("active"));
        li.classList.add("active");
        document.documentElement.style.setProperty(
            "--main-color",
            li.getAttribute("data-color")
        );
        window.localStorage.setItem(
            "--main-color",
            li.getAttribute("data-color")
        );
    });
});

const randomBackgroundOp = document.querySelectorAll(".random-background span");
randomBackgroundOp.forEach((e) => {
    e.addEventListener("click", () => {
        window.localStorage.setItem("randomBackground", e.classList.value);
        randomBackgroundOp.forEach((e) => {
            e.classList.remove("active");
        });
        e.classList.add("active");
        randomizeImage();
    });
});

window.onload = () => {
    document.documentElement.style.setProperty(
        "--main-color",
        window.localStorage.getItem("--main-color")
    );
    colorList.forEach((li) => {
        if (
            li.getAttribute("data-color") ===
            window.localStorage.getItem("--main-color")
        ) {
            li.classList.add("active");
        }
        if (window.localStorage.getItem("--main-color") === null) {
            document.querySelector(".default-color").classList.add("active");
        }
    });

    // default-background-settings
    if (window.localStorage.getItem("randomBackground") === null) {
        let DefaultSetting = document.querySelector(
            "#default-background-settings"
        );
        window.localStorage.setItem(
            "randomBackground",
            DefaultSetting.classList.value
        );
        DefaultSetting.classList.add("active");
    } else {
        randomBackgroundOp.forEach((e) => {
            if (
                e.classList.value ===
                window.localStorage.getItem("randomBackground")
            ) {
                e.classList.add("active");
            }
        });
    }
    randomizeImage();
    // --------------------------------------
    if (window.localStorage.getItem("bulletsOption") === null) {
        document.querySelector("#default-options").classList.add("active");
    } else if (window.localStorage.getItem("bulletsOption") === "show") {
        document.querySelector(".nav-bullets").style.display = "block";
        document.querySelector("#default-options").classList.add("active");
    } else {
        document.querySelector(".hide").classList.add("active");
        document.querySelector(".nav-bullets").style.display = "none";
    }
};
// ----------------------------------

// change landing backgroundImage every 10s
let landingPage = document.querySelector(".landing-page");
let imgsArr = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
];

let backgroundInterval = null;
function randomizeImage() {
    if (window.localStorage.getItem("randomBackground") === "yes") {
        // clear any existing interval before starting a new one
        if (backgroundInterval) {
            clearInterval(backgroundInterval);
        }
        backgroundInterval = setInterval(() => {
            let randNumper = Math.floor(Math.random() * imgsArr.length);
            landingPage.style.backgroundImage = `url("imgs/${imgsArr[randNumper]}")`;
        }, 10000);
    } else {
        if (backgroundInterval) {
            clearInterval(backgroundInterval);
            backgroundInterval = null;
        }
    }
}
// ----------------------------------
// Our Skills progress animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.width =
                entry.target.getAttribute("data-progress");
        } else entry.target.style.width = "0px";
    });
});
const skillsProgress = document.querySelectorAll(".skill-prog span");
skillsProgress.forEach((e) => observer.observe(e));
// ----------------------------------
let galleryImages = document.querySelectorAll(".images-box img");
galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt != null) {
            let imgHeading = document.createElement("h3");
            imgHeading.innerText = img.alt;
            popupBox.appendChild(imgHeading);
        }
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");
        closeButton.innerHTML = "X";
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
        closeButton.addEventListener("click", () => {});
    });
});
document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});
// ------------------------------------
let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        document
            .querySelector(`.${e.target.getAttribute("data-section")}`)
            .scrollIntoView({
                behavior: "smooth",
            });
    });
});
let bulletsOptions = document.querySelectorAll(".options span");
bulletsOptions.forEach((op) => {
    op.addEventListener("click", () => {
        bulletsOptions.forEach((e) => e.classList.remove("active"));
        window.localStorage.setItem("bulletsOption", op.className);
        op.classList.add("active");

        if (op.classList[0] === "show") {
            document.querySelector(".nav-bullets").style.display = "block";
        } else {
            document.querySelector(".nav-bullets").style.display = "none";
        }
    });
});
// ---------------------------------------
document.querySelector(".settings-box .reset").addEventListener("click", () => {
    window.localStorage.clear();
    window.location.reload();
});
// ------------------------------------
