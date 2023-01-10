import { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Code } from '../components/Code';

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
    <AbsoluteFill>
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
    </AbsoluteFill>
  );
};
