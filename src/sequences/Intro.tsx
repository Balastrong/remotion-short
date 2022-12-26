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

export const Intro = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [0, 20], [0, 1]);
  const subtitleOpacity = interpolate(frame, [0, 25], [0, 1]);
  const scale = spring({
    frame,
    config: {
      mass: 0.5,
    },
    fps,
  });

  const logoTranslationProgress = spring({
    frame: frame - steps.logo,
    fps,
    config: {
      damping: 300,
    },
  });

  // Move the logo up by 150 pixels once the transition starts
  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [500, 0]
  );
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <Title
        titleText="This video"
        customStyle={{
          bottom: '70%',
          opacity: headlineOpacity,
        }}
      />
      <Sequence from={steps.subtitle}>
        <Title
          titleText="is written in React"
          customStyle={{
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
