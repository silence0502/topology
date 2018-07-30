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
  btn_changeLayout_tb: HTMLDivElement
  btn_changeLayout_bt: HTMLDivElement
  btn_changeLayout_lr: HTMLDivElement
  btn_changeLayout_rl: HTMLDivElement
  btn_zoomin: HTMLDivElement
  btn_zoomout: HTMLDivElement
  navigator: HTMLDivElement
  contextmenu: HTMLDivElement

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
    rankDir: 'TB',
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
        if (cell.attributes.state == 0) {
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
    paper.on('cell:contextmenu', (cellView: any) => {
      // if (this.props.onDblclick) {
      //   this.props.onDblclick(cellView)
      // }
      this.setState({
        visable: true
      })
    });
    paper.on('blank:pointerdown', (cellView: any) => {
      // if (this.props.onDblclick) {
      //   this.props.onDblclick(cellView)
      // }
      this.setState({
        visable: false
      })
    });
    this.btn_changeLayout_tb.onclick = this.changeLayout_tb.bind(this)
    this.btn_changeLayout_bt.onclick = this.changeLayout_bt.bind(this)
    this.btn_changeLayout_lr.onclick = this.changeLayout_lr.bind(this)
    this.btn_changeLayout_rl.onclick = this.changeLayout_rl.bind(this)
    this.btn_zoomin.onclick = this.zoomIn.bind(this)
    this.btn_zoomout.onclick = this.zoomOut.bind(this)
  }

  initializeNavigator() {
    var navigator = this.navigator = new joint.ui.Navigator({
      width: 240,
      height: 115,
      paperScroller: this.paperScroller,
      zoom: false,
    });
    $('.navigator').append(navigator.el);
    navigator.render();
  }

  renderLayout() {
    let graphBBox = joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 50,
      edgeSep: 80,
      marginX: 100,
      marginY: 20,
      rankSep: 100,
      rankDir: this.state.rankDir,
    });
  }
  changeLayout_tb() {
    this.setState({
      rankDir: 'TB'
    }, () => {
      this.renderLayout()
    })
  }
  changeLayout_bt() {
    this.setState({
      rankDir: 'BT'
    }, () => {
      this.renderLayout()
    })
  }
  changeLayout_lr() {
    this.setState({
      rankDir: 'LR'
    }, () => {
      this.renderLayout()
    })
  }
  changeLayout_rl() {
    this.setState({
      rankDir: 'RL'
    }, () => {
      this.renderLayout()
    })
  }
  zoomIn() {
    this.paperScroller.zoom(0.2, { max: 2 });
  }
  zoomOut() {
    this.paperScroller.zoom(-0.2, { min: 0.2 });
  }
  renderContextmenu() {
    let _style = {
      width: '60px',
      height: '100%',
      border: '1px solid #000',
      listStyleType: 'none'
    }
    if (this.state.visable === true) {
      return (
        <ul style={_style}>
          <li><a href="">menu1</a></li>
          <li><a href="">menu2</a></li>
          <li><a href="">menu3</a></li>
          <li><a href="">menu4</a></li>
          <li><a href="">menu5</a></li>
          <li><a href="">menu6</a></li>
        </ul>
      )
    } else {
      return (
        <div />
      )
    }
  }
  constructor(props: MainProps) {
    super(props);
    this.state = {
      rankDir: 'TB',
      visable: false
    }
  }

  componentDidMount() {
    this.initializePaper();
    this.initializeNavigator();
  }

  render() {
    return (
      <div className="Topology" style={{ width: this.props.width, height: this.props.height }}  >
        <div className="topology-app">
          <div className="app-body">
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_tb = node }} id="btn-changeLayout-tb" className="btn">↓</div>
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_bt = node }} id="btn-changeLayout-bt" className="btn">↑</div>
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_lr = node }} id="btn-changeLayout-lr" className="btn">→</div>
            <div ref={(node: HTMLDivElement) => { this.btn_changeLayout_rl = node }} id="btn-changeLayout-rl" className="btn">←</div>
            <div ref={(node: HTMLDivElement) => { this.btn_zoomin = node }} id="btn-zoomin" className="btn">+</div>
            <div ref={(node: HTMLDivElement) => { this.btn_zoomout = node }} id="btn-zoomout" className="btn">-</div>
            <div className="paper-container" ref={(node: HTMLDivElement) => { this.paperContainer = node }} >
            </div>
            <div className="navigator" id="navigator" ref={(node: HTMLDivElement) => { this.navigator = node }} >
            </div>
            <div className="contextmenu" id="contextmenu" style={{
              position: 'absolute',
              top: '60px',
              left: '30px'
            }} ref={(node: HTMLDivElement) => { this.contextmenu = node }} >
              {this.renderContextmenu()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
