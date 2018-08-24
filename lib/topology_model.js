(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('lodash')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'lodash'], factory) :
	(factory((global.topology_model = {}),global.React,global.ReactDOM,global._));
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
            width: 120,
            height: 60
        },
        attrs: {
            '.': {
                magnet: false
            },
            '.label': {
                text: '',
                'ref-x': .5,
                'ref-y': .4,
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
                refX2: -10,
                refY: '100%',
                refY2: -10,
                width: 10,
                height: 10,
            },
            '.body': {
                'ref-width': '100%',
                'ref-height': '100%',
                stroke: '#00B388',
                'stroke-width': 3
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
        // router: { name: 'manhattan' },
        // connector: { name: 'rounded' },
        attrs: {
            '.connection': { stroke: '#C6C9CA', 'stroke-width': 3 },
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
                d: 'M 10 0 L 0 5 L 10 10 z' //箭头样式
            },
        }
    };
    if (opt) {
        option.state = opt.state;
        option.source = {
            id: opt.source
        };
        option.target = {
            id: opt.target
        };
        switch (opt.state) {
            case 0:
                option.attrs['.connection'].stroke = '#C6C9CA';
                option.attrs['.marker-target'].fill = '#C6C9CA';
                option.attrs['.marker-target'].stroke = '#C6C9CA';
                break;
            case 1:
                option.attrs['.connection'].stroke = '#D10002';
                option.attrs['.marker-target'].fill = '#fff';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].stroke = '#D10002';
                break;
            case 2:
                option.attrs['.connection'].stroke = '#FF9901';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#FF9901';
                option.attrs['.marker-target'].stroke = '#FF9901';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                break;
            default:
                option.attrs['.connection'].stroke = '#31d0c6';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#31d0c6';
                option.attrs['.marker-target'].stroke = '#31d0c6';
                break;
        }
        switch (opt.type) {
            case 0:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 z'; //三角箭头
                break;
            case 1:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z'; //实心菱形
                break;
            case 2:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z'; //空心菱形
                option.attrs['.marker-target'].fill = '#fff';
                break;
            case 3:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 0 5 z'; //尖箭头
                break;
            case 4:
                option.attrs['.marker-target'].d = ''; //没有箭头
                break;
            default:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 z';
                break;
        }
    }
    return option;
};
var vimOption = function (opt) {
    var option = { size: {}, attrs: { '.label': {}, '.type': {}, '.alarm': {}, '.body': {} } };
    var dataTooltip = '';
    var dataIcon = '';
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
        }
        if (opt.bizFields) {
            option.bizFields = opt.bizFields;
        }
        if (opt.label) {
            dataTooltip = "data-tooltip=\"" + opt.label + "\"";
            switch (opt.type) {
                case 'switch':
                    dataIcon = "xlink:href=" + opt.switch;
                    break;
                case 'vm':
                    dataIcon = "xlink:href=" + opt.vm;
                    break;
                case 'vnf':
                    dataIcon = "xlink:href=" + opt.vnf;
                    break;
                case 'vnfc':
                    dataIcon = "xlink:href=" + opt.vnfc;
                    break;
                case 'server':
                    dataIcon = "xlink:href=" + opt.server;
                    break;
                default:
                    dataIcon = "xlink:href=" + opt.switch;
                    break;
            }
            option.markup = "<g class=\"rotatable\" " + dataTooltip + "><image " + dataIcon + " x=\"0\" y=\"0\" height=\"50px\" width=\"50px\"/> </g>";
        }
        if (opt.type) {
            option.attrs['.label'].text = opt.type;
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
            // rankDir: 'TB',
            disabled: false,
            visable: true
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
                if (cell.attributes.state == 1000) {
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
    Main.prototype.parseData = function (data, images) {
        var _this = this;
        if (data.nodes) {
            _.map(data.nodes, function (node) {
                var opt = {
                    isHighlight: (node.id === _this.props.cid)
                };
                new VIM(vimOption(_.merge(node, opt, images))).addTo(_this.graph);
            });
            if (data.links) {
                _.map(data.links, function (link) {
                    new Link(linkOption(link)).addTo(_this.graph);
                });
            }
        }
    };
    Main.prototype.initializePaper = function () {
        var _this = this;
        var graph = this.graph = new joint.dia.Graph;
        this.commandManager = new joint.dia.CommandManager({ graph: graph });
        var paper = this.paper = new joint.dia.Paper({
            // el: this.paperContainer,
            width: this.props.paper_width,
            height: this.props.paper_height,
            gridSize: 10,
            drawGrid: this.props.drawGrid,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true,
        });
        this.parseData(this.props.data, this.props.images);
        if (this.props.animate) {
            this.doAnimate();
        }
        // this.snaplines = new joint.ui.Snaplines({ paper: paper });
        var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            cursor: 'grab'
        });
        paper.on('blank:pointerdown', paperScroller.startPanning);
        $(this.paperContainer).append(paperScroller.el);
        this.renderLayout();
        paperScroller.render();
        if (this.props.center) {
            paperScroller.center();
        }
        if (this.props.zoomToFit) {
            paperScroller.zoomToFit();
        }
        new joint.ui.Tooltip({
            target: '[data-tooltip]',
            content: function (target) {
                var tips = _.split(target.attributes['data-tooltip'].nodeValue, '|');
                return _.map(_.split(target.attributes['data-tooltip'].nodeValue, '|'), function (item, index) {
                    if (index == 0 && tips.length > 1) {
                        if (tips[0] != tips[1]) {
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
         * 右击事件
         */
        paper.on('cell:contextmenu', function (cellView) {
            _this.setState({
                disabled: true
            });
        });
        paper.on('blank:pointerclick', function (cellView) {
            _this.setState({
                disabled: false
            });
        });
        paper.on('blank:contextmenu', function (cellView) {
            _this.setState({
                disabled: false
            });
        });
        /*
         * 按钮
         */
        // this.btn_changeLayout_tb.onclick = this.changeLayout_tb.bind(this)
        // this.btn_changeLayout_bt.onclick = this.changeLayout_bt.bind(this)
        // this.btn_changeLayout_lr.onclick = this.changeLayout_lr.bind(this)
        // this.btn_changeLayout_rl.onclick = this.changeLayout_rl.bind(this)
        this.btn_function_1.onclick = this.function_1.bind(this);
        this.btn_function_2.onclick = this.function_2.bind(this);
        this.btn_function_3.onclick = this.function_3.bind(this);
        this.btn_function_4.onclick = this.function_4.bind(this);
        this.btn_map.onclick = this.small_map.bind(this);
        this.btn_zoomin.onclick = this.zoomIn.bind(this);
        this.btn_zoomout.onclick = this.zoomOut.bind(this);
    };
    /*
     * 缩略图
     */
    Main.prototype.initializeNavigator = function () {
        var navigator = this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false,
        });
        $('.navigator').append(navigator.el);
        navigator.render();
    };
    /*
     * 打开关闭缩略图
     */
    Main.prototype.small_map = function () {
        if (this.state.visable === true) {
            this.setState({
                visable: false
            });
        }
        else {
            this.setState({
                visable: true
            });
        }
    };
    /*
     * 按钮功能
     */
    Main.prototype.function_1 = function () {
        if (this.state.disabled == true) {
            console.log('-------------------------------------------------->function_1');
        }
    };
    Main.prototype.function_2 = function () {
        if (this.state.disabled == true) {
            console.log('-------------------------------------------------->function_2');
        }
    };
    Main.prototype.function_3 = function () {
        if (this.state.disabled == true) {
            console.log('-------------------------------------------------->function_3');
        }
    };
    Main.prototype.function_4 = function () {
        if (this.state.disabled == true) {
            console.log('-------------------------------------------------->function_4');
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
            // rankSep: 80,
            rankDir: 'TB'
        });
    };
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
    Main.prototype.zoomIn = function () {
        this.paperScroller.zoom(0.2, { max: 2 });
    };
    Main.prototype.zoomOut = function () {
        this.paperScroller.zoom(-0.2, { min: 0.2 });
    };
    Main.prototype.componentDidMount = function () {
        this.initializePaper();
        this.initializeNavigator();
    };
    Main.prototype.renderMap = function () {
        var _this = this;
        var visable = this.state.visable;
        if (visable === true) {
            return React.createElement("div", { className: "navigator", id: "navigator", ref: function (node) { _this.navigator = node; } });
        }
        else {
            return React.createElement("div", { className: "navigator", id: "navigator", ref: function (node) { _this.navigator = node; }, style: { display: 'none' } });
        }
    };
    Main.prototype.link_1 = function () {
        console.log('----------------->link-1');
    };
    Main.prototype.link_2 = function () {
        console.log('----------------->link-2');
    };
    Main.prototype.link_3 = function () {
        console.log('----------------->link-3');
    };
    Main.prototype.render = function () {
        var _this = this;
        var _style = {};
        var tooltip1 = '', tooltip2 = '', tooltip3 = '', tooltip4 = '';
        var tooltip_style = {};
        var more_style = {};
        if (this.state.disabled === false) {
            _style = {
                color: 'rgba(0,0,0,.25)',
                backgroundColor: '#f5f5f5',
                borderColor: '#d9d9d9',
                cursor: 'not-allowed'
            };
            tooltip1 = tooltip2 = tooltip3 = tooltip4 = '请选中元件';
            tooltip_style = { cursor: 'not-allowed' };
            more_style = { display: 'none' };
        }
        else {
            tooltip1 = '功能1';
            tooltip2 = '功能2';
            tooltip3 = '功能3';
            tooltip4 = '功能4';
            tooltip_style = { cursor: 'pointer' };
        }
        var onMap = this.state.visable === true ? '关闭缩略图' : '打开缩略图';
        return (React.createElement("div", { className: "Topology", style: { width: this.props.width, height: this.props.height } },
            React.createElement("div", { className: "topology-app" },
                React.createElement("div", { className: "app-body" },
                    React.createElement("div", { className: "fun-btn-area" },
                        React.createElement("div", { className: "fun-item" },
                            React.createElement("div", { ref: function (node) { _this.btn_function_1 = node; }, style: _style, id: "btn-function-1", className: "fun-btn" },
                                React.createElement("label", { "data-tooltip": tooltip1, "data-tooltip-position": "top", style: tooltip_style }, "\u529F\u80FD1"))),
                        React.createElement("div", { className: "fun-item" },
                            React.createElement("div", { ref: function (node) { _this.btn_function_2 = node; }, style: _style, id: "btn-function-1", className: "fun-btn" },
                                React.createElement("label", { "data-tooltip": tooltip2, "data-tooltip-position": "top", style: tooltip_style }, "\u529F\u80FD2"))),
                        React.createElement("div", { className: "fun-item" },
                            React.createElement("div", { ref: function (node) { _this.btn_function_3 = node; }, style: _style, id: "btn-function-1", className: "fun-btn" },
                                React.createElement("label", { "data-tooltip": tooltip3, "data-tooltip-position": "top", style: tooltip_style }, "\u529F\u80FD3"))),
                        React.createElement("div", { className: "fun-item" },
                            React.createElement("div", { ref: function (node) { _this.btn_function_4 = node; }, style: _style, id: "btn-function-1", className: "fun-btn" },
                                React.createElement("label", { "data-tooltip": tooltip4, "data-tooltip-position": "top", style: tooltip_style }, "\u529F\u80FD4"))),
                        React.createElement("div", { className: "fun-item-more" },
                            React.createElement("div", { ref: function (node) { _this.btn_more = node; }, style: _style, id: "btn-function-1", className: "fun-btn" }, "\u66F4\u591A"),
                            React.createElement("div", { className: "dropdown-content", style: more_style },
                                React.createElement("a", { href: "jacascript:;", onClick: this.link_1.bind(this) }, "\u4E0B\u62C9\u83DC\u5355\u9879 1"),
                                React.createElement("a", { href: "jacascript:;", onClick: this.link_2.bind(this) }, "\u4E0B\u62C9\u83DC\u5355\u9879 2"),
                                React.createElement("a", { href: "jacascript:;", onClick: this.link_3.bind(this) }, "\u4E0B\u62C9\u83DC\u5355\u9879 3")))),
                    React.createElement("div", { ref: function (node) { _this.btn_map = node; }, id: "btn-map", className: "btn" }, onMap),
                    React.createElement("div", { ref: function (node) { _this.btn_zoomin = node; }, id: "btn-zoomin", className: "btn" }, "+"),
                    React.createElement("div", { ref: function (node) { _this.btn_zoomout = node; }, id: "btn-zoomout", className: "btn" }, "-"),
                    React.createElement("div", { className: "paper-container", ref: function (node) { _this.paperContainer = node; } }),
                    this.renderMap()))));
    };
    Main.defaultProps = {
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
    };
    return Main;
}(React.Component));

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, images: opt.images, onDblclick: opt.onDblclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology_model.js.map

exports.init = init;
exports.TopologyModel = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3lfbW9kZWwuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5X21vZGVsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPicsXHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdWSU0nLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA2MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy4nOiB7XHJcbiAgICAgICAgICAgICAgICBtYWduZXQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC41LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjQsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDAwJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLnR5cGUnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC4wNSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC43LFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IDE0LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYWxhcm0nOiB7XHJcbiAgICAgICAgICAgICAgICByZWZYOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICByZWZYMjogLTEwLFxyXG4gICAgICAgICAgICAgICAgcmVmWTogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgcmVmWTI6IC0xMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYm9keSc6IHtcclxuICAgICAgICAgICAgICAgICdyZWYtd2lkdGgnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncmVmLWhlaWdodCc6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyMwMEIzODgnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIGpvaW50LnNoYXBlcy5iYXNpYy5HZW5lcmljLnByb3RvdHlwZS5kZWZhdWx0cyksXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LnNoYXBlcy5iYXNpYy5HZW5lcmljLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubGV0IExpbmsgPSBqb2ludC5kaWEuTGluay5leHRlbmQoe1xyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnTGluaycsXHJcbiAgICAgICAgLy8gcm91dGVyOiB7IG5hbWU6ICdtYW5oYXR0YW4nIH0sXHJcbiAgICAgICAgLy8gY29ubmVjdG9yOiB7IG5hbWU6ICdyb3VuZGVkJyB9LFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuY29ubmVjdGlvbic6IHsgc3Ryb2tlOiAnI0M2QzlDQScsICdzdHJva2Utd2lkdGgnOiAzIH0sXHJcbiAgICAgICAgICAgICcubGluay10b29scyc6IHsgZGlzcGxheTogJ25vbmUnIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLWFycm93aGVhZHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgejogLTFcclxuICAgIH0sIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5kZWZhdWx0cyksXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuZGlhLkxpbmsucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKlxyXG4qKui/nuaOpee6v+S4jueureWktOagt+W8j1xyXG4qL1xyXG5leHBvcnQgaW50ZXJmYWNlIElsaW5rT3B0aW9uIHtcclxuICAgIHN0YXRlPzogbnVtYmVyXHJcbiAgICBzb3VyY2U/OiBzdHJpbmdcclxuICAgIHRhcmdldD86IHN0cmluZ1xyXG4gICAgdHlwZT86IG51bWJlclxyXG59XHJcbmxldCBsaW5rT3B0aW9uID0gKG9wdDogSWxpbmtPcHRpb24pID0+IHtcclxuICAgIGxldCBvcHRpb246IGFueSA9IHtcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6ICcjQzZDOUNBJyxcclxuICAgICAgICAgICAgICAgICdzdHJva2UtZGFzaGFycmF5JzogJydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItdGFyZ2V0Jzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsLy/nrq3lpLTovrnmoYZcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjQzZDOUNBJywvL+eureWktOminOiJslxyXG4gICAgICAgICAgICAgICAgZDogJ00gMTAgMCBMIDAgNSBMIDEwIDEwIHonLy/nrq3lpLTmoLflvI9cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgICAgb3B0aW9uLnN0YXRlID0gb3B0LnN0YXRlXHJcbiAgICAgICAgb3B0aW9uLnNvdXJjZSA9IHtcclxuICAgICAgICAgICAgaWQ6IG9wdC5zb3VyY2VcclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9uLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgaWQ6IG9wdC50YXJnZXRcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChvcHQuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNEMTAwMDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0ZGOTkwMSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNGRjk5MDEnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0RGQjIwMidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjREZCMjAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0RGQjIwMic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjMDBCRkZGJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyMwMEJGRkYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjMzFkMGM2J1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyMzMWQwYzYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjMzFkMGM2J1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAob3B0LnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7ICAvL+S4ieinkueureWktFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMjAgNSB6JzsgLy/lrp7lv4Poj7HlvaJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDIwIDUgeic7IC8v56m65b+D6I+x5b2iXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjZmZmJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDAgNSB6JzsgLy/lsJbnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICcnOyAvL+ayoeacieeureWktFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25cclxufVxyXG5cclxuLypcclxuKirljp/ku7bmoLflvI9cclxuKi9cclxuZXhwb3J0IGludGVyZmFjZSBJdmltT3B0aW9uIHtcclxuICAgIGlkPzogc3RyaW5nXHJcbiAgICBkZXNjPzogc3RyaW5nXHJcbiAgICBsYWJlbD86IHN0cmluZ1xyXG4gICAgc3RhdGU/OiBudW1iZXJcclxuICAgIHR5cGU/OiBzdHJpbmdcclxuICAgIGJpekZpZWxkcz86IGFueVxyXG4gICAgaXNIaWdobGlnaHQ/OiBib29sZWFuXHJcbiAgICBzd2l0Y2g/OiBhbnlcclxuICAgIHZtPzogYW55XHJcbiAgICB2bmY/OiBhbnlcclxuICAgIHZuZmM/OiBhbnlcclxuICAgIHNlcnZlcj86IGFueVxyXG59XHJcbmxldCB2aW1PcHRpb24gPSAob3B0OiBJdmltT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7IHNpemU6IHt9LCBhdHRyczogeyAnLmxhYmVsJzoge30sICcudHlwZSc6IHt9LCAnLmFsYXJtJzoge30sICcuYm9keSc6IHt9IH0gfVxyXG4gICAgbGV0IGRhdGFUb29sdGlwID0gJydcclxuICAgIGxldCBkYXRhSWNvbiA9ICcnXHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgICAgaWYgKG9wdC5pZCkge1xyXG4gICAgICAgICAgICBvcHRpb24uaWQgPSBvcHQuaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5iaXpGaWVsZHMpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmJpekZpZWxkcyA9IG9wdC5iaXpGaWVsZHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5sYWJlbCkge1xyXG4gICAgICAgICAgICBkYXRhVG9vbHRpcCA9IGBkYXRhLXRvb2x0aXA9XCIke29wdC5sYWJlbH1cImBcclxuICAgICAgICAgICAgc3dpdGNoIChvcHQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3dpdGNoJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnN3aXRjaH1gXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2bSc6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC52bX1gXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2bmYnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQudm5mfWBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3ZuZmMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQudm5mY31gXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzZXJ2ZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQuc2VydmVyfWBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC5zd2l0Y2h9YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbi5tYXJrdXAgPSBgPGcgY2xhc3M9XCJyb3RhdGFibGVcIiAke2RhdGFUb29sdGlwfT48aW1hZ2UgJHtkYXRhSWNvbn0geD1cIjBcIiB5PVwiMFwiIGhlaWdodD1cIjUwcHhcIiB3aWR0aD1cIjUwcHhcIi8+IDwvZz5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQudHlwZSkge1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sYWJlbCddLnRleHQgPSBvcHQudHlwZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBWSU0sXHJcbiAgICB2aW1PcHRpb24sXHJcbiAgICBMaW5rLFxyXG4gICAgbGlua09wdGlvblxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWSU0sIExpbmssIHZpbU9wdGlvbiwgbGlua09wdGlvbiB9IGZyb20gJy4vdmltJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSBsZXQgVjogYW55XHJcbmRlY2xhcmUgY29uc3Qgam9pbnQ6IGFueVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xyXG4gIGFuaW1hdGU/OiBib29sZWFuXHJcbiAgd2lkdGg/OiBhbnlcclxuICBoZWlnaHQ/OiBhbnlcclxuICBkcmF3R3JpZD86IGJvb2xlYW5cclxuICByYW5rRGlyPzogJ1RCJyB8ICdCVCcgfCAnTFInIHwgJ1JMJztcclxuICBvbkRibGNsaWNrPzogRnVuY3Rpb25cclxuICBkYXRhOiBhbnlcclxuICBpbWFnZXM6IGFueVxyXG4gIGNlbnRlcj86IGJvb2xlYW5cclxuICB6b29tVG9GaXQ/OiBib29sZWFuXHJcbiAgcGFwZXJfd2lkdGg/OiBudW1iZXJcclxuICBwYXBlcl9oZWlnaHQ/OiBudW1iZXJcclxuICBjaWQ/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxNYWluUHJvcHMsIGFueT4ge1xyXG5cclxuICAvLyBDb25hdGluZXJcclxuICBwYXBlckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X3RiOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9jaGFuZ2VMYXlvdXRfYnQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2NoYW5nZUxheW91dF9scjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X3JsOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl8xOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl8yOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl8zOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl80OiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9tb3JlOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9tYXA6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX3pvb21pbjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fem9vbW91dDogSFRNTERpdkVsZW1lbnRcclxuICBuYXZpZ2F0b3I6IEhUTUxEaXZFbGVtZW50XHJcblxyXG4gIC8vIHJhcHBpZCB0aGluZ3NcclxuICBncmFwaDogam9pbnQuZGlhLkdyYXBoO1xyXG4gIGNvbW1hbmRNYW5hZ2VyOiBqb2ludC5kaWEuQ29tbWFuZE1hbmFnZXI7XHJcbiAgcGFwZXI6IGpvaW50LmRpYS5QYXBlcjtcclxuICBzbmFwbGluZXM6IGpvaW50LnVpLlNuYXBsaW5lcztcclxuICBwYXBlclNjcm9sbGVyOiBqb2ludC51aS5QYXBlclNjcm9sbGVyO1xyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6IE1haW5Qcm9wcyA9IHtcclxuICAgIGFuaW1hdGU6IHRydWUsXHJcbiAgICB3aWR0aDogODAwLFxyXG4gICAgaGVpZ2h0OiA2MDAsXHJcbiAgICBwYXBlcl93aWR0aDogMTAwMCxcclxuICAgIHBhcGVyX2hlaWdodDogMTAwMCxcclxuICAgIGRyYXdHcmlkOiBmYWxzZSxcclxuICAgIHJhbmtEaXI6ICdUQicsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGltYWdlczoge30sXHJcbiAgICBjZW50ZXI6IGZhbHNlLFxyXG4gICAgem9vbVRvRml0OiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pWw5o2u5Lyg6YCS5Yqo55S7XHJcbiAgICovXHJcbiAgZG9BbmltYXRlKCkge1xyXG4gICAgbGV0IGdyYXBoID0gdGhpcy5ncmFwaFxyXG4gICAgbGV0IHBhcGVyID0gdGhpcy5wYXBlclxyXG4gICAgZ3JhcGgub24oJ3NpZ25hbCcsIGZ1bmN0aW9uIChjZWxsOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIGpvaW50LmRpYS5MaW5rKSB7XHJcbiAgICAgICAgaWYgKGNlbGwuYXR0cmlidXRlcy5zdGF0ZSA9PSAxMDAwKSB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwoY2VsbC5nZXQoJ3RhcmdldCcpLmlkKTtcclxuICAgICAgICAgIGxldCBzOiBhbnkgPSBwYXBlci5maW5kVmlld0J5TW9kZWwoY2VsbClcclxuICAgICAgICAgIHMuc2VuZFRva2VuKFYoJ2NpcmNsZScsIHsgcjogNywgZmlsbDogJ2dyZWVuJyB9KS5ub2RlLCAxMDAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldENlbGwudHJpZ2dlcignc2lnbmFsJywgdGFyZ2V0Q2VsbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IG91dGJvdW5kTGlua3MgPSBncmFwaC5nZXRDb25uZWN0ZWRMaW5rcyhjZWxsLCB7IG91dGJvdW5kOiB0cnVlIH0pO1xyXG4gICAgICAgIF8uZWFjaChvdXRib3VuZExpbmtzLCBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgbGluay50cmlnZ2VyKCdzaWduYWwnLCBsaW5rKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZXM6IGFueSA9IFtdXHJcbiAgICBsZXQgdGFyZ2V0czogYW55ID0gW11cclxuICAgIF8ubWFwKGdyYXBoLmdldExpbmtzKCksIChsaW5rKSA9PiB7XHJcbiAgICAgIHNvdXJjZXMucHVzaChsaW5rLmdldCgnc291cmNlJykuaWQpXHJcbiAgICAgIHRhcmdldHMucHVzaChsaW5rLmdldCgndGFyZ2V0JykuaWQpXHJcbiAgICB9KVxyXG4gICAgbGV0IHRyaWdnZXJzID0gXy5zb3J0ZWRVbmlxKF8uZGlmZmVyZW5jZShzb3VyY2VzLCB0YXJnZXRzKSlcclxuICAgIGZ1bmN0aW9uIHNpbXVsYXRlKCkge1xyXG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIF8ubWFwKHRyaWdnZXJzLCAodHJpZ2dlcjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwodHJpZ2dlcik7XHJcbiAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG4gICAgc2ltdWxhdGUoKVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruino+aekFxyXG4gICAqIEBwYXJhbSBkYXRhIOaLk+aJkeaVsOaNrlxyXG4gICAqL1xyXG4gIHBhcnNlRGF0YShkYXRhOiBhbnksIGltYWdlczogYW55KSB7XHJcbiAgICBpZiAoZGF0YS5ub2Rlcykge1xyXG4gICAgICBfLm1hcChkYXRhLm5vZGVzLCAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgIGlzSGlnaGxpZ2h0OiAobm9kZS5pZCA9PT0gdGhpcy5wcm9wcy5jaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ldyBWSU0odmltT3B0aW9uKF8ubWVyZ2Uobm9kZSwgb3B0LCBpbWFnZXMpKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgfSlcclxuICAgICAgaWYgKGRhdGEubGlua3MpIHtcclxuICAgICAgICBfLm1hcChkYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGggPSBuZXcgam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG5ldyBqb2ludC5kaWEuQ29tbWFuZE1hbmFnZXIoeyBncmFwaDogZ3JhcGggfSk7XHJcblxyXG4gICAgY29uc3QgcGFwZXIgPSB0aGlzLnBhcGVyID0gbmV3IGpvaW50LmRpYS5QYXBlcih7XHJcbiAgICAgIC8vIGVsOiB0aGlzLnBhcGVyQ29udGFpbmVyLFxyXG4gICAgICB3aWR0aDogdGhpcy5wcm9wcy5wYXBlcl93aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnBhcGVyX2hlaWdodCxcclxuICAgICAgZ3JpZFNpemU6IDEwLFxyXG4gICAgICBkcmF3R3JpZDogdGhpcy5wcm9wcy5kcmF3R3JpZCxcclxuICAgICAgbW9kZWw6IGdyYXBoLFxyXG4gICAgICBwZXJwZW5kaWN1bGFyTGlua3M6IHRydWUsXHJcbiAgICAgIHJlc3RyaWN0VHJhbnNsYXRlOiB0cnVlLFxyXG4gICAgICAvLyBkZWZhdWx0TGluazogbmV3IGpvaW50LnNoYXBlcy5hcHAuTGluaygpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBhcnNlRGF0YSh0aGlzLnByb3BzLmRhdGEsIHRoaXMucHJvcHMuaW1hZ2VzKVxyXG5cclxuXHJcblxyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLmFuaW1hdGUpIHtcclxuICAgICAgdGhpcy5kb0FuaW1hdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gdGhpcy5zbmFwbGluZXMgPSBuZXcgam9pbnQudWkuU25hcGxpbmVzKHsgcGFwZXI6IHBhcGVyIH0pO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyU2Nyb2xsZXIgPSB0aGlzLnBhcGVyU2Nyb2xsZXIgPSBuZXcgam9pbnQudWkuUGFwZXJTY3JvbGxlcih7XHJcbiAgICAgIHBhcGVyLFxyXG4gICAgICBhdXRvUmVzaXplUGFwZXI6IHRydWUsXHJcbiAgICAgIGN1cnNvcjogJ2dyYWInXHJcbiAgICB9KTtcclxuXHJcbiAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmRvd24nLCBwYXBlclNjcm9sbGVyLnN0YXJ0UGFubmluZyk7XHJcbiAgICAkKHRoaXMucGFwZXJDb250YWluZXIpLmFwcGVuZChwYXBlclNjcm9sbGVyLmVsKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcblxyXG4gICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgIGlmICh0aGlzLnByb3BzLmNlbnRlcikgeyBwYXBlclNjcm9sbGVyLmNlbnRlcigpIH1cclxuICAgIGlmICh0aGlzLnByb3BzLnpvb21Ub0ZpdCkgeyBwYXBlclNjcm9sbGVyLnpvb21Ub0ZpdCgpIH1cclxuXHJcbiAgICBuZXcgam9pbnQudWkuVG9vbHRpcCh7XHJcbiAgICAgIHRhcmdldDogJ1tkYXRhLXRvb2x0aXBdJyxcclxuICAgICAgY29udGVudDogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IHRpcHMgPSBfLnNwbGl0KHRhcmdldC5hdHRyaWJ1dGVzWydkYXRhLXRvb2x0aXAnXS5ub2RlVmFsdWUsICd8JylcclxuICAgICAgICByZXR1cm4gXy5tYXAoXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpLCAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAwICYmIHRpcHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGlwc1swXSAhPSB0aXBzWzFdKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke2l0ZW19PC9iPjxociAvPmBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICog5Y+M5Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHBhcGVyLm9uKCdjZWxsOnBvaW50ZXJkYmxjbGljaycsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsY2xpY2spIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uRGJsY2xpY2soY2VsbFZpZXcpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiDlj7Plh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgcGFwZXIub24oJ2NlbGw6Y29udGV4dG1lbnUnLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmNsaWNrJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHBhcGVyLm9uKCdibGFuazpjb250ZXh0bWVudScsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIOaMiemSrlxyXG4gICAgICovXHJcbiAgICAvLyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfdGIub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X3RiLmJpbmQodGhpcylcclxuICAgIC8vIHRoaXMuYnRuX2NoYW5nZUxheW91dF9idC5vbmNsaWNrID0gdGhpcy5jaGFuZ2VMYXlvdXRfYnQuYmluZCh0aGlzKVxyXG4gICAgLy8gdGhpcy5idG5fY2hhbmdlTGF5b3V0X2xyLm9uY2xpY2sgPSB0aGlzLmNoYW5nZUxheW91dF9sci5iaW5kKHRoaXMpXHJcbiAgICAvLyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfcmwub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X3JsLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzEub25jbGljayA9IHRoaXMuZnVuY3Rpb25fMS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9mdW5jdGlvbl8yLm9uY2xpY2sgPSB0aGlzLmZ1bmN0aW9uXzIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fZnVuY3Rpb25fMy5vbmNsaWNrID0gdGhpcy5mdW5jdGlvbl8zLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzQub25jbGljayA9IHRoaXMuZnVuY3Rpb25fNC5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9tYXAub25jbGljayA9IHRoaXMuc21hbGxfbWFwLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX3pvb21pbi5vbmNsaWNrID0gdGhpcy56b29tSW4uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fem9vbW91dC5vbmNsaWNrID0gdGhpcy56b29tT3V0LmJpbmQodGhpcylcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog57yp55Wl5Zu+XHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZU5hdmlnYXRvcigpIHtcclxuICAgIHZhciBuYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvciA9IG5ldyBqb2ludC51aS5OYXZpZ2F0b3Ioe1xyXG4gICAgICB3aWR0aDogMjQwLFxyXG4gICAgICBoZWlnaHQ6IDExNSxcclxuICAgICAgcGFwZXJTY3JvbGxlcjogdGhpcy5wYXBlclNjcm9sbGVyLFxyXG4gICAgICB6b29tOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgJCgnLm5hdmlnYXRvcicpLmFwcGVuZChuYXZpZ2F0b3IuZWwpO1xyXG4gICAgbmF2aWdhdG9yLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiDmiZPlvIDlhbPpl63nvKnnlaXlm75cclxuICAgKi9cclxuICBzbWFsbF9tYXAoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS52aXNhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHZpc2FibGU6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICB2aXNhYmxlOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIOaMiemSruWKn+iDvVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uXzEoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl8xJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uXzIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl8yJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uXzMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl8zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uXzQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl80Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIOW4g+WxgOWIh+aNolxyXG4gICAqL1xyXG4gIHJlbmRlckxheW91dCgpIHtcclxuICAgIGxldCBncmFwaEJCb3ggPSBqb2ludC5sYXlvdXQuRGlyZWN0ZWRHcmFwaC5sYXlvdXQodGhpcy5ncmFwaCwge1xyXG4gICAgICBub2RlU2VwOiA1MCxcclxuICAgICAgZWRnZVNlcDogODAsXHJcbiAgICAgIG1hcmdpblg6IDEwMCxcclxuICAgICAgbWFyZ2luWTogMTAwLFxyXG4gICAgICAvLyByYW5rU2VwOiA4MCxcclxuICAgICAgcmFua0RpcjogJ1RCJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8vIGNoYW5nZUxheW91dF90YigpIHtcclxuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gIC8vICAgICByYW5rRGlyOiAnVEInXHJcbiAgLy8gICB9LCAoKSA9PiB7XHJcbiAgLy8gICAgIHRoaXMucmVuZGVyTGF5b3V0KClcclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG4gIC8vIGNoYW5nZUxheW91dF9idCgpIHtcclxuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gIC8vICAgICByYW5rRGlyOiAnQlQnXHJcbiAgLy8gICB9LCAoKSA9PiB7XHJcbiAgLy8gICAgIHRoaXMucmVuZGVyTGF5b3V0KClcclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG4gIC8vIGNoYW5nZUxheW91dF9scigpIHtcclxuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gIC8vICAgICByYW5rRGlyOiAnTFInXHJcbiAgLy8gICB9LCAoKSA9PiB7XHJcbiAgLy8gICAgIHRoaXMucmVuZGVyTGF5b3V0KClcclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG4gIC8vIGNoYW5nZUxheW91dF9ybCgpIHtcclxuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gIC8vICAgICByYW5rRGlyOiAnUkwnXHJcbiAgLy8gICB9LCAoKSA9PiB7XHJcbiAgLy8gICAgIHRoaXMucmVuZGVyTGF5b3V0KClcclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG5cclxuICAvKlxyXG4gICAqIOaUvuWkp+e8qeWwj1xyXG4gICAqL1xyXG4gIHpvb21JbigpIHtcclxuICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKDAuMiwgeyBtYXg6IDIgfSk7XHJcbiAgfVxyXG4gIHpvb21PdXQoKSB7XHJcbiAgICB0aGlzLnBhcGVyU2Nyb2xsZXIuem9vbSgtMC4yLCB7IG1pbjogMC4yIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHM6IE1haW5Qcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgLy8gcmFua0RpcjogJ1RCJyxcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB2aXNhYmxlOiB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVBhcGVyKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVOYXZpZ2F0b3IoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlck1hcCgpIHtcclxuICAgIGxldCB7IHZpc2FibGUgfSA9IHRoaXMuc3RhdGVcclxuICAgIGlmICh2aXNhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvclwiIGlkPVwibmF2aWdhdG9yXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpZ2F0b3IgPSBub2RlIH19IC8+XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JcIiBpZD1cIm5hdmlnYXRvclwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMubmF2aWdhdG9yID0gbm9kZSB9fSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxpbmtfMSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLT5saW5rLTEnKTtcclxuICB9XHJcblxyXG4gIGxpbmtfMigpIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLT5saW5rLTInKTtcclxuICB9XHJcblxyXG4gIGxpbmtfMygpIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLT5saW5rLTMnKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCBfc3R5bGUgPSB7fVxyXG4gICAgbGV0IHRvb2x0aXAxID0gJycsIHRvb2x0aXAyID0gJycsIHRvb2x0aXAzID0gJycsIHRvb2x0aXA0ID0gJydcclxuICAgIGxldCB0b29sdGlwX3N0eWxlID0ge31cclxuICAgIGxldCBtb3JlX3N0eWxlID0ge31cclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09PSBmYWxzZSkge1xyXG4gICAgICBfc3R5bGUgPSB7XHJcbiAgICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLC4yNSknLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmNWY1ZjUnLFxyXG4gICAgICAgIGJvcmRlckNvbG9yOiAnI2Q5ZDlkOScsXHJcbiAgICAgICAgY3Vyc29yOiAnbm90LWFsbG93ZWQnXHJcbiAgICAgIH1cclxuICAgICAgdG9vbHRpcDEgPSB0b29sdGlwMiA9IHRvb2x0aXAzID0gdG9vbHRpcDQgPSAn6K+36YCJ5Lit5YWD5Lu2J1xyXG4gICAgICB0b29sdGlwX3N0eWxlID0geyBjdXJzb3I6ICdub3QtYWxsb3dlZCcgfVxyXG4gICAgICBtb3JlX3N0eWxlID0geyBkaXNwbGF5OiAnbm9uZScgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9vbHRpcDEgPSAn5Yqf6IO9MSdcclxuICAgICAgdG9vbHRpcDIgPSAn5Yqf6IO9MidcclxuICAgICAgdG9vbHRpcDMgPSAn5Yqf6IO9MydcclxuICAgICAgdG9vbHRpcDQgPSAn5Yqf6IO9NCdcclxuICAgICAgdG9vbHRpcF9zdHlsZSA9IHsgY3Vyc29yOiAncG9pbnRlcicgfVxyXG4gICAgfVxyXG4gICAgbGV0IG9uTWFwID0gdGhpcy5zdGF0ZS52aXNhYmxlID09PSB0cnVlID8gJ+WFs+mXree8qeeVpeWbvicgOiAn5omT5byA57yp55Wl5Zu+J1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJUb3BvbG9neVwiIHN0eWxlPXt7IHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH19ICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BvbG9neS1hcHBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwLWJvZHlcIj5cclxuICAgICAgICAgICAgey8qIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3RiID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtdGJcIiBjbGFzc05hbWU9XCJidG5cIj7ihpM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfYnQgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC1idFwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2NoYW5nZUxheW91dF9sciA9IG5vZGUgfX0gaWQ9XCJidG4tY2hhbmdlTGF5b3V0LWxyXCIgY2xhc3NOYW1lPVwiYnRuXCI+4oaSPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3JsID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtcmxcIiBjbGFzc05hbWU9XCJidG5cIj7ihpA8L2Rpdj4gKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuLWJ0bi1hcmVhXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4taXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdW5jdGlvbl8xID0gbm9kZSB9fSBzdHlsZT17X3N0eWxlfSBpZD1cImJ0bi1mdW5jdGlvbi0xXCIgY2xhc3NOYW1lPVwiZnVuLWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS10b29sdGlwPXt0b29sdGlwMX0gZGF0YS10b29sdGlwLXBvc2l0aW9uPVwidG9wXCIgc3R5bGU9e3Rvb2x0aXBfc3R5bGV9PuWKn+iDvTE8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4taXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdW5jdGlvbl8yID0gbm9kZSB9fSBzdHlsZT17X3N0eWxlfSBpZD1cImJ0bi1mdW5jdGlvbi0xXCIgY2xhc3NOYW1lPVwiZnVuLWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS10b29sdGlwPXt0b29sdGlwMn0gZGF0YS10b29sdGlwLXBvc2l0aW9uPVwidG9wXCIgc3R5bGU9e3Rvb2x0aXBfc3R5bGV9PuWKn+iDvTI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4taXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdW5jdGlvbl8zID0gbm9kZSB9fSBzdHlsZT17X3N0eWxlfSBpZD1cImJ0bi1mdW5jdGlvbi0xXCIgY2xhc3NOYW1lPVwiZnVuLWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS10b29sdGlwPXt0b29sdGlwM30gZGF0YS10b29sdGlwLXBvc2l0aW9uPVwidG9wXCIgc3R5bGU9e3Rvb2x0aXBfc3R5bGV9PuWKn+iDvTM8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4taXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9mdW5jdGlvbl80ID0gbm9kZSB9fSBzdHlsZT17X3N0eWxlfSBpZD1cImJ0bi1mdW5jdGlvbi0xXCIgY2xhc3NOYW1lPVwiZnVuLWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS10b29sdGlwPXt0b29sdGlwNH0gZGF0YS10b29sdGlwLXBvc2l0aW9uPVwidG9wXCIgc3R5bGU9e3Rvb2x0aXBfc3R5bGV9PuWKn+iDvTQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4taXRlbS1tb3JlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX21vcmUgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIOabtOWkmlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duLWNvbnRlbnRcIiBzdHlsZT17bW9yZV9zdHlsZX0+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYWNhc2NyaXB0OjtcIiBvbkNsaWNrPXt0aGlzLmxpbmtfMS5iaW5kKHRoaXMpfT7kuIvmi4noj5zljZXpobkgMTwvYT5cclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphY2FzY3JpcHQ6O1wiIG9uQ2xpY2s9e3RoaXMubGlua18yLmJpbmQodGhpcyl9PuS4i+aLieiPnOWNlemhuSAyPC9hPlxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamFjYXNjcmlwdDo7XCIgb25DbGljaz17dGhpcy5saW5rXzMuYmluZCh0aGlzKX0+5LiL5ouJ6I+c5Y2V6aG5IDM8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fbWFwID0gbm9kZSB9fSBpZD1cImJ0bi1tYXBcIiBjbGFzc05hbWU9XCJidG5cIj57b25NYXB9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbWluID0gbm9kZSB9fSBpZD1cImJ0bi16b29taW5cIiBjbGFzc05hbWU9XCJidG5cIj4rPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbW91dCA9IG5vZGUgfX0gaWQ9XCJidG4tem9vbW91dFwiIGNsYXNzTmFtZT1cImJ0blwiPi08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXBlci1jb250YWluZXJcIiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLnBhcGVyQ29udGFpbmVyID0gbm9kZSB9fSA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXAoKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAnLi9zdHlsZS9pbmRleCdcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IFRvcG9sb2d5TW9kZWwgZnJvbSAnLi9tb2R1bGUvdmlldy9tYWluJztcclxuXHJcbmNvbnN0IGluaXQgPSAobW91bnROb2RlSWQgPSAncm9vdCcsIG9wdDogYW55KSA9PiB7XHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFRvcG9sb2d5TW9kZWxcclxuICAgICAgcmFua0Rpcj17b3B0LnJhbmtEaXJ9XHJcbiAgICAgIGFuaW1hdGU9e29wdC5hbmltYXRlfVxyXG4gICAgICBjaWQ9e29wdC5jaWR9XHJcbiAgICAgIGRhdGE9e29wdC5kYXRhfVxyXG4gICAgICBpbWFnZXM9e29wdC5pbWFnZXN9XHJcbiAgICAgIG9uRGJsY2xpY2s9e29wdC5vbkRibGNsaWNrfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neU1vZGVsXHJcbn0iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJSZWFjdC5jcmVhdGVFbGVtZW50IiwiUmVhY3QuQ29tcG9uZW50IiwiUmVhY3RET00ucmVuZGVyIiwiVG9wb2xvZ3lNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxD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
