import React from 'react';
import { FONT_FAMILY } from '../constants';

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: 'bold',
  fontSize: 100,
  textAlign: 'center',
  position: 'absolute',
  bottom: 160,
  width: '100%',
};

export const TextContent: React.FC<{
  customStyle?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ children, customStyle }) => {
  return <h1 style={{ ...title, ...customStyle }}>{children}</h1>;
};
