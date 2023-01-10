import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const Javascript = () => {
  const frame = useCurrentFrame();

  return <AbsoluteFill>JS</AbsoluteFill>;
};
