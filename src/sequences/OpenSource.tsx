import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import openSourceLogo from '../assets/open-source-logo.svg';
import remotionGitHub from '../assets/remotion-github.png';
import { TextContent } from '../components/TextContent';

const logoEntranceAnimation = [3, 12];
const gitHubEntranceAnimation = [40, 60];
const zoomAnimation = [
  gitHubEntranceAnimation[0] + 8,
  gitHubEntranceAnimation[1],
];
const zoomOpacity = [
  gitHubEntranceAnimation[1] - 5,
  gitHubEntranceAnimation[1] + 5,
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

  return (
    <>
      <AbsoluteFill>
        <AbsoluteFill
          style={{
            transform: `scale(${githubScaleEntrance})`,
          }}
        >
          <Img src={remotionGitHub} style={{ width: '100%' }} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            top: '20%',
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
          top: '-5%',
        }}
      >
        <TextContent
          customStyle={{
            transform: `scale(${textScale})`,
            opacity: logoOpacity,
          }}
        >
          Open Source
        </TextContent>
      </AbsoluteFill>
    </>
  );
};
