import { StageMessages } from '../types';

export const ZEN_STAGE_REMINDERS: StageMessages[] = [
  {
    stage: 'Begin Softly',
    dayRange: [0, 3],
    messages: [
      'Begin softly. One breath, one day at a time.',
      'The bamboo that weathers the gale bends with the wind. Do not fight; simply breathe.',
      'A quiet evening. Protect the peace of your inner sanctuary.',
      'Like ripples settling on water, allow your restlessness to become still.',
      'You need not carry tomorrow’s burden tonight. Only be present now.',
      'Honor this fragile seedling. It asks only for your gentle attention.',
    ],
  },
  {
    stage: 'Building Rhythm',
    dayRange: [4, 7],
    messages: [
      'The water carves the stone not through violence, but through soft persistence.',
      'Notice the silence between thoughts. A calm rhythm is forming.',
      'One complete week is approaching. Walk quietly upon your path.',
      'Leave screens aside as dusk falls. Let natural darkness guide you to sleep.',
      'You are shedding the noise of old habits. Breathe in the clean air.',
      'A steady tea bowl held in two hands. Hold your focus with that same care.',
    ],
  },
  {
    stage: 'Discipline & Focus',
    dayRange: [8, 30],
    messages: [
      'Simplicity is the ultimate sophistication. Keep your mind uncluttered.',
      'Like an ancient pine on a cliffside, your roots grow deeper each day.',
      'The fog has lifted. Your vision is clear, your posture upright and serene.',
      'Do not barter the peace of a month for ten seconds of illusion.',
      'The blade is polished by steady strokes. Your willpower strengthens in quietude.',
      'Observe the urge as a cloud drifting across an untroubled blue sky.',
    ],
  },
  {
    stage: 'Inner Strength & Clarity',
    dayRange: [31, 90],
    messages: [
      'The clear mirror reflects everything and clings to nothing.',
      'You no longer fight the river; you have become the mountain overlooking it.',
      'A serene aura surrounds your daily actions. Walk with quiet confidence.',
      'Two to three months of retention have rewoven your neural harmony.',
      'Channel your vital vigor into art, study, strength, and quiet contemplation.',
      'The lotus blooms cleanest when rooted in the deepest stillness.',
    ],
  },
  {
    stage: 'Mastery & Peace',
    dayRange: [91, 999999],
    messages: [
      'Empty your cup so that it may be filled with eternal peace.',
      'The circle is complete: unforced, natural, and whole.',
      'True strength requires no demonstration. Your quiet presence is your testament.',
      'You walk in harmony with all things. Continue to cultivate this sacred garden.',
      'The master does not rush, yet nothing is left undone.',
      'Peace within, compassion without. Honor the path you have walked.',
    ],
  },
];

export const ZEN_MILESTONE_NOTIFICATIONS: Record<number, string> = {
  1: 'First Day: The seed is planted in quiet ground.',
  3: 'Day 3: The green sprout breaks through the soil.',
  7: 'Day 7: One full week — the resilience of bamboo.',
  14: 'Day 14: Two weeks of stream-polished clarity.',
  30: 'Day 30: One month — evergreen discipline.',
  60: 'Day 60: Two months of flowing stillness.',
  90: 'Day 90: The circle is drawn — complete neuroplastic reboot.',
  180: 'Day 180: Half a year — steady like the sacred mountain.',
  365: 'Day 365: One full solar year — boundless sky and mastery.',
};

export function getZenStageMessage(days: number): { stage: string; message: string } {
  const stageObj =
    ZEN_STAGE_REMINDERS.find((s) => days >= s.dayRange[0] && days <= s.dayRange[1]) ||
    ZEN_STAGE_REMINDERS[ZEN_STAGE_REMINDERS.length - 1];

  const randomIndex = Math.floor(Math.random() * stageObj.messages.length);
  return {
    stage: stageObj.stage,
    message: stageObj.messages[randomIndex],
  };
}
