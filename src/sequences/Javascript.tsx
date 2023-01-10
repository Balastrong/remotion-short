import { useMemo } from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import jsLogo from '../assets/js-logo.png';
import jsMeme from '../assets/js-meme.png';
import thinkEmoji from '../assets/think-emoji.svg';

const floodFrom = 85;
const floodAmount = 50;

export const Javascript = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const memeOpacity = interpolate(frame, [0, 25], [0, 1]);
  const thinkOpacity = interpolate(frame, [32, 35], [0, 1]);
  const jsLogoOpacity = interpolate(frame, [47, 50], [0, 1]);

  const visibleFloods = interpolate(
    frame,
    [floodFrom, floodFrom + 30],
    [0, floodAmount],
    {
      easing: Easing.in(Easing.ease),
    }
  );

  const floods = useMemo(
    () =>
      new Array(floodAmount).fill(0).map((_, i) => {
        const top = random(i + 5) * height - 300;
        const left = random(i + 10) * width * 1.2 - 400;
        const ownWidth = random(i + 3) * 600 + 200;

        return {
          id: i,
          top,
          left,
          ownWidth,
        };
      }),
    [height, width]
  );

  return (
    <>
      <AbsoluteFill
        style={{
          top: '40%',
        }}
      >
        <Img
          style={{
            width: '90%',
            margin: ' 0 auto',
            opacity: memeOpacity,
          }}
          src={jsMeme}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          top: 980,
          left: -45,
        }}
      >
        <Img
          style={{
            margin: '0 auto',
            width: 200,
            opacity: thinkOpacity,
          }}
          src={thinkEmoji}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          top: '8%',
        }}
      >
        <Img
          style={{
            margin: '0 auto',
            opacity: jsLogoOpacity,
          }}
          src={jsLogo}
        />
      </AbsoluteFill>
      {frame > floodFrom &&
        floods.map(({ id, top, left, ownWidth }) => {
          return (
            visibleFloods > id && (
              <Img
                key={id}
                src={thinkEmoji}
                style={{
                  zIndex: 1,
                  position: 'absolute',
                  top,
                  left,
                  width: ownWidth,
                }}
              />
            )
          );
        })}
    </>
  );
};
