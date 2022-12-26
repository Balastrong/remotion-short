import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { accumulatedFrom, DURATIONS, TRANSITION_DURATION } from './constants';
import { SlideOut } from './components/SlideOut';
import { Intro } from './sequences/Intro';
import { OpenSource } from './sequences/OpenSource';

export const RemotionShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <AbsoluteFill style={{ opacity }}>
        <Sequence
          from={accumulatedFrom(0)}
          durationInFrames={DURATIONS[0] + TRANSITION_DURATION}
        >
          <SlideOut>
            <Intro />
          </SlideOut>
        </Sequence>
        <Sequence
          from={accumulatedFrom(1)}
          durationInFrames={DURATIONS[1] + TRANSITION_DURATION}
        >
          <SlideOut>
            <OpenSource />
          </SlideOut>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
