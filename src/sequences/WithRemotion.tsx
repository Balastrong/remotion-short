import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { Code } from '../components/Code';
import remotionLogo from '../assets/remgif.gif';

const code2 = `function createVideo() {
 const frame = 2000;
 let f = 0;
 while (f < frame) {
  switch (f) {
   case 0:
    renderFrame0();
    break;
   case 1:
    renderFrame1();
    break;
   case 2:
    renderFrame2();
    break;
   case 3:
    renderFrame3();
    break;
 ...`;

const codeStop = 120;

export const WithRemotion = () => {
  const frame = useCurrentFrame();

  const codeCursor = interpolate(frame, [15, codeStop], [26, code2.length], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const remotionOpacity = interpolate(
    frame,
    [codeStop + 20, codeStop + 35],
    [0, 1]
  );

  return (
    <>
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Code
          style={{
            padding: '3%',
          }}
          source={code2.slice(0, codeCursor)}
          fontSize={60}
          minWidth={800}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: remotionOpacity,
        }}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF6',
          }}
        >
          <Img src={remotionLogo} />
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
};
