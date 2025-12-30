const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let dealerHand = [];
let playerHand = [];
let gameOver = false;

const dealerHandEl = document.getElementById('dealer-hand');
const playerHandEl = document.getElementById('player-hand');
const dealerScoreEl = document.getElementById('dealer-score');
const playerScoreEl = document.getElementById('player-score');
const messageEl = document.getElementById('message');
const btnHit = document.getElementById('btn-hit');
const btnStand = document.getElementById('btn-stand');
const btnReset = document.getElementById('btn-reset');

btnHit.addEventListener('click', hit);
btnStand.addEventListener('click', stand);
btnReset.addEventListener('click', initGame);

function createDeck() {
    deck = [];
    for (let suit of SUITS) {
        for (let value of VALUES) {
            deck.push({ suit, value });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
        score += getCardValue(card);
        if (card.value === 'A') aceCount++;
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function createCardElement(card) {
    const div = document.createElement('div');
    div.className = 'card';
    if (['♥', '♦'].includes(card.suit)) div.classList.add('red');
    div.innerText = `${card.suit}${card.value}`;
    return div;
}

function render() {
    dealerHandEl.innerHTML = '';
    playerHandEl.innerHTML = '';

    // Dealer
    dealerHand.forEach((card, index) => {
        if (index === 0 && !gameOver) {
            const hiddenCard = document.createElement('div');
            hiddenCard.className = 'card hidden';
            dealerHandEl.appendChild(hiddenCard);
        } else {
            dealerHandEl.appendChild(createCardElement(card));
        }
    });

    if (gameOver) {
        const score = calculateScore(dealerHand);
        dealerScoreEl.innerText = `スコア: ${score}`;
    } else {
        dealerScoreEl.innerText = `スコア: ?`;
    }

    // Player
    playerHand.forEach(card => {
        playerHandEl.appendChild(createCardElement(card));
    });
    const playerScore = calculateScore(playerHand);
    playerScoreEl.innerText = `スコア: ${playerScore}`;

    // Buttons
    btnHit.disabled = gameOver;
    btnStand.disabled = gameOver;
    btnReset.style.display = gameOver ? 'inline-block' : 'none';
}

function initGame() {
    createDeck();
    shuffleDeck();
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    gameOver = false;
    messageEl.innerText = '';
    render();
    
    if (calculateScore(playerHand) === 21) {
        messageEl.innerText = "ブラックジャック！あなたの勝ちです！";
        gameOver = true;
        render();
    }
}

function hit() {
    if (gameOver) return;
    playerHand.push(deck.pop());
    const score = calculateScore(playerHand);
    if (score > 21) {
        messageEl.innerText = "バースト！あなたの負けです。";
        gameOver = true;
    }
    render();
}

function stand() {
    if (gameOver) return;
    gameOver = true;
    
    let dealerScore = calculateScore(dealerHand);
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    
    render(); // Reveal dealer card
    
    const playerScore = calculateScore(playerHand);
    
    if (dealerScore > 21) {
        messageEl.innerText = "ディーラーがバースト！あなたの勝ちです！";
    } else if (dealerScore > playerScore) {
        messageEl.innerText = "ディーラーの勝ちです。";
    } else if (dealerScore < playerScore) {
        messageEl.innerText = "あなたの勝ちです！";
    } else {
        messageEl.innerText = "引き分けです。";
    }
}

initGame();
