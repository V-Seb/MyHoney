const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let shuffledCards = [];
let flippedCards = [];
let matchedCards = 0;
const gameGrid = document.getElementById('gameGrid');

// Function to shuffle the cards
function shuffleCards() {
    shuffledCards = [...cardsArray];
    shuffledCards.sort(() => Math.random() - 0.5); // Shuffle randomly
}

// Function to create and display the cards
function createCards() {
    gameGrid.innerHTML = ''; // Clear any existing cards
    shuffledCards.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    });
}

// Function to flip a card
function flipCard(event) {
    const card = event.target;
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
        return; // Ignore if already flipped or matched
    }

    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    flippedCards.push(card);

    // If two cards are flipped, check for a match
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Function to check if the flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // Match found
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === shuffledCards.length) {
            setTimeout(() => {
                alert('Congratulations, you won the game!');
                resetGame();
            }, 500);
        }
    } else {
        // No match found, flip back after a short delay
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Function to reset the game
function resetGame() {
    matchedCards = 0;
    flippedCards = [];
    shuffleCards();
    createCards();
}

// Start the game
shuffleCards();
createCards();
