export function calculateHandValue(hand: Array<{ value: number }>): number {
    let totalValue = 0;
    let aceCount = 0;

    hand.forEach(card => {
        totalValue += card.value;
        if (card.value === 11) {
            aceCount++;
        }
    });

    while (totalValue > 21 && aceCount > 0) {
        totalValue -= 10;
        aceCount--;
    }

    return totalValue;
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}