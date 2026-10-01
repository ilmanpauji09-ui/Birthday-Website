/* =========================================================
   PAGE SYSTEM
========================================================= */

const pages =
    document.querySelectorAll(".page");

const currentPage =
    document.getElementById("currentPage");

let currentIndex = 0;



/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }

    pages.forEach((page, i) => {

        page.classList.remove("active");

        if (i === index) {

            page.classList.add("active");

        }

    });

    currentIndex = index;

    updateCounter();

}



/* =========================================================
   COUNTER
========================================================= */

function updateCounter() {

    /*
        Halaman rahasia tidak dihitung.
        Jadi halaman birthday experience
        tetap terlihat 01 - 10.
    */

    let number;

    if (currentIndex === 0) {

        number = 0;

    } else {

        number = currentIndex;

    }

    currentPage.textContent =
        String(number).padStart(2, "0");

}



/* =========================================================
   NEXT BUTTON
========================================================= */

document
    .querySelectorAll(".next-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const next =
                    parseInt(
                        button.dataset.next
                    );

                showPage(next);

            }
        );

    });



/* =========================================================
   SECRET NAME CHECK
========================================================= */

const nameInput =
    document.getElementById("nameInput");

const checkName =
    document.getElementById("checkName");

const wrongMessage =
    document.getElementById("wrongMessage");



const correctName =
    "muhamad ilman pauji";



function checkAnswer() {

    const answer =
        nameInput.value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");


    if (answer === correctName) {

        /*
            BENAR
        */

        wrongMessage.style.display =
            "none";

        nameInput.style.borderColor =
            "#8de3a4";

        createCelebration();

        setTimeout(() => {

            showPage(1);

        }, 400);

    } else {

        /*
            SALAH
        */

        wrongMessage.style.display =
            "block";

        nameInput.style.borderColor =
            "#e78b9a";

        nameInput.classList.remove(
            "shake-input"
        );

        void nameInput.offsetWidth;

        nameInput.classList.add(
            "shake-input"
        );

    }

}



checkName.addEventListener(
    "click",
    checkAnswer
);



/*
    Bisa tekan ENTER
*/

nameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            checkAnswer();

        }

    }
);



/* =========================================================
   CELEBRATION
========================================================= */

function createCelebration() {

    const container =
        document.getElementById(
            "celebrationContainer"
        );


    const symbols = [

        "💗",
        "💖",
        "💕",
        "💘",
        "✨",
        "⭐",
        "🌟",
        "🎉",
        "🥳",
        "♡"

    ];


    /*
        Buat 80 partikel
    */

    for (let i = 0; i < 80; i++) {

        const confetti =
            document.createElement(
                "div"
            );

        confetti.className =
            "confetti";

        confetti.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.setProperty(

            "--duration",

            (2 + Math.random() * 3) + "s"

        );


        confetti.style.animationDelay =
            Math.random() * 1 + "s";


        container.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 6000);

    }

}



/* =========================================================
   MINI GAME
========================================================= */

const gameOptions =
    document.querySelectorAll(
        ".game-option"
    );

const gameResult =
    document.getElementById(
        "gameResult"
    );

const gameNext =
    document.getElementById(
        "gameNext"
    );


gameOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            /*
                Reset semua
            */

            gameOptions.forEach(
                item => {

                    item.classList.remove(
                        "selected-correct"
                    );

                    item.classList.remove(
                        "selected-wrong"
                    );

                }
            );


            if (
                option.classList.contains(
                    "correct-answer"
                )
            ) {

                option.classList.add(
                    "selected-correct"
                );


                gameResult.innerHTML =
                    "Yaa benar! 😭❤️<br>" +
                    "Jawabannya memang semuanya.";


                gameNext.classList.remove(
                    "hidden"
                );

            } else {

                option.classList.add(
                    "selected-wrong"
                );


                gameResult.innerHTML =
                    "Hmmmm... bukan itu 😭<br>" +
                    "Coba pilih lagi.";

            }

        }
    );

});


/*
    Tombol lanjut game
*/

gameNext.addEventListener(
    "click",
    () => {

        showPage(8);

    }
);



/* =========================================================
   TIME CAPSULE
========================================================= */

const openCapsule =
    document.getElementById(
        "openCapsule"
    );

const capsuleLetter =
    document.getElementById(
        "capsuleLetter"
    );


openCapsule.addEventListener(
    "click",
    () => {

        capsuleLetter.style.display =
            "block";

        openCapsule.innerHTML =
            "Surat sudah terbuka ♡";

        openCapsule.disabled =
            true;

        /*
            Setelah surat dibuka,
            otomatis muncul tombol
            setelah beberapa saat.
        */

        setTimeout(() => {

            const nextButton =
                document.createElement(
                    "button"
                );

            nextButton.className =
                "primary-button";

            nextButton.innerHTML =
                "Lanjut ke pesan terakhir ✨";

            nextButton.style.marginTop =
                "20px";

            nextButton.addEventListener(
                "click",
                () => {

                    showPage(9);

                }
            );

            document
                .querySelector(
                    ".capsule-content"
                )
                .appendChild(
                    nextButton
                );

        }, 1200);

    }
);



/* =========================================================
   MUSIC
========================================================= */

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


musicButton.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play()
                .then(() => {

                    musicButton.classList.add(
                        "playing"
                    );

                })
                .catch(() => {

                    alert(
                        "File music.mp3 belum ditemukan."
                    );

                });

        } else {

            music.pause();

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);



/* =========================================================
   AUTO MUSIC AFTER CORRECT ANSWER
========================================================= */

function startMusic() {

    music.play()
        .then(() => {

            musicButton.classList.add(
                "playing"
            );

        })
        .catch(() => {

            /*
                Browser bisa memblokir
                autoplay.

                Musik tetap bisa
                dimainkan lewat tombol.
            */

        });

}



/* =========================================================
   RESTART
========================================================= */

const restartButton =
    document.getElementById(
        "restartButton"
    );


restartButton.addEventListener(
    "click",
    () => {

        /*
            Reset
        */

        nameInput.value = "";

        wrongMessage.style.display =
            "none";

        capsuleLetter.style.display =
            "none";

        gameResult.innerHTML =
            "";

        gameNext.classList.add(
            "hidden"
        );


        gameOptions.forEach(
            option => {

                option.classList.remove(
                    "selected-correct"
                );

                option.classList.remove(
                    "selected-wrong"
                );

            }
        );


        showPage(0);

    }
);



/* =========================================================
   INPUT FOCUS
========================================================= */

window.addEventListener(
    "load",
    () => {

        nameInput.focus();

    }
);