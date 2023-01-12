import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import gitHubLogo from '../assets/github-logo.svg';
import openSourceLogo from '../assets/open-source-logo.svg';
import { TextContent } from '../components/TextContent';

const logoEntranceAnimation = [3, 12];
const gitHubEntranceAnimation = [40, 60];
const zoomAnimation = [
  gitHubEntranceAnimation[0] + 7,
  gitHubEntranceAnimation[1],
];
const zoomOpacity = [
  gitHubEntranceAnimation[1] - 5,
  gitHubEntranceAnimation[1] + 5,
];
const repoUrlAnimation = [
  gitHubEntranceAnimation[1] + 13,
  gitHubEntranceAnimation[1] + 18,
];

export const OpenSource = () => {
  const frame = useCurrentFrame();
  const logoScale =
    frame <= logoEntranceAnimation[1]
      ? interpolate(frame, logoEntranceAnimation, [0, 1], {
          easing: Easing.out(Easing.ease),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : interpolate(frame, zoomAnimation, [1, 5], {
          easing: Easing.in(Easing.ease),
          extrapolateLeft: 'clamp',
        });
  const logoOpacity = interpolate(frame, zoomOpacity, [1, 0]);
  const textScale = interpolate(
    frame,
    [logoEntranceAnimation[0] + 3, logoEntranceAnimation[1] + 3],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const githubScaleEntrance = interpolate(
    frame,
    gitHubEntranceAnimation,
    [0, 1],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const repoUrlOpacity = interpolate(frame, repoUrlAnimation, [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textTranslateY = interpolate(frame, zoomAnimation, [0, 600], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <>
      <AbsoluteFill>
        <AbsoluteFill
          style={{
            transform: `scale(${githubScaleEntrance})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Img src={gitHubLogo} style={{ width: '75%' }} />
          <TextContent
            customStyle={{
              fontSize: 80,
              bottom: 275,
              opacity: repoUrlOpacity,
            }}
          >
            Balastrong/remotion-test
          </TextContent>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            top: 416,
          }}
        >
          <Img
            src={openSourceLogo}
            style={{
              width: '100%',
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          bottom: 300,
        }}
      >
        <TextContent
          customStyle={{
            transform: `scale(${textScale}) translateY(${textTranslateY}px)`,
            opacity: logoOpacity,
          }}
        >
          Open Source
        </TextContent>
      </AbsoluteFill>
    </>
  );
};

// Logo al centro
// url sotto
// leave a star sopra con una stella che cade e ruota
