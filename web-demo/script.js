const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let dealerHand = [];
let playerHand = [];
let gameOver = false;
let balance = 1000;
let currentBet = 0;

const dealerHandEl = document.getElementById('dealer-hand');
const playerHandEl = document.getElementById('player-hand');
const dealerScoreEl = document.getElementById('dealer-score');
const playerScoreEl = document.getElementById('player-score');
const messageEl = document.getElementById('message');
const balanceEl = document.getElementById('balance');
const betEl = document.getElementById('current-bet');

const btnHit = document.getElementById('btn-hit');
const btnStand = document.getElementById('btn-stand');
const btnReset = document.getElementById('btn-reset');
const btnDeal = document.getElementById('btn-deal');
const bettingControls = document.getElementById('betting-controls');
const actionControls = document.getElementById('action-controls');

// Event Listeners
btnHit.addEventListener('click', hit);
btnStand.addEventListener('click', stand);
btnReset.addEventListener('click', () => {
    bettingControls.style.display = 'block';
    actionControls.style.display = 'none';
    btnReset.style.display = 'none';
    currentBet = 0;
    messageEl.innerText = '賭け金を選択してください';
    updateDisplay();
});

btnDeal.addEventListener('click', () => {
    if (currentBet <= 0) {
        messageEl.innerText = '賭け金を選択してください';
        return;
    }
    initGame();
});

document.querySelectorAll('.btn-bet').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const amount = parseInt(e.target.dataset.amount);
        if (balance >= amount) {
            balance -= amount;
            currentBet += amount;
            updateDisplay();
        } else {
            messageEl.innerText = '残高が足りません！';
        }
    });
});

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

function updateDisplay() {
    balanceEl.innerText = balance;
    betEl.innerText = currentBet;
}

function render() {
    dealerHandEl.innerHTML = '';
    playerHandEl.innerHTML = '';

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
        dealerScoreEl.innerText = `スコア: ${calculateScore(dealerHand)}`;
    } else {
        dealerScoreEl.innerText = `スコア: ?`;
    }

    playerHand.forEach(card => playerHandEl.appendChild(createCardElement(card)));
    playerScoreEl.innerText = `スコア: ${calculateScore(playerHand)}`;

    btnReset.style.display = gameOver ? 'inline-block' : 'none';
    updateDisplay();
}

function initGame() {
    createDeck();
    shuffleDeck();
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    gameOver = false;
    messageEl.innerText = '';

    bettingControls.style.display = 'none';
    actionControls.style.display = 'block';

    if (calculateScore(playerHand) === 21) {
        endGame("ブラックジャック！あなたの勝ちです！", "win_bj");
    }
    render();
}

function hit() {
    if (gameOver) return;
    playerHand.push(deck.pop());
    if (calculateScore(playerHand) > 21) {
        endGame("バースト！あなたの負けです。", "lose");
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

    const playerScore = calculateScore(playerHand);
    if (dealerScore > 21) {
        endGame("ディーラーがバースト！あなたの勝ちです！", "win");
    } else if (dealerScore > playerScore) {
        endGame("ディーラーの勝ちです。", "lose");
    } else if (dealerScore < playerScore) {
        endGame("あなたの勝ちです！", "win");
    } else {
        endGame("引き分けです。", "push");
    }
    render();
}

function endGame(msg, result) {
    gameOver = true;
    messageEl.innerText = msg;

    if (result === "win") {
        balance += currentBet * 2;
    } else if (result === "win_bj") {
        balance += Math.floor(currentBet * 2.5);
    } else if (result === "push") {
        balance += currentBet;
    }
    // "lose" の場合は balance は既に減っているので何もしない

    if (balance <= 0 && result === "lose") {
        messageEl.innerText += " 残高がなくなりました。ゲームオーバーです。";
        balance = 1000; // 自動リセット
    }
}

messageEl.innerText = '賭け金を選択してください';
updateDisplay();
