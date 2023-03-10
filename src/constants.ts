import { accumulateSequence } from './utils';

export const COLOR_1 = '#86A8E7';
export const COLOR_2 = '#91EAE4';
export const FONT_FAMILY = 'SF Pro Text, Helvetica, Arial, sans-serif';
export const TRANSITION_DURATION = 15;
export const DURATIONS: ReadonlyArray<number> = [
  100, 190, 150, 225, 210, 135, 160,
];
export const accumulatedFrom = accumulateSequence(DURATIONS as number[]);
export const TOTAL_DURATION = DURATIONS.reduce((a, b) => a + b, 0);
