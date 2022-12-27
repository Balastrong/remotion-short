export const accumulateSequence = (sequence: number[]) => (i: number) =>
  sequence.slice(0, i).reduce((a, b) => a + b, 0);
