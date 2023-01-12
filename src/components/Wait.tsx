import { useCurrentFrame } from 'remotion';

const barsNumber = 12;

const bars = new Array(barsNumber).fill(0).map((_, i) => {
  const rotate = (360 / barsNumber) * i;
  return {
    id: i,
    rotate,
  };
});

export const Wait = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {bars.map(({ id, rotate }) => {
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              width: 32,
              height: 150,
              transformOrigin: '0 175%',
              backgroundColor: 'red',
              transform: `rotate(${rotate}deg) translateX(-16px)`,
              borderRadius: 15,
              opacity: ((frame / 3 + barsNumber - id) / barsNumber) % 1,
            }}
          />
        );
      })}
    </div>
  );
};
