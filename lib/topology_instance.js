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
    markup: '<g class="rotatable"><rect class="body"/><rect class="card"/><rect class="alarm"/><text class="label"/><text class="type"/></g>',
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
                refX: '100%',
                refX2: -16,
                refY: '100%',
                refY2: -16,
                width: 15,
                height: 15,
            },
            '.logo': {
                x: -1,
                y: -1,
                width: 30,
                height: 32,
                fill: '#00B388',
                'rx': '5px',
                'ry': '5px',
            },
            '.body': {
                'ref-width': '100%',
                'ref-height': '100%',
                'rx': '5px',
                'ry': '5px',
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
            },
        },
        router: {
            name: 'normal'
        },
        connector: {
            name: 'normal'
        }
    };
    if (opt) {
        option.source = {
            id: opt.source
        };
        option.target = {
            id: opt.target
        };
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
        if (realLength <= 20) {
            b = b + str.charAt(i);
        }
        
    }
    return b;
};
var vimOption = function (opt) {
    var option = { size: {}, attrs: { '.label': {}, '.type': {}, '.alarm': {}, '.logo': {}, '.body': {} } };
    var dataTooltip = '';
    var byName = '';
    var dataIcon = '';
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
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
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = "data-tooltip=\"" + opt.name + "\"";
            byName = "name=\"tooltips\"";
            option.markup = "<g class=\"rotatable\" " + dataTooltip + " " + byName + ">\n            <rect class=\"body\"/><rect class=\"logo\" />\n            <image " + dataIcon + " x=\"1\" y=\"1\" height=\"28px\" width=\"28px\"/><rect class=\"card\"/>\n            <rect class=\"alarm\"/><text class=\"label\"/><text class=\"type\"/></g>";
        }
        if (opt.name) {
            option.attrs['.label'].text = getNewString(opt.name);
        }
        /*元件的告警*/
        switch (opt.alarm) {
            case 0:
                option.attrs['.alarm'].width = 0;
                option.attrs['.alarm'].height = 0;
                break;
            case 1:
                option.attrs['.alarm'].fill = '#D10002';
                break;
            case 2:
                option.attrs['.alarm'].fill = '#FF9901';
                break;
            case 3:
                option.attrs['.alarm'].fill = '#DFB202';
                break;
            case 4:
                option.attrs['.alarm'].fill = '#00BFFF';
                break;
            default:
                option.attrs['.alarm'].width = 0;
                option.attrs['.alarm'].height = 0;
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
            if (data.links) {
                _.map(data.links, function (link) {
                    new Link(linkOption(link)).addTo(_this.graph);
                });
            }
        }
        if (data.nodes2) {
            _.map(data.nodes2, function (node) {
                var opt = {
                    isHighlight: (node.id === _this.props.cid)
                };
                new VIM(vimOption(_.merge(node, opt, { nodeId: nodeId }))).addTo(_this.graph2);
            });
            if (data.links2) {
                _.map(data.links2, function (link) {
                    new Link(linkOption(link)).addTo(_this.graph2);
                });
            }
        }
    };
    /*
    * 初始化画布
    */
    Main.prototype.initializePaper = function () {
        var _this = this;
        var graph = this.graph = new joint.dia.Graph;
        var graph2 = this.graph2 = new joint.dia.Graph;
        this.commandManager = new joint.dia.CommandManager({ graph: graph, graph2: graph2 });
        var paper = this.paper = new joint.dia.Paper({
            width: this.props.paper_width,
            height: this.props.paper_height,
            gridSize: 10,
            drawGrid: this.props.drawGrid,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true,
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
        this.renderLayout();
        this.renderLayout2();
        // this.renderLinks_2()
        this.renderLinks_3();
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
            if (_this.props.onDblclick) {
                _this.props.onDblclick(cellView);
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
     * 布局切换
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
    Main.prototype.renderLayout2 = function () {
        var graphBBox = joint.layout.DirectedGraph.layout(this.graph2, {
            nodeSep: 50,
            edgeSep: 80,
            marginX: 100,
            marginY: 100,
            rankSep: 80,
            rankDir: 'RL'
        });
    };
    /*
     * 布局后的连线
     */
    Main.prototype.renderLinks_2 = function () {
        var _this = this;
        if (this.props.data.links2) {
            _.map(this.props.data.links2, function (link2) {
                new Link(linkOption(link2)).addTo(_this.graph);
            });
        }
    };
    Main.prototype.renderLinks_3 = function () {
        var _this = this;
        if (this.props.data.links3) {
            _.map(this.props.data.links3, function (link3) {
                new Link(linkOption(link3)).addTo(_this.graph);
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
            React.createElement("div", { className: "topology_instance", id: "topology_instance", style: { width: window.innerWidth, height: window.innerHeight } },
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

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, onDblclick: opt.onDblclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology_instance.js.map

exports.init = init;
exports.TopologyInstance = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3lfaW5zdGFuY2UuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5X2luc3RhbmNlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPicsXHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdWSU0nLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDE4MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy4nOiB7XHJcbiAgICAgICAgICAgICAgICBtYWduZXQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC41OCxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC4yNSxcclxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAxNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcudHlwZSc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5hbGFybSc6IHtcclxuICAgICAgICAgICAgICAgIHJlZlg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHJlZlgyOiAtMTYsXHJcbiAgICAgICAgICAgICAgICByZWZZOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICByZWZZMjogLTE2LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1LFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5sb2dvJzoge1xyXG4gICAgICAgICAgICAgICAgeDogLTEsXHJcbiAgICAgICAgICAgICAgICB5OiAtMSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICc1cHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmJvZHknOiB7XHJcbiAgICAgICAgICAgICAgICAncmVmLXdpZHRoJzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi1oZWlnaHQnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICc1cHgnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgTGluayA9IGpvaW50LmRpYS5MaW5rLmV4dGVuZCh7XHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdMaW5rJyxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7IHN0cm9rZTogJyNDNkM5Q0EnLCAnc3Ryb2tlLXdpZHRoJzogMSB9LFxyXG4gICAgICAgICAgICAnLmxpbmstdG9vbHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci1hcnJvd2hlYWRzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHo6IC0xXHJcbiAgICB9LCBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuZGVmYXVsdHMpLFxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLypcclxuKirov57mjqXnur/kuI7nrq3lpLTmoLflvI9cclxuKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbGlua09wdGlvbiB7XHJcbiAgICBzdGF0ZT86IG51bWJlclxyXG4gICAgc291cmNlPzogc3RyaW5nXHJcbiAgICB0YXJnZXQ/OiBzdHJpbmdcclxuICAgIGxpbmtUeXBlPzogbnVtYmVyXHJcbiAgICBhcnJvd1R5cGU/OiBudW1iZXJcclxufVxyXG5sZXQgbGlua09wdGlvbiA9IChvcHQ6IElsaW5rT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7XHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5jb25uZWN0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6ICcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLXRhcmdldCc6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLCAvLyDnrq3lpLTovrnmoYZcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjQzZDOUNBJywgLy8g566t5aS06aKc6ImyXHJcbiAgICAgICAgICAgICAgICBkOiAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeicgLy8g566t5aS05qC35byPXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3V0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ25vcm1hbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbm5lY3Rvcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBvcHRpb24uc291cmNlID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnNvdXJjZVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24udGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnRhcmdldFxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24uc3RhdGUgPSBvcHQuc3RhdGVcclxuICAgICAgICBvcHRpb24ubGlua1R5cGUgPSBvcHQubGlua1R5cGVcclxuICAgICAgICBvcHRpb24uYXJyb3dUeXBlID0gb3B0LmFycm93VHlwZVxyXG4gICAgICAgIC8q6L+e5o6l57q/6aKc6ImyKi9cclxuICAgICAgICBzd2l0Y2ggKG9wdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjZmZmJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRkY5OTAxJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0ZGOTkwMSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNGRjk5MDEnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0RGQjIwMidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNERkIyMDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjREZCMjAyJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyMwMEJGRkYnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnIzAwQkZGRic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyrov57mjqXnur/nsbvlnosqL1xyXG4gICAgICAgIHN3aXRjaCAob3B0aW9uLmxpbmtUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLXdpZHRoJ10gPSAzO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnJvdXRlci5uYW1lID0gJ21hbmhhdHRhbic7ICAgLy8g5a6e57q/XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAzJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25uZWN0b3IubmFtZSA9ICdzbW9vdGgnOyAgIC8vIOiZmue6v1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS13aWR0aCddID0gMztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5yb3V0ZXIubmFtZSA9ICdtYW5oYXR0YW4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8q566t5aS057G75Z6LKi9cclxuICAgICAgICBzd2l0Y2ggKG9wdGlvbi5hcnJvd1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7ICAvLyDkuInop5Lnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDIwIDUgeic7IC8vIOWunuW/g+iPseW9olxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMjAgNSB6JzsgLy8g56m65b+D6I+x5b2iXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjZmZmJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDAgNSB6JzsgLy8g5bCW566t5aS0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnJzsgLy8g5rKh5pyJ566t5aS0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIHonO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvblxyXG59XHJcblxyXG4vKlxyXG4qKuWOn+S7tuagt+W8j1xyXG4qL1xyXG5leHBvcnQgaW50ZXJmYWNlIEl2aW1PcHRpb24ge1xyXG4gICAgaWQ/OiBzdHJpbmdcclxuICAgIG5hbWU/OiBzdHJpbmdcclxuICAgIHN0YXR1cz86IHN0cmluZ1xyXG4gICAgdHlwZT86IHN0cmluZ1xyXG4gICAgYWxhcm0/OiBudW1iZXJcclxuICAgIGRpc3BsYXlUeXBlPzogYW55XHJcbiAgICBub2RlSWQ/OiBzdHJpbmdcclxufVxyXG4vKuWFg+S7tuaYvuekuuaWh+Wtl+eahOmVv+efrSovXHJcbmxldCBnZXROZXdTdHJpbmcgPSAoc3RyOiBhbnkpID0+IHtcclxuICAgIGxldCByZWFsTGVuZ3RoID0gMCwgbGVuID0gc3RyLmxlbmd0aCwgY2hhckNvZGUgPSAtMSwgYiA9ICcnXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpKVxyXG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAwICYmIGNoYXJDb2RlIDw9IDEyOCkge1xyXG4gICAgICAgICAgICByZWFsTGVuZ3RoICs9IDFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWFsTGVuZ3RoICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZWFsTGVuZ3RoIDw9IDIwKSB7XHJcbiAgICAgICAgICAgIGIgPSBiICsgc3RyLmNoYXJBdChpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGI7XHJcbn1cclxubGV0IHZpbU9wdGlvbiA9IChvcHQ6IEl2aW1PcHRpb24pID0+IHtcclxuICAgIGxldCBvcHRpb246IGFueSA9IHsgc2l6ZToge30sIGF0dHJzOiB7ICcubGFiZWwnOiB7fSwgJy50eXBlJzoge30sICcuYWxhcm0nOiB7fSwgJy5sb2dvJzoge30sICcuYm9keSc6IHt9IH0gfVxyXG4gICAgbGV0IGRhdGFUb29sdGlwID0gJydcclxuICAgIGxldCBieU5hbWUgPSAnJ1xyXG4gICAgbGV0IGRhdGFJY29uID0gJydcclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBpZiAob3B0LmlkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IG9wdC5pZFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKuW9k+WJjeWbvuagh+mrmOS6riovXHJcbiAgICAgICAgaWYgKG9wdC5pZCA9PT0gb3B0Lm5vZGVJZCkge1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uZmlsbCA9ICcjZThhZDM4J1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahOWbvuaghyovXHJcbiAgICAgICAgaWYgKG9wdC5kaXNwbGF5VHlwZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wdC5kaXNwbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3JkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvb3JkZXIucG5nJ2BcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0FDQ09VTlQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvdGVuYW50LnBuZydgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyZnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9J3NyYy9pbWcvc2VydmljZS5wbmcnYFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY2ZzJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSdzcmMvaW1nL3NlcnZpY2UucG5nJ2BcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0nc3JjL2ltZy9zZXJ2aWNlLnBuZydgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlhYPku7bnmoRTVkcqL1xyXG4gICAgICAgIGlmIChvcHQubmFtZSkge1xyXG4gICAgICAgICAgICBkYXRhVG9vbHRpcCA9IGBkYXRhLXRvb2x0aXA9XCIke29wdC5uYW1lfVwiYFxyXG4gICAgICAgICAgICBieU5hbWUgPSBgbmFtZT1cInRvb2x0aXBzXCJgXHJcbiAgICAgICAgICAgIG9wdGlvbi5tYXJrdXAgPSBgPGcgY2xhc3M9XCJyb3RhdGFibGVcIiAke2RhdGFUb29sdGlwfSAke2J5TmFtZX0+XHJcbiAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiYm9keVwiLz48cmVjdCBjbGFzcz1cImxvZ29cIiAvPlxyXG4gICAgICAgICAgICA8aW1hZ2UgJHtkYXRhSWNvbn0geD1cIjFcIiB5PVwiMVwiIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPlxyXG4gICAgICAgICAgICA8cmVjdCBjbGFzcz1cImFsYXJtXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQubmFtZSkge1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sYWJlbCddLnRleHQgPSBnZXROZXdTdHJpbmcob3B0Lm5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8q5YWD5Lu255qE5ZGK6K2mKi9cclxuICAgICAgICBzd2l0Y2ggKG9wdC5hbGFybSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNEMTAwMDInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNERkIyMDInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyMwMEJGRkYnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10ud2lkdGggPSAwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahOiDjOaZr+aYr+S6rui/mOaYr+aalyovXHJcbiAgICAgICAgc3dpdGNoIChvcHQuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0FDVElWRSc6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1NUT1AnOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLmZpbGwgPSAnIzg0NzU2YidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzg0NzU2YidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLmZpbGwgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIFZJTSxcclxuICAgIHZpbU9wdGlvbixcclxuICAgIExpbmssXHJcbiAgICBsaW5rT3B0aW9uXHJcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFZJTSwgTGluaywgdmltT3B0aW9uLCBsaW5rT3B0aW9uIH0gZnJvbSAnLi92aW0nXHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5kZWNsYXJlIGxldCBWOiBhbnlcclxuZGVjbGFyZSBjb25zdCBqb2ludDogYW55XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1haW5Qcm9wcyB7XHJcbiAgICBhbmltYXRlPzogYm9vbGVhblxyXG4gICAgd2lkdGg/OiBhbnlcclxuICAgIGhlaWdodD86IGFueVxyXG4gICAgZHJhd0dyaWQ/OiBib29sZWFuXHJcbiAgICByYW5rRGlyPzogJ1RCJyB8ICdCVCcgfCAnTFInIHwgJ1JMJztcclxuICAgIG9uRGJsY2xpY2s/OiBGdW5jdGlvblxyXG4gICAgZGF0YTogYW55XHJcbiAgICBub2RlSWQ/OiBzdHJpbmdcclxuICAgIGNlbnRlcj86IGJvb2xlYW5cclxuICAgIHpvb21Ub0ZpdD86IGJvb2xlYW5cclxuICAgIHBhcGVyX3dpZHRoPzogbnVtYmVyXHJcbiAgICBwYXBlcl9oZWlnaHQ/OiBudW1iZXJcclxuICAgIGNpZD86IHN0cmluZ1xyXG4gICAgZnVsbHNjcmVlbl9idG5fZGlzYWJsZT86IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxNYWluUHJvcHMsIGFueT4ge1xyXG4gICAgLy8gQ29uYXRpbmVyXHJcbiAgICBwYXBlckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl9tb3JlOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX3pvb21pbjogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl9tYXA6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fem9vbW91dDogSFRNTERpdkVsZW1lbnRcclxuICAgIG5hdmk6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fZnVsbHNjcmVlbjogSFRNTERpdkVsZW1lbnRcclxuXHJcbiAgICAvLyByYXBwaWQgdGhpbmdzXHJcbiAgICBncmFwaDogam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgZ3JhcGgyOiBqb2ludC5kaWEuR3JhcGg7XHJcbiAgICBjb21tYW5kTWFuYWdlcjogam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyO1xyXG4gICAgcGFwZXI6IGpvaW50LmRpYS5QYXBlcjtcclxuICAgIHBhcGVyU2Nyb2xsZXI6IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXI7XHJcbiAgICBuYXZpZ2F0b3I6IGpvaW50LnVpLk5hdmlnYXRvcjtcclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IE1haW5Qcm9wcyA9IHtcclxuICAgICAgICBhbmltYXRlOiBmYWxzZSxcclxuICAgICAgICB3aWR0aDogODAwLFxyXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG4gICAgICAgIHBhcGVyX3dpZHRoOiAxMDAwLFxyXG4gICAgICAgIHBhcGVyX2hlaWdodDogMTAwMCxcclxuICAgICAgICBkcmF3R3JpZDogZmFsc2UsXHJcbiAgICAgICAgcmFua0RpcjogJ1JMJyxcclxuICAgICAgICBkYXRhOiB7fSxcclxuICAgICAgICBub2RlSWQ6ICcnLFxyXG4gICAgICAgIGNlbnRlcjogZmFsc2UsXHJcbiAgICAgICAgem9vbVRvRml0OiBmYWxzZSxcclxuICAgICAgICBmdWxsc2NyZWVuX2J0bl9kaXNhYmxlOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7kvKDpgJLliqjnlLtcclxuICAgICAqL1xyXG4gICAgZG9BbmltYXRlKCkge1xyXG4gICAgICAgIGxldCBncmFwaCA9IHRoaXMuZ3JhcGhcclxuICAgICAgICBsZXQgcGFwZXIgPSB0aGlzLnBhcGVyXHJcbiAgICAgICAgZ3JhcGgub24oJ3NpZ25hbCcsIGZ1bmN0aW9uIChjZWxsOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIGpvaW50LmRpYS5MaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5hdHRyaWJ1dGVzLmxpbmtUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBncmFwaC5nZXRDZWxsKGNlbGwuZ2V0KCd0YXJnZXQnKS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHM6IGFueSA9IHBhcGVyLmZpbmRWaWV3QnlNb2RlbChjZWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuc2VuZFRva2VuKFYoJ2NpcmNsZScsIHsgcjogNywgZmlsbDogJ2dyZWVuJyB9KS5ub2RlLCAxMDAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENlbGwudHJpZ2dlcignc2lnbmFsJywgdGFyZ2V0Q2VsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3V0Ym91bmRMaW5rcyA9IGdyYXBoLmdldENvbm5lY3RlZExpbmtzKGNlbGwsIHsgb3V0Ym91bmQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2gob3V0Ym91bmRMaW5rcywgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5rLnRyaWdnZXIoJ3NpZ25hbCcsIGxpbmspO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZXM6IGFueSA9IFtdXHJcbiAgICAgICAgbGV0IHRhcmdldHM6IGFueSA9IFtdXHJcbiAgICAgICAgXy5tYXAoZ3JhcGguZ2V0TGlua3MoKSwgKGxpbms6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2gobGluay5nZXQoJ3NvdXJjZScpLmlkKVxyXG4gICAgICAgICAgICB0YXJnZXRzLnB1c2gobGluay5nZXQoJ3RhcmdldCcpLmlkKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHRyaWdnZXJzID0gXy5zb3J0ZWRVbmlxKF8uZGlmZmVyZW5jZShzb3VyY2VzLCB0YXJnZXRzKSlcclxuICAgICAgICBmdW5jdGlvbiBzaW11bGF0ZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIF8ubWFwKHRyaWdnZXJzLCAodHJpZ2dlcjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBncmFwaC5nZXRDZWxsKHRyaWdnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENlbGwudHJpZ2dlcignc2lnbmFsJywgdGFyZ2V0Q2VsbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2ltdWxhdGUoKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7op6PmnpBcclxuICAgICAqIEBwYXJhbSBkYXRhIOaLk+aJkeaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwYXJzZURhdGEoZGF0YTogYW55LCBub2RlSWQ6IGFueSkge1xyXG4gICAgICAgIGlmIChkYXRhLm5vZGVzKSB7XHJcbiAgICAgICAgICAgIF8ubWFwKGRhdGEubm9kZXMsIChub2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIaWdobGlnaHQ6IChub2RlLmlkID09PSB0aGlzLnByb3BzLmNpZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ldyBWSU0odmltT3B0aW9uKF8ubWVyZ2Uobm9kZSwgb3B0LCB7IG5vZGVJZCB9KSkpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmtzKSB7XHJcbiAgICAgICAgICAgICAgICBfLm1hcChkYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGluaykpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLm5vZGVzMikge1xyXG4gICAgICAgICAgICBfLm1hcChkYXRhLm5vZGVzMiwgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZ2hsaWdodDogKG5vZGUuaWQgPT09IHRoaXMucHJvcHMuY2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3IFZJTSh2aW1PcHRpb24oXy5tZXJnZShub2RlLCBvcHQsIHsgbm9kZUlkIH0pKSkuYWRkVG8odGhpcy5ncmFwaDIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmtzMikge1xyXG4gICAgICAgICAgICAgICAgXy5tYXAoZGF0YS5saW5rczIsIChsaW5rKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaDIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLypcclxuICAgICog5Yid5aeL5YyW55S75biDXHJcbiAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZVBhcGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGdyYXBoID0gdGhpcy5ncmFwaCA9IG5ldyBqb2ludC5kaWEuR3JhcGg7XHJcbiAgICAgICAgY29uc3QgZ3JhcGgyID0gdGhpcy5ncmFwaDIgPSBuZXcgam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBuZXcgam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyKHsgZ3JhcGg6IGdyYXBoLCBncmFwaDI6IGdyYXBoMiB9KTtcclxuICAgICAgICBjb25zdCBwYXBlciA9IHRoaXMucGFwZXIgPSBuZXcgam9pbnQuZGlhLlBhcGVyKHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgICAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgICAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBhcnNlRGF0YSh0aGlzLnByb3BzLmRhdGEsIHRoaXMucHJvcHMubm9kZUlkKVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kb0FuaW1hdGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXBlclNjcm9sbGVyID0gdGhpcy5wYXBlclNjcm9sbGVyID0gbmV3IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXIoe1xyXG4gICAgICAgICAgICBwYXBlcixcclxuICAgICAgICAgICAgYXV0b1Jlc2l6ZVBhcGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdncmFiJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcGVyLm9uKCdibGFuazpwb2ludGVyZG93bicsIHBhcGVyU2Nyb2xsZXIuc3RhcnRQYW5uaW5nKTtcclxuICAgICAgICAkKHRoaXMucGFwZXJDb250YWluZXIpLmFwcGVuZChwYXBlclNjcm9sbGVyLmVsKTtcclxuICAgICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJMYXlvdXQyKClcclxuICAgICAgICAvLyB0aGlzLnJlbmRlckxpbmtzXzIoKVxyXG4gICAgICAgIHRoaXMucmVuZGVyTGlua3NfMygpXHJcbiAgICAgICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jZW50ZXIpIHsgcGFwZXJTY3JvbGxlci5jZW50ZXIoKSB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuem9vbVRvRml0KSB7IHBhcGVyU2Nyb2xsZXIuem9vbVRvRml0KCkgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogdG9vbHRpcOWIneWni+WMllxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0b29sX3RpcCA9IG5ldyBqb2ludC51aS5Ub29sdGlwKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnW2RhdGEtdG9vbHRpcF0nLFxyXG4gICAgICAgICAgICBjb250ZW50OiAodGFyZ2V0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0aXBzID0gXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tYXAodGlwcywgKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRpcHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGlwc1swXSAhPT0gdGlwc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke2l0ZW19PC9iPjxociAvPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiDlj4zlh7vkuovku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXBlci5vbignY2VsbDpwb2ludGVyZGJsY2xpY2snLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkRibGNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGJsY2xpY2soY2VsbFZpZXcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOino+WGs+WFqOWxj+S4jeaYvuekunRvb2x0aXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXBlci5vbignY2VsbDptb3VzZW92ZXInLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy50eXBlID09PSAnVklNJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvcG9sb2d5X2luc3RhbmNlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3lfaW5zdGFuY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBqb2ludF90b29sdGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pvaW50LXRvb2x0aXAnKVswXVxyXG4gICAgICAgICAgICAgICAgICAgIHRvcG9sb2d5X2luc3RhbmNlLmFwcGVuZChqb2ludF90b29sdGlwcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog5oyJ6ZKuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idG5fbWFwLm9uY2xpY2sgPSB0aGlzLnNtYWxsX21hcC5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fem9vbWluLm9uY2xpY2sgPSB0aGlzLnpvb21Jbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fem9vbW91dC5vbmNsaWNrID0gdGhpcy56b29tT3V0LmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLmJ0bl9mdWxsc2NyZWVuLm9uY2xpY2sgPSB0aGlzLmZ1bGxTY3JlZW4uYmluZCh0aGlzKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog57yp55Wl5Zu+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IG5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yID0gbmV3IGpvaW50LnVpLk5hdmlnYXRvcih7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyNDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTE1LFxyXG4gICAgICAgICAgICBwYXBlclNjcm9sbGVyOiB0aGlzLnBhcGVyU2Nyb2xsZXIsXHJcbiAgICAgICAgICAgIHpvb206IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcy5uYXZpKS5hcHBlbmQobmF2aWdhdG9yLmVsKTtcclxuICAgICAgICBuYXZpZ2F0b3IucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5omT5byA5YWz6Zet57yp55Wl5Zu+XHJcbiAgICAgKi9cclxuICAgIHNtYWxsX21hcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aXNhYmxlX2luc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdmlzYWJsZV9pbnN0YW5jZTogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5omT5byA5YWz6Zet5YWo5bGPXHJcbiAgICAgKi9cclxuICAgIGZ1bGxTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5leGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDov5vlhaXlhajlsY9cclxuICAgICAqL1xyXG4gICAgcmVxdWVzdEZ1bGxTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIGRlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3lfaW5zdGFuY2UnKTtcclxuICAgICAgICBpZiAoZGUucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUucmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICBkZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICog6YCA5Ye65YWo5bGPXHJcbiAgICAgKi9cclxuICAgIGV4aXRGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBkZTogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgaWYgKGRlLmV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZS5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKlxyXG4gICAgKiDnm5HlkKxmdWxsc2NyZWVuY2hhbmdl5LqL5Lu2XHJcbiAgICAqL1xyXG4gICAgd2F0Y2hGdWxsU2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGU6IGFueSA9IGRvY3VtZW50XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS5mdWxsc2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS5tb3pGdWxsU2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS53ZWJraXRJc0Z1bGxTY3JlZW5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5biD5bGA5YiH5o2iXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckxheW91dCgpIHtcclxuICAgICAgICBsZXQgZ3JhcGhCQm94ID0gam9pbnQubGF5b3V0LkRpcmVjdGVkR3JhcGgubGF5b3V0KHRoaXMuZ3JhcGgsIHtcclxuICAgICAgICAgICAgbm9kZVNlcDogNTAsXHJcbiAgICAgICAgICAgIGVkZ2VTZXA6IDgwLFxyXG4gICAgICAgICAgICBtYXJnaW5YOiAxMDAsXHJcbiAgICAgICAgICAgIG1hcmdpblk6IDEwMCxcclxuICAgICAgICAgICAgcmFua1NlcDogODAsXHJcbiAgICAgICAgICAgIHJhbmtEaXI6ICdMUidcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlckxheW91dDIoKSB7XHJcbiAgICAgICAgbGV0IGdyYXBoQkJveCA9IGpvaW50LmxheW91dC5EaXJlY3RlZEdyYXBoLmxheW91dCh0aGlzLmdyYXBoMiwge1xyXG4gICAgICAgICAgICBub2RlU2VwOiA1MCxcclxuICAgICAgICAgICAgZWRnZVNlcDogODAsXHJcbiAgICAgICAgICAgIG1hcmdpblg6IDEwMCxcclxuICAgICAgICAgICAgbWFyZ2luWTogMTAwLFxyXG4gICAgICAgICAgICByYW5rU2VwOiA4MCxcclxuICAgICAgICAgICAgcmFua0RpcjogJ1JMJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOW4g+WxgOWQjueahOi/nue6v1xyXG4gICAgICovXHJcbiAgICByZW5kZXJMaW5rc18yKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3MyKSB7XHJcbiAgICAgICAgICAgIF8ubWFwKHRoaXMucHJvcHMuZGF0YS5saW5rczIsIChsaW5rMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rMikpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyTGlua3NfMygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxpbmtzMykge1xyXG4gICAgICAgICAgICBfLm1hcCh0aGlzLnByb3BzLmRhdGEubGlua3MzLCAobGluazMpID0+IHtcclxuICAgICAgICAgICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGluazMpKS5hZGRUbyh0aGlzLmdyYXBoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDmlL7lpKfnvKnlsI9cclxuICAgICAqL1xyXG4gICAgem9vbUluKCkge1xyXG4gICAgICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKDAuMiwgeyBtYXg6IDIgfSk7XHJcbiAgICB9XHJcbiAgICB6b29tT3V0KCkge1xyXG4gICAgICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKC0wLjIsIHsgbWluOiAwLjIgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogTWFpblByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVQYXBlcigpXHJcbiAgICAgICAgdGhpcy53YXRjaEZ1bGxTY3JlZW4oKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyTWFwKCkge1xyXG4gICAgICAgIGxldCB7IHZpc2FibGVfaW5zdGFuY2UgfSA9IHRoaXMuc3RhdGVcclxuICAgICAgICBpZiAodmlzYWJsZV9pbnN0YW5jZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JfaW5zdGFuY2VcIiBpZD1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMubmF2aSA9IG5vZGUgfX0gLz5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JfaW5zdGFuY2VcIiBpZD1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMubmF2aSA9IG5vZGUgfX0gc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyRnVsbHNjcmVlbkJ0bigpIHtcclxuICAgICAgICBsZXQgeyBmdWxsc2NyZWVuX2J0bl9kaXNhYmxlIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgaWYgKGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fZnVsbHNjcmVlbiA9IG5vZGUgfX0gaWQ9XCJidG4tZnVsbHNjcmVlblwiIGNsYXNzTmFtZT1cImJ0blwiIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT7lhajlsY88L2Rpdj5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdWxsc2NyZWVuID0gbm9kZSB9fSBpZD1cImJ0bi1mdWxsc2NyZWVuXCIgY2xhc3NOYW1lPVwiYnRuXCI+5YWo5bGPPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICBsZXQgb25NYXAgPSB0aGlzLnN0YXRlLnZpc2FibGVfaW5zdGFuY2UgPT09IHRydWUgPyAn5YWz6Zet57yp55Wl5Zu+JyA6ICfmiZPlvIDnvKnnlaXlm74nXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3lfaW5zdGFuY2VcIiBpZD1cInRvcG9sb2d5X2luc3RhbmNlXCIgc3R5bGU9e3sgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BvbG9neS1hcHBcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRnVsbHNjcmVlbkJ0bigpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fbWFwID0gbm9kZSB9fSBpZD1cImJ0bi1tYXBcIiBjbGFzc05hbWU9XCJidG5cIj57b25NYXB9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29taW4gPSBub2RlIH19IGlkPVwiYnRuLXpvb21pblwiIGNsYXNzTmFtZT1cImJ0blwiPis8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX3pvb21vdXQgPSBub2RlIH19IGlkPVwiYnRuLXpvb21vdXRcIiBjbGFzc05hbWU9XCJidG5cIj4tPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXBlci1jb250YWluZXJcIiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLnBhcGVyQ29udGFpbmVyID0gbm9kZSB9fSA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWFwKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlL2luZGV4J1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQgVG9wb2xvZ3lJbnN0YW5jZSBmcm9tICcuL21vZHVsZS92aWV3L21haW4nO1xyXG5cclxuY29uc3QgaW5pdCA9IChtb3VudE5vZGVJZCA9ICdyb290Jywgb3B0OiBhbnkpID0+IHtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8VG9wb2xvZ3lJbnN0YW5jZVxyXG4gICAgICByYW5rRGlyPXtvcHQucmFua0Rpcn1cclxuICAgICAgYW5pbWF0ZT17b3B0LmFuaW1hdGV9XHJcbiAgICAgIGNpZD17b3B0LmNpZH1cclxuICAgICAgZGF0YT17b3B0LmRhdGF9XHJcbiAgICAgIG9uRGJsY2xpY2s9e29wdC5vbkRibGNsaWNrfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neUluc3RhbmNlXHJcbn0iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJSZWFjdC5jcmVhdGVFbGVtZW50IiwiUmVhY3QuQ29tcG9uZW50IiwiUmVhY3RET00ucmVuZGVyIiwiVG9wb2xvZ3lJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUIsQ0FBQzs7QUFFRixBQUFPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVB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LE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2dCQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7Z0JBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7Z0JBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7Z0JBQzlDLE1BQU0sQ0FB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
