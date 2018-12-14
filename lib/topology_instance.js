(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('lodash')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'lodash'], factory) :
	(factory((global.topology_instance = {}),global.React,global.ReactDOM,global._));
}(this, (function (exports,React,ReactDOM,_) { 'use strict';

_ = _ && _.hasOwnProperty('default') ? _['default'] : _;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var VIM = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable"><rect class="body"/><rect class="card"/><rect class="alarm"/><rect class="perf"/><text class="label"/><text class="type"/></g>',
    defaults: _.defaultsDeep({
        type: 'VIM',
        size: {
            width: 180,
            height: 30
        },
        attrs: {
            '.': {
                magnet: false
            },
            '.label': {
                text: '',
                'ref-x': .58,
                'ref-y': .25,
                'font-size': 14,
                'text-anchor': 'middle',
                fill: '#000'
            },
            '.type': {
                text: '',
                'ref-x': .05,
                'ref-y': .7,
                'font-size': 14,
                'text-anchor': 'left',
                fill: '#000'
            },
            '.alarm': {
                x: 1,
                y: 19,
                'rx': '2px',
                'ry': '2px',
                width: 0,
                height: 0,
            },
            '.perf': {
                x: 1,
                y: 1,
                'rx': '2px',
                'ry': '2px',
                width: 0,
                height: 0,
            },
            '.logo': {
                x: 0,
                y: 0,
                width: 30,
                height: 30,
                fill: '#00B388',
                'rx': '2px',
                'ry': '2px',
            },
            '.body': {
                'ref-width': '100%',
                'ref-height': '100%',
                'rx': '2px',
                'ry': '2px',
                stroke: '#00B388',
                'stroke-width': 2
            }
        }
    }, joint.shapes.basic.Generic.prototype.defaults),
    initialize: function () {
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    }
});
var Link = joint.dia.Link.extend({
    defaults: _.defaultsDeep({
        type: 'Link',
        attrs: {
            '.connection': { stroke: '#C6C9CA', 'stroke-width': 1 },
            '.link-tools': { display: 'none' },
            '.marker-arrowheads': { display: 'none' },
            '.marker-vertex': { display: 'none' },
            '.marker-vertices': { display: 'none' }
        },
        z: -1
    }, joint.dia.Link.prototype.defaults),
    initialize: function () {
        joint.dia.Link.prototype.initialize.apply(this, arguments);
    }
});
var linkOption = function (opt) {
    var option = {
        attrs: {
            '.connection': {
                stroke: '#C6C9CA',
                'stroke-dasharray': ''
            },
            '.marker-target': {
                stroke: '#C6C9CA',
                fill: '#C6C9CA',
                d: 'M 10 0 L 0 5 L 10 10 z' // 箭头样式
            }
        },
        position: {},
        router: {
            name: 'normal',
        },
        connector: {
            name: 'normal'
        }
    };
    if (opt) {
        if (opt.linkType === 1) {
            option.source = {
                x: opt.sourceObj.x + 90,
                y: opt.sourceObj.y + 30,
            };
            if (opt.targetObj.align === 'left') {
                option.target = {
                    x: opt.targetObj.x,
                    y: opt.targetObj.y + 20,
                };
            }
            else {
                option.target = {
                    x: opt.targetObj.x + 180,
                    y: opt.targetObj.y + 20,
                };
            }
            // option.source = { id: opt.source }
            // option.target = { id: opt.target }
        }
        else if (opt.linkType === 0) {
            if (opt.sourceObj.align === 'left') {
                option.source = {
                    x: opt.sourceObj.x + 180,
                    y: opt.sourceObj.y + 15,
                };
                if (opt.targetObj.align === 'left') {
                    option.target = {
                        x: opt.targetObj.x + 180,
                        y: opt.targetObj.y + 15,
                    };
                    if (opt.sourceObj.x >= opt.targetObj.x) {
                        option.vertices = [{ x: opt.sourceObj.x + 230, y: (opt.sourceObj.y + opt.targetObj.y) / 2 }];
                    }
                    else {
                        option.vertices = [{ x: opt.targetObj.x + 230, y: (opt.sourceObj.y + opt.targetObj.y) / 2 }];
                    }
                }
                else {
                    option.target = {
                        x: opt.targetObj.x,
                        y: opt.targetObj.y + 15,
                    };
                }
            }
            else {
                option.source = {
                    x: opt.sourceObj.x,
                    y: opt.sourceObj.y + 15,
                };
                if (opt.targetObj.align === 'left') {
                    option.target = {
                        x: opt.targetObj.x + 180,
                        y: opt.targetObj.y + 15,
                    };
                }
                else {
                    option.target = {
                        x: opt.targetObj.x,
                        y: opt.targetObj.y + 15,
                    };
                    if (opt.sourceObj.x <= opt.targetObj.x) {
                        option.vertices = [{ x: opt.sourceObj.x - 230, y: (opt.sourceObj.y + opt.targetObj.y) / 2 }];
                    }
                    else {
                        option.vertices = [{ x: opt.targetObj.x - 230, y: (opt.sourceObj.y + opt.targetObj.y) / 2 }];
                    }
                }
            }
        }
        option.state = opt.state;
        option.linkType = opt.linkType;
        option.arrowType = opt.arrowType;
        /*连接线颜色*/
        switch (option.state) {
            case 0:
                option.attrs['.connection'].stroke = '#C6C9CA';
                option.attrs['.marker-target'].fill = '#C6C9CA';
                option.attrs['.marker-target'].stroke = '#C6C9CA';
                break;
            case 1:
                option.attrs['.connection'].stroke = '#D10002';
                option.attrs['.marker-target'].fill = '#fff';
                option.attrs['.marker-target'].stroke = '#D10002';
                break;
            case 2:
                option.attrs['.connection'].stroke = '#FF9901';
                option.attrs['.marker-target'].fill = '#FF9901';
                option.attrs['.marker-target'].stroke = '#FF9901';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                break;
            default:
                option.attrs['.connection'].stroke = '#C6C9CA';
                option.attrs['.marker-target'].fill = '#C6C9CA';
                option.attrs['.marker-target'].stroke = '#C6C9CA';
                break;
        }
        /*连接线类型*/
        switch (option.linkType) {
            case 1:
                option.attrs['.connection']['stroke-width'] = 3;
                option.router.name = 'manhattan'; // 实线
                break;
            case 0:
                option.attrs['.connection']['stroke-dasharray'] = '5 3';
                option.connector.name = 'smooth'; // 虚线
                break;
            default:
                option.attrs['.connection']['stroke-width'] = 3;
                option.router.name = 'manhattan';
                break;
        }
        /*箭头类型*/
        switch (option.arrowType) {
            case 0:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 z'; // 三角箭头
                break;
            case 1:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z'; // 实心菱形
                break;
            case 2:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z'; // 空心菱形
                option.attrs['.marker-target'].fill = '#fff';
                break;
            case 3:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 0 5 z'; // 尖箭头
                break;
            case 4:
                option.attrs['.marker-target'].d = ''; // 没有箭头
                break;
            default:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 z';
                break;
        }
    }
    return option;
};
/*元件显示文字的长短*/
var getNewString = function (str) {
    var realLength = 0, len = str.length, charCode = -1, b = '';
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        }
        else {
            realLength += 2;
        }
        if (realLength <= 18) {
            b = b + str.charAt(i);
        }
        
    }
    return b;
};
var vimOption = function (opt) {
    var option = {
        position: {},
        size: {},
        attrs: {
            '.label': {}, '.type': {}, '.alarm': {}, '.perf': {}, '.logo': {}, '.body': {}
        }
    };
    var dataTooltip = '';
    var align = '';
    var dataIcon = '';
    var logoX = '';
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
        }
        if (opt.x && opt.y) {
            option.position = { x: opt.x, y: opt.y };
        }
        /*当前图标高亮*/
        if (opt.id === opt.nodeId) {
            option.attrs['.body'].fill = '#e8ad38';
        }
        /*元件的图标*/
        if (opt.displayType) {
            switch (opt.displayType) {
                case 'order':
                    dataIcon = "xlink:href='src/img/order.png'";
                    break;
                case 'ACCOUNT':
                    dataIcon = "xlink:href='src/img/tenant.png'";
                    break;
                case 'rfs':
                    dataIcon = "xlink:href='src/img/service.png'";
                    break;
                case 'cfs':
                    dataIcon = "xlink:href='src/img/service.png'";
                    break;
                default:
                    dataIcon = "xlink:href='src/img/service.png'";
                    break;
            }
        }
        /*元素位置*/
        if (opt.align) {
            align = "name=\"" + opt.align + "\"";
            switch (opt.align) {
                case 'left':
                    option.attrs['.logo'].x = 0;
                    option.attrs['.perf'].x = 169;
                    option.attrs['.alarm'].x = 169;
                    option.attrs['.label']['ref-x'] = .58;
                    logoX = "x='1'";
                    break;
                case 'right':
                    option.attrs['.logo'].x = 150;
                    option.attrs['.perf'].x = 1;
                    option.attrs['.alarm'].x = 1;
                    option.attrs['.label']['ref-x'] = .41;
                    logoX = "x='151'";
                    break;
                default:
                    option.attrs['.logo'].x = 0;
                    break;
            }
        }
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = "data-tooltip=\"" + opt.name + "\"";
            option.markup = "<g class=\"rotatable\" " + dataTooltip + " " + align + ">\n            <rect class=\"body\"/><rect class=\"logo\" />\n            <image " + dataIcon + " " + logoX + " y=\"1\" height=\"28px\" width=\"28px\"/><rect class=\"card\"/>\n            <rect class=\"alarm\"/><rect class=\"perf\"/><text class=\"label\"/><text class=\"type\"/></g>";
        }
        if (opt.name) {
            option.attrs['.label'].text = getNewString(opt.name);
        }
        if (opt.perf) {
            switch (opt.perf) {
                case 0:
                    option.attrs['.perf'].width = 10;
                    option.attrs['.perf'].height = 10;
                    option.attrs['.perf'].fill = '#00b388';
                    break;
                case 1:
                    option.attrs['.perf'].width = 10;
                    option.attrs['.perf'].height = 10;
                    option.attrs['.perf'].fill = '#FF9901';
                    break;
                default:
                    break;
            }
        }
        /*元件的告警*/
        switch (opt.alarm) {
            case 0:
                option.attrs['.alarm'].width = 10;
                option.attrs['.alarm'].height = 10;
                option.attrs['.alarm'].fill = '#00b388';
                break;
            case 1:
                option.attrs['.alarm'].width = 10;
                option.attrs['.alarm'].height = 10;
                option.attrs['.alarm'].fill = '#D10002';
                break;
            case 2:
                option.attrs['.alarm'].width = 10;
                option.attrs['.alarm'].height = 10;
                option.attrs['.alarm'].fill = '#FF9901';
                break;
            case 3:
                option.attrs['.alarm'].width = 10;
                option.attrs['.alarm'].height = 10;
                option.attrs['.alarm'].fill = '#DFB202';
                break;
            case 4:
                option.attrs['.alarm'].width = 10;
                option.attrs['.alarm'].height = 10;
                option.attrs['.alarm'].fill = '#00BFFF';
                break;
            default:
                break;
        }
        /*元件的背景是亮还是暗*/
        switch (opt.status) {
            case 'ACTIVE':
                option.attrs['.logo'].fill = '#00B388';
                option.attrs['.body'].stroke = '#00B388';
                break;
            case 'STOP':
                option.attrs['.logo'].fill = '#84756b';
                option.attrs['.body'].stroke = '#84756b';
                break;
            default:
                option.attrs['.logo'].fill = '#00B388';
                option.attrs['.body'].stroke = '#00B388';
                break;
        }
    }
    return option;
};

//# sourceMappingURL=vim.js.map

var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        /*
         * 打开关闭全屏
         */
        _this.fullScreen = function () {
            if (!_this.state.isFullScreen) {
                _this.requestFullScreen();
            }
            else {
                _this.exitFullscreen();
            }
        };
        /*
         * 进入全屏
         */
        _this.requestFullScreen = function () {
            var de = document.getElementById('topology_instance');
            if (de.requestFullscreen) {
                de.requestFullscreen();
            }
            else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            }
            else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        };
        /*
         * 退出全屏
         */
        _this.exitFullscreen = function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            }
            else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            }
            else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        };
        /*
        * 监听fullscreenchange事件
        */
        _this.watchFullScreen = function () {
            var _self = _this;
            var de = document;
            document.addEventListener('fullscreenchange', function () {
                _self.setState({
                    isFullScreen: de.fullscreen
                });
            }, false);
            document.addEventListener('mozfullscreenchange', function () {
                _self.setState({
                    isFullScreen: de.mozFullScreen
                });
            }, false);
            document.addEventListener('webkitfullscreenchange', function () {
                _self.setState({
                    isFullScreen: de.webkitIsFullScreen
                });
            }, false);
        };
        _this.state = {
            visable_instance: false,
            isFullScreen: false,
        };
        return _this;
    }
    /**
     * 数据传递动画
     */
    Main.prototype.doAnimate = function () {
        var graph = this.graph;
        var paper = this.paper;
        graph.on('signal', function (cell, data) {
            if (cell instanceof joint.dia.Link) {
                if (cell.attributes.linkType === 1) {
                    var targetCell_1 = graph.getCell(cell.get('target').id);
                    var s = paper.findViewByModel(cell);
                    s.sendToken(V('circle', { r: 7, fill: 'green' }).node, 1000, function () {
                        targetCell_1.trigger('signal', targetCell_1);
                    });
                }
            }
            else {
                var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
                _.each(outboundLinks, function (link) {
                    link.trigger('signal', link);
                });
            }
        });
        var sources = [];
        var targets = [];
        _.map(graph.getLinks(), function (link) {
            sources.push(link.get('source').id);
            targets.push(link.get('target').id);
        });
        var triggers = _.sortedUniq(_.difference(sources, targets));
        function simulate() {
            return setInterval(function () {
                _.map(triggers, function (trigger) {
                    var targetCell = graph.getCell(trigger);
                    targetCell.trigger('signal', targetCell);
                });
            }, 3000);
        }
        simulate();
    };
    /**
     * 数据解析
     * @param data 拓扑数据
     */
    Main.prototype.parseData = function (data, nodeId) {
        var _this = this;
        if (data.nodes) {
            _.map(data.nodes, function (node) {
                var opt = {
                    isHighlight: (node.id === _this.props.cid)
                };
                new VIM(vimOption(_.merge(node, opt, { nodeId: nodeId }))).addTo(_this.graph);
            });
        }
    };
    /*
    * 初始化画布
    */
    Main.prototype.initializePaper = function () {
        var _this = this;
        var graph = this.graph = new joint.dia.Graph;
        this.commandManager = new joint.dia.CommandManager({ graph: graph });
        var paper = this.paper = new joint.dia.Paper({
            width: this.props.paper_width,
            height: this.props.paper_height,
            gridSize: 10,
            drawGrid: this.props.drawGrid,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true,
            interactive: false,
        });
        this.parseData(this.props.data, this.props.nodeId);
        if (this.props.animate) {
            this.doAnimate();
        }
        var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            cursor: 'grab'
        });
        paper.on('blank:pointerdown', paperScroller.startPanning);
        $(this.paperContainer).append(paperScroller.el);
        // this.renderLayout()
        this.renderLinks();
        this.renderLinks_2();
        paperScroller.render();
        if (this.props.center) {
            paperScroller.center();
        }
        if (this.props.zoomToFit) {
            paperScroller.zoomToFit();
        }
        /*
         * tooltip初始化
         */
        var tool_tip = new joint.ui.Tooltip({
            target: '[data-tooltip]',
            position: function (target) {
                var align = _.split(target.attributes['name'].nodeValue, '|');
                return align[0] === 'left' ? 'left' : 'right';
            },
            content: function (target) {
                var tips = _.split(target.attributes['data-tooltip'].nodeValue, '|');
                return _.map(tips, function (item, index) {
                    if (index === 0 && tips.length > 1) {
                        if (tips[0] !== tips[1]) {
                            return "<b>" + item + "</b><hr />";
                        }
                        else {
                            return '';
                        }
                    }
                    return item;
                });
            }
        });
        /*
         * 双击事件
         */
        paper.on('cell:pointerdblclick', function (cellView) {
            if (cellView.model.attributes.type === 'VIM') {
                if (_this.props.onDblclick) {
                    _this.props.onDblclick(cellView);
                }
            }
        });
        /*
         * 单击事件
         */
        paper.on('cell:pointerclick', function (cellView, evt) {
            if (cellView.model.attributes.type === 'VIM') {
                var multiple = paperScroller.zoom();
                if (cellView.model.attributes.attrs['.perf'].width > 0) {
                    if (cellView.model.attributes.attrs['.perf'].x === 1) {
                        if (evt.offsetX / multiple - cellView.model.attributes.position.x <= 11) {
                            if (evt.offsetY / multiple - cellView.model.attributes.position.y <= 11) {
                                console.log('top');
                            }
                        }
                    }
                    else if (cellView.model.attributes.attrs['.perf'].x === 169) {
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
                    }
                    else if (cellView.model.attributes.attrs['.alarm'].x === 169) {
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
        paper.on('cell:mouseover', function (cellView) {
            if (cellView.model.attributes.type === 'VIM') {
                if (_this.state.isFullScreen === true) {
                    var topology_instance = document.getElementById('topology_instance');
                    var joint_tooltips = document.getElementsByClassName('joint-tooltip')[0];
                    topology_instance.append(joint_tooltips);
                }
            }
        });
        /*
         * 按钮
         */
        this.btn_map.onclick = this.small_map.bind(this);
        this.btn_zoomin.onclick = this.zoomIn.bind(this);
        this.btn_zoomout.onclick = this.zoomOut.bind(this);
        this.btn_fullscreen.onclick = this.fullScreen.bind(this);
        /*
         * 缩略图
         */
        var navigator = this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false,
        });
        $(this.navi).append(navigator.el);
        navigator.render();
    };
    /*
     * 打开关闭缩略图
     */
    Main.prototype.small_map = function () {
        if (this.state.visable_instance === true) {
            this.setState({
                visable_instance: false
            });
        }
        else {
            this.setState({
                visable_instance: true
            });
        }
    };
    /*
     * 自动布局
     */
    Main.prototype.renderLayout = function () {
        var graphBBox = joint.layout.DirectedGraph.layout(this.graph, {
            nodeSep: 50,
            edgeSep: 80,
            marginX: 100,
            marginY: 100,
            rankSep: 80,
            rankDir: 'LR'
        });
    };
    /*
     * 布局后的连线
     */
    Main.prototype.renderLinks = function () {
        var _this = this;
        if (this.props.data.links) {
            _.map(this.props.data.links, function (link) {
                new Link(linkOption(link)).addTo(_this.graph);
            });
        }
    };
    Main.prototype.renderLinks_2 = function () {
        var _this = this;
        if (this.props.data.links2) {
            _.map(this.props.data.links2, function (link2) {
                new Link(linkOption(link2)).addTo(_this.graph);
            });
        }
    };
    /*
     * 放大缩小
     */
    Main.prototype.zoomIn = function () {
        this.paperScroller.zoom(0.2, { max: 2 });
    };
    Main.prototype.zoomOut = function () {
        this.paperScroller.zoom(-0.2, { min: 0.2 });
    };
    Main.prototype.componentWillMount = function () {
    };
    Main.prototype.componentDidMount = function () {
        this.initializePaper();
        this.watchFullScreen();
    };
    Main.prototype.renderMap = function () {
        var _this = this;
        var visable_instance = this.state.visable_instance;
        if (visable_instance === true) {
            return React.createElement("div", { className: "navigator_instance", id: "navigator_instance", ref: function (node) { _this.navi = node; } });
        }
        else {
            return React.createElement("div", { className: "navigator_instance", id: "navigator_instance", ref: function (node) { _this.navi = node; }, style: { display: 'none' } });
        }
    };
    Main.prototype.renderFullscreenBtn = function () {
        var _this = this;
        var fullscreen_btn_disable = this.props.fullscreen_btn_disable;
        if (fullscreen_btn_disable === true) {
            return React.createElement("div", { ref: function (node) { _this.btn_fullscreen = node; }, id: "btn-fullscreen", className: "btn", style: { display: 'none' } }, "\u5168\u5C4F");
        }
        else {
            return React.createElement("div", { ref: function (node) { _this.btn_fullscreen = node; }, id: "btn-fullscreen", className: "btn" }, "\u5168\u5C4F");
        }
    };
    Main.prototype.render = function () {
        var _this = this;
        var onMap = this.state.visable_instance === true ? '关闭缩略图' : '打开缩略图';
        return (React.createElement("div", null,
            React.createElement("div", { className: "topology_instance", id: "topology_instance", style: {
                    width: window.innerWidth,
                    height: window.innerHeight
                } },
                React.createElement("div", { className: "topology-app" },
                    React.createElement("div", { className: "app-body" },
                        this.renderFullscreenBtn(),
                        React.createElement("div", { ref: function (node) { _this.btn_map = node; }, id: "btn-map", className: "btn" }, onMap),
                        React.createElement("div", { ref: function (node) { _this.btn_zoomin = node; }, id: "btn-zoomin", className: "btn" }, "+"),
                        React.createElement("div", { ref: function (node) { _this.btn_zoomout = node; }, id: "btn-zoomout", className: "btn" }, "-"),
                        React.createElement("div", { className: "paper-container", ref: function (node) { _this.paperContainer = node; } }),
                        this.renderMap())))));
    };
    Main.defaultProps = {
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
    };
    return Main;
}(React.Component));

//# sourceMappingURL=main.js.map

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, onDblclick: opt.onDblclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology_instance.js.map

exports.init = init;
exports.TopologyInstance = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3lfaW5zdGFuY2UuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5X2luc3RhbmNlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHJlY3QgY2xhc3M9XCJwZXJmXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz4nLFxyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnVklNJyxcclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuJzoge1xyXG4gICAgICAgICAgICAgICAgbWFnbmV0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmxhYmVsJzoge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJycsXHJcbiAgICAgICAgICAgICAgICAncmVmLXgnOiAuNTgsXHJcbiAgICAgICAgICAgICAgICAncmVmLXknOiAuMjUsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDAwJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLnR5cGUnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC4wNSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC43LFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IDE0LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYWxhcm0nOiB7XHJcbiAgICAgICAgICAgICAgICB4OiAxLFxyXG4gICAgICAgICAgICAgICAgeTogMTksXHJcbiAgICAgICAgICAgICAgICAncngnOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcucGVyZic6IHtcclxuICAgICAgICAgICAgICAgIHg6IDEsXHJcbiAgICAgICAgICAgICAgICB5OiAxLFxyXG4gICAgICAgICAgICAgICAgJ3J4JzogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAncnknOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmxvZ28nOiB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICcycHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmJvZHknOiB7XHJcbiAgICAgICAgICAgICAgICAncmVmLXdpZHRoJzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi1oZWlnaHQnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgTGluayA9IGpvaW50LmRpYS5MaW5rLmV4dGVuZCh7XHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdMaW5rJyxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7IHN0cm9rZTogJyNDNkM5Q0EnLCAnc3Ryb2tlLXdpZHRoJzogMSB9LFxyXG4gICAgICAgICAgICAnLmxpbmstdG9vbHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci1hcnJvd2hlYWRzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdmVydGV4JzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdmVydGljZXMnOiB7IGRpc3BsYXk6ICdub25lJyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB6OiAtMVxyXG4gICAgfSwgam9pbnQuZGlhLkxpbmsucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qXHJcbioq6L+e5o6l57q/5LiO566t5aS05qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWxpbmtPcHRpb24ge1xyXG4gICAgc3RhdGU/OiBudW1iZXJcclxuICAgIHNvdXJjZT86IGFueVxyXG4gICAgdGFyZ2V0PzogYW55XHJcbiAgICBzb3VyY2VPYmo/OiBhbnlcclxuICAgIHRhcmdldE9iaj86IGFueVxyXG4gICAgbGlua1R5cGU/OiBudW1iZXJcclxuICAgIGFycm93VHlwZT86IG51bWJlclxyXG59XHJcbmxldCBsaW5rT3B0aW9uID0gKG9wdDogSWxpbmtPcHRpb24pID0+IHtcclxuICAgIGxldCBvcHRpb246IGFueSA9IHtcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6ICcjQzZDOUNBJyxcclxuICAgICAgICAgICAgICAgICdzdHJva2UtZGFzaGFycmF5JzogJydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdGFyZ2V0Jzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsIC8vIOeureWktOi+ueahhlxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNDNkM5Q0EnLCAvLyDnrq3lpLTpopzoibJcclxuICAgICAgICAgICAgICAgIGQ6ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JyAvLyDnrq3lpLTmoLflvI9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3V0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ25vcm1hbCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25uZWN0b3I6IHtcclxuICAgICAgICAgICAgbmFtZTogJ25vcm1hbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgICAgaWYgKG9wdC5saW5rVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBvcHRpb24uc291cmNlID0ge1xyXG4gICAgICAgICAgICAgICAgeDogb3B0LnNvdXJjZU9iai54ICsgOTAsXHJcbiAgICAgICAgICAgICAgICB5OiBvcHQuc291cmNlT2JqLnkgKyAzMCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3B0LnRhcmdldE9iai5hbGlnbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24udGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBvcHQudGFyZ2V0T2JqLnkgKyAyMCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogb3B0LnRhcmdldE9iai54ICsgMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IG9wdC50YXJnZXRPYmoueSArIDIwLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG9wdGlvbi5zb3VyY2UgPSB7IGlkOiBvcHQuc291cmNlIH1cclxuICAgICAgICAgICAgLy8gb3B0aW9uLnRhcmdldCA9IHsgaWQ6IG9wdC50YXJnZXQgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0LmxpbmtUeXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHQuc291cmNlT2JqLmFsaWduID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogb3B0LnNvdXJjZU9iai54ICsgMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IG9wdC5zb3VyY2VPYmoueSArIDE1LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC50YXJnZXRPYmouYWxpZ24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCArIDE4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb3B0LnRhcmdldE9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQuc291cmNlT2JqLnggPj0gb3B0LnRhcmdldE9iai54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52ZXJ0aWNlcyA9IFt7IHg6IG9wdC5zb3VyY2VPYmoueCArIDIzMCwgeTogKG9wdC5zb3VyY2VPYmoueSArIG9wdC50YXJnZXRPYmoueSkgLyAyIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZlcnRpY2VzID0gW3sgeDogb3B0LnRhcmdldE9iai54ICsgMjMwLCB5OiAob3B0LnNvdXJjZU9iai55ICsgb3B0LnRhcmdldE9iai55KSAvIDIgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb3B0LnRhcmdldE9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNvdXJjZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBvcHQuc291cmNlT2JqLngsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogb3B0LnNvdXJjZU9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0LnRhcmdldE9iai5hbGlnbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogb3B0LnRhcmdldE9iai54ICsgMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBvcHQudGFyZ2V0T2JqLnkgKyAxNSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb3B0LnRhcmdldE9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQuc291cmNlT2JqLnggPD0gb3B0LnRhcmdldE9iai54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52ZXJ0aWNlcyA9IFt7IHg6IG9wdC5zb3VyY2VPYmoueCAtIDIzMCwgeTogKG9wdC5zb3VyY2VPYmoueSArIG9wdC50YXJnZXRPYmoueSkgLyAyIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZlcnRpY2VzID0gW3sgeDogb3B0LnRhcmdldE9iai54IC0gMjMwLCB5OiAob3B0LnNvdXJjZU9iai55ICsgb3B0LnRhcmdldE9iai55KSAvIDIgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbi5zdGF0ZSA9IG9wdC5zdGF0ZVxyXG4gICAgICAgIG9wdGlvbi5saW5rVHlwZSA9IG9wdC5saW5rVHlwZVxyXG4gICAgICAgIG9wdGlvbi5hcnJvd1R5cGUgPSBvcHQuYXJyb3dUeXBlXHJcbiAgICAgICAgLyrov57mjqXnur/popzoibIqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjRkY5OTAxJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0ZGOTkwMSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjREZCMjAyJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0RGQjIwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNERkIyMDInO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnIzAwQkZGRidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyMwMEJGRkYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKui/nuaOpee6v+exu+WeiyovXHJcbiAgICAgICAgc3dpdGNoIChvcHRpb24ubGlua1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2Utd2lkdGgnXSA9IDM7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24ucm91dGVyLm5hbWUgPSAnbWFuaGF0dGFuJzsgICAvLyDlrp7nur9cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDMnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbm5lY3Rvci5uYW1lID0gJ3Ntb290aCc7ICAgLy8g6Jma57q/XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLXdpZHRoJ10gPSAzO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnJvdXRlci5uYW1lID0gJ21hbmhhdHRhbic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyrnrq3lpLTnsbvlnosqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0aW9uLmFycm93VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JzsgIC8vIOS4ieinkueureWktFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMjAgNSB6JzsgLy8g5a6e5b+D6I+x5b2iXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAyMCA1IHonOyAvLyDnqbrlv4Poj7HlvaJcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMCA1IHonOyAvLyDlsJbnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICcnOyAvLyDmsqHmnInnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbi8qXHJcbioq5Y6f5Lu25qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXZpbU9wdGlvbiB7XHJcbiAgICBpZD86IHN0cmluZ1xyXG4gICAgbmFtZT86IHN0cmluZ1xyXG4gICAgc3RhdHVzPzogc3RyaW5nXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBhbGFybT86IG51bWJlclxyXG4gICAgYWxpZ24/OiBzdHJpbmdcclxuICAgIHBlcmY/OiBudW1iZXJcclxuICAgIHg/OiBudW1iZXJcclxuICAgIHk/OiBudW1iZXJcclxuICAgIGRpc3BsYXlUeXBlPzogYW55XHJcbiAgICBub2RlSWQ/OiBzdHJpbmdcclxufVxyXG4vKuWFg+S7tuaYvuekuuaWh+Wtl+eahOmVv+efrSovXHJcbmxldCBnZXROZXdTdHJpbmcgPSAoc3RyOiBhbnkpID0+IHtcclxuICAgIGxldCByZWFsTGVuZ3RoID0gMCwgbGVuID0gc3RyLmxlbmd0aCwgY2hhckNvZGUgPSAtMSwgYiA9ICcnXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpKVxyXG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAwICYmIGNoYXJDb2RlIDw9IDEyOCkge1xyXG4gICAgICAgICAgICByZWFsTGVuZ3RoICs9IDFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWFsTGVuZ3RoICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZWFsTGVuZ3RoIDw9IDE4KSB7XHJcbiAgICAgICAgICAgIGIgPSBiICsgc3RyLmNoYXJBdChpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGI7XHJcbn1cclxubGV0IHZpbU9wdGlvbiA9IChvcHQ6IEl2aW1PcHRpb24pID0+IHtcclxuICAgIGxldCBvcHRpb246IGFueSA9IHtcclxuICAgICAgICBwb3NpdGlvbjoge30sXHJcbiAgICAgICAgc2l6ZToge30sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5sYWJlbCc6IHt9LCAnLnR5cGUnOiB7fSwgJy5hbGFybSc6IHt9LCAnLnBlcmYnOiB7fSwgJy5sb2dvJzoge30sICcuYm9keSc6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGRhdGFUb29sdGlwID0gJydcclxuICAgIGxldCBhbGlnbiA9ICcnXHJcbiAgICBsZXQgZGF0YUljb24gPSAnJ1xyXG4gICAgbGV0IGxvZ29YID0gJydcclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBpZiAob3B0LmlkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IG9wdC5pZFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0LnggJiYgb3B0LnkpIHtcclxuICAgICAgICAgICAgb3B0aW9uLnBvc2l0aW9uID0geyB4OiBvcHQueCwgeTogb3B0LnkgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKuW9k+WJjeWbvuagh+mrmOS6riovXHJcbiAgICAgICAgaWYgKG9wdC5pZCA9PT0gb3B0Lm5vZGVJZCkge1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uZmlsbCA9ICcjZThhZDM4J1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahOWbvuaghyovXHJcbiAgICAgICAgaWYgKG9wdC5kaXNwbGF5VHlwZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wdC5kaXNwbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3JkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvb3JkZXIucG5nJ2BcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0FDQ09VTlQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvdGVuYW50LnBuZydgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyZnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvc2VydmljZS5wbmcnYFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY2ZzJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSdzcmMvaW1nL3NlcnZpY2UucG5nJ2BcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0nc3JjL2ltZy9zZXJ2aWNlLnBuZydgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlhYPntKDkvY3nva4qL1xyXG4gICAgICAgIGlmIChvcHQuYWxpZ24pIHtcclxuICAgICAgICAgICAgYWxpZ24gPSBgbmFtZT1cIiR7b3B0LmFsaWdufVwiYFxyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wdC5hbGlnbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLnggPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycucGVyZiddLnggPSAxNjlcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLnggPSAxNjlcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sYWJlbCddWydyZWYteCddID0gLjU4XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nb1ggPSBgeD0nMSdgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLnggPSAxNTBcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5wZXJmJ10ueCA9IDFcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLnggPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubGFiZWwnXVsncmVmLXgnXSA9IC40MVxyXG4gICAgICAgICAgICAgICAgICAgIGxvZ29YID0gYHg9JzE1MSdgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS54ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8q5YWD5Lu255qEU1ZHKi9cclxuICAgICAgICBpZiAob3B0Lm5hbWUpIHtcclxuICAgICAgICAgICAgZGF0YVRvb2x0aXAgPSBgZGF0YS10b29sdGlwPVwiJHtvcHQubmFtZX1cImBcclxuICAgICAgICAgICAgb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiICR7ZGF0YVRvb2x0aXB9ICR7YWxpZ259PlxyXG4gICAgICAgICAgICA8cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJsb2dvXCIgLz5cclxuICAgICAgICAgICAgPGltYWdlICR7ZGF0YUljb259ICR7bG9nb1h9IHk9XCIxXCIgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiLz48cmVjdCBjbGFzcz1cImNhcmRcIi8+XHJcbiAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHJlY3QgY2xhc3M9XCJwZXJmXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQubmFtZSkge1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sYWJlbCddLnRleHQgPSBnZXROZXdTdHJpbmcob3B0Lm5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQucGVyZikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wdC5wZXJmKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycucGVyZiddLndpZHRoID0gMTBcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5wZXJmJ10uaGVpZ2h0ID0gMTBcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5wZXJmJ10uZmlsbCA9ICcjMDBiMzg4J1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLnBlcmYnXS53aWR0aCA9IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycucGVyZiddLmhlaWdodCA9IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycucGVyZiddLmZpbGwgPSAnI0ZGOTkwMSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlhYPku7bnmoTlkYroraYqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0LmFsYXJtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10ud2lkdGggPSAxMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAxMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyMwMGIzODgnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS53aWR0aCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmZpbGwgPSAnI0QxMDAwMidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMTBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uaGVpZ2h0ID0gMTBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjRkY5OTAxJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10ud2lkdGggPSAxMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAxMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNERkIyMDInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS53aWR0aCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmZpbGwgPSAnIzAwQkZGRidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8q5YWD5Lu255qE6IOM5pmv5piv5Lqu6L+Y5piv5pqXKi9cclxuICAgICAgICBzd2l0Y2ggKG9wdC5zdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSAnQUNUSVZFJzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnU1RPUCc6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvblxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgVklNLFxyXG4gICAgdmltT3B0aW9uLFxyXG4gICAgTGluayxcclxuICAgIGxpbmtPcHRpb25cclxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVklNLCBMaW5rLCB2aW1PcHRpb24sIGxpbmtPcHRpb24gfSBmcm9tICcuL3ZpbSdcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmRlY2xhcmUgbGV0IFY6IGFueVxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFpblByb3BzIHtcclxuICAgIGFuaW1hdGU/OiBib29sZWFuXHJcbiAgICB3aWR0aD86IGFueVxyXG4gICAgaGVpZ2h0PzogYW55XHJcbiAgICBkcmF3R3JpZD86IGJvb2xlYW5cclxuICAgIHJhbmtEaXI/OiAnVEInIHwgJ0JUJyB8ICdMUicgfCAnUkwnO1xyXG4gICAgb25EYmxjbGljaz86IEZ1bmN0aW9uXHJcbiAgICBkYXRhOiBhbnlcclxuICAgIG5vZGVJZD86IHN0cmluZ1xyXG4gICAgY2VudGVyPzogYm9vbGVhblxyXG4gICAgem9vbVRvRml0PzogYm9vbGVhblxyXG4gICAgcGFwZXJfd2lkdGg/OiBudW1iZXJcclxuICAgIHBhcGVyX2hlaWdodD86IG51bWJlclxyXG4gICAgY2lkPzogc3RyaW5nXHJcbiAgICBmdWxsc2NyZWVuX2J0bl9kaXNhYmxlPzogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE1haW5Qcm9wcywgYW55PiB7XHJcbiAgICAvLyBDb25hdGluZXJcclxuICAgIHBhcGVyQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX21vcmU6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fem9vbWluOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX21hcDogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl96b29tb3V0OiBIVE1MRGl2RWxlbWVudFxyXG4gICAgbmF2aTogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl9mdWxsc2NyZWVuOiBIVE1MRGl2RWxlbWVudFxyXG5cclxuICAgIC8vIHJhcHBpZCB0aGluZ3NcclxuICAgIGdyYXBoOiBqb2ludC5kaWEuR3JhcGg7XHJcbiAgICBncmFwaDI6IGpvaW50LmRpYS5HcmFwaDtcclxuICAgIGNvbW1hbmRNYW5hZ2VyOiBqb2ludC5kaWEuQ29tbWFuZE1hbmFnZXI7XHJcbiAgICBwYXBlcjogam9pbnQuZGlhLlBhcGVyO1xyXG4gICAgcGFwZXJTY3JvbGxlcjogam9pbnQudWkuUGFwZXJTY3JvbGxlcjtcclxuICAgIG5hdmlnYXRvcjogam9pbnQudWkuTmF2aWdhdG9yO1xyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogTWFpblByb3BzID0ge1xyXG4gICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgIHdpZHRoOiA4MDAsXHJcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgcGFwZXJfd2lkdGg6IDEwMDAsXHJcbiAgICAgICAgcGFwZXJfaGVpZ2h0OiAxMDAwLFxyXG4gICAgICAgIGRyYXdHcmlkOiBmYWxzZSxcclxuICAgICAgICByYW5rRGlyOiAnUkwnLFxyXG4gICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgIG5vZGVJZDogJycsXHJcbiAgICAgICAgY2VudGVyOiBmYWxzZSxcclxuICAgICAgICB6b29tVG9GaXQ6IGZhbHNlLFxyXG4gICAgICAgIGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGU6IGZhbHNlXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruS8oOmAkuWKqOeUu1xyXG4gICAgICovXHJcbiAgICBkb0FuaW1hdGUoKSB7XHJcbiAgICAgICAgbGV0IGdyYXBoID0gdGhpcy5ncmFwaFxyXG4gICAgICAgIGxldCBwYXBlciA9IHRoaXMucGFwZXJcclxuICAgICAgICBncmFwaC5vbignc2lnbmFsJywgZnVuY3Rpb24gKGNlbGw6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2Ygam9pbnQuZGlhLkxpbmspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsLmF0dHJpYnV0ZXMubGlua1R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwoY2VsbC5nZXQoJ3RhcmdldCcpLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgczogYW55ID0gcGFwZXIuZmluZFZpZXdCeU1vZGVsKGNlbGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcy5zZW5kVG9rZW4oVignY2lyY2xlJywgeyByOiA3LCBmaWxsOiAnZ3JlZW4nIH0pLm5vZGUsIDEwMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VsbC50cmlnZ2VyKCdzaWduYWwnLCB0YXJnZXRDZWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRib3VuZExpbmtzID0gZ3JhcGguZ2V0Q29ubmVjdGVkTGlua3MoY2VsbCwgeyBvdXRib3VuZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIF8uZWFjaChvdXRib3VuZExpbmtzLCBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmsudHJpZ2dlcignc2lnbmFsJywgbGluayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlczogYW55ID0gW11cclxuICAgICAgICBsZXQgdGFyZ2V0czogYW55ID0gW11cclxuICAgICAgICBfLm1hcChncmFwaC5nZXRMaW5rcygpLCAobGluazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChsaW5rLmdldCgnc291cmNlJykuaWQpXHJcbiAgICAgICAgICAgIHRhcmdldHMucHVzaChsaW5rLmdldCgndGFyZ2V0JykuaWQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdHJpZ2dlcnMgPSBfLnNvcnRlZFVuaXEoXy5kaWZmZXJlbmNlKHNvdXJjZXMsIHRhcmdldHMpKVxyXG4gICAgICAgIGZ1bmN0aW9uIHNpbXVsYXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXy5tYXAodHJpZ2dlcnMsICh0cmlnZ2VyOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwodHJpZ2dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VsbC50cmlnZ2VyKCdzaWduYWwnLCB0YXJnZXRDZWxsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaW11bGF0ZSgpXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruino+aekFxyXG4gICAgICogQHBhcmFtIGRhdGEg5ouT5omR5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHBhcnNlRGF0YShkYXRhOiBhbnksIG5vZGVJZDogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEubm9kZXMpIHtcclxuICAgICAgICAgICAgXy5tYXAoZGF0YS5ub2RlcywgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZ2hsaWdodDogKG5vZGUuaWQgPT09IHRoaXMucHJvcHMuY2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3IFZJTSh2aW1PcHRpb24oXy5tZXJnZShub2RlLCBvcHQsIHsgbm9kZUlkIH0pKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgKiDliJ3lp4vljJbnlLvluINcclxuICAgICovXHJcbiAgICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaDtcclxuICAgICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbmV3IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcih7IGdyYXBoOiBncmFwaCB9KTtcclxuICAgICAgICBjb25zdCBwYXBlciA9IHRoaXMucGFwZXIgPSBuZXcgam9pbnQuZGlhLlBhcGVyKHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgICAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgICAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLCAvKuaYr+WQpuWPr+S7peaLluWKqCovXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYXJzZURhdGEodGhpcy5wcm9wcy5kYXRhLCB0aGlzLnByb3BzLm5vZGVJZClcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9BbmltYXRlKClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFwZXJTY3JvbGxlciA9IHRoaXMucGFwZXJTY3JvbGxlciA9IG5ldyBqb2ludC51aS5QYXBlclNjcm9sbGVyKHtcclxuICAgICAgICAgICAgcGFwZXIsXHJcbiAgICAgICAgICAgIGF1dG9SZXNpemVQYXBlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY3Vyc29yOiAnZ3JhYidcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmRvd24nLCBwYXBlclNjcm9sbGVyLnN0YXJ0UGFubmluZyk7XHJcbiAgICAgICAgJCh0aGlzLnBhcGVyQ29udGFpbmVyKS5hcHBlbmQocGFwZXJTY3JvbGxlci5lbCk7XHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgICAgIHRoaXMucmVuZGVyTGlua3MoKVxyXG4gICAgICAgIHRoaXMucmVuZGVyTGlua3NfMigpXHJcbiAgICAgICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jZW50ZXIpIHsgcGFwZXJTY3JvbGxlci5jZW50ZXIoKSB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuem9vbVRvRml0KSB7IHBhcGVyU2Nyb2xsZXIuem9vbVRvRml0KCkgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogdG9vbHRpcOWIneWni+WMllxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0b29sX3RpcCA9IG5ldyBqb2ludC51aS5Ub29sdGlwKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnW2RhdGEtdG9vbHRpcF0nLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWxpZ24gPSBfLnNwbGl0KHRhcmdldC5hdHRyaWJ1dGVzWyduYW1lJ10ubm9kZVZhbHVlLCAnfCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxpZ25bMF0gPT09ICdsZWZ0JyA/ICdsZWZ0JyA6ICdyaWdodCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udGVudDogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlwcyA9IF8uc3BsaXQodGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtdG9vbHRpcCddLm5vZGVWYWx1ZSwgJ3wnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKHRpcHMsIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aXBzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpcHNbMF0gIT09IHRpcHNbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGI+JHtpdGVtfTwvYj48aHIgLz5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog5Y+M5Ye75LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGFwZXIub24oJ2NlbGw6cG9pbnRlcmRibGNsaWNrJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMudHlwZSA9PT0gJ1ZJTScpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsY2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGJsY2xpY2soY2VsbFZpZXcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOWNleWHu+S6i+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhcGVyLm9uKCdjZWxsOnBvaW50ZXJjbGljaycsIChjZWxsVmlldzogYW55LCBldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy50eXBlID09PSAnVklNJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG11bHRpcGxlID0gcGFwZXJTY3JvbGxlci56b29tKClcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycucGVyZiddLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycucGVyZiddLnggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRYIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnggPD0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WSAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi55IDw9IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycucGVyZiddLnggPT09IDE2OSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0Lm9mZnNldFggLyBtdWx0aXBsZSAtIGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMucG9zaXRpb24ueCA+PSAxNjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WSAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi55IDw9IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMuYXR0cnNbJy5hbGFybSddLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycuYWxhcm0nXS54ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WCAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi54IDw9IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0Lm9mZnNldFkgLyBtdWx0aXBsZSAtIGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMucG9zaXRpb24ueSA+PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5hdHRyc1snLmFsYXJtJ10ueCA9PT0gMTY5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WCAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi54ID49IDE2OSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRZIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnkgPj0gMTkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOino+WGs+WFqOWxj+S4jeaYvuekunRvb2x0aXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXBlci5vbignY2VsbDptb3VzZW92ZXInLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy50eXBlID09PSAnVklNJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvcG9sb2d5X2luc3RhbmNlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3lfaW5zdGFuY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBqb2ludF90b29sdGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pvaW50LXRvb2x0aXAnKVswXVxyXG4gICAgICAgICAgICAgICAgICAgIHRvcG9sb2d5X2luc3RhbmNlLmFwcGVuZChqb2ludF90b29sdGlwcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog5oyJ6ZKuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idG5fbWFwLm9uY2xpY2sgPSB0aGlzLnNtYWxsX21hcC5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fem9vbWluLm9uY2xpY2sgPSB0aGlzLnpvb21Jbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fem9vbW91dC5vbmNsaWNrID0gdGhpcy56b29tT3V0LmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLmJ0bl9mdWxsc2NyZWVuLm9uY2xpY2sgPSB0aGlzLmZ1bGxTY3JlZW4uYmluZCh0aGlzKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog57yp55Wl5Zu+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IG5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yID0gbmV3IGpvaW50LnVpLk5hdmlnYXRvcih7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyNDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTE1LFxyXG4gICAgICAgICAgICBwYXBlclNjcm9sbGVyOiB0aGlzLnBhcGVyU2Nyb2xsZXIsXHJcbiAgICAgICAgICAgIHpvb206IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcy5uYXZpKS5hcHBlbmQobmF2aWdhdG9yLmVsKTtcclxuICAgICAgICBuYXZpZ2F0b3IucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5omT5byA5YWz6Zet57yp55Wl5Zu+XHJcbiAgICAgKi9cclxuICAgIHNtYWxsX21hcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aXNhYmxlX2luc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdmlzYWJsZV9pbnN0YW5jZTogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5omT5byA5YWz6Zet5YWo5bGPXHJcbiAgICAgKi9cclxuICAgIGZ1bGxTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5leGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDov5vlhaXlhajlsY9cclxuICAgICAqL1xyXG4gICAgcmVxdWVzdEZ1bGxTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIGRlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3lfaW5zdGFuY2UnKTtcclxuICAgICAgICBpZiAoZGUucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUucmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICBkZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICog6YCA5Ye65YWo5bGPXHJcbiAgICAgKi9cclxuICAgIGV4aXRGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBkZTogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgaWYgKGRlLmV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZS5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKlxyXG4gICAgKiDnm5HlkKxmdWxsc2NyZWVuY2hhbmdl5LqL5Lu2XHJcbiAgICAqL1xyXG4gICAgd2F0Y2hGdWxsU2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGU6IGFueSA9IGRvY3VtZW50XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS5mdWxsc2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS5tb3pGdWxsU2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS53ZWJraXRJc0Z1bGxTY3JlZW5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog6Ieq5Yqo5biD5bGAIFxyXG4gICAgICovXHJcbiAgICByZW5kZXJMYXlvdXQoKSB7XHJcbiAgICAgICAgbGV0IGdyYXBoQkJveCA9IGpvaW50LmxheW91dC5EaXJlY3RlZEdyYXBoLmxheW91dCh0aGlzLmdyYXBoLCB7XHJcbiAgICAgICAgICAgIG5vZGVTZXA6IDUwLFxyXG4gICAgICAgICAgICBlZGdlU2VwOiA4MCxcclxuICAgICAgICAgICAgbWFyZ2luWDogMTAwLFxyXG4gICAgICAgICAgICBtYXJnaW5ZOiAxMDAsXHJcbiAgICAgICAgICAgIHJhbmtTZXA6IDgwLFxyXG4gICAgICAgICAgICByYW5rRGlyOiAnTFInXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5biD5bGA5ZCO55qE6L+e57q/XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckxpbmtzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3MpIHtcclxuICAgICAgICAgICAgXy5tYXAodGhpcy5wcm9wcy5kYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXJMaW5rc18yKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3MyKSB7XHJcbiAgICAgICAgICAgIF8ubWFwKHRoaXMucHJvcHMuZGF0YS5saW5rczIsIChsaW5rMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rMikpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOaUvuWkp+e8qeWwj1xyXG4gICAgICovXHJcbiAgICB6b29tSW4oKSB7XHJcbiAgICAgICAgdGhpcy5wYXBlclNjcm9sbGVyLnpvb20oMC4yLCB7IG1heDogMiB9KTtcclxuICAgIH1cclxuICAgIHpvb21PdXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXBlclNjcm9sbGVyLnpvb20oLTAuMiwgeyBtaW46IDAuMiB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBNYWluUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmlzYWJsZV9pbnN0YW5jZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG5cclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVBhcGVyKClcclxuICAgICAgICB0aGlzLndhdGNoRnVsbFNjcmVlbigpXHJcbiAgICB9XHJcbiAgICByZW5kZXJNYXAoKSB7XHJcbiAgICAgICAgbGV0IHsgdmlzYWJsZV9pbnN0YW5jZSB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgICAgIGlmICh2aXNhYmxlX2luc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIGlkPVwibmF2aWdhdG9yX2luc3RhbmNlXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpID0gbm9kZSB9fSAvPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIGlkPVwibmF2aWdhdG9yX2luc3RhbmNlXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpID0gbm9kZSB9fSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXJGdWxsc2NyZWVuQnRuKCkge1xyXG4gICAgICAgIGxldCB7IGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGUgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICBpZiAoZnVsbHNjcmVlbl9idG5fZGlzYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdWxsc2NyZWVuID0gbm9kZSB9fSBpZD1cImJ0bi1mdWxsc2NyZWVuXCIgY2xhc3NOYW1lPVwiYnRuXCIgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19PuWFqOWxjzwvZGl2PlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bGxzY3JlZW4gPSBub2RlIH19IGlkPVwiYnRuLWZ1bGxzY3JlZW5cIiBjbGFzc05hbWU9XCJidG5cIj7lhajlsY88L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IG9uTWFwID0gdGhpcy5zdGF0ZS52aXNhYmxlX2luc3RhbmNlID09PSB0cnVlID8gJ+WFs+mXree8qeeVpeWbvicgOiAn5omT5byA57yp55Wl5Zu+J1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG9sb2d5X2luc3RhbmNlXCIgaWQ9XCJ0b3BvbG9neV9pbnN0YW5jZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3ktYXBwXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGdWxsc2NyZWVuQnRuKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX21hcCA9IG5vZGUgfX0gaWQ9XCJidG4tbWFwXCIgY2xhc3NOYW1lPVwiYnRuXCI+e29uTWFwfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29taW4gPSBub2RlIH19IGlkPVwiYnRuLXpvb21pblwiIGNsYXNzTmFtZT1cImJ0blwiPis8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbW91dCA9IG5vZGUgfX0gaWQ9XCJidG4tem9vbW91dFwiIGNsYXNzTmFtZT1cImJ0blwiPi08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFwZXItY29udGFpbmVyXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5wYXBlckNvbnRhaW5lciA9IG5vZGUgfX0gPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWFwKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlL2luZGV4J1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQgVG9wb2xvZ3lJbnN0YW5jZSBmcm9tICcuL21vZHVsZS92aWV3L21haW4nO1xyXG5cclxuY29uc3QgaW5pdCA9IChtb3VudE5vZGVJZCA9ICdyb290Jywgb3B0OiBhbnkpID0+IHtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8VG9wb2xvZ3lJbnN0YW5jZVxyXG4gICAgICByYW5rRGlyPXtvcHQucmFua0Rpcn1cclxuICAgICAgYW5pbWF0ZT17b3B0LmFuaW1hdGV9XHJcbiAgICAgIGNpZD17b3B0LmNpZH1cclxuICAgICAgZGF0YT17b3B0LmRhdGF9XHJcbiAgICAgIG9uRGJsY2xpY2s9e29wdC5vbkRibGNsaWNrfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neUluc3RhbmNlXHJcbn0iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJSZWFjdC5jcmVhdGVFbGVtZW50IiwiUmVhY3QuQ29tcG9uZW50IiwiUmVhY3RET00ucmVuZGVyIiwiVG9wb2xvZ3lJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVB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Q0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUN0Qjt5QkFDSjtxQkFDSjt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUMzRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFOzRCQUN0RSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUN0Qjt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUNyRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNuRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNyRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzZCQUN6Qjt5QkFDSjtxQkFDSjt5QkFBTSxJQUFJLFFBQVEsQ0FB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
