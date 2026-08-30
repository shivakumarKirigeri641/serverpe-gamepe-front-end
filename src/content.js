/**
 * src/content.js
 * ---------------------------------------------------------------------------
 * Copy and constants that do not come from the back-end.
 *
 * Anything factual about the company, the prices or the terms is fetched
 * instead — see lib/api.js. What lives here is the pitch.
 */

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919739622631';
export const WHATSAPP_DISPLAY = '+91 97396 22631';

/** Opens WhatsApp with the first message already typed. */
export const waLink = (text = 'Hi') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const BRAND = {
  name: 'MastiPe',
  tagline: 'Play together, have Masti.',
  hero: 'Tambola with your friends, right here on WhatsApp.',
  sub: 'No app to download. No sign-up. Start a room, share one link, and play — everyone plays on their own phone.',
};

export const STEPS = [
  {
    n: '1',
    title: 'Say hi on WhatsApp',
    body: 'Message our number. No download, no account, no password to forget.',
  },
  {
    n: '2',
    title: 'Start a room',
    body: 'Tell us how many friends are playing. You get a room code and a link to forward.',
  },
  {
    n: '3',
    title: 'Friends tap and join',
    body: 'One tap opens WhatsApp with the join message ready. They press send and they are in.',
  },
  {
    n: '4',
    title: 'Play on your own board',
    body: 'Numbers are called every few seconds. Your ticket fills in live on your own screen — find the number, tap, claim your prize.',
  },
];

export const PRIZES = [
  { name: 'Early Five', body: 'First five numbers marked on your ticket.' },
  { name: 'Top Line', body: 'The whole first row.' },
  { name: 'Middle Line', body: 'The whole second row.' },
  { name: 'Bottom Line', body: 'The whole third row.' },
  { name: 'Four Corners', body: 'The four corner numbers.' },
  { name: 'Full House', body: 'All fifteen numbers. Ends the game.' },
];

export const FEATURES = [
  {
    icon: '🎟️',
    title: 'A real ticket, on your screen',
    body: 'A proper 3×9 housie ticket that fills in as numbers are called — not a wall of chat messages.',
  },
  {
    icon: '📣',
    title: 'A caller with character',
    body: 'Two little ducks, twenty-two. Every number announced the way a real caller would.',
  },
  {
    icon: '⚖️',
    title: 'Claims checked by the server',
    body: 'Every claim is validated against the numbers actually called. First valid claim wins, and nobody can fake it.',
  },
  {
    icon: '👥',
    title: 'Everyone on their own phone',
    body: 'No passing a device around. No shouting across the room. Your ticket is private to you.',
  },
  {
    icon: '🏆',
    title: 'Points and a weekly leaderboard',
    body: 'Wins are recorded, so there is something to play for beyond one evening.',
  },
  {
    icon: '📄',
    title: 'A report after every game',
    body: 'A PDF with who won what, how fast you answered, and your whole playing history.',
  },
];

export const FAQ = [
  {
    q: 'How old do I have to be?',
    a: 'You must be 18 or older, or the age of majority where you live. You confirm this when you accept the terms before your first game.',
  },
  {
    q: 'Is this gambling?',
    a: 'No. MastiPe is for entertainment only. There is no betting, no wagering and no money to be won. Points and leaderboard positions have no cash value and cannot be exchanged for anything.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. Everything happens in WhatsApp, and your ticket opens as a web page in your normal browser. There is no app and no sign-up.',
  },
  {
    q: 'How many people can play?',
    a: 'A game needs at least two, including the host. Rooms can hold up to thirty players on the free plan.',
  },
  {
    q: 'How long does a game take?',
    a: 'Usually twenty to thirty minutes. A number is called every twenty seconds, and the round moves on sooner when everybody has answered.',
  },
  {
    q: 'What happens if nobody joins my room?',
    a: 'Nothing is charged. When paid plans begin, credits are only spent once the first number is called — so a room nobody joins costs you nothing.',
  },
  {
    q: 'Can I play with family in another city?',
    a: 'Yes. Everyone plays on their own phone wherever they are. Forward the invite link and they can join from anywhere.',
  },
];
