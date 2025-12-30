export interface Card {
    suit: string;
    value: string;
}

export interface Player {
    name: string;
    hand: Card[];
    score: number;
}

export interface Dealer extends Player {
    // Additional properties or methods specific to the dealer can be added here
}

export interface GameState {
    players: Player[];
    dealer: Dealer;
    currentTurn: number;
    isGameOver: boolean;
}