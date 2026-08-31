/**
 * src/i18n/en.js
 * ---------------------------------------------------------------------------
 * The English strings. This file is the source of truth: a key that does not
 * exist here does not exist, and hi.js falls back to it per key, so a string
 * added during a redesign shows in English rather than showing its own key to a
 * visitor.
 *
 * Brand names, the company name, the support address and "WhatsApp" are held
 * outside the dictionaries entirely (content.js), because they are identical in
 * both languages and duplicating them would let them drift apart.
 */

export const en = {
  chooser: {
    title: 'Choose your language',
    sub: 'You can change this at any time.',
    english: 'English',
    hindi: 'हिंदी',
    continue: 'Continue',
  },

  nav: {
    how: 'How it works',
    prizes: 'Prizes',
    pricing: 'Pricing',
    faq: 'Questions',
    demo: 'Demo',
    play: 'Play now',
    menu: 'Menu',
  },

  entertainment: {
    pill: 'For Entertainment Only',
    banner: 'For Entertainment Only · No betting · No money',
  },

  hero: {
    eyebrow: 'Free to play',
    title: 'Tambola with your friends, right here on WhatsApp.',
    sub: 'No app to download. No sign-up. Start a room, share one link, and play — everyone plays on their own phone.',
    cta: 'Play on WhatsApp',
    secondary: 'See how it works',
    reassure: 'No app · No sign-up · No betting, no money',
    tagline: 'Play together, have Masti.',
    ticketRoom: 'Room KFT7QM · Ticket 1',
    ticketMarked: '6 of 15 marked',
    ticketCalled: '24 of 90 called',
    ticketNick: 'halfway there',
  },

  how: {
    eyebrow: 'How it works',
    title: 'Four steps, about a minute',
    lede: 'The whole thing happens in WhatsApp. Nobody has to install anything or make an account.',
    steps: [
      { title: 'Say hi on WhatsApp', body: 'Message our number. No download, no account, no password to forget.' },
      { title: 'Start a room', body: 'Tell us how many friends are playing. You get a room code and a link to forward.' },
      { title: 'Friends tap and join', body: 'One tap opens WhatsApp with the join message ready. They press send and they are in.' },
      { title: 'Play on your own board', body: 'Numbers are called every few seconds. Your ticket fills in live on your own screen — find the number, tap, claim your prize.' },
    ],
    demoTitle: 'Rather see it than read it?',
    demoBody:
      'Watch a round play out, see the chat from the first hi to the first number, and what each prize means on a real ticket.',
    demoCta: 'Watch the demo',
  },

  prizes: {
    eyebrow: 'Six prizes',
    title: 'Exactly the prizes you already know',
    lede: 'The same six every housie evening has always had. Full House ends the game.',
    note: 'Every claim is checked by our servers against the numbers actually called. The first valid claim wins, and a claim that is not yet complete is simply refused.',
    demoCta: 'See each prize on a real ticket',
    items: [
      { name: 'Early Five', body: 'First five numbers marked on your ticket.' },
      { name: 'Top Line', body: 'The whole first row.' },
      { name: 'Middle Line', body: 'The whole second row.' },
      { name: 'Bottom Line', body: 'The whole third row.' },
      { name: 'Four Corners', body: 'The four corner numbers.' },
      { name: 'Full House', body: 'All fifteen numbers. Ends the game.' },
    ],
  },

  trust: {
    eyebrow: 'Before you play',
    readPolicies: 'Read our policies & terms',
    title: 'Let us be clear about what this is',
    items: [
      {
        title: 'You must be 18 or older',
        body: 'MastiPe is for adults. By playing you confirm you are at least 18, or the age of majority where you live.',
      },
      {
        title: 'No betting. No money.',
        body: 'There is nothing to wager and nothing to win in cash. Points and leaderboard positions have no monetary value and cannot be exchanged for anything.',
      },
      {
        title: 'Not a lottery or a prize competition',
        body: 'MastiPe is a game played for fun among people who know each other. It is not a game of chance played for stakes.',
      },
      {
        title: 'We do not facilitate side bets',
        body: 'Any arrangement players make between themselves is not part of this service, is not endorsed by us, and is entirely at their own risk.',
      },
      {
        title: 'Your data stays small',
        body: 'We hold your WhatsApp number, your profile name and your game activity. Message contents are archived after 30 days. We never sell your data.',
      },
    ],
  },

  features: {
    eyebrow: 'Why it feels right',
    title: 'Built like a real tambola evening',
    items: [
      { title: 'A real ticket, on your screen', body: 'A proper 3×9 housie ticket that fills in as numbers are called — not a wall of chat messages.' },
      { title: 'A caller with character', body: 'Two little ducks, twenty-two. Every number announced the way a real caller would.' },
      { title: 'Claims checked by the server', body: 'Every claim is validated against the numbers actually called. First valid claim wins, and nobody can fake it.' },
      { title: 'Everyone on their own phone', body: 'No passing a device around. No shouting across the room. Your ticket is private to you.' },
      { title: 'Points and a weekly leaderboard', body: 'Wins are recorded, so there is something to play for beyond one evening.' },
      { title: 'A report after every game', body: 'A PDF with who won what, how fast you answered, and your whole playing history.' },
    ],
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Free while we are finding our feet',
    sub: 'Play as much as you like during the trial. We will tell you clearly before anything changes.',
    availableNow: 'Available now',
    comingSoon: 'Coming soon',
    upTo: 'Up to {n} players',
    perGame: 'per game',
    start: 'Start playing',
    notYet: 'Not available yet',
    creditsTitle: 'How paying will work',
    creditsBody:
      'When paid plans begin, MastiPe will run on credits. Credits are only spent when a game actually starts calling numbers — creating a room is free, and pressing Start is free. If nobody joins your game, nothing is deducted and your credits stay in your wallet for next time.',
    readPolicy: 'Read the full payments & refunds policy →',
  },

  faq: {
    eyebrow: 'Questions',
    title: 'Things people ask',
    items: [
      { q: 'How old do I have to be?', a: 'You must be 18 or older, or the age of majority where you live. You confirm this when you accept the terms before your first game.' },
      { q: 'Is this gambling?', a: 'No. MastiPe is for entertainment only. There is no betting, no wagering and no money to be won. Points and leaderboard positions have no cash value and cannot be exchanged for anything.' },
      { q: 'Do I need to install anything?', a: 'No. Everything happens in WhatsApp, and your ticket opens as a web page in your normal browser. There is no app and no sign-up.' },
      { q: 'How many people can play?', a: 'A game needs at least two, including the host. Rooms can hold up to thirty players on the free plan.' },
      { q: 'How long does a game take?', a: 'Usually twenty to thirty minutes. A number is called every twenty seconds, and the round moves on sooner when everybody has answered.' },
      { q: 'What happens if nobody joins my room?', a: 'Nothing is charged. When paid plans begin, credits are only spent once the first number is called — so a room nobody joins costs you nothing.' },
      { q: 'Can I play with family in another city?', a: 'Yes. Everyone plays on their own phone wherever they are. Forward the invite link and they can join from anywhere.' },
      { q: 'Can I read the terms in Hindi?', a: 'Yes. This site and all five policy documents are available in Hindi. Use the language switch at the top of the page. The English text remains the legally binding version.' },
    ],
  },

  cta: {
    title: 'Get everyone together tonight',
    sub: 'One message starts it. Your friends need nothing but WhatsApp.',
    button: 'Play on WhatsApp',
    reassure: 'Free to play · no app · no sign-up',
  },

  footer: {
    company: 'Company',
    getInTouch: 'Get in touch',
    legal: 'Legal',
    policies: 'Policies & terms',
    messageUs: 'Message us on WhatsApp',
    quizpe: 'QuizPe — daily maths revision',
    gstin: 'GSTIN',
    rights: 'All rights reserved.',
    trademark: 'MastiPe™ is a trademark of {company}; registration is pending.',
    disclaimer:
      'You must be 18 or older to play. MastiPe is played for entertainment only. There is no betting, no wagering and no money to be won. Points and leaderboard positions have no monetary value. {company} is not responsible for any arrangement made between players outside this service.',
    whatsappNote: 'WhatsApp is a trademark of Meta Platforms, Inc. MastiPe is not affiliated with Meta.',
    report: 'To report abuse, cheating or betting, write to {email} with the mobile number and room code.',
  },

  lang: { switchTo: 'हिंदी', label: 'Language' },
};
