class Hand {
    private cards: Card[];

    constructor() {
        this.cards = [];
    }

    addCard(card: Card): void {
        this.cards.push(card);
    }

    getTotalValue(): number {
        let total = 0;
        let aces = 0;

        for (const card of this.cards) {
            total += card.value;
            if (card.value === 11) {
                aces++;
            }
        }

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    getCards(): Card[] {
        return this.cards;
    }

    clearHand(): void {
        this.cards = [];
    }
}