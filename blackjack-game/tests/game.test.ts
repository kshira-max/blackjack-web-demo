import { Game } from '../src/game/game';
import { Deck } from '../src/game/deck';
import { Hand } from '../src/game/hand';

describe('Game Class', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    test('should initialize with a new deck of cards', () => {
        expect(game.deck).toBeInstanceOf(Deck);
        expect(game.deck.cards.length).toBe(52);
    });

    test('should deal cards to player and dealer', () => {
        game.start();
        expect(game.playerHand.cards.length).toBe(2);
        expect(game.dealerHand.cards.length).toBe(2);
    });

    test('should calculate player hand value correctly', () => {
        game.playerHand.addCard({ value: '10', suit: 'Hearts' });
        game.playerHand.addCard({ value: 'A', suit: 'Spades' });
        expect(game.playerHand.calculateValue()).toBe(21);
    });

    test('should allow player to hit', () => {
        game.start();
        const initialHandSize = game.playerHand.cards.length;
        game.playerHit();
        expect(game.playerHand.cards.length).toBe(initialHandSize + 1);
    });

    test('should end the game correctly', () => {
        game.start();
        game.end();
        expect(game.isGameOver).toBe(true);
    });
});