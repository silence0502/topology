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
            height: 100
        },
        attrs: {
            '.': {
                magnet: false
            },
            '.label': {
                text: '',
                'ref-x': .05,
                'ref-y': .1,
                'font-size': 14,
                'text-anchor': 'start',
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
                'stroke-dasharray': '',
                'stroke-width': 3
            },
            '.marker-target': {
                stroke: '#C6C9CA',
                fill: '#C6C9CA',
                d: 'M 10 0 L 0 5 L 10 10 z' // 箭头样式
            }
        },
        router: {
            name: 'manhattan',
        },
        connector: {
            name: 'normal'
        }
    };
    if (opt) {
        option.source = { id: opt.source };
        option.target = { id: opt.target };
    }
    option.state = opt.sourceObj.state;
    /*连接线颜色*/
    switch (option.state) {
        case "ACTIVE":
            option.attrs['.connection'].stroke = '#C6C9CA';
            option.attrs['.connection']['stroke-width'] = '3';
            option.attrs['.marker-target'].fill = '#C6C9CA';
            option.attrs['.marker-target'].stroke = '#C6C9CA';
            break;
        default:
            option.attrs['.connection'].stroke = '#D10002';
            option.attrs['.connection']['stroke-dasharray'] = '5 3';
            option.attrs['.marker-target'].fill = '#D10002';
            option.attrs['.marker-target'].stroke = '#D10002';
            break;
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
        size: {},
        attrs: {
            '.label': {}, '.type': {}, '.alarm': {}, '.perf': {}, '.logo': {}, '.body': {}
        }
    };
    var dataTooltip = '';
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
        }
        switch (opt.state) {
            case 'ACTIVE':
                option.attrs['.body']['stroke-width'] = '2';
                break;
            default:
                option.attrs['.body']['stroke-dasharray'] = '5 3';
                break;
        }
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = "data-tooltip=\"" + opt.name + "\"";
            option.markup = "<g class=\"rotatable\" " + dataTooltip + ">\n            <rect class=\"body\"/><text class=\"label\"/><text class=\"type\"/></g>";
        }
        if (opt.name) {
            option.attrs['.label'].text = '名称:' + getNewString(opt.name) + '\n' + '描述:' + getNewString(opt.desc);
        }
        /*元件的背景是亮还是暗*/
        switch (opt.state) {
            case 'ACTIVE':
                option.attrs['.logo'].fill = '#00B388';
                option.attrs['.body'].stroke = '#00B388';
                break;
            default:
                option.attrs['.logo'].fill = '#84756b';
                option.attrs['.body'].stroke = '#84756b';
                break;
        }
    }
    return option;
};

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
                if (cell.attributes.state === 'ACTIVE') {
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
            sources.push(link.get('source'));
            targets.push(link.get('target'));
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
    Main.prototype.parseData = function (data) {
        var _this = this;
        if (data.nodes) {
            _.map(data.nodes, function (node) {
                var opt = {
                    isHighlight: (node.id === _this.props.cid)
                };
                new VIM(vimOption(_.merge(node, opt))).addTo(_this.graph);
            });
        }
        if (this.props.data.links) {
            _.map(this.props.data.links, function (link) {
                new Link(linkOption(link)).addTo(_this.graph);
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
        this.parseData(this.props.data);
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
        // this.renderLinks()
        paperScroller.render();
        // if (this.props.center) { paperScroller.center() }
        if (this.props.nodeId) {
            var positon_1 = {};
            _.map(this.props.data.nodes, function (item, index) {
                if (item.id === _this.props.nodeId) {
                    positon_1 = { x: item.x, y: item.y };
                }
            });
            paperScroller.center(positon_1.x, positon_1.y);
        }
        else if (this.props.center) {
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
        animate: true,
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
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, nodeId: opt.nodeId, onDblclick: opt.onDblclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology_instance.js.map

exports.init = init;
exports.TopologyInstance = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3lfaW5zdGFuY2UuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5X2luc3RhbmNlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHJlY3QgY2xhc3M9XCJwZXJmXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz4nLFxyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnVklNJyxcclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLic6IHtcclxuICAgICAgICAgICAgICAgIG1hZ25ldDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5sYWJlbCc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjEsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcudHlwZSc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5ib2R5Jzoge1xyXG4gICAgICAgICAgICAgICAgJ3JlZi13aWR0aCc6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICdyZWYtaGVpZ2h0JzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3J4JzogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAncnknOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyMwMEIzODgnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIGpvaW50LnNoYXBlcy5iYXNpYy5HZW5lcmljLnByb3RvdHlwZS5kZWZhdWx0cyksXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LnNoYXBlcy5iYXNpYy5HZW5lcmljLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubGV0IExpbmsgPSBqb2ludC5kaWEuTGluay5leHRlbmQoe1xyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnTGluaycsXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5jb25uZWN0aW9uJzogeyBzdHJva2U6ICcjQzZDOUNBJywgJ3N0cm9rZS13aWR0aCc6IDEgfSxcclxuICAgICAgICAgICAgJy5saW5rLXRvb2xzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItYXJyb3doZWFkcyc6IHsgZGlzcGxheTogJ25vbmUnIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLXZlcnRleCc6IHsgZGlzcGxheTogJ25vbmUnIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLXZlcnRpY2VzJzogeyBkaXNwbGF5OiAnbm9uZScgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgejogLTFcclxuICAgIH0sIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5kZWZhdWx0cyksXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuZGlhLkxpbmsucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKlxyXG4qKui/nuaOpee6v+S4jueureWktOagt+W8j1xyXG4qL1xyXG5leHBvcnQgaW50ZXJmYWNlIElsaW5rT3B0aW9uIHtcclxuICAgIHN0YXRlPzogbnVtYmVyXHJcbiAgICBzb3VyY2U/OiBhbnlcclxuICAgIHRhcmdldD86IGFueVxyXG4gICAgc291cmNlT2JqPzogYW55XHJcbiAgICB0YXJnZXRPYmo/OiBhbnlcclxufVxyXG5sZXQgbGlua09wdGlvbiA9IChvcHQ6IElsaW5rT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7XHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5jb25uZWN0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdGFyZ2V0Jzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsIC8vIOeureWktOi+ueahhlxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNDNkM5Q0EnLCAvLyDnrq3lpLTpopzoibJcclxuICAgICAgICAgICAgICAgIGQ6ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JyAvLyDnrq3lpLTmoLflvI9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm91dGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdtYW5oYXR0YW4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29ubmVjdG9yOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICAgIG9wdGlvbi5zb3VyY2UgPSB7IGlkOiBvcHQuc291cmNlIH1cclxuICAgICAgICBvcHRpb24udGFyZ2V0ID0geyBpZDogb3B0LnRhcmdldCB9XHJcbiAgICB9XHJcbiAgICBvcHRpb24uc3RhdGUgPSBvcHQuc291cmNlT2JqLnN0YXRlXHJcbiAgICAvKui/nuaOpee6v+minOiJsiovXHJcbiAgICBzd2l0Y2ggKG9wdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgIGNhc2UgXCJBQ1RJVkVcIjpcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2Utd2lkdGgnXSA9ICczJ1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAzJ1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbi8qXHJcbioq5Y6f5Lu25qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXZpbU9wdGlvbiB7XHJcbiAgICBpZD86IHN0cmluZ1xyXG4gICAgbmFtZT86IHN0cmluZ1xyXG4gICAgc3RhdHVzPzogc3RyaW5nXHJcbiAgICBzdGF0ZT86IHN0cmluZ1xyXG4gICAgdHlwZT86IHN0cmluZ1xyXG4gICAgZGVzYz86IHN0cmluZ1xyXG4gICAgYWxhcm0/OiBudW1iZXJcclxuICAgIGFsaWduPzogc3RyaW5nXHJcbiAgICBwZXJmPzogbnVtYmVyXHJcbiAgICB4PzogbnVtYmVyXHJcbiAgICB5PzogbnVtYmVyXHJcbiAgICBkaXNwbGF5VHlwZT86IGFueVxyXG4gICAgbm9kZUlkPzogc3RyaW5nXHJcbn1cclxuLyrlhYPku7bmmL7npLrmloflrZfnmoTplb/nn60qL1xyXG5sZXQgZ2V0TmV3U3RyaW5nID0gKHN0cjogYW55KSA9PiB7XHJcbiAgICBsZXQgcmVhbExlbmd0aCA9IDAsIGxlbiA9IHN0ci5sZW5ndGgsIGNoYXJDb2RlID0gLTEsIGIgPSAnJ1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaSlcclxuICAgICAgICBpZiAoY2hhckNvZGUgPj0gMCAmJiBjaGFyQ29kZSA8PSAxMjgpIHtcclxuICAgICAgICAgICAgcmVhbExlbmd0aCArPSAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVhbExlbmd0aCArPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVhbExlbmd0aCA8PSAxOCkge1xyXG4gICAgICAgICAgICBiID0gYiArIHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBiO1xyXG59XHJcbmxldCB2aW1PcHRpb24gPSAob3B0OiBJdmltT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7XHJcbiAgICAgICAgc2l6ZToge30sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5sYWJlbCc6IHt9LCAnLnR5cGUnOiB7fSwgJy5hbGFybSc6IHt9LCAnLnBlcmYnOiB7fSwgJy5sb2dvJzoge30sICcuYm9keSc6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGRhdGFUb29sdGlwID0gJydcclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBpZiAob3B0LmlkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IG9wdC5pZFxyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICdBQ1RJVkUnOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddWydzdHJva2Utd2lkdGgnXSA9ICcyJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDMnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyrlhYPku7bnmoRTVkcqL1xyXG4gICAgICAgIGlmIChvcHQubmFtZSkge1xyXG4gICAgICAgICAgICBkYXRhVG9vbHRpcCA9IGBkYXRhLXRvb2x0aXA9XCIke29wdC5uYW1lfVwiYFxyXG4gICAgICAgICAgICBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+XHJcbiAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiYm9keVwiLz48dGV4dCBjbGFzcz1cImxhYmVsXCIvPjx0ZXh0IGNsYXNzPVwidHlwZVwiLz48L2c+YFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0Lm5hbWUpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubGFiZWwnXS50ZXh0ID0gJ+WQjeensDonICsgZ2V0TmV3U3RyaW5nKG9wdC5uYW1lKSArICdcXG4nICsgJ+aPj+i/sDonICsgZ2V0TmV3U3RyaW5nKG9wdC5kZXNjKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahOiDjOaZr+aYr+S6rui/mOaYr+aalyovXHJcbiAgICAgICAgc3dpdGNoIChvcHQuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnQUNUSVZFJzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBWSU0sXHJcbiAgICB2aW1PcHRpb24sXHJcbiAgICBMaW5rLFxyXG4gICAgbGlua09wdGlvblxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWSU0sIExpbmssIHZpbU9wdGlvbiwgbGlua09wdGlvbiB9IGZyb20gJy4vdmltJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSBsZXQgVjogYW55XHJcbmRlY2xhcmUgY29uc3Qgam9pbnQ6IGFueVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xyXG4gICAgYW5pbWF0ZT86IGJvb2xlYW5cclxuICAgIHdpZHRoPzogYW55XHJcbiAgICBoZWlnaHQ/OiBhbnlcclxuICAgIGRyYXdHcmlkPzogYm9vbGVhblxyXG4gICAgcmFua0Rpcj86ICdUQicgfCAnQlQnIHwgJ0xSJyB8ICdSTCc7XHJcbiAgICBvbkRibGNsaWNrPzogRnVuY3Rpb25cclxuICAgIGRhdGE6IGFueVxyXG4gICAgbm9kZUlkPzogc3RyaW5nXHJcbiAgICBjZW50ZXI/OiBib29sZWFuXHJcbiAgICB6b29tVG9GaXQ/OiBib29sZWFuXHJcbiAgICBwYXBlcl93aWR0aD86IG51bWJlclxyXG4gICAgcGFwZXJfaGVpZ2h0PzogbnVtYmVyXHJcbiAgICBjaWQ/OiBzdHJpbmdcclxuICAgIGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGU/OiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TWFpblByb3BzLCBhbnk+IHtcclxuICAgIC8vIENvbmF0aW5lclxyXG4gICAgcGFwZXJDb250YWluZXI6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fbW9yZTogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl96b29taW46IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fbWFwOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX3pvb21vdXQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBuYXZpOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX2Z1bGxzY3JlZW46IEhUTUxEaXZFbGVtZW50XHJcblxyXG4gICAgLy8gcmFwcGlkIHRoaW5nc1xyXG4gICAgZ3JhcGg6IGpvaW50LmRpYS5HcmFwaDtcclxuICAgIGdyYXBoMjogam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgY29tbWFuZE1hbmFnZXI6IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcjtcclxuICAgIHBhcGVyOiBqb2ludC5kaWEuUGFwZXI7XHJcbiAgICBwYXBlclNjcm9sbGVyOiBqb2ludC51aS5QYXBlclNjcm9sbGVyO1xyXG4gICAgbmF2aWdhdG9yOiBqb2ludC51aS5OYXZpZ2F0b3I7XHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBNYWluUHJvcHMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICB3aWR0aDogODAwLFxyXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG4gICAgICAgIHBhcGVyX3dpZHRoOiAxMDAwLFxyXG4gICAgICAgIHBhcGVyX2hlaWdodDogMTAwMCxcclxuICAgICAgICBkcmF3R3JpZDogZmFsc2UsXHJcbiAgICAgICAgcmFua0RpcjogJ1JMJyxcclxuICAgICAgICBkYXRhOiB7fSxcclxuICAgICAgICBub2RlSWQ6ICcnLFxyXG4gICAgICAgIGNlbnRlcjogZmFsc2UsXHJcbiAgICAgICAgem9vbVRvRml0OiBmYWxzZSxcclxuICAgICAgICBmdWxsc2NyZWVuX2J0bl9kaXNhYmxlOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7kvKDpgJLliqjnlLtcclxuICAgICAqL1xyXG4gICAgZG9BbmltYXRlKCkge1xyXG4gICAgICAgIGxldCBncmFwaCA9IHRoaXMuZ3JhcGhcclxuICAgICAgICBsZXQgcGFwZXIgPSB0aGlzLnBhcGVyXHJcbiAgICAgICAgZ3JhcGgub24oJ3NpZ25hbCcsIGZ1bmN0aW9uIChjZWxsOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIGpvaW50LmRpYS5MaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5hdHRyaWJ1dGVzLnN0YXRlID09PSAnQUNUSVZFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gZ3JhcGguZ2V0Q2VsbChjZWxsLmdldCgndGFyZ2V0JykuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzOiBhbnkgPSBwYXBlci5maW5kVmlld0J5TW9kZWwoY2VsbClcclxuICAgICAgICAgICAgICAgICAgICBzLnNlbmRUb2tlbihWKCdjaXJjbGUnLCB7IHI6IDcsIGZpbGw6ICdncmVlbicgfSkubm9kZSwgMTAwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG91dGJvdW5kTGlua3MgPSBncmFwaC5nZXRDb25uZWN0ZWRMaW5rcyhjZWxsLCB7IG91dGJvdW5kOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKG91dGJvdW5kTGlua3MsIGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluay50cmlnZ2VyKCdzaWduYWwnLCBsaW5rKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzOiBhbnkgPSBbXVxyXG4gICAgICAgIGxldCB0YXJnZXRzOiBhbnkgPSBbXVxyXG4gICAgICAgIF8ubWFwKGdyYXBoLmdldExpbmtzKCksIChsaW5rOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc291cmNlcy5wdXNoKGxpbmsuZ2V0KCdzb3VyY2UnKSlcclxuICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKGxpbmsuZ2V0KCd0YXJnZXQnKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCB0cmlnZ2VycyA9IF8uc29ydGVkVW5pcShfLmRpZmZlcmVuY2Uoc291cmNlcywgdGFyZ2V0cykpXHJcbiAgICAgICAgZnVuY3Rpb24gc2ltdWxhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfLm1hcCh0cmlnZ2VycywgKHRyaWdnZXI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gZ3JhcGguZ2V0Q2VsbCh0cmlnZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNpbXVsYXRlKClcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pWw5o2u6Kej5p6QXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmi5PmiZHmlbDmja5cclxuICAgICAqL1xyXG4gICAgcGFyc2VEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChkYXRhLm5vZGVzKSB7XHJcbiAgICAgICAgICAgIF8ubWFwKGRhdGEubm9kZXMsIChub2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIaWdobGlnaHQ6IChub2RlLmlkID09PSB0aGlzLnByb3BzLmNpZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ldyBWSU0odmltT3B0aW9uKF8ubWVyZ2Uobm9kZSwgb3B0KSkpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3MpIHtcclxuICAgICAgICAgICAgXy5tYXAodGhpcy5wcm9wcy5kYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgKiDliJ3lp4vljJbnlLvluINcclxuICAgICovXHJcbiAgICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaDtcclxuICAgICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbmV3IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcih7IGdyYXBoOiBncmFwaCB9KTtcclxuICAgICAgICBjb25zdCBwYXBlciA9IHRoaXMucGFwZXIgPSBuZXcgam9pbnQuZGlhLlBhcGVyKHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgICAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgICAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLCAvKuaYr+WQpuWPr+S7peaLluWKqCovXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYXJzZURhdGEodGhpcy5wcm9wcy5kYXRhKVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kb0FuaW1hdGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXBlclNjcm9sbGVyID0gdGhpcy5wYXBlclNjcm9sbGVyID0gbmV3IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXIoe1xyXG4gICAgICAgICAgICBwYXBlcixcclxuICAgICAgICAgICAgYXV0b1Jlc2l6ZVBhcGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdncmFiJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcGVyLm9uKCdibGFuazpwb2ludGVyZG93bicsIHBhcGVyU2Nyb2xsZXIuc3RhcnRQYW5uaW5nKTtcclxuICAgICAgICAkKHRoaXMucGFwZXJDb250YWluZXIpLmFwcGVuZChwYXBlclNjcm9sbGVyLmVsKTtcclxuICAgICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXJMaW5rcygpXHJcbiAgICAgICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5wcm9wcy5jZW50ZXIpIHsgcGFwZXJTY3JvbGxlci5jZW50ZXIoKSB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubm9kZUlkKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3NpdG9uOiBhbnkgPSB7fVxyXG4gICAgICAgICAgICBfLm1hcCh0aGlzLnByb3BzLmRhdGEubm9kZXMsIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHRoaXMucHJvcHMubm9kZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRvbiA9IHsgeDogaXRlbS54LCB5OiBpdGVtLnkgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwYXBlclNjcm9sbGVyLmNlbnRlcihwb3NpdG9uLngsIHBvc2l0b24ueSlcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHBhcGVyU2Nyb2xsZXIuY2VudGVyKClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuem9vbVRvRml0KSB7IHBhcGVyU2Nyb2xsZXIuem9vbVRvRml0KCkgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogdG9vbHRpcOWIneWni+WMllxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0b29sX3RpcCA9IG5ldyBqb2ludC51aS5Ub29sdGlwKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnW2RhdGEtdG9vbHRpcF0nLFxyXG4gICAgICAgICAgICBjb250ZW50OiAodGFyZ2V0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0aXBzID0gXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tYXAodGlwcywgKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRpcHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGlwc1swXSAhPT0gdGlwc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke2l0ZW19PC9iPjxociAvPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiDlj4zlh7vkuovku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXBlci5vbignY2VsbDpwb2ludGVyZGJsY2xpY2snLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy50eXBlID09PSAnVklNJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25EYmxjbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25EYmxjbGljayhjZWxsVmlldylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog5Y2V5Ye75LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGFwZXIub24oJ2NlbGw6cG9pbnRlcmNsaWNrJywgKGNlbGxWaWV3OiBhbnksIGV2dDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnR5cGUgPT09ICdWSU0nKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdGlwbGUgPSBwYXBlclNjcm9sbGVyLnpvb20oKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMuYXR0cnNbJy5wZXJmJ10ud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMuYXR0cnNbJy5wZXJmJ10ueCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0Lm9mZnNldFggLyBtdWx0aXBsZSAtIGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMucG9zaXRpb24ueCA8PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRZIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnkgPD0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMuYXR0cnNbJy5wZXJmJ10ueCA9PT0gMTY5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WCAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi54ID49IDE2OSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRZIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnkgPD0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5hdHRyc1snLmFsYXJtJ10ud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMuYXR0cnNbJy5hbGFybSddLnggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRYIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnggPD0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQub2Zmc2V0WSAvIG11bHRpcGxlIC0gY2VsbFZpZXcubW9kZWwuYXR0cmlidXRlcy5wb3NpdGlvbi55ID49IDE5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2JvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLmF0dHJzWycuYWxhcm0nXS54ID09PSAxNjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5vZmZzZXRYIC8gbXVsdGlwbGUgLSBjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnBvc2l0aW9uLnggPj0gMTY5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0Lm9mZnNldFkgLyBtdWx0aXBsZSAtIGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMucG9zaXRpb24ueSA+PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog6Kej5Yaz5YWo5bGP5LiN5pi+56S6dG9vbHRpcFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhcGVyLm9uKCdjZWxsOm1vdXNlb3ZlcicsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnR5cGUgPT09ICdWSU0nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9wb2xvZ3lfaW5zdGFuY2U6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BvbG9neV9pbnN0YW5jZScpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpvaW50X3Rvb2x0aXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnam9pbnQtdG9vbHRpcCcpWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wb2xvZ3lfaW5zdGFuY2UuYXBwZW5kKGpvaW50X3Rvb2x0aXBzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiDmjInpkq5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ0bl9tYXAub25jbGljayA9IHRoaXMuc21hbGxfbWFwLmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLmJ0bl96b29taW4ub25jbGljayA9IHRoaXMuem9vbUluLmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLmJ0bl96b29tb3V0Lm9uY2xpY2sgPSB0aGlzLnpvb21PdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIHRoaXMuYnRuX2Z1bGxzY3JlZW4ub25jbGljayA9IHRoaXMuZnVsbFNjcmVlbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiDnvKnnlaXlm75cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgbmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3IgPSBuZXcgam9pbnQudWkuTmF2aWdhdG9yKHtcclxuICAgICAgICAgICAgd2lkdGg6IDI0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMTUsXHJcbiAgICAgICAgICAgIHBhcGVyU2Nyb2xsZXI6IHRoaXMucGFwZXJTY3JvbGxlcixcclxuICAgICAgICAgICAgem9vbTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGlzLm5hdmkpLmFwcGVuZChuYXZpZ2F0b3IuZWwpO1xyXG4gICAgICAgIG5hdmlnYXRvci5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDmiZPlvIDlhbPpl63nvKnnlaXlm75cclxuICAgICAqL1xyXG4gICAgc21hbGxfbWFwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpc2FibGVfaW5zdGFuY2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB2aXNhYmxlX2luc3RhbmNlOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdmlzYWJsZV9pbnN0YW5jZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDmiZPlvIDlhbPpl63lhajlsY9cclxuICAgICAqL1xyXG4gICAgZnVsbFNjcmVlbiA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOi/m+WFpeWFqOWxj1xyXG4gICAgICovXHJcbiAgICByZXF1ZXN0RnVsbFNjcmVlbiA9ICgpID0+IHtcclxuICAgICAgICB2YXIgZGU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BvbG9neV9pbnN0YW5jZScpO1xyXG4gICAgICAgIGlmIChkZS5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBkZS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGUubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiDpgIDlh7rlhajlsY9cclxuICAgICAqL1xyXG4gICAgZXhpdEZ1bGxzY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIGRlOiBhbnkgPSBkb2N1bWVudDtcclxuICAgICAgICBpZiAoZGUuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGUud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICBkZS53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qXHJcbiAgICAqIOebkeWQrGZ1bGxzY3JlZW5jaGFuZ2Xkuovku7ZcclxuICAgICovXHJcbiAgICB3YXRjaEZ1bGxTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkZTogYW55ID0gZG9jdW1lbnRcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGRlLmZ1bGxzY3JlZW5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgIClcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGRlLm1vekZ1bGxTY3JlZW5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgIClcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGRlLndlYmtpdElzRnVsbFNjcmVlblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDoh6rliqjluIPlsYAgXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckxheW91dCgpIHtcclxuICAgICAgICB2YXIgZ3JhcGhCQm94ID0gam9pbnQubGF5b3V0LkRpcmVjdGVkR3JhcGgubGF5b3V0KHRoaXMuZ3JhcGgsIHtcclxuICAgICAgICAgICAgbm9kZVNlcDogNTAsXHJcbiAgICAgICAgICAgIGVkZ2VTZXA6IDgwLFxyXG4gICAgICAgICAgICBtYXJnaW5YOiAxMDAsXHJcbiAgICAgICAgICAgIG1hcmdpblk6IDEwMCxcclxuICAgICAgICAgICAgcmFua1NlcDogODAsXHJcbiAgICAgICAgICAgIHJhbmtEaXI6ICdMUidcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDluIPlsYDlkI7nmoTov57nur9cclxuICAgICAqL1xyXG4gICAgcmVuZGVyTGlua3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5saW5rcykge1xyXG4gICAgICAgICAgICBfLm1hcCh0aGlzLnByb3BzLmRhdGEubGlua3MsIChsaW5rKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXcgTGluayhsaW5rT3B0aW9uKGxpbmspKS5hZGRUbyh0aGlzLmdyYXBoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiDmlL7lpKfnvKnlsI9cclxuICAgICAqL1xyXG4gICAgem9vbUluKCkge1xyXG4gICAgICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKDAuMiwgeyBtYXg6IDIgfSk7XHJcbiAgICB9XHJcbiAgICB6b29tT3V0KCkge1xyXG4gICAgICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKC0wLjIsIHsgbWluOiAwLjIgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogTWFpblByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVQYXBlcigpXHJcbiAgICAgICAgdGhpcy53YXRjaEZ1bGxTY3JlZW4oKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyTWFwKCkge1xyXG4gICAgICAgIGxldCB7IHZpc2FibGVfaW5zdGFuY2UgfSA9IHRoaXMuc3RhdGVcclxuICAgICAgICBpZiAodmlzYWJsZV9pbnN0YW5jZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JfaW5zdGFuY2VcIiBpZD1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMubmF2aSA9IG5vZGUgfX0gLz5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JfaW5zdGFuY2VcIiBpZD1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMubmF2aSA9IG5vZGUgfX0gc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyRnVsbHNjcmVlbkJ0bigpIHtcclxuICAgICAgICBsZXQgeyBmdWxsc2NyZWVuX2J0bl9kaXNhYmxlIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgaWYgKGZ1bGxzY3JlZW5fYnRuX2Rpc2FibGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fZnVsbHNjcmVlbiA9IG5vZGUgfX0gaWQ9XCJidG4tZnVsbHNjcmVlblwiIGNsYXNzTmFtZT1cImJ0blwiIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT7lhajlsY88L2Rpdj5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdWxsc2NyZWVuID0gbm9kZSB9fSBpZD1cImJ0bi1mdWxsc2NyZWVuXCIgY2xhc3NOYW1lPVwiYnRuXCI+5YWo5bGPPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBvbk1hcCA9IHRoaXMuc3RhdGUudmlzYWJsZV9pbnN0YW5jZSA9PT0gdHJ1ZSA/ICflhbPpl63nvKnnlaXlm74nIDogJ+aJk+W8gOe8qeeVpeWbvidcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BvbG9neV9pbnN0YW5jZVwiIGlkPVwidG9wb2xvZ3lfaW5zdGFuY2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG9sb2d5LWFwcFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHAtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRnVsbHNjcmVlbkJ0bigpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9tYXAgPSBub2RlIH19IGlkPVwiYnRuLW1hcFwiIGNsYXNzTmFtZT1cImJ0blwiPntvbk1hcH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbWluID0gbm9kZSB9fSBpZD1cImJ0bi16b29taW5cIiBjbGFzc05hbWU9XCJidG5cIj4rPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX3pvb21vdXQgPSBub2RlIH19IGlkPVwiYnRuLXpvb21vdXRcIiBjbGFzc05hbWU9XCJidG5cIj4tPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcGVyLWNvbnRhaW5lclwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMucGFwZXJDb250YWluZXIgPSBub2RlIH19ID48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hcCgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAnLi9zdHlsZS9pbmRleCdcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IFRvcG9sb2d5SW5zdGFuY2UgZnJvbSAnLi9tb2R1bGUvdmlldy9tYWluJztcclxuXHJcbmNvbnN0IGluaXQgPSAobW91bnROb2RlSWQgPSAncm9vdCcsIG9wdDogYW55KSA9PiB7XHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFRvcG9sb2d5SW5zdGFuY2VcclxuICAgICAgcmFua0Rpcj17b3B0LnJhbmtEaXJ9XHJcbiAgICAgIGFuaW1hdGU9e29wdC5hbmltYXRlfVxyXG4gICAgICBjaWQ9e29wdC5jaWR9XHJcbiAgICAgIGRhdGE9e29wdC5kYXRhfVxyXG4gICAgICBub2RlSWQ9e29wdC5ub2RlSWR9XHJcbiAgICAgIG9uRGJsY2xpY2s9e29wdC5vbkRibGNsaWNrfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neUluc3RhbmNlXHJcbn0iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJSZWFjdC5jcmVhdGVFbGVtZW50IiwiUmVhY3QuQ29tcG9uZW50IiwiUmVhY3RET00ucmVuZGVyIiwiVG9wb2xvZ3lJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUIsQ0FBQzs7QUFFRixBQUFPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDNUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQixTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUN4Rjs7QUN2QkQsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFD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QUNKO3lCQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7d0JBQzNELElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7NEJBQ3RFLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ3RCO3lCQUNKO3FCQUNKO2lCQUNKO2dCQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ3JELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ25ELElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ3JFLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NkJBQ3pCO3lCQUNKO3FCQUNKO3lCQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7d0JBQzVELElBQUksR0FB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
