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
            if (opt.targetObj.hide) {
                option.source = { id: opt.source };
                option.target = { id: opt.target };
                option.attrs['.connection']['display'] = 'none';
                option.attrs['.marker-target']['display'] = 'none';
            }
            else {
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
            if (opt.hide) {
                option.markup = "<g class=\"rotatable\" style=\"display:  none\" " + dataTooltip + " " + align + ">\n                <rect class=\"body\"/><rect class=\"logo\" />\n                <image " + dataIcon + " " + logoX + " y=\"1\" height=\"28px\" width=\"28px\"/><rect class=\"card\"/>\n                <rect class=\"alarm\"/><rect class=\"perf\"/><text class=\"label\"/><text class=\"type\"/></g>";
            }
            else {
                option.markup = "<g class=\"rotatable\" " + dataTooltip + " " + align + ">\n                <rect class=\"body\"/><rect class=\"logo\" />\n                <image " + dataIcon + " " + logoX + " y=\"1\" height=\"28px\" width=\"28px\"/><rect class=\"card\"/>\n                <rect class=\"alarm\"/><rect class=\"perf\"/><text class=\"label\"/><text class=\"type\"/></g>";
            }
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
        // if (this.props.center) { paperScroller.center() }
        if (this.props.nodeId) {
            var positon_1 = {};
            _.map(this.props.data.nodes, function (item, index) {
                if (item.id === _this.props.nodeId) {
                    positon_1 = { x: item.x, y: item.y };
                }
            });
        }
        paperScroller.zoomToFit();
        // if (this.props.zoomToFit) { paperScroller.zoomToFit() }
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
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, nodeId: opt.nodeId, onDblclick: opt.onDblclick, onContextmenuclick: opt.onContextmenuclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology_instance.js.map

exports.init = init;
exports.TopologyInstance = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3lfaW5zdGFuY2UuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5X2luc3RhbmNlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHJlY3QgY2xhc3M9XCJwZXJmXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz4nLFxyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnVklNJyxcclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuJzoge1xyXG4gICAgICAgICAgICAgICAgbWFnbmV0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmxhYmVsJzoge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJycsXHJcbiAgICAgICAgICAgICAgICAncmVmLXgnOiAuNTgsXHJcbiAgICAgICAgICAgICAgICAncmVmLXknOiAuMjUsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDAwJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLnR5cGUnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC4wNSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC43LFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IDE0LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYWxhcm0nOiB7XHJcbiAgICAgICAgICAgICAgICB4OiAxLFxyXG4gICAgICAgICAgICAgICAgeTogMTksXHJcbiAgICAgICAgICAgICAgICAncngnOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcucGVyZic6IHtcclxuICAgICAgICAgICAgICAgIHg6IDEsXHJcbiAgICAgICAgICAgICAgICB5OiAxLFxyXG4gICAgICAgICAgICAgICAgJ3J4JzogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAncnknOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmxvZ28nOiB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICcycHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmJvZHknOiB7XHJcbiAgICAgICAgICAgICAgICAncmVmLXdpZHRoJzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi1oZWlnaHQnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgTGluayA9IGpvaW50LmRpYS5MaW5rLmV4dGVuZCh7XHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdMaW5rJyxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7IHN0cm9rZTogJyNDNkM5Q0EnLCAnc3Ryb2tlLXdpZHRoJzogMSB9LFxyXG4gICAgICAgICAgICAnLmxpbmstdG9vbHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci1hcnJvd2hlYWRzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdmVydGV4JzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdmVydGljZXMnOiB7IGRpc3BsYXk6ICdub25lJyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB6OiAtMVxyXG4gICAgfSwgam9pbnQuZGlhLkxpbmsucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qXHJcbioq6L+e5o6l57q/5LiO566t5aS05qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWxpbmtPcHRpb24ge1xyXG4gICAgc3RhdGU/OiBudW1iZXJcclxuICAgIHNvdXJjZT86IGFueVxyXG4gICAgdGFyZ2V0PzogYW55XHJcbiAgICBzb3VyY2VPYmo/OiBhbnlcclxuICAgIHRhcmdldE9iaj86IGFueVxyXG4gICAgbGlua1R5cGU/OiBudW1iZXJcclxuICAgIGFycm93VHlwZT86IG51bWJlclxyXG59XHJcbmxldCBsaW5rT3B0aW9uID0gKG9wdDogSWxpbmtPcHRpb24pID0+IHtcclxuICAgIGxldCBvcHRpb246IGFueSA9IHtcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6ICcjQzZDOUNBJyxcclxuICAgICAgICAgICAgICAgICdzdHJva2UtZGFzaGFycmF5JzogJydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdGFyZ2V0Jzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsIC8vIOeureWktOi+ueahhlxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNDNkM5Q0EnLCAvLyDnrq3lpLTpopzoibJcclxuICAgICAgICAgICAgICAgIGQ6ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JyAvLyDnrq3lpLTmoLflvI9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3V0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ25vcm1hbCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25uZWN0b3I6IHtcclxuICAgICAgICAgICAgbmFtZTogJ25vcm1hbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgICAgaWYgKG9wdC5saW5rVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAob3B0LnRhcmdldE9iai5oaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uc291cmNlID0geyBpZDogb3B0LnNvdXJjZSB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb24udGFyZ2V0ID0geyBpZDogb3B0LnRhcmdldCB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ2Rpc3BsYXknXSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXVsnZGlzcGxheSddID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNvdXJjZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBvcHQuc291cmNlT2JqLnggKyA5MCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBvcHQuc291cmNlT2JqLnkgKyAzMCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvcHQudGFyZ2V0T2JqLmFsaWduID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24udGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBvcHQudGFyZ2V0T2JqLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IG9wdC50YXJnZXRPYmoueSArIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogb3B0LnRhcmdldE9iai54ICsgMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBvcHQudGFyZ2V0T2JqLnkgKyAyMCxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24uc291cmNlID0geyBpZDogb3B0LnNvdXJjZSB9XHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24udGFyZ2V0ID0geyBpZDogb3B0LnRhcmdldCB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob3B0LmxpbmtUeXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHQuc291cmNlT2JqLmFsaWduID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogb3B0LnNvdXJjZU9iai54ICsgMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IG9wdC5zb3VyY2VPYmoueSArIDE1LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC50YXJnZXRPYmouYWxpZ24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCArIDE4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb3B0LnRhcmdldE9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQuc291cmNlT2JqLnggPj0gb3B0LnRhcmdldE9iai54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52ZXJ0aWNlcyA9IFt7IHg6IG9wdC5zb3VyY2VPYmoueCArIDIzMCwgeTogKG9wdC5zb3VyY2VPYmoueSArIG9wdC50YXJnZXRPYmoueSkgLyAyIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZlcnRpY2VzID0gW3sgeDogb3B0LnRhcmdldE9iai54ICsgMjMwLCB5OiAob3B0LnNvdXJjZU9iai55ICsgb3B0LnRhcmdldE9iai55KSAvIDIgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb3B0LnRhcmdldE9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNvdXJjZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBvcHQuc291cmNlT2JqLngsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogb3B0LnNvdXJjZU9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0LnRhcmdldE9iai5hbGlnbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogb3B0LnRhcmdldE9iai54ICsgMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBvcHQudGFyZ2V0T2JqLnkgKyAxNSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9wdC50YXJnZXRPYmoueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb3B0LnRhcmdldE9iai55ICsgMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQuc291cmNlT2JqLnggPD0gb3B0LnRhcmdldE9iai54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52ZXJ0aWNlcyA9IFt7IHg6IG9wdC5zb3VyY2VPYmoueCAtIDIzMCwgeTogKG9wdC5zb3VyY2VPYmoueSArIG9wdC50YXJnZXRPYmoueSkgLyAyIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZlcnRpY2VzID0gW3sgeDogb3B0LnRhcmdldE9iai54IC0gMjMwLCB5OiAob3B0LnNvdXJjZU9iai55ICsgb3B0LnRhcmdldE9iai55KSAvIDIgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbi5zdGF0ZSA9IG9wdC5zdGF0ZVxyXG4gICAgICAgIG9wdGlvbi5saW5rVHlwZSA9IG9wdC5saW5rVHlwZVxyXG4gICAgICAgIG9wdGlvbi5hcnJvd1R5cGUgPSBvcHQuYXJyb3dUeXBlXHJcbiAgICAgICAgLyrov57mjqXnur/popzoibIqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjRkY5OTAxJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0ZGOTkwMSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjREZCMjAyJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0RGQjIwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNERkIyMDInO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnIzAwQkZGRidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyMwMEJGRkYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKui/nuaOpee6v+exu+WeiyovXHJcbiAgICAgICAgc3dpdGNoIChvcHRpb24ubGlua1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2Utd2lkdGgnXSA9IDM7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24ucm91dGVyLm5hbWUgPSAnbWFuaGF0dGFuJzsgICAvLyDlrp7nur9cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDMnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbm5lY3Rvci5uYW1lID0gJ3Ntb290aCc7ICAgLy8g6Jma57q/XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLXdpZHRoJ10gPSAzO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnJvdXRlci5uYW1lID0gJ21hbmhhdHRhbic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyrnrq3lpLTnsbvlnosqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0aW9uLmFycm93VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JzsgIC8vIOS4ieinkueureWktFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMjAgNSB6JzsgLy8g5a6e5b+D6I+x5b2iXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAyMCA1IHonOyAvLyDnqbrlv4Poj7HlvaJcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMCA1IHonOyAvLyDlsJbnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICcnOyAvLyDmsqHmnInnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbi8qXHJcbioq5Y6f5Lu25qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXZpbU9wdGlvbiB7XHJcbiAgICBpZD86IHN0cmluZ1xyXG4gICAgbmFtZT86IHN0cmluZ1xyXG4gICAgc3RhdHVzPzogc3RyaW5nXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBhbGFybT86IG51bWJlclxyXG4gICAgYWxpZ24/OiBzdHJpbmdcclxuICAgIHBlcmY/OiBudW1iZXJcclxuICAgIHg/OiBudW1iZXJcclxuICAgIHk/OiBudW1iZXJcclxuICAgIGRpc3BsYXlUeXBlPzogYW55XHJcbiAgICBub2RlSWQ/OiBzdHJpbmdcclxuICAgIGhpZGU/OiBib29sZWFuXHJcbn1cclxuLyrlhYPku7bmmL7npLrmloflrZfnmoTplb/nn60qL1xyXG5sZXQgZ2V0TmV3U3RyaW5nID0gKHN0cjogYW55KSA9PiB7XHJcbiAgICBsZXQgcmVhbExlbmd0aCA9IDAsIGxlbiA9IHN0ci5sZW5ndGgsIGNoYXJDb2RlID0gLTEsIGIgPSAnJ1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaSlcclxuICAgICAgICBpZiAoY2hhckNvZGUgPj0gMCAmJiBjaGFyQ29kZSA8PSAxMjgpIHtcclxuICAgICAgICAgICAgcmVhbExlbmd0aCArPSAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVhbExlbmd0aCArPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVhbExlbmd0aCA8PSAxOCkge1xyXG4gICAgICAgICAgICBiID0gYiArIHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBiO1xyXG59XHJcbmxldCB2aW1PcHRpb24gPSAob3B0OiBJdmltT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7XHJcbiAgICAgICAgcG9zaXRpb246IHt9LFxyXG4gICAgICAgIHNpemU6IHt9LFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7fSwgJy50eXBlJzoge30sICcuYWxhcm0nOiB7fSwgJy5wZXJmJzoge30sICcubG9nbyc6IHt9LCAnLmJvZHknOiB7fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBkYXRhVG9vbHRpcCA9ICcnXHJcbiAgICBsZXQgYWxpZ24gPSAnJ1xyXG4gICAgbGV0IGRhdGFJY29uID0gJydcclxuICAgIGxldCBsb2dvWCA9ICcnXHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgICAgaWYgKG9wdC5pZCkge1xyXG4gICAgICAgICAgICBvcHRpb24uaWQgPSBvcHQuaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC54ICYmIG9wdC55KSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5wb3NpdGlvbiA9IHsgeDogb3B0LngsIHk6IG9wdC55IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlvZPliY3lm77moIfpq5jkuq4qL1xyXG4gICAgICAgIGlmIChvcHQuaWQgPT09IG9wdC5ub2RlSWQpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLmZpbGwgPSAnI2U4YWQzOCdcclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlhYPku7bnmoTlm77moIcqL1xyXG4gICAgICAgIGlmIChvcHQuZGlzcGxheVR5cGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChvcHQuZGlzcGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ29yZGVyJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSdzcmMvaW1nL29yZGVyLnBuZydgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdBQ0NPVU5UJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSdzcmMvaW1nL3RlbmFudC5wbmcnYFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmZzJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSdzcmMvaW1nL3NlcnZpY2UucG5nJ2BcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Nmcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0nc3JjL2ltZy9zZXJ2aWNlLnBuZydgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvc2VydmljZS5wbmcnYFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8q5YWD57Sg5L2N572uKi9cclxuICAgICAgICBpZiAob3B0LmFsaWduKSB7XHJcbiAgICAgICAgICAgIGFsaWduID0gYG5hbWU9XCIke29wdC5hbGlnbn1cImBcclxuICAgICAgICAgICAgc3dpdGNoIChvcHQuYWxpZ24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS54ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLnBlcmYnXS54ID0gMTY5XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS54ID0gMTY5XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubGFiZWwnXVsncmVmLXgnXSA9IC41OFxyXG4gICAgICAgICAgICAgICAgICAgIGxvZ29YID0gYHg9JzEnYFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS54ID0gMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycucGVyZiddLnggPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS54ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxhYmVsJ11bJ3JlZi14J10gPSAuNDFcclxuICAgICAgICAgICAgICAgICAgICBsb2dvWCA9IGB4PScxNTEnYFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10ueCA9IDBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahFNWRyovXHJcbiAgICAgICAgaWYgKG9wdC5uYW1lKSB7XHJcbiAgICAgICAgICAgIGRhdGFUb29sdGlwID0gYGRhdGEtdG9vbHRpcD1cIiR7b3B0Lm5hbWV9XCJgXHJcbiAgICAgICAgICAgIGlmIChvcHQuaGlkZSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiIHN0eWxlPVwiZGlzcGxheTogIG5vbmVcIiAke2RhdGFUb29sdGlwfSAke2FsaWdufT5cclxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiYm9keVwiLz48cmVjdCBjbGFzcz1cImxvZ29cIiAvPlxyXG4gICAgICAgICAgICAgICAgPGltYWdlICR7ZGF0YUljb259ICR7bG9nb1h9IHk9XCIxXCIgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiLz48cmVjdCBjbGFzcz1cImNhcmRcIi8+XHJcbiAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImFsYXJtXCIvPjxyZWN0IGNsYXNzPVwicGVyZlwiLz48dGV4dCBjbGFzcz1cImxhYmVsXCIvPjx0ZXh0IGNsYXNzPVwidHlwZVwiLz48L2c+YFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiICR7ZGF0YVRvb2x0aXB9ICR7YWxpZ259PlxyXG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJib2R5XCIvPjxyZWN0IGNsYXNzPVwibG9nb1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8aW1hZ2UgJHtkYXRhSWNvbn0gJHtsb2dvWH0geT1cIjFcIiBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIvPjxyZWN0IGNsYXNzPVwiY2FyZFwiLz5cclxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHJlY3QgY2xhc3M9XCJwZXJmXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5uYW1lKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxhYmVsJ10udGV4dCA9IGdldE5ld1N0cmluZyhvcHQubmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5wZXJmKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3B0LnBlcmYpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5wZXJmJ10ud2lkdGggPSAxMFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLnBlcmYnXS5oZWlnaHQgPSAxMFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLnBlcmYnXS5maWxsID0gJyMwMGIzODgnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycucGVyZiddLndpZHRoID0gMTBcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5wZXJmJ10uaGVpZ2h0ID0gMTBcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5wZXJmJ10uZmlsbCA9ICcjRkY5OTAxJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahOWRiuitpiovXHJcbiAgICAgICAgc3dpdGNoIChvcHQuYWxhcm0pIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS53aWR0aCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmZpbGwgPSAnIzAwYjM4OCdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMTBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uaGVpZ2h0ID0gMTBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjRDEwMDAyJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10ud2lkdGggPSAxMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAxMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS53aWR0aCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDEwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmZpbGwgPSAnI0RGQjIwMidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMTBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uaGVpZ2h0ID0gMTBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjMDBCRkZGJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlhYPku7bnmoTog4zmma/mmK/kuq7ov5jmmK/mmpcqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0LnN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlICdBQ1RJVkUnOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLmZpbGwgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdTVE9QJzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBWSU0sXHJcbiAgICB2aW1PcHRpb24sXHJcbiAgICBMaW5rLFxyXG4gICAgbGlua09wdGlvblxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWSU0sIExpbmssIHZpbU9wdGlvbiwgbGlua09wdGlvbiB9IGZyb20gJy4vdmltJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSBsZXQgVjogYW55XHJcbmRlY2xhcmUgY29uc3Qgam9pbnQ6IGFueVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xyXG4gICAgYW5pbWF0ZT86IGJvb2xlYW5cclxuICAgIHdpZHRoPzogYW55XHJcbiAgICBoZWlnaHQ/OiBhbnlcclxuICAgIGRyYXdHcmlkPzogYm9vbGVhblxyXG4gICAgcmFua0Rpcj86ICdUQicgfCAnQlQnIHwgJ0xSJyB8ICdSTCc7XHJcbiAgICBvbkRibGNsaWNrPzogRnVuY3Rpb25cclxuICAgIGRhdGE6IGFueVxyXG4gICAgbm9kZUlkPzogc3RyaW5nXHJcbiAgICBjZW50ZXI/OiBib29sZWFuXHJcbiAgICB6b29tVG9GaXQ/OiBib29sZWFuXHJcbiAgICBwYXBlcl93aWR0aD86IG51bWJlclxyXG4gICAgcGFwZXJfaGVpZ2h0PzogbnVtYmVyXHJcbiAgICBjaWQ/OiBzdHJpbmdcclxuICAgIGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGU/OiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TWFpblByb3BzLCBhbnk+IHtcclxuICAgIC8vIENvbmF0aW5lclxyXG4gICAgcGFwZXJDb250YWluZXI6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fbW9yZTogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl96b29taW46IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fbWFwOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX3pvb21vdXQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBuYXZpOiBIVE1MRGl2RWxlbWVudFxyXG5cclxuICAgIC8vIHJhcHBpZCB0aGluZ3NcclxuICAgIGdyYXBoOiBqb2ludC5kaWEuR3JhcGg7XHJcbiAgICBncmFwaDI6IGpvaW50LmRpYS5HcmFwaDtcclxuICAgIGNvbW1hbmRNYW5hZ2VyOiBqb2ludC5kaWEuQ29tbWFuZE1hbmFnZXI7XHJcbiAgICBwYXBlcjogam9pbnQuZGlhLlBhcGVyO1xyXG4gICAgcGFwZXJTY3JvbGxlcjogam9pbnQudWkuUGFwZXJTY3JvbGxlcjtcclxuICAgIG5hdmlnYXRvcjogam9pbnQudWkuTmF2aWdhdG9yO1xyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogTWFpblByb3BzID0ge1xyXG4gICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgIHdpZHRoOiA4MDAsXHJcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgcGFwZXJfd2lkdGg6IDEwMDAsXHJcbiAgICAgICAgcGFwZXJfaGVpZ2h0OiAxMDAwLFxyXG4gICAgICAgIGRyYXdHcmlkOiBmYWxzZSxcclxuICAgICAgICByYW5rRGlyOiAnUkwnLFxyXG4gICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgIG5vZGVJZDogJycsXHJcbiAgICAgICAgY2VudGVyOiBmYWxzZSxcclxuICAgICAgICB6b29tVG9GaXQ6IGZhbHNlLFxyXG4gICAgICAgIGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGU6IGZhbHNlXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruS8oOmAkuWKqOeUu1xyXG4gICAgICovXHJcbiAgICBkb0FuaW1hdGUoKSB7XHJcbiAgICAgICAgbGV0IGdyYXBoID0gdGhpcy5ncmFwaFxyXG4gICAgICAgIGxldCBwYXBlciA9IHRoaXMucGFwZXJcclxuICAgICAgICBncmFwaC5vbignc2lnbmFsJywgZnVuY3Rpb24gKGNlbGw6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2Ygam9pbnQuZGlhLkxpbmspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsLmF0dHJpYnV0ZXMubGlua1R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwoY2VsbC5nZXQoJ3RhcmdldCcpLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgczogYW55ID0gcGFwZXIuZmluZFZpZXdCeU1vZGVsKGNlbGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcy5zZW5kVG9rZW4oVignY2lyY2xlJywgeyByOiA3LCBmaWxsOiAnZ3JlZW4nIH0pLm5vZGUsIDEwMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VsbC50cmlnZ2VyKCdzaWduYWwnLCB0YXJnZXRDZWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRib3VuZExpbmtzID0gZ3JhcGguZ2V0Q29ubmVjdGVkTGlua3MoY2VsbCwgeyBvdXRib3VuZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIF8uZWFjaChvdXRib3VuZExpbmtzLCBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmsudHJpZ2dlcignc2lnbmFsJywgbGluayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlczogYW55ID0gW11cclxuICAgICAgICBsZXQgdGFyZ2V0czogYW55ID0gW11cclxuICAgICAgICBfLm1hcChncmFwaC5nZXRMaW5rcygpLCAobGluazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChsaW5rLmdldCgnc291cmNlJykuaWQpXHJcbiAgICAgICAgICAgIHRhcmdldHMucHVzaChsaW5rLmdldCgndGFyZ2V0JykuaWQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdHJpZ2dlcnMgPSBfLnNvcnRlZFVuaXEoXy5kaWZmZXJlbmNlKHNvdXJjZXMsIHRhcmdldHMpKVxyXG4gICAgICAgIGZ1bmN0aW9uIHNpbXVsYXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXy5tYXAodHJpZ2dlcnMsICh0cmlnZ2VyOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwodHJpZ2dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VsbC50cmlnZ2VyKCdzaWduYWwnLCB0YXJnZXRDZWxsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaW11bGF0ZSgpXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruino+aekFxyXG4gICAgICogQHBhcmFtIGRhdGEg5ouT5omR5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHBhcnNlRGF0YShkYXRhOiBhbnksIG5vZGVJZDogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEubm9kZXMpIHtcclxuICAgICAgICAgICAgXy5tYXAoZGF0YS5ub2RlcywgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZ2hsaWdodDogKG5vZGUuaWQgPT09IHRoaXMucHJvcHMuY2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3IFZJTSh2aW1PcHRpb24oXy5tZXJnZShub2RlLCBvcHQsIHsgbm9kZUlkIH0pKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgKiDliJ3lp4vljJbnlLvluINcclxuICAgICovXHJcbiAgICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaDtcclxuICAgICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbmV3IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcih7IGdyYXBoOiBncmFwaCB9KTtcclxuICAgICAgICBjb25zdCBwYXBlciA9IHRoaXMucGFwZXIgPSBuZXcgam9pbnQuZGlhLlBhcGVyKHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgICAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgICAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLCAvKuaYr+WQpuWPr+S7peaLluWKqCovXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYXJzZURhdGEodGhpcy5wcm9wcy5kYXRhLCB0aGlzLnByb3BzLm5vZGVJZClcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9BbmltYXRlKClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFwZXJTY3JvbGxlciA9IHRoaXMucGFwZXJTY3JvbGxlciA9IG5ldyBqb2ludC51aS5QYXBlclNjcm9sbGVyKHtcclxuICAgICAgICAgICAgcGFwZXIsXHJcbiAgICAgICAgICAgIGF1dG9SZXNpemVQYXBlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY3Vyc29yOiAnZ3JhYidcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmRvd24nLCBwYXBlclNjcm9sbGVyLnN0YXJ0UGFubmluZyk7XHJcbiAgICAgICAgJCh0aGlzLnBhcGVyQ29udGFpbmVyKS5hcHBlbmQocGFwZXJTY3JvbGxlci5lbCk7XHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgICAgIHRoaXMucmVuZGVyTGlua3MoKVxyXG4gICAgICAgIHRoaXMucmVuZGVyTGlua3NfMigpXHJcbiAgICAgICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5wcm9wcy5jZW50ZXIpIHsgcGFwZXJTY3JvbGxlci5jZW50ZXIoKSB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubm9kZUlkKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3NpdG9uOiBhbnkgPSB7fVxyXG4gICAgICAgICAgICBfLm1hcCh0aGlzLnByb3BzLmRhdGEubm9kZXMsIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHRoaXMucHJvcHMubm9kZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRvbiA9IHsgeDogaXRlbS54LCB5OiBpdGVtLnkgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBwYXBlclNjcm9sbGVyLnpvb21Ub0ZpdCgpXHJcbiAgICAgICAgLy8gaWYgKHRoaXMucHJvcHMuem9vbVRvRml0KSB7IHBhcGVyU2Nyb2xsZXIuem9vbVRvRml0KCkgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogdG9vbHRpcOWIneWni+WMllxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0b29sX3RpcCA9IG5ldyBqb2ludC51aS5Ub29sdGlwKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnW2RhdGEtdG9vbHRpcF0nLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWxpZ24gPSBfLnNwbGl0KHRhcmdldC5hdHRyaWJ1dGVzWyduYW1lJ10ubm9kZVZhbHVlLCAnfCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxpZ25bMF0gPT09ICdsZWZ0JyA/ICdsZWZ0JyA6ICdyaWdodCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udGVudDogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlwcyA9IF8uc3BsaXQodGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtdG9vbHRpcCddLm5vZGVWYWx1ZSwgJ3wnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKHRpcHMsIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aXBzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpcHNbMF0gIT09IHRpcHNbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGI+JHtpdGVtfTwvYj48aHIgLz5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog5Y+M5Ye75LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGFwZXIub24oJ2NlbGw6cG9pbnRlcmRibGNsaWNrJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMudHlwZSA9PT0gJ1ZJTScpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsY2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGJsY2xpY2soY2VsbFZpZXcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOWNleWHu+S6i+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhcGVyLm9uKCdjZWxsOnBvaW50ZXJjbGljaycsIChjZWxsVmlldzogYW55LCBldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy50eXBlID09PSAnVklNJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG11bHRpcGxlID0gcGFwZXJTY3JvbGxlci56b29tKClcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycucGVyZiddLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycucGVyZiddLnggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRYIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnggPD0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WSAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi55IDw9IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycucGVyZiddLnggPT09IDE2OSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0Lm9mZnNldFggLyBtdWx0aXBsZSAtIGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMucG9zaXRpb24ueCA+PSAxNjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WSAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi55IDw9IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMuYXR0cnNbJy5hbGFybSddLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycuYWxhcm0nXS54ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WCAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi54IDw9IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0Lm9mZnNldFkgLyBtdWx0aXBsZSAtIGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMucG9zaXRpb24ueSA+PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5hdHRyc1snLmFsYXJtJ10ueCA9PT0gMTY5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WCAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi54ID49IDE2OSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRZIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnkgPj0gMTkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOino+WGs+WFqOWxj+S4jeaYvuekunRvb2x0aXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXBlci5vbignY2VsbDptb3VzZW92ZXInLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy50eXBlID09PSAnVklNJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvcG9sb2d5X2luc3RhbmNlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3lfaW5zdGFuY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBqb2ludF90b29sdGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pvaW50LXRvb2x0aXAnKVswXVxyXG4gICAgICAgICAgICAgICAgICAgIHRvcG9sb2d5X2luc3RhbmNlLmFwcGVuZChqb2ludF90b29sdGlwcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog5oyJ6ZKuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idG5fbWFwLm9uY2xpY2sgPSB0aGlzLnNtYWxsX21hcC5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fem9vbWluLm9uY2xpY2sgPSB0aGlzLnpvb21Jbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fem9vbW91dC5vbmNsaWNrID0gdGhpcy56b29tT3V0LmJpbmQodGhpcylcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOe8qeeVpeWbvlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCBuYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvciA9IG5ldyBqb2ludC51aS5OYXZpZ2F0b3Ioe1xyXG4gICAgICAgICAgICB3aWR0aDogMjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDExNSxcclxuICAgICAgICAgICAgcGFwZXJTY3JvbGxlcjogdGhpcy5wYXBlclNjcm9sbGVyLFxyXG4gICAgICAgICAgICB6b29tOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoaXMubmF2aSkuYXBwZW5kKG5hdmlnYXRvci5lbCk7XHJcbiAgICAgICAgbmF2aWdhdG9yLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOaJk+W8gOWFs+mXree8qeeVpeWbvlxyXG4gICAgICovXHJcbiAgICBzbWFsbF9tYXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlzYWJsZV9pbnN0YW5jZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB2aXNhYmxlX2luc3RhbmNlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOiHquWKqOW4g+WxgCBcclxuICAgICAqL1xyXG4gICAgcmVuZGVyTGF5b3V0KCkge1xyXG4gICAgICAgIGxldCBncmFwaEJCb3ggPSBqb2ludC5sYXlvdXQuRGlyZWN0ZWRHcmFwaC5sYXlvdXQodGhpcy5ncmFwaCwge1xyXG4gICAgICAgICAgICBub2RlU2VwOiA1MCxcclxuICAgICAgICAgICAgZWRnZVNlcDogODAsXHJcbiAgICAgICAgICAgIG1hcmdpblg6IDEwMCxcclxuICAgICAgICAgICAgbWFyZ2luWTogMTAwLFxyXG4gICAgICAgICAgICByYW5rU2VwOiA4MCxcclxuICAgICAgICAgICAgcmFua0RpcjogJ0xSJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOW4g+WxgOWQjueahOi/nue6v1xyXG4gICAgICovXHJcbiAgICByZW5kZXJMaW5rcygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxpbmtzKSB7XHJcbiAgICAgICAgICAgIF8ubWFwKHRoaXMucHJvcHMuZGF0YS5saW5rcywgKGxpbmspID0+IHtcclxuICAgICAgICAgICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGluaykpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyTGlua3NfMigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxpbmtzMikge1xyXG4gICAgICAgICAgICBfLm1hcCh0aGlzLnByb3BzLmRhdGEubGlua3MyLCAobGluazIpID0+IHtcclxuICAgICAgICAgICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGluazIpKS5hZGRUbyh0aGlzLmdyYXBoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDmlL7lpKfnvKnlsI9cclxuICAgICAqL1xyXG4gICAgem9vbUluKCkge1xyXG4gICAgICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKDAuMiwgeyBtYXg6IDIgfSk7XHJcbiAgICB9XHJcbiAgICB6b29tT3V0KCkge1xyXG4gICAgICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKC0wLjIsIHsgbWluOiAwLjIgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogTWFpblByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVQYXBlcigpXHJcbiAgICB9XHJcbiAgICByZW5kZXJNYXAoKSB7XHJcbiAgICAgICAgbGV0IHsgdmlzYWJsZV9pbnN0YW5jZSB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgICAgIGlmICh2aXNhYmxlX2luc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIGlkPVwibmF2aWdhdG9yX2luc3RhbmNlXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpID0gbm9kZSB9fSAvPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIGlkPVwibmF2aWdhdG9yX2luc3RhbmNlXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpID0gbm9kZSB9fSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IG9uTWFwID0gdGhpcy5zdGF0ZS52aXNhYmxlX2luc3RhbmNlID09PSB0cnVlID8gJ+WFs+mXree8qeeVpeWbvicgOiAn5omT5byA57yp55Wl5Zu+J1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG9sb2d5X2luc3RhbmNlXCIgaWQ9XCJ0b3BvbG9neV9pbnN0YW5jZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3ktYXBwXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX21hcCA9IG5vZGUgfX0gaWQ9XCJidG4tbWFwXCIgY2xhc3NOYW1lPVwiYnRuXCI+e29uTWFwfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29taW4gPSBub2RlIH19IGlkPVwiYnRuLXpvb21pblwiIGNsYXNzTmFtZT1cImJ0blwiPis8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbW91dCA9IG5vZGUgfX0gaWQ9XCJidG4tem9vbW91dFwiIGNsYXNzTmFtZT1cImJ0blwiPi08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFwZXItY29udGFpbmVyXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5wYXBlckNvbnRhaW5lciA9IG5vZGUgfX0gPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWFwKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlL2luZGV4J1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQgVG9wb2xvZ3lJbnN0YW5jZSBmcm9tICcuL21vZHVsZS92aWV3L21haW4nO1xyXG5cclxuY29uc3QgaW5pdCA9IChtb3VudE5vZGVJZCA9ICdyb290Jywgb3B0OiBhbnkpID0+IHtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8VG9wb2xvZ3lJbnN0YW5jZVxyXG4gICAgICByYW5rRGlyPXtvcHQucmFua0Rpcn1cclxuICAgICAgYW5pbWF0ZT17b3B0LmFuaW1hdGV9XHJcbiAgICAgIGNpZD17b3B0LmNpZH1cclxuICAgICAgZGF0YT17b3B0LmRhdGF9XHJcbiAgICAgIG5vZGVJZD17b3B0Lm5vZGVJZH1cclxuICAgICAgb25EYmxjbGljaz17b3B0Lm9uRGJsY2xpY2t9XHJcbiAgICAgIG9uQ29udGV4dG1lbnVjbGljaz17b3B0Lm9uQ29udGV4dG1lbnVjbGlja31cclxuICAgICAgd2lkdGg9e29wdC53aWR0aH1cclxuICAgICAgaGVpZ2h0PXtvcHQuaGVpZ2h0fVxyXG4gICAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vdW50Tm9kZUlkKSk7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGluaXQsXHJcbiAgVG9wb2xvZ3lJbnN0YW5jZVxyXG59Il0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiUmVhY3QuY3JlYXRlRWxlbWVudCIsIlJlYWN0LkNvbXBvbmVudCIsIlJlYWN0RE9NLnJlbmRlciIsIlRvcG9sb2d5SW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUMvQixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7U0FDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzlCLENBQUM7O0FBRUYsQUFBTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzVCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEIsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDeEY7O0FDdkJELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDeEMsTUFBTSxFQUFFLHFKQUFxSjtJQUM3SixRQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNyQixJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNILEdBQUcsRUFBRTtnQkFDRCxNQUFNLEVBQUUsS0FBSzthQUNoQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsRUFBRTtnQkFDUixPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsR0FBRztnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsSUFBSSxFQUFFLE1BQU07YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsRUFBRTtnQkFDUixPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsRUFBRTtnQkFDWCxXQUFXLEVBQUUsRUFBRTtnQkFDZixhQUFhLEVBQUUsTUFBTTtnQkFDckIsSUFBSSxFQUFFLE1BQU07YUFDZjtZQUNELFFBQVEsRUFBRTtnQkFDTixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsRUFBRTtnQkFDTCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2FBQ1o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLEtBQUs7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsTUFBTTtnQkFDbkIsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxLQUFLO2dCQUNYLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixjQUFjLEVBQUUsQ0FBQzthQUNwQjtTQUNKO0tBQ0osRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUVqRCxVQUFVLEVBQUU7UUFDUixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzFFO0NBQ0osQ0FBQyxDQUFDO0FBRUgsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLFFBQVEsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ3JCLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFO1lBQ0gsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFO1lBQ3ZELGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFDbEMsb0JBQW9CLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ3pDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNyQyxrQkFBa0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7U0FDMUM7UUFDRCxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ1IsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQ3JDLFVBQVUsRUFBRTtRQUNSLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztLQUM5RDtDQUNKLENBQUMsQ0FBQztBQWNILElBQUksVUFBVSxHQUFHLFVBQUMsR0FBZ0I7SUFDOUIsSUFBSSxNQUFNLEdBQVE7UUFDZCxLQUFLLEVBQUU7WUFDSCxhQUFhLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLGtCQUFrQixFQUFFLEVBQUU7YUFDekI7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxNQUFNLEVBQUUsU0FBUztnQkFDakIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsQ0FBQyxFQUFFLHdCQUF3QjthQUM5QjtTQUNKO1FBQ0QsUUFBUSxFQUFFLEVBRVQ7UUFDRCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1NBQ2pCO0tBQ0osQ0FBQTtJQUNELElBQUksR0FBRyxFQUFFO1FBQ0wsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO2dCQUNwQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFDbEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxNQUFNLEdBQUc7b0JBQ1osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZCLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFO2lCQUMxQixDQUFBO2dCQUNELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO29CQUNoQyxNQUFNLENBQUMsTUFBTSxHQUFHO3dCQUNaLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2xCLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFO3FCQUMxQixDQUFBO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxNQUFNLEdBQUc7d0JBQ1osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUc7d0JBQ3hCLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFO3FCQUMxQixDQUFBO2lCQUNKOzs7YUFHSjtTQUNKO2FBQ0ksSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN6QixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtnQkFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRztvQkFDWixDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRztvQkFDeEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUU7aUJBQzFCLENBQUE7Z0JBQ0QsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxNQUFNLEVBQUU7b0JBQ2hDLE1BQU0sQ0FBQyxNQUFNLEdBQUc7d0JBQ1osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUc7d0JBQ3hCLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFO3FCQUMxQixDQUFBO29CQUNELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3BDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDL0Y7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUMvRjtpQkFDSjtxQkFBTTtvQkFDSCxNQUFNLENBQUMsTUFBTSxHQUFHO3dCQUNaLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2xCLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFO3FCQUMxQixDQUFBO2lCQUNKO2FBQ0o7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRztvQkFDWixDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsQixDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtpQkFDMUIsQ0FBQTtnQkFDRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtvQkFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRzt3QkFDWixDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRzt3QkFDeEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUU7cUJBQzFCLENBQUE7aUJBQ0o7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRzt3QkFDWixDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNsQixDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtxQkFDMUIsQ0FBQTtvQkFDRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO3dCQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7cUJBQy9GO3lCQUFNO3dCQUNILE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDL0Y7aUJBQ0o7YUFFSjtTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTtRQUM5QixNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7O1FBRWhDLFFBQVEsTUFBTSxDQUFDLEtBQUs7WUFDaEIsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtnQkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtnQkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtnQkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ2xELE1BQU07U0FDYjs7UUFFRCxRQUFRLE1BQU0sQ0FBQyxRQUFRO1lBQ25CLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDakMsTUFBTTtZQUNWO2dCQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7Z0JBQ2pDLE1BQU07U0FDYjs7UUFFRCxRQUFRLE1BQU0sQ0FBQyxTQUFTO1lBQ3BCLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLHdCQUF3QixDQUFDO2dCQUM1RCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUM7Z0JBQ25FLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQztnQkFDbkUsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQzdDLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyw4QkFBOEIsQ0FBQztnQkFDbEUsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDdEMsTUFBTTtZQUNWO2dCQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsd0JBQXdCLENBQUM7Z0JBQzVELE1BQU07U0FDYjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUE7Q0FDaEIsQ0FBQTs7QUFvQkQsSUFBSSxZQUFZLEdBQUcsVUFBQyxHQUFRO0lBQ3hCLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUMzRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVCLElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ2xDLFVBQVUsSUFBSSxDQUFDLENBQUE7U0FDbEI7YUFBTTtZQUNILFVBQVUsSUFBSSxDQUFDLENBQUM7U0FDbkI7UUFDRCxJQUFJLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDbEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO1FBQUEsQUFBQztLQUNMO0lBQ0QsT0FBTyxDQUFDLENBQUM7Q0FDWixDQUFBO0FBQ0QsSUFBSSxTQUFTLEdBQUcsVUFBQyxHQUFlO0lBQzVCLElBQUksTUFBTSxHQUFRO1FBQ2QsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFBRTtZQUNILFFBQVEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRTtTQUNqRjtLQUNKLENBQUE7SUFDRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFDcEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBQ2QsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNkLElBQUksR0FBRyxFQUFFO1FBQ0wsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQ1IsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFBO1NBQ3JCO1FBQ0QsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDaEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUE7U0FDM0M7O1FBRUQsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO1NBQ3pDOztRQUVELElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUNqQixRQUFRLEdBQUcsQ0FBQyxXQUFXO2dCQUNuQixLQUFLLE9BQU87b0JBQ1IsUUFBUSxHQUFHLGdDQUFnQyxDQUFBO29CQUMzQyxNQUFNO2dCQUNWLEtBQUssU0FBUztvQkFDVixRQUFRLEdBQUcsaUNBQWlDLENBQUE7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxLQUFLO29CQUNOLFFBQVEsR0FBRyxrQ0FBa0MsQ0FBQTtvQkFDN0MsTUFBTTtnQkFDVixLQUFLLEtBQUs7b0JBQ04sUUFBUSxHQUFHLGtDQUFrQyxDQUFBO29CQUM3QyxNQUFNO2dCQUNWO29CQUNJLFFBQVEsR0FBRyxrQ0FBa0MsQ0FBQTtvQkFDN0MsTUFBTTthQUNiO1NBQ0o7O1FBRUQsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1gsS0FBSyxHQUFHLFlBQVMsR0FBRyxDQUFDLEtBQUssT0FBRyxDQUFBO1lBQzdCLFFBQVEsR0FBRyxDQUFDLEtBQUs7Z0JBQ2IsS0FBSyxNQUFNO29CQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO29CQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7b0JBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFBO29CQUNyQyxLQUFLLEdBQUcsT0FBTyxDQUFBO29CQUNmLE1BQU07Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtvQkFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFBO29CQUNyQyxLQUFLLEdBQUcsU0FBUyxDQUFBO29CQUNqQixNQUFNO2dCQUNWO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDM0IsTUFBTTthQUNiO1NBQ0o7O1FBRUQsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1YsV0FBVyxHQUFHLG9CQUFpQixHQUFHLENBQUMsSUFBSSxPQUFHLENBQUE7WUFDMUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxNQUFNLEdBQUcscURBQStDLFdBQVcsU0FBSSxLQUFLLGlHQUUxRSxRQUFRLFNBQUksS0FBSyxvTEFDNkQsQ0FBQTthQUMxRjtpQkFBTTtnQkFDSCxNQUFNLENBQUMsTUFBTSxHQUFHLDRCQUF3QixXQUFXLFNBQUksS0FBSyxpR0FFbkQsUUFBUSxTQUFJLEtBQUssb0xBQzZELENBQUE7YUFDMUY7U0FDSjtRQUNELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkQ7UUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDVixRQUFRLEdBQUcsQ0FBQyxJQUFJO2dCQUNaLEtBQUssQ0FBQztvQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7b0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtvQkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO29CQUN0QyxNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7b0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtvQkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO29CQUN0QyxNQUFNO2dCQUNWO29CQUNJLE1BQU07YUFDYjtTQUNKOztRQUVELFFBQVEsR0FBRyxDQUFDLEtBQUs7WUFDYixLQUFLLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO2dCQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdkMsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7Z0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtnQkFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO2dCQUN2QyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtnQkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO2dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUE7Z0JBQ3ZDLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO2dCQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdkMsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7Z0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtnQkFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO2dCQUN2QyxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiOztRQUVELFFBQVEsR0FBRyxDQUFDLE1BQU07WUFDZCxLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO2dCQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7Z0JBQ3hDLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO2dCQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7Z0JBQ3hDLE1BQU07WUFDVjtnQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUE7Z0JBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtnQkFDeEMsTUFBTTtTQUNiO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQTtDQUNoQixDQUFBO0FBRUQsQUFLQzs7O0FDdGJEO0lBQWtDQSx3QkFBK0I7SUF3UjdELGNBQVksS0FBZ0I7UUFBNUIsWUFDSSxrQkFBTSxLQUFLLENBQUMsU0FLZjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUE7O0tBQ0o7Ozs7SUE3UEQsd0JBQVMsR0FBVDtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUN0QixLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQVMsRUFBRSxJQUFTO1lBQzdDLElBQUksSUFBSSxZQUFZLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxZQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsR0FBUSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUN4QyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7d0JBQ3pELFlBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVUsQ0FBQyxDQUFDO3FCQUM1QyxDQUFDLENBQUM7aUJBQ047YUFDSjtpQkFBTTtnQkFDSCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsSUFBSTtvQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hDLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFBO1FBQ3JCLElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQTtRQUNyQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFDLElBQVM7WUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUN0QyxDQUFDLENBQUE7UUFDRixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDM0Q7WUFDSSxPQUFPLFdBQVcsQ0FBQztnQkFDZixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFDLE9BQWU7b0JBQzVCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUM1QyxDQUFDLENBQUE7YUFDTCxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1o7UUFDRCxRQUFRLEVBQUUsQ0FBQTtLQUNiOzs7OztJQUtELHdCQUFTLEdBQVQsVUFBVSxJQUFTLEVBQUUsTUFBVztRQUFoQyxpQkFTQztRQVJHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQVM7Z0JBQ3hCLElBQUksR0FBRyxHQUFHO29CQUNOLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUM1QyxDQUFBO2dCQUNELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDdkUsQ0FBQyxDQUFBO1NBQ0w7S0FDSjs7OztJQUlELDhCQUFlLEdBQWY7UUFBQSxpQkEySUM7UUExSUcsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO1lBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7WUFDL0IsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzdCLEtBQUssRUFBRSxLQUFLO1lBQ1osa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLFdBQVcsRUFBRSxLQUFLO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNuQjtRQUNELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNsRSxLQUFLLE9BQUE7WUFDTCxlQUFlLEVBQUUsSUFBSTtZQUNyQixNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBRWhELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDcEIsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDOztRQUV2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25CLElBQUksU0FBTyxHQUFRLEVBQUUsQ0FBQTtZQUNyQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQUksRUFBRSxLQUFLO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQy9CLFNBQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUE7aUJBQ3JDO2FBQ0osQ0FBQyxDQUFBO1NBQ0w7UUFDRCxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUE7Ozs7O1FBS3pCLElBQUksUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEMsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixRQUFRLEVBQUUsVUFBQyxNQUFXO2dCQUNsQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUM3RCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQTthQUNoRDtZQUNELE9BQU8sRUFBRSxVQUFDLE1BQVc7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3BFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSztvQkFDM0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNoQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ3JCLE9BQU8sUUFBTSxJQUFJLGVBQVksQ0FBQTt5QkFDaEM7NkJBQU07NEJBQ0gsT0FBTyxFQUFFLENBQUE7eUJBQ1o7cUJBQ0o7b0JBQ0QsT0FBTyxJQUFJLENBQUE7aUJBQ2QsQ0FBQyxDQUFBO2FBQ0w7U0FDSixDQUFDLENBQUM7Ozs7UUFJSCxLQUFLLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLFVBQUMsUUFBYTtZQUMzQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzFDLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7b0JBQ3ZCLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUNsQzthQUNKO1NBQ0osQ0FBQyxDQUFDOzs7O1FBSUgsS0FBSyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLFFBQWEsRUFBRSxHQUFRO1lBQ2xELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDMUMsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUNuQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUNwRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNsRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNyRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUN0Qjt5QkFDSjtxQkFDSjt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUMzRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFOzRCQUN0RSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUN0Qjt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUNyRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNuRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNyRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzZCQUN6Qjt5QkFDSjtxQkFDSjt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUM1RCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFOzRCQUN0RSxJ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
