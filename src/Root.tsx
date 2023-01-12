import { Composition } from 'remotion';
import { TOTAL_DURATION } from './constants';
import { RemotionShort } from './RemotionShort';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RemotionShort"
        component={RemotionShort}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
