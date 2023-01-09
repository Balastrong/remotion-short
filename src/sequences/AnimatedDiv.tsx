import { useMemo } from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import styled from 'styled-components';
import { Code } from '../components/Code';

const Panel = styled.div`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const codeSteps: {
  from: number;
  to: number;
  code: string;
  fontSize: number;
}[] = [
  {
    from: 15,
    to: 30,
    code: '<div />',
    fontSize: 150,
  },
  {
    from: 50,
    to: 75,
    code: `<div
 style={{
  backgroundColor: "red"
 }}
/>`,
    fontSize: 60,
  },
  {
    from: 85,
    to: 110,
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

  const codeStep = useMemo(() => codeSteps[codeStepIndex], [codeStepIndex]);
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
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Panel>
        <div
          style={{
            width: 550,
            height: 380,
            borderRadius: 25,
            border: '25px solid black',
            backgroundColor: 'black',
            ...divStyle,
          }}
        />
      </Panel>
      <Panel>
        {/*  
        Write all Code elements on a dive and transform them to the right position
        */}
        {codeStep && (
          <Code
            source={codeStep.code}
            fontSize={codeStep ? codeStep.fontSize : 0}
            minWidth={0}
          />
        )}
      </Panel>
    </AbsoluteFill>
  );
};
