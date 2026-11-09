export interface ZenQuote {
  text: string;
  author: string;
  theme: string;
}

export const ZEN_QUOTES: ZenQuote[] = [
  {
    text: 'The old pond. A frog leaps in. The sound of water.',
    author: 'Matsuo Basho',
    theme: 'Stillness',
  },
  {
    text: 'In the beginner’s mind there are many possibilities; in the expert’s mind there are few.',
    author: 'Shunryu Suzuki',
    theme: 'Beginner’s Mind',
  },
  {
    text: 'Live like floating clouds and flowing water: smooth, unhurried, resisting nothing.',
    author: 'Zen Wisdom',
    theme: 'Natural Flow',
  },
  {
    text: 'Learn from the pine tree of the pine; learn from the bamboo of the bamboo.',
    author: 'Matsuo Basho',
    theme: 'Resilience',
  },
  {
    text: 'Do not seek to follow in the footsteps of the wise; seek what they sought.',
    author: 'Matsuo Basho',
    theme: 'Inner Truth',
  },
  {
    text: 'Harmony, respect, purity, and tranquility. Sip this moment like a quiet bowl of tea.',
    author: 'Sen no Rikyu',
    theme: 'Harmony',
  },
  {
    text: 'When the heart is quiet and still, even the hottest day carries a cool breeze.',
    author: 'Zen Proverb',
    theme: 'Calm',
  },
  {
    text: 'Dripping water hollows out stone, not through force, but through constant perseverance.',
    author: 'Ancient Wisdom',
    theme: 'Persistence',
  },
];

export type Quote = ZenQuote;
export const MOTIVATIONAL_QUOTES = ZEN_QUOTES;
