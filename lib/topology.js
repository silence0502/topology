(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('lodash')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'lodash'], factory) :
	(factory((global.topology = {}),global.React,global.ReactDOM,global._));
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
                'ref-x': .55,
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
                refX2: -10,
                refY: '100%',
                refY2: -10,
                width: 10,
                height: 10,
            },
            '.body': {
                'ref-width': '100%',
                'ref-height': '100%',
                'rx': '10px',
                'ry': '10px',
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
        },
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
            case 4:
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
            case 0:
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
            // option.markup = `<g class="rotatable" ${dataTooltip}><image ${dataIcon} x="0" y="0" height="70px" width="70px"/> </g>`
            option.markup = "<g class=\"rotatable\" " + dataTooltip + "><rect class=\"body\"/><image " + dataIcon + " x=\"1\" y=\"1\" height=\"28px\" width=\"28px\"/><rect class=\"card\"/><text class=\"label\"/><text class=\"type\"/></g>";
        }
        if (opt.label) {
            if (opt.label)
                if (opt.label.length > 8) {
                    option.attrs['.label'].text = opt.label.substring(0, 6) + '...';
                }
                else {
                    option.attrs['.label'].text = opt.label;
                }
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
            rankDir: 'TB',
            disabled: false
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
                if (cell.attributes.state == 100) {
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
        this.btn_changeLayout_tb.onclick = this.changeLayout_tb.bind(this);
        this.btn_changeLayout_bt.onclick = this.changeLayout_bt.bind(this);
        this.btn_changeLayout_lr.onclick = this.changeLayout_lr.bind(this);
        this.btn_changeLayout_rl.onclick = this.changeLayout_rl.bind(this);
        this.btn_function_1.onclick = this.function_1.bind(this);
        this.btn_function_2.onclick = this.function_2.bind(this);
        this.btn_function_3.onclick = this.function_3.bind(this);
        this.btn_function_4.onclick = this.function_4.bind(this);
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
        // let graphBBox = joint.layout.DirectedGraph.layout(this.graph, {
        //   nodeSep: 50,
        //   edgeSep: 80,
        //   marginX: 100,
        //   marginY: 100,
        //   rankSep: 100,
        //   rankDir: this.state.rankDir,
        // });
        var graphLayout = new joint.layout.TreeLayout({
            graph: this.graph,
            parentGap: 20,
            siblingGap: 20
        });
        graphLayout.layout();
    };
    Main.prototype.changeLayout_tb = function () {
        var _this = this;
        this.setState({
            rankDir: 'TB'
        }, function () {
            _this.renderLayout();
        });
    };
    Main.prototype.changeLayout_bt = function () {
        var _this = this;
        this.setState({
            rankDir: 'BT'
        }, function () {
            _this.renderLayout();
        });
    };
    Main.prototype.changeLayout_lr = function () {
        var _this = this;
        this.setState({
            rankDir: 'LR'
        }, function () {
            _this.renderLayout();
        });
    };
    Main.prototype.changeLayout_rl = function () {
        var _this = this;
        this.setState({
            rankDir: 'RL'
        }, function () {
            _this.renderLayout();
        });
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
    Main.prototype.componentDidMount = function () {
        this.initializePaper();
        this.initializeNavigator();
    };
    Main.prototype.render = function () {
        var _this = this;
        var _style = {};
        var tooltip1 = '', tooltip2 = '', tooltip3 = '', tooltip4 = '';
        var tooltip_style = {};
        if (this.state.disabled === false) {
            _style = {
                color: 'rgba(0,0,0,.25)',
                backgroundColor: '#f5f5f5',
                borderColor: '#d9d9d9',
                cursor: 'not-allowed'
            };
            tooltip1 = tooltip2 = tooltip3 = tooltip4 = '请选中元件';
            tooltip_style = { cursor: 'not-allowed' };
        }
        else {
            tooltip1 = '功能1';
            tooltip2 = '功能2';
            tooltip3 = '功能3';
            tooltip4 = '功能4';
            tooltip_style = { cursor: 'pointer' };
        }
        return (React.createElement("div", { className: "Topology", style: { width: this.props.width, height: this.props.height } },
            React.createElement("div", { className: "topology-app" },
                React.createElement("div", { className: "app-body" },
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_tb = node; }, id: "btn-changeLayout-tb", className: "btn" }, "\u2193"),
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_bt = node; }, id: "btn-changeLayout-bt", className: "btn" }, "\u2191"),
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_lr = node; }, id: "btn-changeLayout-lr", className: "btn" }, "\u2192"),
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_rl = node; }, id: "btn-changeLayout-rl", className: "btn" }, "\u2190"),
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
                                React.createElement("label", { "data-tooltip": tooltip4, "data-tooltip-position": "top", style: tooltip_style }, "\u529F\u80FD4")))),
                    React.createElement("div", { ref: function (node) { _this.btn_zoomin = node; }, id: "btn-zoomin", className: "btn" }, "+"),
                    React.createElement("div", { ref: function (node) { _this.btn_zoomout = node; }, id: "btn-zoomout", className: "btn" }, "-"),
                    React.createElement("div", { className: "paper-container", ref: function (node) { _this.paperContainer = node; } }),
                    React.createElement("div", { className: "navigator", id: "navigator", ref: function (node) { _this.navigator = node; } })))));
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

//# sourceMappingURL=topology.js.map

exports.init = init;
exports.Topology = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3kuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPicsXHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdWSU0nLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDE4MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy4nOiB7XHJcbiAgICAgICAgICAgICAgICBtYWduZXQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC41NSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC4yNSxcclxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAxNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcudHlwZSc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5hbGFybSc6IHtcclxuICAgICAgICAgICAgICAgIHJlZlg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHJlZlgyOiAtMTAsXHJcbiAgICAgICAgICAgICAgICByZWZZOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICByZWZZMjogLTEwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5ib2R5Jzoge1xyXG4gICAgICAgICAgICAgICAgJ3JlZi13aWR0aCc6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICdyZWYtaGVpZ2h0JzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3J4JzogJzEwcHgnLFxyXG4gICAgICAgICAgICAgICAgJ3J5JzogJzEwcHgnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgTGluayA9IGpvaW50LmRpYS5MaW5rLmV4dGVuZCh7XHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdMaW5rJyxcclxuICAgICAgICAvLyByb3V0ZXI6IHsgbmFtZTogJ21hbmhhdHRhbicgfSxcclxuICAgICAgICAvLyBjb25uZWN0b3I6IHsgbmFtZTogJ3JvdW5kZWQnIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5jb25uZWN0aW9uJzogeyBzdHJva2U6ICcjQzZDOUNBJywgJ3N0cm9rZS13aWR0aCc6IDMgfSxcclxuICAgICAgICAgICAgJy5saW5rLXRvb2xzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJy5tYXJrZXItYXJyb3doZWFkcyc6IHsgZGlzcGxheTogJ25vbmUnIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB6OiAtMVxyXG4gICAgfSwgam9pbnQuZGlhLkxpbmsucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qXHJcbioq6L+e5o6l57q/5LiO566t5aS05qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWxpbmtPcHRpb24ge1xyXG4gICAgc3RhdGU/OiBudW1iZXJcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICAgdGFyZ2V0Pzogc3RyaW5nXHJcbiAgICB0eXBlPzogbnVtYmVyXHJcbn1cclxubGV0IGxpbmtPcHRpb24gPSAob3B0OiBJbGlua09wdGlvbikgPT4ge1xyXG4gICAgbGV0IG9wdGlvbjogYW55ID0ge1xyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuY29ubmVjdGlvbic6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiAnJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci10YXJnZXQnOiB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6ICcjQzZDOUNBJywvL+eureWktOi+ueahhlxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNDNkM5Q0EnLC8v566t5aS06aKc6ImyXHJcbiAgICAgICAgICAgICAgICBkOiAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeicvL+eureWktOagt+W8j1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gcm91dGVyOiB7IG5hbWU6ICdvcnRob2dvbmFsJyB9LFxyXG4gICAgfVxyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICAgIG9wdGlvbi5zdGF0ZSA9IG9wdC5zdGF0ZVxyXG4gICAgICAgIG9wdGlvbi5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgIGlkOiBvcHQuc291cmNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgIGlkOiBvcHQudGFyZ2V0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAob3B0LnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRkY5OTAxJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNGRjk5MDEnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjRkY5OTAxJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNERkIyMDInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0RGQjIwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNERkIyMDInO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnIzAwQkZGRidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnIzAwQkZGRic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnIzMxZDBjNidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjMzFkMGM2JztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnIzMxZDBjNidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIHonOyAgLy/kuInop5Lnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDIwIDUgeic7IC8v5a6e5b+D6I+x5b2iXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAyMCA1IHonOyAvL+epuuW/g+iPseW9olxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAwIDUgeic7IC8v5bCW566t5aS0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnJzsgLy/msqHmnInnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbi8qXHJcbioq5Y6f5Lu25qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXZpbU9wdGlvbiB7XHJcbiAgICBpZD86IHN0cmluZ1xyXG4gICAgZGVzYz86IHN0cmluZ1xyXG4gICAgbGFiZWw/OiBzdHJpbmdcclxuICAgIHN0YXRlPzogbnVtYmVyXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBiaXpGaWVsZHM/OiBhbnlcclxuICAgIGlzSGlnaGxpZ2h0PzogYm9vbGVhblxyXG4gICAgc3dpdGNoPzogYW55XHJcbiAgICB2bT86IGFueVxyXG4gICAgdm5mPzogYW55XHJcbiAgICB2bmZjPzogYW55XHJcbiAgICBzZXJ2ZXI/OiBhbnlcclxufVxyXG5sZXQgdmltT3B0aW9uID0gKG9wdDogSXZpbU9wdGlvbikgPT4ge1xyXG4gICAgbGV0IG9wdGlvbjogYW55ID0geyBzaXplOiB7fSwgYXR0cnM6IHsgJy5sYWJlbCc6IHt9LCAnLnR5cGUnOiB7fSwgJy5hbGFybSc6IHt9LCAnLmJvZHknOiB7fSB9IH1cclxuICAgIGxldCBkYXRhVG9vbHRpcCA9ICcnXHJcbiAgICBsZXQgZGF0YUljb24gPSAnJ1xyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICAgIGlmIChvcHQuaWQpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmlkID0gb3B0LmlkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQuYml6RmllbGRzKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5iaXpGaWVsZHMgPSBvcHQuYml6RmllbGRzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQubGFiZWwpIHtcclxuICAgICAgICAgICAgZGF0YVRvb2x0aXAgPSBgZGF0YS10b29sdGlwPVwiJHtvcHQubGFiZWx9XCJgXHJcbiAgICAgICAgICAgIHN3aXRjaCAob3B0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3aXRjaCc6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC5zd2l0Y2h9YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndm0nOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQudm19YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndm5mJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnZuZn1gXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2bmZjJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnZuZmN9YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VydmVyJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnNlcnZlcn1gXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQuc3dpdGNofWBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+PGltYWdlICR7ZGF0YUljb259IHg9XCIwXCIgeT1cIjBcIiBoZWlnaHQ9XCI3MHB4XCIgd2lkdGg9XCI3MHB4XCIvPiA8L2c+YFxyXG4gICAgICAgICAgICBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+PHJlY3QgY2xhc3M9XCJib2R5XCIvPjxpbWFnZSAke2RhdGFJY29ufSB4PVwiMVwiIHk9XCIxXCIgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiLz48cmVjdCBjbGFzcz1cImNhcmRcIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPmBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5sYWJlbCkge1xyXG4gICAgICAgICAgICBpZiAob3B0LmxhYmVsKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC5sYWJlbC5sZW5ndGggPiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubGFiZWwnXS50ZXh0ID0gb3B0LmxhYmVsLnN1YnN0cmluZygwLCA2KSArICcuLi4nXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxhYmVsJ10udGV4dCA9IG9wdC5sYWJlbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBWSU0sXHJcbiAgICB2aW1PcHRpb24sXHJcbiAgICBMaW5rLFxyXG4gICAgbGlua09wdGlvblxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWSU0sIExpbmssIHZpbU9wdGlvbiwgbGlua09wdGlvbiB9IGZyb20gJy4vdmltJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSBsZXQgVjogYW55XHJcbmRlY2xhcmUgY29uc3Qgam9pbnQ6IGFueVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xyXG4gIGFuaW1hdGU/OiBib29sZWFuXHJcbiAgd2lkdGg/OiBhbnlcclxuICBoZWlnaHQ/OiBhbnlcclxuICBkcmF3R3JpZD86IGJvb2xlYW5cclxuICByYW5rRGlyPzogJ1RCJyB8ICdCVCcgfCAnTFInIHwgJ1JMJztcclxuICBvbkRibGNsaWNrPzogRnVuY3Rpb25cclxuICBkYXRhOiBhbnlcclxuICBpbWFnZXM6IGFueVxyXG4gIGNlbnRlcj86IGJvb2xlYW5cclxuICB6b29tVG9GaXQ/OiBib29sZWFuXHJcbiAgcGFwZXJfd2lkdGg/OiBudW1iZXJcclxuICBwYXBlcl9oZWlnaHQ/OiBudW1iZXJcclxuICBjaWQ/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxNYWluUHJvcHMsIGFueT4ge1xyXG5cclxuICAvLyBDb25hdGluZXJcclxuICBwYXBlckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X3RiOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9jaGFuZ2VMYXlvdXRfYnQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2NoYW5nZUxheW91dF9scjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X3JsOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl8xOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl8yOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl8zOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9mdW5jdGlvbl80OiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl96b29taW46IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX3pvb21vdXQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgbmF2aWdhdG9yOiBIVE1MRGl2RWxlbWVudFxyXG5cclxuICAvLyByYXBwaWQgdGhpbmdzXHJcbiAgZ3JhcGg6IGpvaW50LmRpYS5HcmFwaDtcclxuICBjb21tYW5kTWFuYWdlcjogam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyO1xyXG4gIHBhcGVyOiBqb2ludC5kaWEuUGFwZXI7XHJcbiAgc25hcGxpbmVzOiBqb2ludC51aS5TbmFwbGluZXM7XHJcbiAgcGFwZXJTY3JvbGxlcjogam9pbnQudWkuUGFwZXJTY3JvbGxlcjtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBNYWluUHJvcHMgPSB7XHJcbiAgICBhbmltYXRlOiB0cnVlLFxyXG4gICAgd2lkdGg6IDgwMCxcclxuICAgIGhlaWdodDogNjAwLFxyXG4gICAgcGFwZXJfd2lkdGg6IDEwMDAsXHJcbiAgICBwYXBlcl9oZWlnaHQ6IDEwMDAsXHJcbiAgICBkcmF3R3JpZDogZmFsc2UsXHJcbiAgICByYW5rRGlyOiAnVEInLFxyXG4gICAgZGF0YToge30sXHJcbiAgICBpbWFnZXM6IHt9LFxyXG4gICAgY2VudGVyOiBmYWxzZSxcclxuICAgIHpvb21Ub0ZpdDogZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruS8oOmAkuWKqOeUu1xyXG4gICAqL1xyXG4gIGRvQW5pbWF0ZSgpIHtcclxuICAgIGxldCBncmFwaCA9IHRoaXMuZ3JhcGhcclxuICAgIGxldCBwYXBlciA9IHRoaXMucGFwZXJcclxuICAgIGdyYXBoLm9uKCdzaWduYWwnLCBmdW5jdGlvbiAoY2VsbDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBqb2ludC5kaWEuTGluaykge1xyXG4gICAgICAgIGlmIChjZWxsLmF0dHJpYnV0ZXMuc3RhdGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwoY2VsbC5nZXQoJ3RhcmdldCcpLmlkKTtcclxuICAgICAgICAgIGxldCBzOiBhbnkgPSBwYXBlci5maW5kVmlld0J5TW9kZWwoY2VsbClcclxuICAgICAgICAgIHMuc2VuZFRva2VuKFYoJ2NpcmNsZScsIHsgcjogNywgZmlsbDogJ2dyZWVuJyB9KS5ub2RlLCAxMDAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldENlbGwudHJpZ2dlcignc2lnbmFsJywgdGFyZ2V0Q2VsbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IG91dGJvdW5kTGlua3MgPSBncmFwaC5nZXRDb25uZWN0ZWRMaW5rcyhjZWxsLCB7IG91dGJvdW5kOiB0cnVlIH0pO1xyXG4gICAgICAgIF8uZWFjaChvdXRib3VuZExpbmtzLCBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgbGluay50cmlnZ2VyKCdzaWduYWwnLCBsaW5rKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZXM6IGFueSA9IFtdXHJcbiAgICBsZXQgdGFyZ2V0czogYW55ID0gW11cclxuICAgIF8ubWFwKGdyYXBoLmdldExpbmtzKCksIChsaW5rKSA9PiB7XHJcbiAgICAgIHNvdXJjZXMucHVzaChsaW5rLmdldCgnc291cmNlJykuaWQpXHJcbiAgICAgIHRhcmdldHMucHVzaChsaW5rLmdldCgndGFyZ2V0JykuaWQpXHJcbiAgICB9KVxyXG4gICAgbGV0IHRyaWdnZXJzID0gXy5zb3J0ZWRVbmlxKF8uZGlmZmVyZW5jZShzb3VyY2VzLCB0YXJnZXRzKSlcclxuICAgIGZ1bmN0aW9uIHNpbXVsYXRlKCkge1xyXG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIF8ubWFwKHRyaWdnZXJzLCAodHJpZ2dlcjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwodHJpZ2dlcik7XHJcbiAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG4gICAgc2ltdWxhdGUoKVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruino+aekFxyXG4gICAqIEBwYXJhbSBkYXRhIOaLk+aJkeaVsOaNrlxyXG4gICAqL1xyXG4gIHBhcnNlRGF0YShkYXRhOiBhbnksIGltYWdlczogYW55KSB7XHJcbiAgICBpZiAoZGF0YS5ub2Rlcykge1xyXG4gICAgICBfLm1hcChkYXRhLm5vZGVzLCAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgIGlzSGlnaGxpZ2h0OiAobm9kZS5pZCA9PT0gdGhpcy5wcm9wcy5jaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ldyBWSU0odmltT3B0aW9uKF8ubWVyZ2Uobm9kZSwgb3B0LCBpbWFnZXMpKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgfSlcclxuICAgICAgaWYgKGRhdGEubGlua3MpIHtcclxuICAgICAgICBfLm1hcChkYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGggPSBuZXcgam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG5ldyBqb2ludC5kaWEuQ29tbWFuZE1hbmFnZXIoeyBncmFwaDogZ3JhcGggfSk7XHJcblxyXG4gICAgY29uc3QgcGFwZXIgPSB0aGlzLnBhcGVyID0gbmV3IGpvaW50LmRpYS5QYXBlcih7XHJcbiAgICAgIC8vIGVsOiB0aGlzLnBhcGVyQ29udGFpbmVyLFxyXG4gICAgICB3aWR0aDogdGhpcy5wcm9wcy5wYXBlcl93aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnBhcGVyX2hlaWdodCxcclxuICAgICAgZ3JpZFNpemU6IDEwLFxyXG4gICAgICBkcmF3R3JpZDogdGhpcy5wcm9wcy5kcmF3R3JpZCxcclxuICAgICAgbW9kZWw6IGdyYXBoLFxyXG4gICAgICBwZXJwZW5kaWN1bGFyTGlua3M6IHRydWUsXHJcbiAgICAgIHJlc3RyaWN0VHJhbnNsYXRlOiB0cnVlLFxyXG4gICAgICAvLyBkZWZhdWx0TGluazogbmV3IGpvaW50LnNoYXBlcy5hcHAuTGluaygpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBhcnNlRGF0YSh0aGlzLnByb3BzLmRhdGEsIHRoaXMucHJvcHMuaW1hZ2VzKVxyXG5cclxuXHJcblxyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLmFuaW1hdGUpIHtcclxuICAgICAgdGhpcy5kb0FuaW1hdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gdGhpcy5zbmFwbGluZXMgPSBuZXcgam9pbnQudWkuU25hcGxpbmVzKHsgcGFwZXI6IHBhcGVyIH0pO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyU2Nyb2xsZXIgPSB0aGlzLnBhcGVyU2Nyb2xsZXIgPSBuZXcgam9pbnQudWkuUGFwZXJTY3JvbGxlcih7XHJcbiAgICAgIHBhcGVyLFxyXG4gICAgICBhdXRvUmVzaXplUGFwZXI6IHRydWUsXHJcbiAgICAgIGN1cnNvcjogJ2dyYWInXHJcbiAgICB9KTtcclxuXHJcbiAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmRvd24nLCBwYXBlclNjcm9sbGVyLnN0YXJ0UGFubmluZyk7XHJcbiAgICAkKHRoaXMucGFwZXJDb250YWluZXIpLmFwcGVuZChwYXBlclNjcm9sbGVyLmVsKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcblxyXG4gICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgIGlmICh0aGlzLnByb3BzLmNlbnRlcikgeyBwYXBlclNjcm9sbGVyLmNlbnRlcigpIH1cclxuICAgIGlmICh0aGlzLnByb3BzLnpvb21Ub0ZpdCkgeyBwYXBlclNjcm9sbGVyLnpvb21Ub0ZpdCgpIH1cclxuXHJcbiAgICBuZXcgam9pbnQudWkuVG9vbHRpcCh7XHJcbiAgICAgIHRhcmdldDogJ1tkYXRhLXRvb2x0aXBdJyxcclxuICAgICAgY29udGVudDogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IHRpcHMgPSBfLnNwbGl0KHRhcmdldC5hdHRyaWJ1dGVzWydkYXRhLXRvb2x0aXAnXS5ub2RlVmFsdWUsICd8JylcclxuICAgICAgICByZXR1cm4gXy5tYXAoXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpLCAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAwICYmIHRpcHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGlwc1swXSAhPSB0aXBzWzFdKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke2l0ZW19PC9iPjxociAvPmBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICog5Y+M5Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHBhcGVyLm9uKCdjZWxsOnBvaW50ZXJkYmxjbGljaycsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsY2xpY2spIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uRGJsY2xpY2soY2VsbFZpZXcpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiDlj7Plh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgcGFwZXIub24oJ2NlbGw6Y29udGV4dG1lbnUnLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmNsaWNrJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHBhcGVyLm9uKCdibGFuazpjb250ZXh0bWVudScsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIOaMiemSrlxyXG4gICAgICovXHJcbiAgICB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfdGIub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X3RiLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2NoYW5nZUxheW91dF9idC5vbmNsaWNrID0gdGhpcy5jaGFuZ2VMYXlvdXRfYnQuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fY2hhbmdlTGF5b3V0X2xyLm9uY2xpY2sgPSB0aGlzLmNoYW5nZUxheW91dF9sci5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfcmwub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X3JsLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzEub25jbGljayA9IHRoaXMuZnVuY3Rpb25fMS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9mdW5jdGlvbl8yLm9uY2xpY2sgPSB0aGlzLmZ1bmN0aW9uXzIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fZnVuY3Rpb25fMy5vbmNsaWNrID0gdGhpcy5mdW5jdGlvbl8zLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzQub25jbGljayA9IHRoaXMuZnVuY3Rpb25fNC5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl96b29taW4ub25jbGljayA9IHRoaXMuem9vbUluLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX3pvb21vdXQub25jbGljayA9IHRoaXMuem9vbU91dC5iaW5kKHRoaXMpXHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIOe8qeeVpeWbvlxyXG4gICAqL1xyXG4gIGluaXRpYWxpemVOYXZpZ2F0b3IoKSB7XHJcbiAgICB2YXIgbmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3IgPSBuZXcgam9pbnQudWkuTmF2aWdhdG9yKHtcclxuICAgICAgd2lkdGg6IDI0MCxcclxuICAgICAgaGVpZ2h0OiAxMTUsXHJcbiAgICAgIHBhcGVyU2Nyb2xsZXI6IHRoaXMucGFwZXJTY3JvbGxlcixcclxuICAgICAgem9vbTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgICQoJy5uYXZpZ2F0b3InKS5hcHBlbmQobmF2aWdhdG9yLmVsKTtcclxuICAgIG5hdmlnYXRvci5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog5oyJ6ZKu5Yqf6IO9XHJcbiAgICovXHJcbiAgZnVuY3Rpb25fMSgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzEnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb25fMigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzInKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb25fMygpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzMnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb25fNCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog5biD5bGA5YiH5o2iXHJcbiAgICovXHJcbiAgcmVuZGVyTGF5b3V0KCkge1xyXG4gICAgLy8gbGV0IGdyYXBoQkJveCA9IGpvaW50LmxheW91dC5EaXJlY3RlZEdyYXBoLmxheW91dCh0aGlzLmdyYXBoLCB7XHJcbiAgICAvLyAgIG5vZGVTZXA6IDUwLFxyXG4gICAgLy8gICBlZGdlU2VwOiA4MCxcclxuICAgIC8vICAgbWFyZ2luWDogMTAwLFxyXG4gICAgLy8gICBtYXJnaW5ZOiAxMDAsXHJcbiAgICAvLyAgIHJhbmtTZXA6IDEwMCxcclxuICAgIC8vICAgcmFua0RpcjogdGhpcy5zdGF0ZS5yYW5rRGlyLFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgdmFyIGdyYXBoTGF5b3V0ID0gbmV3IGpvaW50LmxheW91dC5UcmVlTGF5b3V0KHtcclxuICAgICAgZ3JhcGg6IHRoaXMuZ3JhcGgsXHJcbiAgICAgIHBhcmVudEdhcDogMjAsXHJcbiAgICAgIHNpYmxpbmdHYXA6IDIwXHJcbiAgICB9KTtcclxuXHJcbiAgICBncmFwaExheW91dC5sYXlvdXQoKTtcclxuICB9XHJcblxyXG5cclxuICBjaGFuZ2VMYXlvdXRfdGIoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ1RCJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfYnQoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ0JUJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfbHIoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ0xSJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfcmwoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ1JMJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiDmlL7lpKfnvKnlsI9cclxuICAgKi9cclxuICB6b29tSW4oKSB7XHJcbiAgICB0aGlzLnBhcGVyU2Nyb2xsZXIuem9vbSgwLjIsIHsgbWF4OiAyIH0pO1xyXG4gIH1cclxuICB6b29tT3V0KCkge1xyXG4gICAgdGhpcy5wYXBlclNjcm9sbGVyLnpvb20oLTAuMiwgeyBtaW46IDAuMiB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBNYWluUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHJhbmtEaXI6ICdUQicsXHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVQYXBlcigpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplTmF2aWdhdG9yKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgX3N0eWxlID0ge31cclxuICAgIGxldCB0b29sdGlwMSA9ICcnLCB0b29sdGlwMiA9ICcnLCB0b29sdGlwMyA9ICcnLCB0b29sdGlwNCA9ICcnXHJcbiAgICBsZXQgdG9vbHRpcF9zdHlsZSA9IHt9XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgX3N0eWxlID0ge1xyXG4gICAgICAgIGNvbG9yOiAncmdiYSgwLDAsMCwuMjUpJyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjVmNWY1JyxcclxuICAgICAgICBib3JkZXJDb2xvcjogJyNkOWQ5ZDknLFxyXG4gICAgICAgIGN1cnNvcjogJ25vdC1hbGxvd2VkJ1xyXG4gICAgICB9XHJcbiAgICAgIHRvb2x0aXAxID0gdG9vbHRpcDIgPSB0b29sdGlwMyA9IHRvb2x0aXA0ID0gJ+ivt+mAieS4reWFg+S7tidcclxuICAgICAgdG9vbHRpcF9zdHlsZSA9IHsgY3Vyc29yOiAnbm90LWFsbG93ZWQnIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvb2x0aXAxID0gJ+WKn+iDvTEnXHJcbiAgICAgIHRvb2x0aXAyID0gJ+WKn+iDvTInXHJcbiAgICAgIHRvb2x0aXAzID0gJ+WKn+iDvTMnXHJcbiAgICAgIHRvb2x0aXA0ID0gJ+WKn+iDvTQnXHJcbiAgICAgIHRvb2x0aXBfc3R5bGUgPSB7IGN1cnNvcjogJ3BvaW50ZXInIH1cclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVG9wb2xvZ3lcIiBzdHlsZT17eyB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCB9fSAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3ktYXBwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3RiID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtdGJcIiBjbGFzc05hbWU9XCJidG5cIj7ihpM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfYnQgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC1idFwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2NoYW5nZUxheW91dF9sciA9IG5vZGUgfX0gaWQ9XCJidG4tY2hhbmdlTGF5b3V0LWxyXCIgY2xhc3NOYW1lPVwiYnRuXCI+4oaSPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3JsID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtcmxcIiBjbGFzc05hbWU9XCJidG5cIj7ihpA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4tYnRuLWFyZWFcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzEgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXAxfSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9MTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzIgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXAyfSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9MjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzMgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXAzfSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9MzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzQgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXA0fSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9NDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbWluID0gbm9kZSB9fSBpZD1cImJ0bi16b29taW5cIiBjbGFzc05hbWU9XCJidG5cIj4rPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fem9vbW91dCA9IG5vZGUgfX0gaWQ9XCJidG4tem9vbW91dFwiIGNsYXNzTmFtZT1cImJ0blwiPi08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXBlci1jb250YWluZXJcIiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLnBhcGVyQ29udGFpbmVyID0gbm9kZSB9fSA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvclwiIGlkPVwibmF2aWdhdG9yXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpZ2F0b3IgPSBub2RlIH19ID5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgJy4vc3R5bGUvaW5kZXgnXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCBUb3BvbG9neSBmcm9tICcuL21vZHVsZS92aWV3L21haW4nO1xyXG5cclxuY29uc3QgaW5pdCA9IChtb3VudE5vZGVJZCA9ICdyb290Jywgb3B0OiBhbnkpID0+IHtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8VG9wb2xvZ3lcclxuICAgICAgcmFua0Rpcj17b3B0LnJhbmtEaXJ9XHJcbiAgICAgIGFuaW1hdGU9e29wdC5hbmltYXRlfVxyXG4gICAgICBjaWQ9e29wdC5jaWR9XHJcbiAgICAgIGRhdGE9e29wdC5kYXRhfVxyXG4gICAgICBpbWFnZXM9e29wdC5pbWFnZXN9XHJcbiAgICAgIG9uRGJsY2xpY2s9e29wdC5vbkRibGNsaWNrfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neVxyXG59Il0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiUmVhY3QuY3JlYXRlRWxlbWVudCIsIlJlYWN0LkNvbXBvbmVudCIsIlJlYWN0RE9NLnJlbmRlciIsIlRvcG9sb2d5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDL0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO1NBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM5QixDQUFDOztBQUVGLEFBQU8sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM1QixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NB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
