import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../constants';

export const FadeOut: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(
          frame,
          [durationInFrames - TRANSITION_DURATION, durationInFrames],
          [1, 0]
        ),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
