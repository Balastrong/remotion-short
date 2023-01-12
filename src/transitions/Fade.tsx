import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../constants';

export const Fade: React.FC<{
  direction: 'in' | 'out';
  children: React.ReactNode;
}> = ({ direction, children }) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(
          frame,
          direction === 'in'
            ? [0, TRANSITION_DURATION]
            : [durationInFrames - TRANSITION_DURATION, durationInFrames],
          direction === 'in' ? [0, 1] : [1, 0]
        ),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
