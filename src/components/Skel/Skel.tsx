import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { CARD_STYLE } from '../../data/constants';

import 'react-loading-skeleton/dist/skeleton.css';

const Skel = (
  height: number,
  baseColor: string = 'transparent',
  highlightColor: string = '#151517',
  style: React.CSSProperties = CARD_STYLE,
) => {
  return (
    <Skeleton
      height={height}
      baseColor={baseColor}
      highlightColor={highlightColor}
      style={style}
    />
  );
};

export default Skel;
