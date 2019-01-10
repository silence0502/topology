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
    nodeId?: string
    center?: boolean
    zoomToFit?: boolean
    paper_width?: number
    paper_height?: number
    cid?: string
    fullscreen_btn_disable?: boolean
}

export default class Main extends React.Component<MainProps, any> {
    // Conatiner
    paperContainer: HTMLDivElement
    btn_more: HTMLDivElement
    btn_zoomin: HTMLDivElement
    btn_map: HTMLDivElement
    btn_zoomout: HTMLDivElement
    navi: HTMLDivElement
    btn_fullscreen: HTMLDivElement

    // rappid things
    graph: joint.dia.Graph;
    graph2: joint.dia.Graph;
    commandManager: joint.dia.CommandManager;
    paper: joint.dia.Paper;
    paperScroller: joint.ui.PaperScroller;
    navigator: joint.ui.Navigator;
    static defaultProps: MainProps = {
        animate: false,
        width: 800,
        height: window.innerHeight,
        paper_width: 1000,
        paper_height: 1000,
        drawGrid: false,
        rankDir: 'RL',
        data: {},
        nodeId: '',
        center: false,
        zoomToFit: false,
        fullscreen_btn_disable: false
    }
    /**
     * 数据传递动画
     */
    doAnimate() {
        let graph = this.graph
        let paper = this.paper
        graph.on('signal', function (cell: any, data: any) {
            if (cell instanceof joint.dia.Link) {
                if (cell.attributes.linkType === 1) {
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
        _.map(graph.getLinks(), (link: any) => {
            sources.push(link.get('source'))
            targets.push(link.get('target'))
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
    parseData(data: any) {
        if (data.nodes) {
            _.map(data.nodes, (node: any) => {
                let opt = {
                    isHighlight: (node.id === this.props.cid)
                }
                new VIM(vimOption(_.merge(node, opt))).addTo(this.graph)
            })
        }
    }
    /*
    * 初始化画布
    */
    initializePaper() {
        const graph = this.graph = new joint.dia.Graph;
        this.commandManager = new joint.dia.CommandManager({ graph: graph });
        const paper = this.paper = new joint.dia.Paper({
            width: this.props.paper_width,
            height: this.props.paper_height,
            gridSize: 10,
            drawGrid: this.props.drawGrid,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true,
            // interactive: false, /*是否可以拖动*/
        });
        this.parseData(this.props.data)
        if (this.props.animate) {
            this.doAnimate()
        }
        const paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper,
            autoResizePaper: true,
            cursor: 'grab'
        });
        paper.on('blank:pointerdown', paperScroller.startPanning);
        $(this.paperContainer).append(paperScroller.el);
        this.renderLayout()
        this.renderLinks()
        paperScroller.render();
        // if (this.props.center) { paperScroller.center() }
        if (this.props.nodeId) {
            let positon: any = {}
            _.map(this.props.data.nodes, (item, index) => {
                if (item.id === this.props.nodeId) {
                    positon = { x: item.x, y: item.y }
                }
            })
            paperScroller.center(positon.x, positon.y)
        } else if (this.props.center) {
            paperScroller.center()
        }
        if (this.props.zoomToFit) { paperScroller.zoomToFit() }
        /*
         * tooltip初始化
         */
        // let tool_tip = new joint.ui.Tooltip({
        //     target: '[data-tooltip]',
        //     position: (target: any) => {
        //         let align = _.split(target.attributes['name'].nodeValue, '|')
        //         return align[0] === 'left' ? 'left' : 'right'
        //     },
        //     content: (target: any) => {
        //         let tips = _.split(target.attributes['data-tooltip'].nodeValue, '|')
        //         return _.map(tips, (item, index) => {
        //             if (index === 0 && tips.length > 1) {
        //                 if (tips[0] !== tips[1]) {
        //                     return `<b>${item}</b><hr />`
        //                 } else {
        //                     return ''
        //                 }
        //             }
        //             return item
        //         })
        //     }
        // });
        /*
         * 双击事件
         */
        paper.on('cell:pointerdblclick', (cellView: any) => {
            if (cellView.model.attributes.type === 'VIM') {
                if (this.props.onDblclick) {
                    this.props.onDblclick(cellView)
                }
            }
        });
        /*
         * 单击事件
         */
        paper.on('cell:pointerclick', (cellView: any, evt: any) => {
            if (cellView.model.attributes.type === 'VIM') {
                let multiple = paperScroller.zoom()
                if (cellView.model.attributes.attrs['.perf'].width > 0) {
                    if (cellView.model.attributes.attrs['.perf'].x === 1) {
                        if (evt.offsetX / multiple - cellView.model.attributes.position.x <= 11) {
                            if (evt.offsetY / multiple - cellView.model.attributes.position.y <= 11) {
                                console.log('top');
                            }
                        }
                    } else if (cellView.model.attributes.attrs['.perf'].x === 169) {
                        if (evt.offsetX / multiple - cellView.model.attributes.position.x >= 169) {
                            if (evt.offsetY / multiple - cellView.model.attributes.position.y <= 11) {
                                console.log('top');
                            }
                        }
                    }
                }
                if (cellView.model.attributes.attrs['.alarm'].width > 0) {
                    if (cellView.model.attributes.attrs['.alarm'].x === 1) {
                        if (evt.offsetX / multiple - cellView.model.attributes.position.x <= 11) {
                            if (evt.offsetY / multiple - cellView.model.attributes.position.y >= 19) {
                                console.log('bottom');
                            }
                        }
                    } else if (cellView.model.attributes.attrs['.alarm'].x === 169) {
                        if (evt.offsetX / multiple - cellView.model.attributes.position.x >= 169) {
                            if (evt.offsetY / multiple - cellView.model.attributes.position.y >= 19) {
                                console.log('bottom');
                            }
                        }
                    }
                }
            }
        });
        /*
         * 解决全屏不显示tooltip
         */
        paper.on('cell:mouseover', (cellView: any) => {
            if (cellView.model.attributes.type === 'VIM') {
                if (this.state.isFullScreen === true) {
                    let topology_instance: any = document.getElementById('topology_instance')
                    let joint_tooltips = document.getElementsByClassName('joint-tooltip')[0]
                    topology_instance.append(joint_tooltips)
                }
            }
        });
        /*
         * 按钮
         */
        this.btn_map.onclick = this.small_map.bind(this)
        this.btn_zoomin.onclick = this.zoomIn.bind(this)
        this.btn_zoomout.onclick = this.zoomOut.bind(this)
        this.btn_fullscreen.onclick = this.fullScreen.bind(this)
        /*
         * 缩略图
         */
        let navigator = this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false,
        });
        $(this.navi).append(navigator.el);
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
     * 打开关闭全屏
     */
    fullScreen = () => {
        if (!this.state.isFullScreen) {
            this.requestFullScreen();
        } else {
            this.exitFullscreen();
        }
    }
    /*
     * 进入全屏
     */
    requestFullScreen = () => {
        var de: any = document.getElementById('topology_instance');
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }

    /*
     * 退出全屏
     */
    exitFullscreen = () => {
        var de: any = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    };
    /*
    * 监听fullscreenchange事件
    */
    watchFullScreen = () => {
        const _self = this;
        let de: any = document
        document.addEventListener(
            'fullscreenchange',
            function () {
                _self.setState({
                    isFullScreen: de.fullscreen
                });
            },
            false
        )
        document.addEventListener(
            'mozfullscreenchange',
            function () {
                _self.setState({
                    isFullScreen: de.mozFullScreen
                });
            },
            false
        )
        document.addEventListener(
            'webkitfullscreenchange',
            function () {
                _self.setState({
                    isFullScreen: de.webkitIsFullScreen
                });
            },
            false
        );
    }
    /*
     * 自动布局 
     */
    renderLayout() {
        console.log('object');
        var graphBBox = new joint.layout.DirectedGraph.layout(this.graph, {
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
    renderLinks() {
        if (this.props.data.links) {
            _.map(this.props.data.links, (link) => {
                new Link(linkOption(link)).addTo(this.graph)
            })
        }
    }
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
            visable_instance: false,
            isFullScreen: false,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.initializePaper()
        this.watchFullScreen()
    }
    renderMap() {
        let { visable_instance } = this.state
        if (visable_instance === true) {
            return <div className="navigator_instance" id="navigator_instance" ref={(node: HTMLDivElement) => { this.navi = node }} />
        } else {
            return <div className="navigator_instance" id="navigator_instance" ref={(node: HTMLDivElement) => { this.navi = node }} style={{ display: 'none' }} />
        }
    }
    renderFullscreenBtn() {
        let { fullscreen_btn_disable } = this.props
        if (fullscreen_btn_disable === true) {
            return <div ref={(node: HTMLDivElement) => { this.btn_fullscreen = node }} id="btn-fullscreen" className="btn" style={{ display: 'none' }}>全屏</div>
        } else {
            return <div ref={(node: HTMLDivElement) => { this.btn_fullscreen = node }} id="btn-fullscreen" className="btn">全屏</div>
        }
    }
    render() {
        let onMap = this.state.visable_instance === true ? '关闭缩略图' : '打开缩略图'
        return (
            <div>
                <div className="topology_instance" id="topology_instance"
                    style={{
                        width: window.innerWidth,
                        height: window.innerHeight
                    }}>
                    <div className="topology-app" >
                        <div className="app-body">
                            {this.renderFullscreenBtn()}
                            <div ref={(node: HTMLDivElement) => { this.btn_map = node }} id="btn-map" className="btn">{onMap}</div>
                            <div ref={(node: HTMLDivElement) => { this.btn_zoomin = node }} id="btn-zoomin" className="btn">+</div>
                            <div ref={(node: HTMLDivElement) => { this.btn_zoomout = node }} id="btn-zoomout" className="btn">-</div>
                            <div className="paper-container" ref={(node: HTMLDivElement) => { this.paperContainer = node }} ></div>
                            {this.renderMap()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
