import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import gitHubLogo from '../assets/github-logo.svg';
import openSourceLogo from '../assets/open-source-logo.svg';
import star from '../assets/star.svg';
import { TextContent } from '../components/TextContent';

const backgroundColor = '#d0ffd0';
const textColor = '#1c1f23';

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
  gitHubEntranceAnimation[1] + 12,
  gitHubEntranceAnimation[1] + 20,
];
const starAnimation = [repoUrlAnimation[1] + 13, repoUrlAnimation[1] + 18];

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
  const starScale = interpolate(frame, starAnimation, [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  const starRotation = interpolate(
    frame,
    [starAnimation[0], starAnimation[1] + 10],
    [-180, 0],
    {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );

  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor,
        }}
      >
        <Img
          src={star}
          style={{
            width: '40%',
            margin: '0 auto',
            marginTop: 100,
            transform: `scale(${starScale}`,
            rotate: `${starRotation}deg`,
          }}
        />
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
              color: textColor,
            }}
          >
            Balastrong/remotion-test
          </TextContent>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Img
            src={openSourceLogo}
            style={{
              width: '90%',
              margin: '0 auto',
              marginTop: -40,
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
            color: textColor,
          }}
        >
          Open Source
        </TextContent>
      </AbsoluteFill>
    </>
  );
};
