export const wordList = [
  'Apple',
  'ball',
  'about',
  'act',
  'absolute',
  'live',
  'give',
  'accurate',
  'Deck',
  'participate.',
  'only',
  'calling,',
  'package',
  'serve',
  'ratio',
  'That',
  'orange',
  'shift.',
  'why?',
  'Africa',
  'However,',
  'free;',
  'polls',
  "zebra's",
];

export function generateLetters() {
  const letters = [];
  for (let i = 0; i < 7; i++) {
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    letters.push(...word.split(''));
  }
  return letters;
}
