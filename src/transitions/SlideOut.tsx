import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../constants';

export const SlideOut: React.FC<{
  direction?: 'left' | 'right';
  children: React.ReactNode;
}> = ({ direction = 'left', children }) => {
  const { fps, width, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const spr = spring({
    fps,
    frame: frame - (durationInFrames - TRANSITION_DURATION),
    config: { damping: 200 },
    durationInFrames: TRANSITION_DURATION,
  });

  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${interpolate(
          spr,
          [0, 1],
          [0, direction === 'right' ? width : -width]
        )}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
