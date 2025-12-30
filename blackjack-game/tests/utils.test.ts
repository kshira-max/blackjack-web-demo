import { calculateCardValue } from '../src/utils/helpers';

describe('Helper Functions', () => {
    test('should calculate the value of a single card correctly', () => {
        expect(calculateCardValue({ rank: 'A', suit: 'Hearts' })).toBe(11);
        expect(calculateCardValue({ rank: 'K', suit: 'Diamonds' })).toBe(10);
        expect(calculateCardValue({ rank: '5', suit: 'Clubs' })).toBe(5);
    });

    test('should handle Ace as 1 or 11 correctly', () => {
        expect(calculateCardValue({ rank: 'A', suit: 'Spades' }, 10)).toBe(11);
        expect(calculateCardValue({ rank: 'A', suit: 'Spades' }, 11)).toBe(1);
    });

    test('should return 0 for invalid card', () => {
        expect(calculateCardValue({ rank: 'Invalid', suit: 'Hearts' })).toBe(0);
    });
});