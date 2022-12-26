import { Composition } from 'remotion';
import { TOTAL_DURATION } from './constants';
import { RemotionShort } from './RemotionShort';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
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
