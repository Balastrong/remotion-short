// Change any of these to update your video live.

export const COLOR_1 = '#86A8E7';
export const COLOR_2 = '#91EAE4';

export const FONT_FAMILY = 'SF Pro Text, Helvetica, Arial, sans-serif';

export const TRANSITION_DURATION = 15;

export const DURATIONS: ReadonlyArray<number> = [80, 100];
export const accumulatedFrom = (i: number) =>
  DURATIONS.slice(0, i).reduce((a, b) => a + b, 0);
export const TOTAL_DURATION = DURATIONS.reduce((a, b) => a + b, 0) + 25;
