const cards = document.querySelectorAll('.game-card');
const victoryScreen = document.getElementById('victory')
const countFlip = document.getElementById('flip-count')
const countVictory = document.getElementById('victory-count')
// VARIABLES
let hasFlippedCard = false;
// LOCKER
let lockBoard = false;
let firstCard, secondCard;
let totalFlip = 0;
let pointVictory = 0;
// FUNCTION FLIP CARD
function flipCard() {
    // LOCKER DE JEU
    if(lockBoard) return;
    // DOUBLE CLICK
    if(this === firstCard) return;
    // AJOUT DE LA CLASS FLIP
    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        // PREMIER CLICK
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        // SECOND CLICK
        secondCard = this;
        checkForMatch();
}
function checkForMatch() {
    if (firstCard.dataset.cardname === secondCard.dataset.cardname) {
        disableCards();
    } else {
        unflipCards();
    }
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    totalFlip++;
    pointVictory++;
    countFlip.innerText = totalFlip;
    countVictory.innerText = pointVictory;
    if (pointVictory === 6) {
        victoryScreen.classList.add('display');
    }
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        totalFlip++;
        countFlip.innerText = totalFlip;
        resetBoard();
    }, 1000);
}
// RESET LES VALEURS
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));