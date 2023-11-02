import buildArray from '../../utils/buildArray';

import Skel from './Skel';

const MultSkel = (skelCount: number) => {
  return (
    buildArray(skelCount).map((_, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return (<div key={i}>{Skel()}</div>);
    })
  );
};

export default MultSkel;
