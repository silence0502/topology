import './style/index'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Topology from './module/view/main';

const init = (mountNodeId = 'root', opt: any) => {
  ReactDOM.render(
    <Topology
      rankDir={opt.rankDir}
      animate={opt.animate}
      cid={opt.cid}
      data={opt.data}
      images={opt.images}
      onDblclick={opt.onDblclick}
      width={opt.width}
      height={opt.height}
    />, document.getElementById(mountNodeId));
};

export {
  init,
  Topology
}