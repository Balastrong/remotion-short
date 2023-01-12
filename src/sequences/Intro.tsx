import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Logo } from '../components/Logo';
import { Title } from '../components/Title';

const steps = {
  headline: 0,
  subtitle: 25,
  logo: 45,
};

const titleColor = '#61dafb';

export const Intro = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [0, 20], [0, 1]);
  const subtitleOpacity = interpolate(frame, [0, 25], [0, 1]);

  const logoTranslationProgress = spring({
    frame: frame - steps.logo,
    fps,
    config: {
      damping: 300,
    },
  });

  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [500, 0]
  );
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#4a2ce1',
        color: 'white',
      }}
    >
      <Title
        titleText="This video"
        titleColor={titleColor}
        customStyle={{
          position: 'absolute',
          bottom: '70%',
          opacity: headlineOpacity,
        }}
      />
      <Sequence from={steps.subtitle}>
        <Title
          titleColor={titleColor}
          titleText="is written in React"
          customStyle={{
            position: 'absolute',
            bottom: '55%',
            opacity: subtitleOpacity,
          }}
        />
      </Sequence>
      <Sequence from={steps.logo}>
        <AbsoluteFill
          style={{
            transform: `translateX(${logoTranslation}px)`,
            top: '20%',
            scale: 2,
          }}
        >
          <Logo />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
