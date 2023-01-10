import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { accumulatedFrom, DURATIONS, TRANSITION_DURATION } from './constants';
import { SlideOut } from './transitions/SlideOut';
import { Intro } from './sequences/Intro';
import { OpenSource } from './sequences/OpenSource';
import { WithReact } from './sequences/WithReact';
import { WithRemotion } from './sequences/WithRemotion';
import { SlideIn } from './transitions/SlideIn';
import { AnimatedDiv } from './sequences/AnimatedDiv';
import { Javascript } from './sequences/Javascript';
import { FadeOut } from './transitions/FadeOut';

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
          <SlideOut direction="right">
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
        <Sequence
          from={accumulatedFrom(2)}
          durationInFrames={DURATIONS[2] + TRANSITION_DURATION}
        >
          <SlideOut direction="right">
            <WithReact />
          </SlideOut>
        </Sequence>
        <Sequence from={accumulatedFrom(3)} durationInFrames={DURATIONS[3]}>
          <FadeOut>
            <SlideIn direction="right">
              <WithRemotion />
            </SlideIn>
          </FadeOut>
        </Sequence>
        <Sequence
          from={accumulatedFrom(4)}
          durationInFrames={DURATIONS[4] + TRANSITION_DURATION}
        >
          <FadeOut>
            <AnimatedDiv />
          </FadeOut>
        </Sequence>
        <Sequence from={accumulatedFrom(5)} durationInFrames={DURATIONS[5]}>
          <Javascript />
        </Sequence>
        {/* Closing sequence DevLeonardo? */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
