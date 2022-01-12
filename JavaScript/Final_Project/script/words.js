const wordList = [
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

export function generateLetters(words) {
  const letters = [];
  for (let i = 0; i < words; i++) {
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    letters.push(...word.split(''));
  }
  return letters;
}

export function getWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
