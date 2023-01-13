import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import avatar from '../assets/avatar.jpg';
import { TextContent } from '../components/TextContent';
import { Title } from '../components/Title';
import youtube from '../assets/youtube.png';
import twitter from '../assets/twitter.png';
import { Fade } from '../transitions/Fade';

const backgroundColor = '#004de1';
const textColor = '#ffb11d';

export const Outro = () => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 80], [120, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
      }}
    >
      <Img
        src={avatar}
        style={{
          margin: '0 auto',
          marginTop: '40%',
          borderRadius: '50%',
          border: `25px solid #0a0a0d`,
          width: '80%',
          transform: `rotate(${rotation}deg)`,
        }}
      />
      <Sequence from={20}>
        <Title
          titleText="Thanks for watching!"
          titleColor={textColor}
          customStyle={{
            position: 'absolute',
            top: '7%',
          }}
        />
        <Sequence from={26} durationInFrames={100}>
          <Fade direction="in">
            <>
              <TextContent
                customStyle={{
                  color: textColor,
                  bottom: 320,
                }}
              >
                <Img
                  src={youtube}
                  style={{
                    verticalAlign: 'middle',
                    height: 130,
                  }}
                />{' '}
                @DevLeonardo
              </TextContent>
              <TextContent
                customStyle={{
                  color: textColor,
                  bottom: 100,
                }}
              >
                <Img
                  src={twitter}
                  style={{
                    verticalAlign: 'middle',
                    height: 150,
                  }}
                />{' '}
                @Balastrong
              </TextContent>
            </>
          </Fade>
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
