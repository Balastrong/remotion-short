import { useMemo } from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  useCurrentFrame,
} from 'remotion';
import starIcon from '../assets/star.svg';
import { Code } from '../components/Code';

const starsFrom = 120;
const starsAmount = 100;

const codeSteps: {
  from: number;
  code: string;
  fontSize: number;
}[] = [
  {
    from: 1,
    code: '<div />',
    fontSize: 150,
  },
  {
    from: 40,
    code: `<div
 style={{
  backgroundColor: "red"
 }}
/>`,
    fontSize: 60,
  },
  {
    from: 85,
    code: `<div
 style={{
  backgroundColor: "red"
  transform: "rotate: 360deg"
 }}
/>`,
    fontSize: 50,
  },
];

const stars = new Array(starsAmount).fill(0).map((_, i) => {
  const start = starsFrom + i * 0.5;
  const end = start + 100;
  const rot = 720 * (i / starsAmount); // 2 spins
  const scale = random(i) * 0.5 + 0.5;
  const speed = random(i + 1) + 1;
  const isOdd = i % 2 === 0;

  return {
    id: i,
    start,
    end,
    rot,
    scale,
    speed,
    isOdd,
  };
});

export const AnimatedDiv = () => {
  const frame = useCurrentFrame();
  // Here's a div -> color red -> it can rotate and run away

  const codeStepIndex = useMemo(
    () =>
      codeSteps.findIndex(
        (step, i) =>
          step.from <= frame &&
          (codeSteps[i + 1]?.from >= frame || i === codeSteps.length - 1)
      ),
    [frame]
  );

  const divStyle = useMemo(() => {
    const styleAccumulator = {} as NonNullable<
      React.StyleHTMLAttributes<HTMLDivElement>['style']
    >;

    if (codeStepIndex >= 1) {
      styleAccumulator.backgroundColor = 'red';
    }

    if (codeStepIndex >= 2) {
      styleAccumulator.transform = `rotate(${interpolate(
        frame,
        [codeSteps[2].from, codeSteps[2].from + 90],
        [0, 360]
      )}deg)`;
    }

    return styleAccumulator;
  }, [frame, codeStepIndex]);

  return (
    <>
      <AbsoluteFill
        style={{
          top: 380,
        }}
      >
        <div
          style={{
            width: 550,
            height: 380,
            borderRadius: 25,
            border: '25px solid black',
            backgroundColor: 'black',
            margin: '0 auto',
            transition: 'background-color 1s ease, transform 0.5s ease',
            transform: `scale(${frame <= 0 ? 0 : 1})`,
            zIndex: 1,
            ...divStyle,
          }}
        />
      </AbsoluteFill>
      {codeSteps.map((codeStep, i) => (
        <AbsoluteFill
          key={codeStep.code}
          style={{
            width: '100%',
            top: 1100,
            transition: 'all 0.5s ease',
            left: `${(i - codeStepIndex) * 100}%`,
          }}
        >
          <div
            style={{
              width: '90%',
              margin: '0 auto',
            }}
          >
            <Code
              source={codeStep.code}
              fontSize={codeStep ? codeStep.fontSize : 0}
              minWidth={0}
            />
          </div>
        </AbsoluteFill>
      ))}
      {frame > starsFrom &&
        stars.map(({ id, start, end, rot, scale, speed, isOdd }) => {
          return (
            <div
              key={id}
              style={{
                position: 'fixed',
                left: '50%',
                top: 530,
                transform: `rotate(${rot}deg)`,
              }}
            >
              <Img
                src={starIcon}
                style={{
                  width: 150,
                  height: 150,
                  position: 'absolute',
                  transform: `translate(${interpolate(
                    frame,
                    [start, end],
                    [0, 1000 * speed],
                    {
                      extrapolateLeft: 'clamp',
                    }
                  )}px, ${interpolate(frame, [start, end], [0, 1000 * speed], {
                    extrapolateLeft: 'clamp',
                  })}px) rotate(${interpolate(
                    frame,
                    [id, id + 40],
                    [0, isOdd ? 360 : -360]
                  )}deg) scale(${scale})`,
                }}
              />
            </div>
          );
        })}
    </>
  );
};
