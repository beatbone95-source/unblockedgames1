export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: 'Arcade' | 'Puzzle' | 'Action';
}

export const GAMES: Game[] = [
  {
    id: 'snake',
    title: 'Retro Snake',
    description: 'The classic snake game. Eat the pixels, grow longer, don\'t hit the walls!',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    category: 'Arcade',
  },
  {
    id: 'breakout',
    title: 'Brick Breaker',
    description: 'Destroy all the bricks with your paddle and ball. Classic arcade fun.',
    thumbnail: 'https://picsum.photos/seed/breakout/400/300',
    category: 'Arcade',
  },
  {
    id: 'clicker',
    title: 'Pixel Clicker',
    description: 'Click the pixel to earn points. How fast can you click?',
    thumbnail: 'https://picsum.photos/seed/clicker/400/300',
    category: 'Action',
  },
];
