class Game {
    private playerHand: Hand;
    private dealerHand: Hand;
    private deck: Deck;

    constructor() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
    }

    public startGame(): void {
        this.deck.shuffle();
        this.dealInitialCards();
        this.playerTurn();
        this.dealerTurn();
        this.determineWinner();
    }

    private dealInitialCards(): void {
        for (let i = 0; i < 2; i++) {
            this.playerHand.addCard(this.deck.drawCard());
            this.dealerHand.addCard(this.deck.drawCard());
        }
    }

    private playerTurn(): void {
        // プレイヤーのターンのロジックを実装
    }

    private dealerTurn(): void {
        // ディーラーのターンのロジックを実装
    }

    private determineWinner(): void {
        // 勝者を決定するロジックを実装
    }
}