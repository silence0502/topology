import './style/index'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TopologyInstance from './module/view/main';

const init = (mountNodeId = 'root', opt: any) => {
  ReactDOM.render(
    <TopologyInstance
      animate={opt.animate}
      cid={opt.cid}
      data={opt.data}
      width={opt.width}
      height={opt.height}
    />, document.getElementById(mountNodeId));
};

export {
  init,
  TopologyInstance
}