class Dealer {
    private hand: Hand;

    constructor() {
        this.hand = new Hand();
    }

    public hit(deck: Deck): Card {
        const card = deck.draw();
        this.hand.addCard(card);
        return card;
    }

    public stand(): void {
        // ディーラーがスタンドする処理
    }

    public getHand(): Hand {
        return this.hand;
    }

    public play(deck: Deck): void {
        while (this.hand.getTotalValue() < 17) {
            this.hit(deck);
        }
    }
}