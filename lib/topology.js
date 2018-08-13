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
                refX2: -15,
                refY: '100%',
                refY2: -10,
                width: 10,
                height: 10,
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
        router: {
            name: 'manhattan',
            // excludeEnds: 'source',
            // excludeTypes: 'myNamespace.MyCommentElement',
            startDirections: ['left', 'right', 'top', 'bottom'],
            endDirections: ['left', 'right', 'top', 'bottom']
        },
        connector: {
            name: 'normal'
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
                option.connector.name = 'smooth';
                break;
            case 2:
                option.attrs['.connection'].stroke = '#FF9901';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#FF9901';
                option.attrs['.marker-target'].stroke = '#FF9901';
                option.connector.name = 'smooth';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                option.connector.name = 'smooth';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                option.connector.name = 'smooth';
                break;
            default:
                option.attrs['.connection'].stroke = '#C6C9CA';
                option.attrs['.marker-target'].fill = '#C6C9CA';
                option.attrs['.marker-target'].stroke = '#C6C9CA';
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
    var option = { size: {}, attrs: { '.label': {}, '.type': {}, '.alarm': {}, '.logo': {}, '.body': {} } };
    var dataTooltip = '';
    var dataIcon = "xlink:href=" + opt.logo_y;
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
        }
        if (opt.bizFields) {
            option.bizFields = opt.bizFields;
        }
        if (opt.label) {
            dataTooltip = "data-tooltip=\"" + opt.label + "\"";
            // switch (opt.type) {
            //     case 'switch':
            //         dataIcon = `xlink:href=${opt.switch}`
            //         break;
            //     case 'vm':
            //         dataIcon = `xlink:href=${opt.vm}`
            //         break;
            //     case 'vnf':
            //         dataIcon = `xlink:href=${opt.vnf}`
            //         break;
            //     case 'vnfc':
            //         dataIcon = `xlink:href=${opt.vnfc}`
            //         break;
            //     case 'server':
            //         dataIcon = `xlink:href=${opt.server}`
            //         break;
            //     default:
            //         dataIcon = `xlink:href=${opt.switch}`
            //         break;
            // }
            // option.markup = `<g class="rotatable" ${dataTooltip}><image ${dataIcon} x="0" y="0" height="70px" width="70px"/> </g>`
            // option.markup = `<g class="rotatable" ${dataTooltip}><rect class="body"/><image ${dataIcon} x="1" y="1" height="28px" width="28px"/><rect class="card"/><rect class="alarm"/><text class="label"/><text class="type"/></g>`
            option.markup = "<g class=\"rotatable\" " + dataTooltip + "><rect class=\"body\"/><rect class=\"logo\" /><image " + dataIcon + " x=\"1\" y=\"1\" height=\"28px\" width=\"28px\"/><rect class=\"card\"/><rect class=\"alarm\"/><text class=\"label\"/><text class=\"type\"/></g>";
            // option.markup = `<g class="rotatable" ${dataTooltip}><rect class="body"/><image xlink:href='src/img/logo_y.png' x="1" y="1" height="28px" width="28px"/><rect class="card"/><rect class="alarm"/><text class="label"/><text class="type"/></g>`
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
        switch (opt.state) {
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
        switch (opt.state) {
            case 0:
                option.attrs['.logo'].fill = '#00B388';
                option.attrs['.body'].stroke = '#00B388';
                break;
            case 1:
                option.attrs['.logo'].fill = '#84756b';
                option.attrs['.body'].stroke = '#84756b';
                break;
            case 2:
                option.attrs['.logo'].fill = '#84756b';
                option.attrs['.body'].stroke = '#84756b';
                break;
            case 3:
                option.attrs['.logo'].fill = '#84756b';
                option.attrs['.body'].stroke = '#84756b';
                break;
            case 4:
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
            rankDir: 'LR',
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
            rankSep: 100,
            rankDir: this.state.rankDir,
        });
        // var graphLayout = new joint.layout.TreeLayout({
        //   graph: this.graph,
        //   parentGap: 20,
        //   siblingGap: 20
        // });
        // graphLayout.layout();
    };
    /*
      * 修改布局按钮
      */
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
    Main.prototype.componentWillMount = function () {
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
        rankDir: 'LR',
        data: {},
        images: {},
        center: false,
        zoomToFit: false
    };
    return Main;
}(React.Component));

//# sourceMappingURL=main.js.map

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, images: opt.images, onDblclick: opt.onDblclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology.js.map

exports.init = init;
exports.Topology = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3kuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPicsXHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdWSU0nLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDE4MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy4nOiB7XHJcbiAgICAgICAgICAgICAgICBtYWduZXQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC41NSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC4yNSxcclxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAxNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcudHlwZSc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5hbGFybSc6IHtcclxuICAgICAgICAgICAgICAgIHJlZlg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHJlZlgyOiAtMTUsXHJcbiAgICAgICAgICAgICAgICByZWZZOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICByZWZZMjogLTEwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5sb2dvJzoge1xyXG4gICAgICAgICAgICAgICAgeDogLTEsXHJcbiAgICAgICAgICAgICAgICB5OiAtMSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICc1cHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmJvZHknOiB7XHJcbiAgICAgICAgICAgICAgICAncmVmLXdpZHRoJzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi1oZWlnaHQnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICc1cHgnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgTGluayA9IGpvaW50LmRpYS5MaW5rLmV4dGVuZCh7XHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdMaW5rJyxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7IHN0cm9rZTogJyNDNkM5Q0EnLCAnc3Ryb2tlLXdpZHRoJzogMyB9LFxyXG4gICAgICAgICAgICAnLmxpbmstdG9vbHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci1hcnJvd2hlYWRzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHo6IC0xXHJcbiAgICB9LCBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuZGVmYXVsdHMpLFxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLypcclxuKirov57mjqXnur/kuI7nrq3lpLTmoLflvI9cclxuKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbGlua09wdGlvbiB7XHJcbiAgICBzdGF0ZT86IG51bWJlclxyXG4gICAgc291cmNlPzogc3RyaW5nXHJcbiAgICB0YXJnZXQ/OiBzdHJpbmdcclxuICAgIHR5cGU/OiBudW1iZXJcclxufVxyXG5sZXQgbGlua09wdGlvbiA9IChvcHQ6IElsaW5rT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7XHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5jb25uZWN0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6ICcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLXRhcmdldCc6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLC8v566t5aS06L655qGGXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnI0M2QzlDQScsLy/nrq3lpLTpopzoibJcclxuICAgICAgICAgICAgICAgIGQ6ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6Jy8v566t5aS05qC35byPXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3V0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ21hbmhhdHRhbicsXHJcbiAgICAgICAgICAgIC8vIGV4Y2x1ZGVFbmRzOiAnc291cmNlJyxcclxuICAgICAgICAgICAgLy8gZXhjbHVkZVR5cGVzOiAnbXlOYW1lc3BhY2UuTXlDb21tZW50RWxlbWVudCcsXHJcbiAgICAgICAgICAgIHN0YXJ0RGlyZWN0aW9uczogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSxcclxuICAgICAgICAgICAgZW5kRGlyZWN0aW9uczogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29ubmVjdG9yOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICAgIG9wdGlvbi5zdGF0ZSA9IG9wdC5zdGF0ZVxyXG4gICAgICAgIG9wdGlvbi5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgIGlkOiBvcHQuc291cmNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbi50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgIGlkOiBvcHQudGFyZ2V0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAob3B0LnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29ubmVjdG9yLm5hbWUgPSAnc21vb3RoJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0ZGOTkwMSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNGRjk5MDEnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbm5lY3Rvci5uYW1lID0gJ3Ntb290aCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjREZCMjAyJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNERkIyMDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjREZCMjAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25uZWN0b3IubmFtZSA9ICdzbW9vdGgnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnIzAwQkZGRidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnIzAwQkZGRic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29ubmVjdG9yLm5hbWUgPSAnc21vb3RoJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIHonOyAgLy/kuInop5Lnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDIwIDUgeic7IC8v5a6e5b+D6I+x5b2iXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAyMCA1IHonOyAvL+epuuW/g+iPseW9olxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAwIDUgeic7IC8v5bCW566t5aS0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnJzsgLy/msqHmnInnrq3lpLRcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbi8qXHJcbioq5Y6f5Lu25qC35byPXHJcbiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXZpbU9wdGlvbiB7XHJcbiAgICBpZD86IHN0cmluZ1xyXG4gICAgZGVzYz86IHN0cmluZ1xyXG4gICAgbGFiZWw/OiBzdHJpbmdcclxuICAgIHN0YXRlPzogbnVtYmVyXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBiaXpGaWVsZHM/OiBhbnlcclxuICAgIGlzSGlnaGxpZ2h0PzogYm9vbGVhblxyXG4gICAgc3dpdGNoPzogYW55XHJcbiAgICB2bT86IGFueVxyXG4gICAgdm5mPzogYW55XHJcbiAgICB2bmZjPzogYW55XHJcbiAgICBzZXJ2ZXI/OiBhbnlcclxuICAgIGxvZ29feT86IGFueVxyXG59XHJcbmxldCB2aW1PcHRpb24gPSAob3B0OiBJdmltT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7IHNpemU6IHt9LCBhdHRyczogeyAnLmxhYmVsJzoge30sICcudHlwZSc6IHt9LCAnLmFsYXJtJzoge30sICcubG9nbyc6IHt9LCAnLmJvZHknOiB7fSB9IH1cclxuICAgIGxldCBkYXRhVG9vbHRpcCA9ICcnXHJcbiAgICBsZXQgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC5sb2dvX3l9YFxyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICAgIGlmIChvcHQuaWQpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmlkID0gb3B0LmlkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQuYml6RmllbGRzKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5iaXpGaWVsZHMgPSBvcHQuYml6RmllbGRzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQubGFiZWwpIHtcclxuICAgICAgICAgICAgZGF0YVRvb2x0aXAgPSBgZGF0YS10b29sdGlwPVwiJHtvcHQubGFiZWx9XCJgXHJcbiAgICAgICAgICAgIC8vIHN3aXRjaCAob3B0LnR5cGUpIHtcclxuICAgICAgICAgICAgLy8gICAgIGNhc2UgJ3N3aXRjaCc6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC5zd2l0Y2h9YFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgY2FzZSAndm0nOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQudm19YFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgY2FzZSAndm5mJzpcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnZuZn1gXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICBjYXNlICd2bmZjJzpcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnZuZmN9YFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgY2FzZSAnc2VydmVyJzpcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnNlcnZlcn1gXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQuc3dpdGNofWBcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+PGltYWdlICR7ZGF0YUljb259IHg9XCIwXCIgeT1cIjBcIiBoZWlnaHQ9XCI3MHB4XCIgd2lkdGg9XCI3MHB4XCIvPiA8L2c+YFxyXG4gICAgICAgICAgICAvLyBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+PHJlY3QgY2xhc3M9XCJib2R5XCIvPjxpbWFnZSAke2RhdGFJY29ufSB4PVwiMVwiIHk9XCIxXCIgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiLz48cmVjdCBjbGFzcz1cImNhcmRcIi8+PHJlY3QgY2xhc3M9XCJhbGFybVwiLz48dGV4dCBjbGFzcz1cImxhYmVsXCIvPjx0ZXh0IGNsYXNzPVwidHlwZVwiLz48L2c+YFxyXG4gICAgICAgICAgICBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+PHJlY3QgY2xhc3M9XCJib2R5XCIvPjxyZWN0IGNsYXNzPVwibG9nb1wiIC8+PGltYWdlICR7ZGF0YUljb259IHg9XCIxXCIgeT1cIjFcIiBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIvPjxyZWN0IGNsYXNzPVwiY2FyZFwiLz48cmVjdCBjbGFzcz1cImFsYXJtXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz5gXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbi5tYXJrdXAgPSBgPGcgY2xhc3M9XCJyb3RhdGFibGVcIiAke2RhdGFUb29sdGlwfT48cmVjdCBjbGFzcz1cImJvZHlcIi8+PGltYWdlIHhsaW5rOmhyZWY9J3NyYy9pbWcvbG9nb195LnBuZycgeD1cIjFcIiB5PVwiMVwiIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPmBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5sYWJlbCkge1xyXG4gICAgICAgICAgICBpZiAob3B0LmxhYmVsKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC5sYWJlbC5sZW5ndGggPiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubGFiZWwnXS50ZXh0ID0gb3B0LmxhYmVsLnN1YnN0cmluZygwLCA2KSArICcuLi4nXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxhYmVsJ10udGV4dCA9IG9wdC5sYWJlbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNEMTAwMDInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNGRjk5MDEnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNERkIyMDInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyMwMEJGRkYnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10ud2lkdGggPSAwXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLmZpbGwgPSAnIzg0NzU2YidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzg0NzU2YidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgVklNLFxyXG4gICAgdmltT3B0aW9uLFxyXG4gICAgTGluayxcclxuICAgIGxpbmtPcHRpb25cclxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVklNLCBMaW5rLCB2aW1PcHRpb24sIGxpbmtPcHRpb24gfSBmcm9tICcuL3ZpbSdcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmRlY2xhcmUgbGV0IFY6IGFueVxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFpblByb3BzIHtcclxuICBhbmltYXRlPzogYm9vbGVhblxyXG4gIHdpZHRoPzogYW55XHJcbiAgaGVpZ2h0PzogYW55XHJcbiAgZHJhd0dyaWQ/OiBib29sZWFuXHJcbiAgcmFua0Rpcj86ICdUQicgfCAnQlQnIHwgJ0xSJyB8ICdSTCc7XHJcbiAgb25EYmxjbGljaz86IEZ1bmN0aW9uXHJcbiAgZGF0YTogYW55XHJcbiAgaW1hZ2VzOiBhbnlcclxuICBjZW50ZXI/OiBib29sZWFuXHJcbiAgem9vbVRvRml0PzogYm9vbGVhblxyXG4gIHBhcGVyX3dpZHRoPzogbnVtYmVyXHJcbiAgcGFwZXJfaGVpZ2h0PzogbnVtYmVyXHJcbiAgY2lkPzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TWFpblByb3BzLCBhbnk+IHtcclxuXHJcbiAgLy8gQ29uYXRpbmVyXHJcbiAgcGFwZXJDb250YWluZXI6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2NoYW5nZUxheW91dF90YjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X2J0OiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9jaGFuZ2VMYXlvdXRfbHI6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2NoYW5nZUxheW91dF9ybDogSFRNTERpdkVsZW1lbnRcclxuICBidG5fZnVuY3Rpb25fMTogSFRNTERpdkVsZW1lbnRcclxuICBidG5fZnVuY3Rpb25fMjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fZnVuY3Rpb25fMzogSFRNTERpdkVsZW1lbnRcclxuICBidG5fZnVuY3Rpb25fNDogSFRNTERpdkVsZW1lbnRcclxuICBidG5fbW9yZTogSFRNTERpdkVsZW1lbnRcclxuICBidG5fem9vbWluOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9tYXA6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX3pvb21vdXQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgbmF2aWdhdG9yOiBIVE1MRGl2RWxlbWVudFxyXG5cclxuICAvLyByYXBwaWQgdGhpbmdzXHJcbiAgZ3JhcGg6IGpvaW50LmRpYS5HcmFwaDtcclxuICBjb21tYW5kTWFuYWdlcjogam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyO1xyXG4gIHBhcGVyOiBqb2ludC5kaWEuUGFwZXI7XHJcbiAgc25hcGxpbmVzOiBqb2ludC51aS5TbmFwbGluZXM7XHJcbiAgcGFwZXJTY3JvbGxlcjogam9pbnQudWkuUGFwZXJTY3JvbGxlcjtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBNYWluUHJvcHMgPSB7XHJcbiAgICBhbmltYXRlOiB0cnVlLFxyXG4gICAgd2lkdGg6IDgwMCxcclxuICAgIGhlaWdodDogNjAwLFxyXG4gICAgcGFwZXJfd2lkdGg6IDEwMDAsXHJcbiAgICBwYXBlcl9oZWlnaHQ6IDEwMDAsXHJcbiAgICBkcmF3R3JpZDogZmFsc2UsXHJcbiAgICByYW5rRGlyOiAnTFInLFxyXG4gICAgZGF0YToge30sXHJcbiAgICBpbWFnZXM6IHt9LFxyXG4gICAgY2VudGVyOiBmYWxzZSxcclxuICAgIHpvb21Ub0ZpdDogZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruS8oOmAkuWKqOeUu1xyXG4gICAqL1xyXG4gIGRvQW5pbWF0ZSgpIHtcclxuICAgIGxldCBncmFwaCA9IHRoaXMuZ3JhcGhcclxuICAgIGxldCBwYXBlciA9IHRoaXMucGFwZXJcclxuICAgIGdyYXBoLm9uKCdzaWduYWwnLCBmdW5jdGlvbiAoY2VsbDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBqb2ludC5kaWEuTGluaykge1xyXG4gICAgICAgIGlmIChjZWxsLmF0dHJpYnV0ZXMuc3RhdGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwoY2VsbC5nZXQoJ3RhcmdldCcpLmlkKTtcclxuICAgICAgICAgIGxldCBzOiBhbnkgPSBwYXBlci5maW5kVmlld0J5TW9kZWwoY2VsbClcclxuICAgICAgICAgIHMuc2VuZFRva2VuKFYoJ2NpcmNsZScsIHsgcjogNywgZmlsbDogJ2dyZWVuJyB9KS5ub2RlLCAxMDAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldENlbGwudHJpZ2dlcignc2lnbmFsJywgdGFyZ2V0Q2VsbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IG91dGJvdW5kTGlua3MgPSBncmFwaC5nZXRDb25uZWN0ZWRMaW5rcyhjZWxsLCB7IG91dGJvdW5kOiB0cnVlIH0pO1xyXG4gICAgICAgIF8uZWFjaChvdXRib3VuZExpbmtzLCBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgbGluay50cmlnZ2VyKCdzaWduYWwnLCBsaW5rKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZXM6IGFueSA9IFtdXHJcbiAgICBsZXQgdGFyZ2V0czogYW55ID0gW11cclxuICAgIF8ubWFwKGdyYXBoLmdldExpbmtzKCksIChsaW5rKSA9PiB7XHJcbiAgICAgIHNvdXJjZXMucHVzaChsaW5rLmdldCgnc291cmNlJykuaWQpXHJcbiAgICAgIHRhcmdldHMucHVzaChsaW5rLmdldCgndGFyZ2V0JykuaWQpXHJcbiAgICB9KVxyXG4gICAgbGV0IHRyaWdnZXJzID0gXy5zb3J0ZWRVbmlxKF8uZGlmZmVyZW5jZShzb3VyY2VzLCB0YXJnZXRzKSlcclxuICAgIGZ1bmN0aW9uIHNpbXVsYXRlKCkge1xyXG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIF8ubWFwKHRyaWdnZXJzLCAodHJpZ2dlcjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdyYXBoLmdldENlbGwodHJpZ2dlcik7XHJcbiAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG4gICAgc2ltdWxhdGUoKVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruino+aekFxyXG4gICAqIEBwYXJhbSBkYXRhIOaLk+aJkeaVsOaNrlxyXG4gICAqL1xyXG4gIHBhcnNlRGF0YShkYXRhOiBhbnksIGltYWdlczogYW55KSB7XHJcbiAgICBpZiAoZGF0YS5ub2Rlcykge1xyXG4gICAgICBfLm1hcChkYXRhLm5vZGVzLCAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgIGlzSGlnaGxpZ2h0OiAobm9kZS5pZCA9PT0gdGhpcy5wcm9wcy5jaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ldyBWSU0odmltT3B0aW9uKF8ubWVyZ2Uobm9kZSwgb3B0LCBpbWFnZXMpKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgfSlcclxuICAgICAgaWYgKGRhdGEubGlua3MpIHtcclxuICAgICAgICBfLm1hcChkYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGggPSBuZXcgam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG5ldyBqb2ludC5kaWEuQ29tbWFuZE1hbmFnZXIoeyBncmFwaDogZ3JhcGggfSk7XHJcblxyXG4gICAgY29uc3QgcGFwZXIgPSB0aGlzLnBhcGVyID0gbmV3IGpvaW50LmRpYS5QYXBlcih7XHJcbiAgICAgIC8vIGVsOiB0aGlzLnBhcGVyQ29udGFpbmVyLFxyXG4gICAgICB3aWR0aDogdGhpcy5wcm9wcy5wYXBlcl93aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnBhcGVyX2hlaWdodCxcclxuICAgICAgZ3JpZFNpemU6IDEwLFxyXG4gICAgICBkcmF3R3JpZDogdGhpcy5wcm9wcy5kcmF3R3JpZCxcclxuICAgICAgbW9kZWw6IGdyYXBoLFxyXG4gICAgICBwZXJwZW5kaWN1bGFyTGlua3M6IHRydWUsXHJcbiAgICAgIHJlc3RyaWN0VHJhbnNsYXRlOiB0cnVlLFxyXG4gICAgICAvLyBkZWZhdWx0TGluazogbmV3IGpvaW50LnNoYXBlcy5hcHAuTGluaygpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBhcnNlRGF0YSh0aGlzLnByb3BzLmRhdGEsIHRoaXMucHJvcHMuaW1hZ2VzKVxyXG5cclxuXHJcblxyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLmFuaW1hdGUpIHtcclxuICAgICAgdGhpcy5kb0FuaW1hdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gdGhpcy5zbmFwbGluZXMgPSBuZXcgam9pbnQudWkuU25hcGxpbmVzKHsgcGFwZXI6IHBhcGVyIH0pO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyU2Nyb2xsZXIgPSB0aGlzLnBhcGVyU2Nyb2xsZXIgPSBuZXcgam9pbnQudWkuUGFwZXJTY3JvbGxlcih7XHJcbiAgICAgIHBhcGVyLFxyXG4gICAgICBhdXRvUmVzaXplUGFwZXI6IHRydWUsXHJcbiAgICAgIGN1cnNvcjogJ2dyYWInXHJcbiAgICB9KTtcclxuXHJcbiAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmRvd24nLCBwYXBlclNjcm9sbGVyLnN0YXJ0UGFubmluZyk7XHJcbiAgICAkKHRoaXMucGFwZXJDb250YWluZXIpLmFwcGVuZChwYXBlclNjcm9sbGVyLmVsKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcblxyXG4gICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgIGlmICh0aGlzLnByb3BzLmNlbnRlcikgeyBwYXBlclNjcm9sbGVyLmNlbnRlcigpIH1cclxuICAgIGlmICh0aGlzLnByb3BzLnpvb21Ub0ZpdCkgeyBwYXBlclNjcm9sbGVyLnpvb21Ub0ZpdCgpIH1cclxuXHJcbiAgICBuZXcgam9pbnQudWkuVG9vbHRpcCh7XHJcbiAgICAgIHRhcmdldDogJ1tkYXRhLXRvb2x0aXBdJyxcclxuICAgICAgY29udGVudDogKHRhcmdldDogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IHRpcHMgPSBfLnNwbGl0KHRhcmdldC5hdHRyaWJ1dGVzWydkYXRhLXRvb2x0aXAnXS5ub2RlVmFsdWUsICd8JylcclxuICAgICAgICByZXR1cm4gXy5tYXAoXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpLCAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAwICYmIHRpcHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGlwc1swXSAhPSB0aXBzWzFdKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke2l0ZW19PC9iPjxociAvPmBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICog5Y+M5Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHBhcGVyLm9uKCdjZWxsOnBvaW50ZXJkYmxjbGljaycsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsY2xpY2spIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uRGJsY2xpY2soY2VsbFZpZXcpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiDlj7Plh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgcGFwZXIub24oJ2NlbGw6Y29udGV4dG1lbnUnLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICBwYXBlci5vbignYmxhbms6cG9pbnRlcmNsaWNrJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHBhcGVyLm9uKCdibGFuazpjb250ZXh0bWVudScsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIOaMiemSrlxyXG4gICAgICovXHJcbiAgICB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfdGIub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X3RiLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2NoYW5nZUxheW91dF9idC5vbmNsaWNrID0gdGhpcy5jaGFuZ2VMYXlvdXRfYnQuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fY2hhbmdlTGF5b3V0X2xyLm9uY2xpY2sgPSB0aGlzLmNoYW5nZUxheW91dF9sci5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfcmwub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X3JsLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzEub25jbGljayA9IHRoaXMuZnVuY3Rpb25fMS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9mdW5jdGlvbl8yLm9uY2xpY2sgPSB0aGlzLmZ1bmN0aW9uXzIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fZnVuY3Rpb25fMy5vbmNsaWNrID0gdGhpcy5mdW5jdGlvbl8zLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzQub25jbGljayA9IHRoaXMuZnVuY3Rpb25fNC5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9tYXAub25jbGljayA9IHRoaXMuc21hbGxfbWFwLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX3pvb21pbi5vbmNsaWNrID0gdGhpcy56b29tSW4uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fem9vbW91dC5vbmNsaWNrID0gdGhpcy56b29tT3V0LmJpbmQodGhpcylcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog57yp55Wl5Zu+XHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZU5hdmlnYXRvcigpIHtcclxuICAgIHZhciBuYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvciA9IG5ldyBqb2ludC51aS5OYXZpZ2F0b3Ioe1xyXG4gICAgICB3aWR0aDogMjQwLFxyXG4gICAgICBoZWlnaHQ6IDExNSxcclxuICAgICAgcGFwZXJTY3JvbGxlcjogdGhpcy5wYXBlclNjcm9sbGVyLFxyXG4gICAgICB6b29tOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgJCgnLm5hdmlnYXRvcicpLmFwcGVuZChuYXZpZ2F0b3IuZWwpO1xyXG4gICAgbmF2aWdhdG9yLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiDmiZPlvIDlhbPpl63nvKnnlaXlm75cclxuICAgKi9cclxuICBzbWFsbF9tYXAoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS52aXNhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHZpc2FibGU6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICB2aXNhYmxlOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIOaMiemSruWKn+iDvVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uXzEoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl8xJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uXzIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl8yJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uXzMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl8zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uXzQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5mdW5jdGlvbl80Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIOW4g+WxgOWIh+aNolxyXG4gICAqL1xyXG4gIHJlbmRlckxheW91dCgpIHtcclxuICAgIGxldCBncmFwaEJCb3ggPSBqb2ludC5sYXlvdXQuRGlyZWN0ZWRHcmFwaC5sYXlvdXQodGhpcy5ncmFwaCwge1xyXG4gICAgICBub2RlU2VwOiA1MCxcclxuICAgICAgZWRnZVNlcDogODAsXHJcbiAgICAgIG1hcmdpblg6IDEwMCxcclxuICAgICAgbWFyZ2luWTogMTAwLFxyXG4gICAgICByYW5rU2VwOiAxMDAsXHJcbiAgICAgIHJhbmtEaXI6IHRoaXMuc3RhdGUucmFua0RpcixcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHZhciBncmFwaExheW91dCA9IG5ldyBqb2ludC5sYXlvdXQuVHJlZUxheW91dCh7XHJcbiAgICAvLyAgIGdyYXBoOiB0aGlzLmdyYXBoLFxyXG4gICAgLy8gICBwYXJlbnRHYXA6IDIwLFxyXG4gICAgLy8gICBzaWJsaW5nR2FwOiAyMFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gZ3JhcGhMYXlvdXQubGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAgKiDkv67mlLnluIPlsYDmjInpkq5cclxuICAgICovXHJcbiAgY2hhbmdlTGF5b3V0X3RiKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHJhbmtEaXI6ICdUQidcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgY2hhbmdlTGF5b3V0X2J0KCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHJhbmtEaXI6ICdCVCdcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgY2hhbmdlTGF5b3V0X2xyKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHJhbmtEaXI6ICdMUidcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgY2hhbmdlTGF5b3V0X3JsKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHJhbmtEaXI6ICdSTCdcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog5pS+5aSn57yp5bCPXHJcbiAgICovXHJcbiAgem9vbUluKCkge1xyXG4gICAgdGhpcy5wYXBlclNjcm9sbGVyLnpvb20oMC4yLCB7IG1heDogMiB9KTtcclxuICB9XHJcbiAgem9vbU91dCgpIHtcclxuICAgIHRoaXMucGFwZXJTY3JvbGxlci56b29tKC0wLjIsIHsgbWluOiAwLjIgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wczogTWFpblByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICByYW5rRGlyOiAnTFInLFxyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIHZpc2FibGU6IHRydWVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVBhcGVyKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVOYXZpZ2F0b3IoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlck1hcCgpIHtcclxuICAgIGxldCB7IHZpc2FibGUgfSA9IHRoaXMuc3RhdGVcclxuICAgIGlmICh2aXNhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvclwiIGlkPVwibmF2aWdhdG9yXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpZ2F0b3IgPSBub2RlIH19IC8+XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JcIiBpZD1cIm5hdmlnYXRvclwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMubmF2aWdhdG9yID0gbm9kZSB9fSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxpbmtfMSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLT5saW5rLTEnKTtcclxuICB9XHJcblxyXG4gIGxpbmtfMigpIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLT5saW5rLTInKTtcclxuICB9XHJcblxyXG4gIGxpbmtfMygpIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLT5saW5rLTMnKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCBfc3R5bGUgPSB7fVxyXG4gICAgbGV0IHRvb2x0aXAxID0gJycsIHRvb2x0aXAyID0gJycsIHRvb2x0aXAzID0gJycsIHRvb2x0aXA0ID0gJydcclxuICAgIGxldCB0b29sdGlwX3N0eWxlID0ge31cclxuICAgIGxldCBtb3JlX3N0eWxlID0ge31cclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09PSBmYWxzZSkge1xyXG4gICAgICBfc3R5bGUgPSB7XHJcbiAgICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLC4yNSknLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmNWY1ZjUnLFxyXG4gICAgICAgIGJvcmRlckNvbG9yOiAnI2Q5ZDlkOScsXHJcbiAgICAgICAgY3Vyc29yOiAnbm90LWFsbG93ZWQnXHJcbiAgICAgIH1cclxuICAgICAgdG9vbHRpcDEgPSB0b29sdGlwMiA9IHRvb2x0aXAzID0gdG9vbHRpcDQgPSAn6K+36YCJ5Lit5YWD5Lu2J1xyXG4gICAgICB0b29sdGlwX3N0eWxlID0geyBjdXJzb3I6ICdub3QtYWxsb3dlZCcgfVxyXG4gICAgICBtb3JlX3N0eWxlID0geyBkaXNwbGF5OiAnbm9uZScgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9vbHRpcDEgPSAn5Yqf6IO9MSdcclxuICAgICAgdG9vbHRpcDIgPSAn5Yqf6IO9MidcclxuICAgICAgdG9vbHRpcDMgPSAn5Yqf6IO9MydcclxuICAgICAgdG9vbHRpcDQgPSAn5Yqf6IO9NCdcclxuICAgICAgdG9vbHRpcF9zdHlsZSA9IHsgY3Vyc29yOiAncG9pbnRlcicgfVxyXG4gICAgfVxyXG4gICAgbGV0IG9uTWFwID0gdGhpcy5zdGF0ZS52aXNhYmxlID09PSB0cnVlID8gJ+WFs+mXree8qeeVpeWbvicgOiAn5omT5byA57yp55Wl5Zu+J1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJUb3BvbG9neVwiIHN0eWxlPXt7IHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH19ICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BvbG9neS1hcHBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwLWJvZHlcIj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfdGIgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC10YlwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2NoYW5nZUxheW91dF9idCA9IG5vZGUgfX0gaWQ9XCJidG4tY2hhbmdlTGF5b3V0LWJ0XCIgY2xhc3NOYW1lPVwiYnRuXCI+4oaRPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X2xyID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtbHJcIiBjbGFzc05hbWU9XCJidG5cIj7ihpI8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfcmwgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC1ybFwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1idG4tYXJlYVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fZnVuY3Rpb25fMSA9IG5vZGUgfX0gc3R5bGU9e19zdHlsZX0gaWQ9XCJidG4tZnVuY3Rpb24tMVwiIGNsYXNzTmFtZT1cImZ1bi1idG5cIj5cclxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtdG9vbHRpcD17dG9vbHRpcDF9IGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cInRvcFwiIHN0eWxlPXt0b29sdGlwX3N0eWxlfT7lip/og70xPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fZnVuY3Rpb25fMiA9IG5vZGUgfX0gc3R5bGU9e19zdHlsZX0gaWQ9XCJidG4tZnVuY3Rpb24tMVwiIGNsYXNzTmFtZT1cImZ1bi1idG5cIj5cclxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtdG9vbHRpcD17dG9vbHRpcDJ9IGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cInRvcFwiIHN0eWxlPXt0b29sdGlwX3N0eWxlfT7lip/og70yPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fZnVuY3Rpb25fMyA9IG5vZGUgfX0gc3R5bGU9e19zdHlsZX0gaWQ9XCJidG4tZnVuY3Rpb24tMVwiIGNsYXNzTmFtZT1cImZ1bi1idG5cIj5cclxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtdG9vbHRpcD17dG9vbHRpcDN9IGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cInRvcFwiIHN0eWxlPXt0b29sdGlwX3N0eWxlfT7lip/og70zPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fZnVuY3Rpb25fNCA9IG5vZGUgfX0gc3R5bGU9e19zdHlsZX0gaWQ9XCJidG4tZnVuY3Rpb24tMVwiIGNsYXNzTmFtZT1cImZ1bi1idG5cIj5cclxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtdG9vbHRpcD17dG9vbHRpcDR9IGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cInRvcFwiIHN0eWxlPXt0b29sdGlwX3N0eWxlfT7lip/og700PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuLWl0ZW0tbW9yZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9tb3JlID0gbm9kZSB9fSBzdHlsZT17X3N0eWxlfSBpZD1cImJ0bi1mdW5jdGlvbi0xXCIgY2xhc3NOYW1lPVwiZnVuLWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgICDmm7TlpJpcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93bi1jb250ZW50XCIgc3R5bGU9e21vcmVfc3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamFjYXNjcmlwdDo7XCIgb25DbGljaz17dGhpcy5saW5rXzEuYmluZCh0aGlzKX0+5LiL5ouJ6I+c5Y2V6aG5IDE8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYWNhc2NyaXB0OjtcIiBvbkNsaWNrPXt0aGlzLmxpbmtfMi5iaW5kKHRoaXMpfT7kuIvmi4noj5zljZXpobkgMjwvYT5cclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphY2FzY3JpcHQ6O1wiIG9uQ2xpY2s9e3RoaXMubGlua18zLmJpbmQodGhpcyl9PuS4i+aLieiPnOWNlemhuSAzPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX21hcCA9IG5vZGUgfX0gaWQ9XCJidG4tbWFwXCIgY2xhc3NOYW1lPVwiYnRuXCI+e29uTWFwfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX3pvb21pbiA9IG5vZGUgfX0gaWQ9XCJidG4tem9vbWluXCIgY2xhc3NOYW1lPVwiYnRuXCI+KzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX3pvb21vdXQgPSBub2RlIH19IGlkPVwiYnRuLXpvb21vdXRcIiBjbGFzc05hbWU9XCJidG5cIj4tPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFwZXItY29udGFpbmVyXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5wYXBlckNvbnRhaW5lciA9IG5vZGUgfX0gPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyTWFwKCl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgJy4vc3R5bGUvaW5kZXgnXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCBUb3BvbG9neSBmcm9tICcuL21vZHVsZS92aWV3L21haW4nO1xyXG5cclxuY29uc3QgaW5pdCA9IChtb3VudE5vZGVJZCA9ICdyb290Jywgb3B0OiBhbnkpID0+IHtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8VG9wb2xvZ3lcclxuICAgICAgcmFua0Rpcj17b3B0LnJhbmtEaXJ9XHJcbiAgICAgIGFuaW1hdGU9e29wdC5hbmltYXRlfVxyXG4gICAgICBjaWQ9e29wdC5jaWR9XHJcbiAgICAgIGRhdGE9e29wdC5kYXRhfVxyXG4gICAgICBpbWFnZXM9e29wdC5pbWFnZXN9XHJcbiAgICAgIG9uRGJsY2xpY2s9e29wdC5vbkRibGNsaWNrfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neVxyXG59Il0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiUmVhY3QuY3JlYXRlRWxlbWVudCIsIlJlYWN0LkNvbXBvbmVudCIsIlJlYWN0RE9NLnJlbmRlciIsIlRvcG9sb2d5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDL0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO1NBQ2hDLEVBQUUsU0FBUyxFQUFF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
