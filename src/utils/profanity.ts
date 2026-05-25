import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

export function isProfane(text: string): boolean {
  return matcher.hasMatch(text);
}

const SNARKY_RESPONSES = [
  "Impressive vocabulary. Try again with something your mom could read.",
  "Bold choice. Less bold than actually sharing your name, but here we are.",
  "That's a word! Just not one that's going on my portfolio.",
  "I respect the energy. I do not respect the input. Try again.",
  "This is a portfolio site, not a roast. Please reconsider.",
  "Sir, this is a Wendy's. Also a portfolio. Neither accepts that.",
  "Truly a name for the ages. Pick a different one.",
  "I've seen worse. I've also seen better. Mostly better.",
];

export function getProfanityResponse(): string {
  return SNARKY_RESPONSES[Math.floor(Math.random() * SNARKY_RESPONSES.length)]!;
}
