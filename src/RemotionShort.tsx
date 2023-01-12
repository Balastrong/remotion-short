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
import { Fade } from './transitions/Fade';

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
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF',
      }}
    >
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
            <Fade direction="in">
              <OpenSource />
            </Fade>
          </SlideOut>
        </Sequence>
        <Sequence
          from={accumulatedFrom(2)}
          durationInFrames={DURATIONS[2] + TRANSITION_DURATION}
        >
          <SlideOut direction="right">
            <Fade direction="in">
              <WithReact />
            </Fade>
          </SlideOut>
        </Sequence>
        <Sequence
          from={accumulatedFrom(3)}
          durationInFrames={DURATIONS[3] + TRANSITION_DURATION}
        >
          <Fade direction="out">
            <SlideIn direction="right">
              <WithRemotion />
            </SlideIn>
          </Fade>
        </Sequence>
        <Sequence
          from={accumulatedFrom(4)}
          durationInFrames={DURATIONS[4] + TRANSITION_DURATION}
        >
          <Fade direction="in">
            <Fade direction="out">
              <AnimatedDiv />
            </Fade>
          </Fade>
        </Sequence>
        <Sequence from={accumulatedFrom(5)} durationInFrames={DURATIONS[5]}>
          <Fade direction="in">
            <Javascript />
          </Fade>
        </Sequence>
        {/* Closing sequence DevLeonardo? */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
