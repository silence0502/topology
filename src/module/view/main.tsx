import * as React from 'react';
import { VIM, Link, vimOption, linkOption } from './vim'
import _ from 'lodash';

declare let V: any
declare const joint: any

export interface MainProps {
  animate?: boolean
  width?: any
  height?: any
  drawGrid?: boolean
  rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
  onDblclick?: Function
  data: any
  images: any
  center?: boolean
  zoomToFit?: boolean
  paper_width?: number
  paper_height?: number
  cid?: string
}

export default class Main extends React.Component<MainProps, any> {

  // Conatiner
  paperContainer: HTMLDivElement
  // btn_changeLayout_tb: HTMLDivElement
  // btn_changeLayout_bt: HTMLDivElement
  // btn_changeLayout_lr: HTMLDivElement
  // btn_changeLayout_rl: HTMLDivElement
  btn_function_1: HTMLDivElement
  btn_function_2: HTMLDivElement
  btn_function_3: HTMLDivElement
  btn_function_4: HTMLDivElement
  btn_more: HTMLDivElement
  btn_zoomin: HTMLDivElement
  btn_map: HTMLDivElement
  btn_zoomout: HTMLDivElement
  navigator: HTMLDivElement

  // rappid things
  graph: joint.dia.Graph;
  commandManager: joint.dia.CommandManager;
  paper: joint.dia.Paper;
  snaplines: joint.ui.Snaplines;
  paperScroller: joint.ui.PaperScroller;
  static defaultProps: MainProps = {
    animate: true,
    width: 800,
    height: 600,
    paper_width: 1000,
    paper_height: 1000,
    drawGrid: false,
    rankDir: 'LR',
    data: {},
    images: {},
    center: false,
    zoomToFit: false
  }

  /**
   * 数据传递动画
   */
  doAnimate() {
    let graph = this.graph
    let paper = this.paper
    graph.on('signal', function (cell: any, data: any) {
      if (cell instanceof joint.dia.Link) {
        if (cell.attributes.state == 100) {
          let targetCell = graph.getCell(cell.get('target').id);
          let s: any = paper.findViewByModel(cell)
          s.sendToken(V('circle', { r: 7, fill: 'green' }).node, 1000, function () {
            targetCell.trigger('signal', targetCell);
          });
        }
      } else {
        let outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
        _.each(outboundLinks, function (link) {
          link.trigger('signal', link);
        });
      }
    });

    let sources: any = []
    let targets: any = []
    _.map(graph.getLinks(), (link) => {
      sources.push(link.get('source').id)
      targets.push(link.get('target').id)
    })
    let triggers = _.sortedUniq(_.difference(sources, targets))
    function simulate() {
      return setInterval(() => {
        _.map(triggers, (trigger: string) => {
          let targetCell = graph.getCell(trigger);
          targetCell.trigger('signal', targetCell);
        })
      }, 3000);
    }
    simulate()
  }


  /**
   * 数据解析
   * @param data 拓扑数据
   */
  parseData(data: any, images: any) {
    if (data.nodes) {
      _.map(data.nodes, (node: any) => {
        let opt = {
          isHighlight: (node.id === this.props.cid)
        }
        new VIM(vimOption(_.merge(node, opt, images))).addTo(this.graph)
      })
      if (data.links) {
        _.map(data.links, (link) => {
          new Link(linkOption(link)).addTo(this.graph)
        })
      }
    }
  }

  initializePaper() {
    const graph = this.graph = new joint.dia.Graph;
    this.commandManager = new joint.dia.CommandManager({ graph: graph });

    const paper = this.paper = new joint.dia.Paper({
      // el: this.paperContainer,
      width: this.props.paper_width,
      height: this.props.paper_height,
      gridSize: 10,
      drawGrid: this.props.drawGrid,
      model: graph,
      perpendicularLinks: true,
      restrictTranslate: true,
      // defaultLink: new joint.shapes.app.Link()
    });

    this.parseData(this.props.data, this.props.images)




    if (this.props.animate) {
      this.doAnimate()
    }



    // this.snaplines = new joint.ui.Snaplines({ paper: paper });

    const paperScroller = this.paperScroller = new joint.ui.PaperScroller({
      paper,
      autoResizePaper: true,
      cursor: 'grab'
    });

    paper.on('blank:pointerdown', paperScroller.startPanning);
    $(this.paperContainer).append(paperScroller.el);

    this.renderLayout()
    this.renderLinks_2()

    paperScroller.render();
    if (this.props.center) { paperScroller.center() }
    if (this.props.zoomToFit) { paperScroller.zoomToFit() }

    new joint.ui.Tooltip({
      target: '[data-tooltip]',
      content: (target: any) => {
        let tips = _.split(target.attributes['data-tooltip'].nodeValue, '|')
        return _.map(_.split(target.attributes['data-tooltip'].nodeValue, '|'), (item, index) => {
          if (index == 0 && tips.length > 1) {
            if (tips[0] != tips[1]) {
              return `<b>${item}</b><hr />`
            } else {
              return ''
            }
          }
          return item
        })
      }
    });

    /*
     * 双击事件
     */
    paper.on('cell:pointerdblclick', (cellView: any) => {
      if (this.props.onDblclick) {
        this.props.onDblclick(cellView)
      }
    });

    /*
     * 右击事件
     */
    paper.on('cell:contextmenu', (cellView: any) => {
      this.setState({
        disabled: true
      })
    });
    paper.on('blank:pointerclick', (cellView: any) => {
      this.setState({
        disabled: false
      })
    });
    paper.on('blank:contextmenu', (cellView: any) => {
      this.setState({
        disabled: false
      })
    });

    /*
     * 按钮
     */
    // this.btn_changeLayout_tb.onclick = this.changeLayout_tb.bind(this)
    // this.btn_changeLayout_bt.onclick = this.changeLayout_bt.bind(this)
    // this.btn_changeLayout_lr.onclick = this.changeLayout_lr.bind(this)
    // this.btn_changeLayout_rl.onclick = this.changeLayout_rl.bind(this)
    this.btn_function_1.onclick = this.function_1.bind(this)
    this.btn_function_2.onclick = this.function_2.bind(this)
    this.btn_function_3.onclick = this.function_3.bind(this)
    this.btn_function_4.onclick = this.function_4.bind(this)
    this.btn_map.onclick = this.small_map.bind(this)
    this.btn_zoomin.onclick = this.zoomIn.bind(this)
    this.btn_zoomout.onclick = this.zoomOut.bind(this)
  }

  /*
   * 缩略图
   */
  initializeNavigator() {
    var navigator = this.navigator = new joint.ui.Navigator({
      width: 240,
      height: 115,
      paperScroller: this.paperScroller,
      zoom: false,
    });
    $('.navigator_instance').append(navigator.el);
    navigator.render();
  }

  /*
   * 打开关闭缩略图
   */
  small_map() {
    if (this.state.visable_instance === true) {
      this.setState({
        visable_instance: false
      })
    } else {
      this.setState({
        visable_instance: true
      })
    }
  }

  /*
   * 按钮功能
   */
  function_1() {
    if (this.state.disabled == true) {
      console.log('-------------------------------------------------->function_1');
    }
  }
  function_2() {
    if (this.state.disabled == true) {
      console.log('-------------------------------------------------->function_2');
    }
  }
  function_3() {
    if (this.state.disabled == true) {
      console.log('-------------------------------------------------->function_3');
    }
  }
  function_4() {
    if (this.state.disabled == true) {
      console.log('-------------------------------------------------->function_4');
    }
  }

  /*
   * 布局切换
   */
  renderLayout() {
    let graphBBox = joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 50,
      edgeSep: 80,
      marginX: 100,
      marginY: 100,
      rankSep: 80,
      rankDir: 'LR'
    });
  }

  /*
   * 布局后的连线
   */
  renderLinks_2() {
    if (this.props.data.links_2) {
      _.map(this.props.data.links_2, (link_2) => {
        new Link(linkOption(link_2)).addTo(this.graph)
      })
    }
  }

  /*
    * 修改布局按钮
    */
  // changeLayout_tb() {
  //   this.setState({
  //     rankDir: 'TB'
  //   }, () => {
  //     this.renderLayout()
  //   })
  // }
  // changeLayout_bt() {
  //   this.setState({
  //     rankDir: 'BT'
  //   }, () => {
  //     this.renderLayout()
  //   })
  // }
  // changeLayout_lr() {
  //   this.setState({
  //     rankDir: 'LR'
  //   }, () => {
  //     this.renderLayout()
  //   })
  // }
  // changeLayout_rl() {
  //   this.setState({
  //     rankDir: 'RL'
  //   }, () => {
  //     this.renderLayout()
  //   })
  // }

  /*
   * 放大缩小
   */
  zoomIn() {
    this.paperScroller.zoom(0.2, { max: 2 });
  }
  zoomOut() {
    this.paperScroller.zoom(-0.2, { min: 0.2 });
  }

  constructor(props: MainProps) {
    super(props);
    this.state = {
      // rankDir: 'LR',
      disabled: false,
      visable_instance: true
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.initializePaper();
    this.initializeNavigator();
  }

  renderMap() {
    let { visable_instance } = this.state
    if (visable_instance === true) {
      return <div className="navigator_instance" id="navigator_instance" ref={(node: HTMLDivElement) => { this.navigator = node }} />
    } else {
      return <div className="navigator_instance" id="navigator_instance" ref={(node: HTMLDivElement) => { this.navigator = node }} style={{ display: 'none' }} />
    }
  }

  link_1() {
    console.log('----------------->link-1');
  }

  link_2() {
    console.log('----------------->link-2');
  }

  link_3() {
    console.log('----------------->link-3');
  }

  render() {
    let _style = {}
    let tooltip1 = '', tooltip2 = '', tooltip3 = '', tooltip4 = ''
    let tooltip_style = {}
    let more_style = {}
    if (this.state.disabled === false) {
      _style = {
        color: 'rgba(0,0,0,.25)',
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9',
        cursor: 'not-allowed'
      }
      tooltip1 = tooltip2 = tooltip3 = tooltip4 = '请选中元件'
      tooltip_style = { cursor: 'not-allowed' }
      more_style = { display: 'none' }
    } else {
      tooltip1 = '功能1'
      tooltip2 = '功能2'
      tooltip3 = '功能3'
      tooltip4 = '功能4'
      tooltip_style = { cursor: 'pointer' }
    }
    let onMap = this.state.visable === true ? '关闭缩略图' : '打开缩略图'
    return (
      <div className="topology_instance" style={{ width: this.props.width, height: this.props.height }}  >
        <div className="topology-app">
          <div className="app-body">
            {/* <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_tb = node }} id="btn-changeLayout-tb" className="btn">↓</div>
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_bt = node }} id="btn-changeLayout-bt" className="btn">↑</div>
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_lr = node }} id="btn-changeLayout-lr" className="btn">→</div>
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_rl = node }} id="btn-changeLayout-rl" className="btn">←</div> */}
            <div className="fun-btn-area">
              <div className="fun-item">
                <div ref={(node: HTMLDivElement) => { this.btn_function_1 = node }} style={_style} id="btn-function-1" className="fun-btn">
                  <label data-tooltip={tooltip1} data-tooltip-position="top" style={tooltip_style}>功能1</label>
                </div>
              </div>
              <div className="fun-item">
                <div ref={(node: HTMLDivElement) => { this.btn_function_2 = node }} style={_style} id="btn-function-1" className="fun-btn">
                  <label data-tooltip={tooltip2} data-tooltip-position="top" style={tooltip_style}>功能2</label>
                </div>
              </div>
              <div className="fun-item">
                <div ref={(node: HTMLDivElement) => { this.btn_function_3 = node }} style={_style} id="btn-function-1" className="fun-btn">
                  <label data-tooltip={tooltip3} data-tooltip-position="top" style={tooltip_style}>功能3</label>
                </div>
              </div>
              <div className="fun-item">
                <div ref={(node: HTMLDivElement) => { this.btn_function_4 = node }} style={_style} id="btn-function-1" className="fun-btn">
                  <label data-tooltip={tooltip4} data-tooltip-position="top" style={tooltip_style}>功能4</label>
                </div>
              </div>
              <div className="fun-item-more">
                <div ref={(node: HTMLDivElement) => { this.btn_more = node }} style={_style} id="btn-function-1" className="fun-btn">
                  更多
                </div>
                <div className="dropdown-content" style={more_style}>
                  <a href="jacascript:;" onClick={this.link_1.bind(this)}>下拉菜单项 1</a>
                  <a href="jacascript:;" onClick={this.link_2.bind(this)}>下拉菜单项 2</a>
                  <a href="jacascript:;" onClick={this.link_3.bind(this)}>下拉菜单项 3</a>
                </div>
              </div>
            </div>
            <div ref={(node: HTMLDivElement) => { this.btn_map = node }} id="btn-map" className="btn">{onMap}</div>
            <div ref={(node: HTMLDivElement) => { this.btn_zoomin = node }} id="btn-zoomin" className="btn">+</div>
            <div ref={(node: HTMLDivElement) => { this.btn_zoomout = node }} id="btn-zoomout" className="btn">-</div>
            <div className="paper-container" ref={(node: HTMLDivElement) => { this.paperContainer = node }} >
            </div>
            {this.renderMap()}
          </div>
        </div>
      </div>
    );
  }
}
