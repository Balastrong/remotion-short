import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import jsLogo from '../assets/js-logo.png';
import { Logo } from '../components/Logo';
import { TRANSITION_DURATION } from '../constants';
import { accumulateSequence } from '../utils';

const steps = [TRANSITION_DURATION + 5, 40, 30, 5];
const accumulateFrom = accumulateSequence(steps);
const waitFrom = accumulateFrom(1);
const jsLogoFrom = accumulateFrom(2);
const plusFrom = accumulateFrom(3);
const reactLogoFrom = accumulateFrom(4);

export const WithReact = () => {
  const frame = useCurrentFrame();

  const waitOpacity = interpolate(frame, [waitFrom, waitFrom + 5], [0, 1]);
  const logoLeft = interpolate(
    frame,
    [jsLogoFrom, jsLogoFrom + 5],
    [-1000, -280],
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
    [1000, 295],
    {
      easing: Easing.out(Easing.ease),
      extrapolateRight: 'clamp',
    }
  );

  return (
    <>
      <AbsoluteFill>
        <AbsoluteFill
          style={{
            opacity: waitOpacity,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: -400,
          }}
        >
          Wait{' '}
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
            <Img src={jsLogo} />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              opacity: plusOpacity,
              display: 'flex',
              justifyContent: 'center',
              fontSize: 280,
              alignItems: 'center',
            }}
          >
            <span>+</span>
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              transform: `translateX(${logoRight}px) scale(0.6)`,
            }}
          >
            <Logo />
          </AbsoluteFill>
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
};

// Wait
// JS + React
