import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import youtubeLogo from '../assets/youtube.png';
import { Logo } from '../components/Logo';
import { Wait } from '../components/Wait';
import { TRANSITION_DURATION } from '../constants';
import { accumulateSequence } from '../utils';

const backgroundColor = '#03191E';
const textColor = '#F3B700';

const steps = [TRANSITION_DURATION - 2, 40, 30, 5];
const accumulateFrom = accumulateSequence(steps);
const waitFrom = accumulateFrom(1);
const videoFrom = accumulateFrom(2);
const plusFrom = accumulateFrom(3);
const reactLogoFrom = accumulateFrom(4);

export const WithReact = () => {
  const frame = useCurrentFrame();

  const waitOpacity = interpolate(frame, [waitFrom, waitFrom + 8], [0, 1]);
  const logoLeft = interpolate(
    frame,
    [videoFrom, videoFrom + 5],
    [-1000, -305],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const plusOpacity = interpolate(frame, [plusFrom, plusFrom + 5], [0, 1]);
  const logoRight = interpolate(
    frame,
    [reactLogoFrom, reactLogoFrom + 5],
    [1000, 290],
    {
      easing: Easing.out(Easing.ease),
      extrapolateRight: 'clamp',
    }
  );

  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        <AbsoluteFill
          style={{
            opacity: waitOpacity,
            display: 'flex',
            alignItems: 'center',
            top: 250,
          }}
        >
          <Wait color={textColor} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            top: 250,
          }}
        >
          <AbsoluteFill
            style={{
              transform: `translateX(${logoLeft}px) scale(0.4)`,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Img src={youtubeLogo} />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              opacity: plusOpacity,
              display: 'flex',
              justifyContent: 'center',
              fontSize: 260,
              alignItems: 'center',
            }}
          >
            +
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              transform: `translateX(${logoRight}px) scale(0.65)`,
            }}
          >
            <Logo />
          </AbsoluteFill>
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
};
