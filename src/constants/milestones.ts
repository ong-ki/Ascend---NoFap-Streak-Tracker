export interface ZenMilestone {
  days: number;
  title: string;
  tagline: string;
  description: string;
  hankoSeal: string; // Clean seal monogram (e.g. 1D, 7D, 90D)
  philosophy: string;
  kanji?: string;
}

export const ZEN_MILESTONES: ZenMilestone[] = [
  {
    days: 1,
    title: 'The Seedling',
    tagline: 'The First Step',
    description: 'A single step begins a journey of ten thousand miles. You paused the compulsive loop and chose stillness.',
    hankoSeal: '1D',
    philosophy: 'Beginner’s Mind: Returning to a quiet, humble heart.',
  },
  {
    days: 3,
    title: 'The Green Sprout',
    tagline: 'Three Days of Grounding',
    description: 'The initial turbulent gusts begin to quiet down. Your breath deepens into your center.',
    hankoSeal: '3D',
    philosophy: 'Steadfast Heart: An unshakeable center amidst passing storms.',
  },
  {
    days: 7,
    title: 'The Bamboo',
    tagline: 'One Full Week',
    description: 'Like young bamboo in winter, flexible yet unbreakable. You bend with the wind but remain rooted.',
    hankoSeal: '7D',
    philosophy: 'Supple Strength: Softness easily overcomes rigid tension.',
  },
  {
    days: 14,
    title: 'The Polished Stone',
    tagline: 'Two Weeks of Clarity',
    description: 'The steady stream of daily discipline begins smoothing the rough edges of compulsion.',
    hankoSeal: '14D',
    philosophy: 'Simplicity: Stripping away the unnecessary leaves pure mental focus.',
  },
  {
    days: 30,
    title: 'The Ancient Pine',
    tagline: 'One Full Month',
    description: 'Evergreen in all seasons. New inner habits are now naturally woven into your daily existence.',
    hankoSeal: '30D',
    philosophy: 'Natural Harmony: Moving forward with effortless discipline.',
  },
  {
    days: 60,
    title: 'The Clear Stream',
    tagline: 'Two Months of Stillness',
    description: 'Impulses are like fallen leaves on water; you simply observe them drift past without grasping.',
    hankoSeal: '60D',
    philosophy: 'Unclouded Mind: Observing sensations with neutral detachment.',
  },
  {
    days: 90,
    title: 'The Open Circle',
    tagline: 'The 90-Day Reboot',
    description: 'The sacred circle is drawn. True freedom from compulsive dopamine loops and unity with the present.',
    hankoSeal: '90D',
    philosophy: 'Wholeness: Completeness in simplicity and neuroplastic healing.',
  },
  {
    days: 180,
    title: 'The Silent Mountain',
    tagline: 'Half a Year of Mastery',
    description: 'Steadfast like a snow-capped peak. Quiet, grounded, unperturbed by fleeting cravings.',
    hankoSeal: '180D',
    philosophy: 'Deep Stillness: Boundless composure amidst the world’s noise.',
  },
  {
    days: 365,
    title: 'The Boundless Sky',
    tagline: 'One Full Solar Year',
    description: '365 cycles of unbroken mindfulness. Empty of restless craving, full of gentle sovereignty.',
    hankoSeal: '365D',
    philosophy: 'Awakening: Total self-command and lasting inner peace.',
  },
];

export const MILESTONES = ZEN_MILESTONES;
