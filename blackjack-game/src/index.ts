import { Game } from './game/game';
import { CLI } from './ui/cli';

const startGame = () => {
    const game = new Game();
    const cli = new CLI(game);
    cli.start();
};

startGame();