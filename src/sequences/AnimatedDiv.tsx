import { useCallback, useMemo } from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  useCurrentFrame,
} from 'remotion';
import starIcon from '../assets/star.svg';
import { Code } from '../components/Code';

const backgroundColor = '#5f9ea0';

const starsFrom = 135;
const starsAmount = 100;

const codeSteps: {
  from: number;
  code: string;
  fontSize: number;
}[] = [
  {
    from: 16,
    code: '<div />',
    fontSize: 150,
  },
  {
    from: 55,
    code: `<div
 style={{
  backgroundColor: "red"
 }}
/>`,
    fontSize: 60,
  },
  {
    from: 100,
    code: `<div
 style={{
  backgroundColor: "red"
  transform: "rotate: 360deg"
 }}
/>`,
    fontSize: 50,
  },
  {
    from: starsFrom,
    code: `{magic()}
<div
 style={{
  backgroundColor: "red"
  transform: "rotate: 360deg"
 }}
/>`,
    fontSize: 50,
  },
];

export const AnimatedDiv = () => {
  const frame = useCurrentFrame();

  const starTranslate = useCallback(
    (start: number, end: number, speed: number) =>
      interpolate(frame, [start, end], [0, 1000 * speed], {
        extrapolateLeft: 'clamp',
      }),
    [frame]
  );

  const stars = new Array(starsAmount).fill(0).map((_, i) => {
    const start = starsFrom + i * 0.6;
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

  const codeStepIndex = useMemo(
    () =>
      codeSteps.findIndex(
        (step, i) =>
          step.from <= frame &&
          (codeSteps[i + 1]?.from >= frame || i === codeSteps.length - 1)
      ),
    [frame]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
      }}
    >
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
            margin: '0 auto',
            // -transition: 'background-color 1s ease, transform 0.5s ease',
            zIndex: 1,
            backgroundColor: codeStepIndex < 1 ? 'black' : 'red',
            transform:
              codeStepIndex < 2
                ? `scale(${frame && 1})`
                : `rotate(${interpolate(
                    frame,
                    [codeSteps[2].from, codeSteps[2].from + 90],
                    [0, 360]
                  )}deg)`,
          }}
        />
      </AbsoluteFill>
      {codeSteps.map((codeStep, i) => (
        <AbsoluteFill
          key={codeStep.code}
          style={{
            width: '100%',
            top: 1100,
            // -transition: 'all 0.5s ease',
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
          const translate = starTranslate(start, end, speed);
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
                  transform: `translate(${translate}px, ${translate}px) rotate(${interpolate(
                    frame,
                    [id, id + 40],
                    [0, isOdd ? 360 : -360]
                  )}deg) scale(${scale})`,
                }}
              />
            </div>
          );
        })}
    </AbsoluteFill>
  );
};
