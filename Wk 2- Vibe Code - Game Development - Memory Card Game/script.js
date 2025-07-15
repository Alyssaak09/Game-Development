const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restartBtn');
const difficultySelect = document.getElementById('difficulty');

let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 6;
let moves = 0;
let timer = 0;
let timerInterval = null;

const allImages = Array.from({ length: 8 }, (_, i) => `https://picsum.photos/seed/pic${i}/100`);
// Sample image URLs

function createShuffledCards(pairCount) {
  const selectedImages = allImages.slice(0, pairCount);
  const cards = [...selectedImages, ...selectedImages].sort(() => 0.5 - Math.random());
  return cards;
}

function createCard(src) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = src;

  const img = document.createElement('img');
  img.src = src;

  card.appendChild(img);

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);
    moves++;
    movesDisplay.textContent = moves;

    if (flippedCards.length === 2) {
      const [c1, c2] = flippedCards;

      if (c1.dataset.value === c2.dataset.value) {
        c1.classList.add('matched');
        c2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === totalPairs) {
          clearInterval(timerInterval);
          setTimeout(() => alert(`🎉 You won in ${moves} moves and ${timer} seconds!`), 200);
        }
      } else {
        setTimeout(() => {
          c1.classList.remove('flipped');
          c2.classList.remove('flipped');
        }, 800);
      }

      flippedCards = [];
    }
  });

  return card;
}

function initGame() {
  clearInterval(timerInterval);
  timer = 0;
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];

  const difficulty = difficultySelect.value;
  totalPairs = difficulty === 'easy' ? 4 : difficulty === 'hard' ? 8 : 6;

  timerDisplay.textContent = '0';
  movesDisplay.textContent = '0';
  gameBoard.innerHTML = '';

  const shuffledCards = createShuffledCards(totalPairs);
  shuffledCards.forEach(src => {
    const card = createCard(src);
    gameBoard.appendChild(card);
  });

  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

restartBtn.addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);

// Initialize game on load
initGame();
