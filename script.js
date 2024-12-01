const cardsArray = [
    'image1.jpg', 'image1.jpg', 
    'image2.jpg', 'image2.jpg', 
    'image3.jpg', 'image3.jpg', 
    'image4.jpg', 'image4.jpg', 
    'image5.jpg', 'image5.jpg', 
    'image6.jpg', 'image6.jpg', 
    'image7.jpg', 'image7.jpg', 
    'image8.jpg', 'image8.jpg'
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

        // Create an image element to be placed inside the card
        const img = document.createElement('img');
        img.src = `images/${cardValue}`;
        img.classList.add('card-image');
        img.style.display = 'none'; // Hide the image initially

        card.appendChild(img);

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

    const img = card.querySelector('.card-image');
    img.style.display = 'block'; // Show the image when card is flipped
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
    const img1 = card1.querySelector('.card-image');
    const img2 = card2.querySelector('.card-image');

    if (img1.src === img2.src) {
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
            img1.style.display = 'none';
            img2.style.display = 'none';
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
