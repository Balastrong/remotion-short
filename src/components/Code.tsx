import Highlight, { defaultProps } from 'prism-react-renderer';

import { theme } from './oneDark';

const size = 50;

const Circle = ({ color }: { color: string }) => (
  <div
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: size / 2,
    }}
  />
);

// Kindly borrowed from https://github.com/wcandillon/remotion-fireship
export const Code = ({
  source,
  fontSize,
  minWidth,
  style,
}: {
  source: string;
  fontSize: number;
  minWidth: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={style}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 50,
          backgroundColor: theme.plain.backgroundColor,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          gap: 18,
        }}
      >
        <Circle color="#FF5E57" />
        <Circle color="#FFBC30" />
        <Circle color="#29C93F" />
      </div>
      <div
        style={{
          padding: 50,
          paddingTop: 0,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: theme.plain.backgroundColor,
          minWidth,
          display: 'flex',
        }}
      >
        <Highlight {...defaultProps} code={source} language="jsx" theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                fontSize,
                fontFamily: "SF Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
