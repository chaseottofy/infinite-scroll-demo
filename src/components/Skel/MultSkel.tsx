import buildArray from '../../utils/build-array';

import Skel from './Skel';

const MultSkel = (
  skelCount: number,
  setStyle: React.CSSProperties,
  height: number,
) => {
  return (
    buildArray(skelCount).map((_, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return (<div style={setStyle} key={i}>{Skel(height)}</div>);
    })
  );
};

export default MultSkel;
