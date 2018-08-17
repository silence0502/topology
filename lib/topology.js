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
                d: 'M 10 0 L 0 5 L 10 10 z' //箭头样式
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
                option.attrs['.connection']['stroke-width'] = 3;
                option.attrs['.marker-target'].fill = '#C6C9CA';
                option.attrs['.marker-target'].stroke = '#C6C9CA';
                option.router.name = 'manhattan';
                break;
            case 1:
                option.attrs['.connection'].stroke = '#D10002';
                option.attrs['.marker-target'].fill = '#fff';
                option.attrs['.connection']['stroke-dasharray'] = '5 3';
                option.attrs['.marker-target'].stroke = '#D10002';
                option.connector.name = 'smooth';
                break;
            case 2:
                option.attrs['.connection'].stroke = '#FF9901';
                option.attrs['.connection']['stroke-dasharray'] = '5 3';
                option.attrs['.marker-target'].fill = '#FF9901';
                option.attrs['.marker-target'].stroke = '#FF9901';
                option.connector.name = 'smooth';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202';
                option.attrs['.connection']['stroke-dasharray'] = '5 3';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                option.connector.name = 'smooth';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF';
                option.attrs['.connection']['stroke-dasharray'] = '5 3';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                option.connector.name = 'smooth';
                break;
            default:
                option.attrs['.connection'].stroke = '#C6C9CA';
                option.attrs['.connection']['stroke-width'] = 3;
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
            // rankDir: 'LR',
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
        this.renderLinks_2();
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
            rankSep: 80,
            rankDir: 'LR'
        });
    };
    /*
     * 布局后的连线
     */
    Main.prototype.renderLinks_2 = function () {
        var _this = this;
        if (this.props.data.links_2) {
            _.map(this.props.data.links_2, function (link_2) {
                new Link(linkOption(link_2)).addTo(_this.graph);
            });
        }
    };
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

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    ReactDOM.render(React.createElement(Main, { rankDir: opt.rankDir, animate: opt.animate, cid: opt.cid, data: opt.data, images: opt.images, onDblclick: opt.onDblclick, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology.js.map

exports.init = init;
exports.Topology = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3kuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPicsXHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdWSU0nLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDE4MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy4nOiB7XHJcbiAgICAgICAgICAgICAgICBtYWduZXQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC41NSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC4yNSxcclxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAxNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcudHlwZSc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5hbGFybSc6IHtcclxuICAgICAgICAgICAgICAgIHJlZlg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHJlZlgyOiAtMTYsXHJcbiAgICAgICAgICAgICAgICByZWZZOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICByZWZZMjogLTE2LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1LFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5sb2dvJzoge1xyXG4gICAgICAgICAgICAgICAgeDogLTEsXHJcbiAgICAgICAgICAgICAgICB5OiAtMSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICc1cHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLmJvZHknOiB7XHJcbiAgICAgICAgICAgICAgICAncmVmLXdpZHRoJzogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi1oZWlnaHQnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncngnOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICdyeSc6ICc1cHgnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnIzAwQjM4OCcsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmRlZmF1bHRzKSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuc2hhcGVzLmJhc2ljLkdlbmVyaWMucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgTGluayA9IGpvaW50LmRpYS5MaW5rLmV4dGVuZCh7XHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdMaW5rJyxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLmNvbm5lY3Rpb24nOiB7IHN0cm9rZTogJyNDNkM5Q0EnLCAnc3Ryb2tlLXdpZHRoJzogMSB9LFxyXG4gICAgICAgICAgICAnLmxpbmstdG9vbHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci1hcnJvd2hlYWRzJzogeyBkaXNwbGF5OiAnbm9uZScgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHo6IC0xXHJcbiAgICB9LCBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuZGVmYXVsdHMpLFxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLypcclxuKirov57mjqXnur/kuI7nrq3lpLTmoLflvI9cclxuKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbGlua09wdGlvbiB7XHJcbiAgICBzdGF0ZT86IG51bWJlclxyXG4gICAgc291cmNlPzogc3RyaW5nXHJcbiAgICB0YXJnZXQ/OiBzdHJpbmdcclxuICAgIHR5cGU/OiBudW1iZXJcclxufVxyXG5sZXQgbGlua09wdGlvbiA9IChvcHQ6IElsaW5rT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7XHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy5jb25uZWN0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnI0M2QzlDQScsXHJcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6ICcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLXRhcmdldCc6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLC8v566t5aS06L655qGGXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnI0M2QzlDQScsLy/nrq3lpLTpopzoibJcclxuICAgICAgICAgICAgICAgIGQ6ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6Jy8v566t5aS05qC35byPXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3V0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ25vcm1hbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbm5lY3Rvcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBvcHRpb24uc3RhdGUgPSBvcHQuc3RhdGVcclxuICAgICAgICBvcHRpb24uc291cmNlID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnNvdXJjZVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24udGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnRhcmdldFxyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2Utd2lkdGgnXSA9IDM7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24ucm91dGVyLm5hbWUgPSAnbWFuaGF0dGFuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNEMTAwMDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDMnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25uZWN0b3IubmFtZSA9ICdzbW9vdGgnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0ZGOTkwMSdcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMyc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjRkY5OTAxJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0ZGOTkwMSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29ubmVjdG9yLm5hbWUgPSAnc21vb3RoJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNERkIyMDInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDMnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0RGQjIwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNERkIyMDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbm5lY3Rvci5uYW1lID0gJ3Ntb290aCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjMDBCRkZGJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAzJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyMwMEJGRkYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLnN0cm9rZSA9ICcjMDBCRkZGJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25uZWN0b3IubmFtZSA9ICdzbW9vdGgnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2Utd2lkdGgnXSA9IDM7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjQzZDOUNBJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChvcHQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCB6JzsgIC8v5LiJ6KeS566t5aS0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAyMCA1IHonOyAvL+WunuW/g+iPseW9olxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMjAgNSB6JzsgLy/nqbrlv4Poj7HlvaJcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIEwgMCA1IHonOyAvL+WwlueureWktFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJyc7IC8v5rKh5pyJ566t5aS0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5kID0gJ00gMTAgMCBMIDAgNSBMIDEwIDEwIHonO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvblxyXG59XHJcblxyXG4vKlxyXG4qKuWOn+S7tuagt+W8j1xyXG4qL1xyXG5leHBvcnQgaW50ZXJmYWNlIEl2aW1PcHRpb24ge1xyXG4gICAgaWQ/OiBzdHJpbmdcclxuICAgIGRlc2M/OiBzdHJpbmdcclxuICAgIGxhYmVsPzogc3RyaW5nXHJcbiAgICBzdGF0ZT86IG51bWJlclxyXG4gICAgdHlwZT86IHN0cmluZ1xyXG4gICAgYml6RmllbGRzPzogYW55XHJcbiAgICBpc0hpZ2hsaWdodD86IGJvb2xlYW5cclxuICAgIHN3aXRjaD86IGFueVxyXG4gICAgdm0/OiBhbnlcclxuICAgIHZuZj86IGFueVxyXG4gICAgdm5mYz86IGFueVxyXG4gICAgc2VydmVyPzogYW55XHJcbiAgICBsb2dvX3k/OiBhbnlcclxufVxyXG5sZXQgdmltT3B0aW9uID0gKG9wdDogSXZpbU9wdGlvbikgPT4ge1xyXG4gICAgbGV0IG9wdGlvbjogYW55ID0geyBzaXplOiB7fSwgYXR0cnM6IHsgJy5sYWJlbCc6IHt9LCAnLnR5cGUnOiB7fSwgJy5hbGFybSc6IHt9LCAnLmxvZ28nOiB7fSwgJy5ib2R5Jzoge30gfSB9XHJcbiAgICBsZXQgZGF0YVRvb2x0aXAgPSAnJ1xyXG4gICAgbGV0IGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQubG9nb195fWBcclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBpZiAob3B0LmlkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IG9wdC5pZFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0LmJpekZpZWxkcykge1xyXG4gICAgICAgICAgICBvcHRpb24uYml6RmllbGRzID0gb3B0LmJpekZpZWxkc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0LmxhYmVsKSB7XHJcbiAgICAgICAgICAgIGRhdGFUb29sdGlwID0gYGRhdGEtdG9vbHRpcD1cIiR7b3B0LmxhYmVsfVwiYFxyXG4gICAgICAgICAgICAvLyBzd2l0Y2ggKG9wdC50eXBlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjYXNlICdzd2l0Y2gnOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQuc3dpdGNofWBcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgIGNhc2UgJ3ZtJzpcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnZtfWBcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgIGNhc2UgJ3ZuZic6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC52bmZ9YFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgY2FzZSAndm5mYyc6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC52bmZjfWBcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgIGNhc2UgJ3NlcnZlcic6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC5zZXJ2ZXJ9YFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnN3aXRjaH1gXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiICR7ZGF0YVRvb2x0aXB9PjxpbWFnZSAke2RhdGFJY29ufSB4PVwiMFwiIHk9XCIwXCIgaGVpZ2h0PVwiNzBweFwiIHdpZHRoPVwiNzBweFwiLz4gPC9nPmBcclxuICAgICAgICAgICAgLy8gb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiICR7ZGF0YVRvb2x0aXB9PjxyZWN0IGNsYXNzPVwiYm9keVwiLz48aW1hZ2UgJHtkYXRhSWNvbn0geD1cIjFcIiB5PVwiMVwiIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPmBcclxuICAgICAgICAgICAgb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiICR7ZGF0YVRvb2x0aXB9PjxyZWN0IGNsYXNzPVwiYm9keVwiLz48cmVjdCBjbGFzcz1cImxvZ29cIiAvPjxpbWFnZSAke2RhdGFJY29ufSB4PVwiMVwiIHk9XCIxXCIgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiLz48cmVjdCBjbGFzcz1cImNhcmRcIi8+PHJlY3QgY2xhc3M9XCJhbGFybVwiLz48dGV4dCBjbGFzcz1cImxhYmVsXCIvPjx0ZXh0IGNsYXNzPVwidHlwZVwiLz48L2c+YFxyXG4gICAgICAgICAgICAvLyBvcHRpb24ubWFya3VwID0gYDxnIGNsYXNzPVwicm90YXRhYmxlXCIgJHtkYXRhVG9vbHRpcH0+PHJlY3QgY2xhc3M9XCJib2R5XCIvPjxpbWFnZSB4bGluazpocmVmPSdzcmMvaW1nL2xvZ29feS5wbmcnIHg9XCIxXCIgeT1cIjFcIiBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIvPjxyZWN0IGNsYXNzPVwiY2FyZFwiLz48cmVjdCBjbGFzcz1cImFsYXJtXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz5gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQubGFiZWwpIHtcclxuICAgICAgICAgICAgaWYgKG9wdC5sYWJlbClcclxuICAgICAgICAgICAgICAgIGlmIChvcHQubGFiZWwubGVuZ3RoID4gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxhYmVsJ10udGV4dCA9IG9wdC5sYWJlbC5zdWJzdHJpbmcoMCwgNikgKyAnLi4uJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sYWJlbCddLnRleHQgPSBvcHQubGFiZWxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChvcHQuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS53aWR0aCA9IDBcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uaGVpZ2h0ID0gMFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjRDEwMDAyJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjRkY5OTAxJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjREZCMjAyJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10uZmlsbCA9ICcjMDBCRkZGJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChvcHQuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLmZpbGwgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxvZ28nXS5maWxsID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyM4NDc1NmInXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubG9nbyddLmZpbGwgPSAnIzg0NzU2YidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzg0NzU2YidcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjODQ3NTZiJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5sb2dvJ10uZmlsbCA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjMDBCMzg4J1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIFZJTSxcclxuICAgIHZpbU9wdGlvbixcclxuICAgIExpbmssXHJcbiAgICBsaW5rT3B0aW9uXHJcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFZJTSwgTGluaywgdmltT3B0aW9uLCBsaW5rT3B0aW9uIH0gZnJvbSAnLi92aW0nXHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5kZWNsYXJlIGxldCBWOiBhbnlcclxuZGVjbGFyZSBjb25zdCBqb2ludDogYW55XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1haW5Qcm9wcyB7XHJcbiAgYW5pbWF0ZT86IGJvb2xlYW5cclxuICB3aWR0aD86IGFueVxyXG4gIGhlaWdodD86IGFueVxyXG4gIGRyYXdHcmlkPzogYm9vbGVhblxyXG4gIHJhbmtEaXI/OiAnVEInIHwgJ0JUJyB8ICdMUicgfCAnUkwnO1xyXG4gIG9uRGJsY2xpY2s/OiBGdW5jdGlvblxyXG4gIGRhdGE6IGFueVxyXG4gIGltYWdlczogYW55XHJcbiAgY2VudGVyPzogYm9vbGVhblxyXG4gIHpvb21Ub0ZpdD86IGJvb2xlYW5cclxuICBwYXBlcl93aWR0aD86IG51bWJlclxyXG4gIHBhcGVyX2hlaWdodD86IG51bWJlclxyXG4gIGNpZD86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE1haW5Qcm9wcywgYW55PiB7XHJcblxyXG4gIC8vIENvbmF0aW5lclxyXG4gIHBhcGVyQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudFxyXG4gIC8vIGJ0bl9jaGFuZ2VMYXlvdXRfdGI6IEhUTUxEaXZFbGVtZW50XHJcbiAgLy8gYnRuX2NoYW5nZUxheW91dF9idDogSFRNTERpdkVsZW1lbnRcclxuICAvLyBidG5fY2hhbmdlTGF5b3V0X2xyOiBIVE1MRGl2RWxlbWVudFxyXG4gIC8vIGJ0bl9jaGFuZ2VMYXlvdXRfcmw6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2Z1bmN0aW9uXzE6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2Z1bmN0aW9uXzI6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2Z1bmN0aW9uXzM6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2Z1bmN0aW9uXzQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX21vcmU6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX3pvb21pbjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fbWFwOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl96b29tb3V0OiBIVE1MRGl2RWxlbWVudFxyXG4gIG5hdmlnYXRvcjogSFRNTERpdkVsZW1lbnRcclxuXHJcbiAgLy8gcmFwcGlkIHRoaW5nc1xyXG4gIGdyYXBoOiBqb2ludC5kaWEuR3JhcGg7XHJcbiAgY29tbWFuZE1hbmFnZXI6IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcjtcclxuICBwYXBlcjogam9pbnQuZGlhLlBhcGVyO1xyXG4gIHNuYXBsaW5lczogam9pbnQudWkuU25hcGxpbmVzO1xyXG4gIHBhcGVyU2Nyb2xsZXI6IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXI7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogTWFpblByb3BzID0ge1xyXG4gICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgIHdpZHRoOiA4MDAsXHJcbiAgICBoZWlnaHQ6IDYwMCxcclxuICAgIHBhcGVyX3dpZHRoOiAxMDAwLFxyXG4gICAgcGFwZXJfaGVpZ2h0OiAxMDAwLFxyXG4gICAgZHJhd0dyaWQ6IGZhbHNlLFxyXG4gICAgcmFua0RpcjogJ0xSJyxcclxuICAgIGRhdGE6IHt9LFxyXG4gICAgaW1hZ2VzOiB7fSxcclxuICAgIGNlbnRlcjogZmFsc2UsXHJcbiAgICB6b29tVG9GaXQ6IGZhbHNlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmlbDmja7kvKDpgJLliqjnlLtcclxuICAgKi9cclxuICBkb0FuaW1hdGUoKSB7XHJcbiAgICBsZXQgZ3JhcGggPSB0aGlzLmdyYXBoXHJcbiAgICBsZXQgcGFwZXIgPSB0aGlzLnBhcGVyXHJcbiAgICBncmFwaC5vbignc2lnbmFsJywgZnVuY3Rpb24gKGNlbGw6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgIGlmIChjZWxsIGluc3RhbmNlb2Ygam9pbnQuZGlhLkxpbmspIHtcclxuICAgICAgICBpZiAoY2VsbC5hdHRyaWJ1dGVzLnN0YXRlID09IDEwMCkge1xyXG4gICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBncmFwaC5nZXRDZWxsKGNlbGwuZ2V0KCd0YXJnZXQnKS5pZCk7XHJcbiAgICAgICAgICBsZXQgczogYW55ID0gcGFwZXIuZmluZFZpZXdCeU1vZGVsKGNlbGwpXHJcbiAgICAgICAgICBzLnNlbmRUb2tlbihWKCdjaXJjbGUnLCB7IHI6IDcsIGZpbGw6ICdncmVlbicgfSkubm9kZSwgMTAwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBvdXRib3VuZExpbmtzID0gZ3JhcGguZ2V0Q29ubmVjdGVkTGlua3MoY2VsbCwgeyBvdXRib3VuZDogdHJ1ZSB9KTtcclxuICAgICAgICBfLmVhY2gob3V0Ym91bmRMaW5rcywgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgIGxpbmsudHJpZ2dlcignc2lnbmFsJywgbGluayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzb3VyY2VzOiBhbnkgPSBbXVxyXG4gICAgbGV0IHRhcmdldHM6IGFueSA9IFtdXHJcbiAgICBfLm1hcChncmFwaC5nZXRMaW5rcygpLCAobGluaykgPT4ge1xyXG4gICAgICBzb3VyY2VzLnB1c2gobGluay5nZXQoJ3NvdXJjZScpLmlkKVxyXG4gICAgICB0YXJnZXRzLnB1c2gobGluay5nZXQoJ3RhcmdldCcpLmlkKVxyXG4gICAgfSlcclxuICAgIGxldCB0cmlnZ2VycyA9IF8uc29ydGVkVW5pcShfLmRpZmZlcmVuY2Uoc291cmNlcywgdGFyZ2V0cykpXHJcbiAgICBmdW5jdGlvbiBzaW11bGF0ZSgpIHtcclxuICAgICAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBfLm1hcCh0cmlnZ2VycywgKHRyaWdnZXI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBncmFwaC5nZXRDZWxsKHRyaWdnZXIpO1xyXG4gICAgICAgICAgdGFyZ2V0Q2VsbC50cmlnZ2VyKCdzaWduYWwnLCB0YXJnZXRDZWxsKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuICAgIHNpbXVsYXRlKClcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDmlbDmja7op6PmnpBcclxuICAgKiBAcGFyYW0gZGF0YSDmi5PmiZHmlbDmja5cclxuICAgKi9cclxuICBwYXJzZURhdGEoZGF0YTogYW55LCBpbWFnZXM6IGFueSkge1xyXG4gICAgaWYgKGRhdGEubm9kZXMpIHtcclxuICAgICAgXy5tYXAoZGF0YS5ub2RlcywgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBvcHQgPSB7XHJcbiAgICAgICAgICBpc0hpZ2hsaWdodDogKG5vZGUuaWQgPT09IHRoaXMucHJvcHMuY2lkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXcgVklNKHZpbU9wdGlvbihfLm1lcmdlKG5vZGUsIG9wdCwgaW1hZ2VzKSkpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChkYXRhLmxpbmtzKSB7XHJcbiAgICAgICAgXy5tYXAoZGF0YS5saW5rcywgKGxpbmspID0+IHtcclxuICAgICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGluaykpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZVBhcGVyKCkge1xyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaDtcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBuZXcgam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyKHsgZ3JhcGg6IGdyYXBoIH0pO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyID0gdGhpcy5wYXBlciA9IG5ldyBqb2ludC5kaWEuUGFwZXIoe1xyXG4gICAgICAvLyBlbDogdGhpcy5wYXBlckNvbnRhaW5lcixcclxuICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgLy8gZGVmYXVsdExpbms6IG5ldyBqb2ludC5zaGFwZXMuYXBwLkxpbmsoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wYXJzZURhdGEodGhpcy5wcm9wcy5kYXRhLCB0aGlzLnByb3BzLmltYWdlcylcclxuXHJcblxyXG5cclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5hbmltYXRlKSB7XHJcbiAgICAgIHRoaXMuZG9BbmltYXRlKClcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vIHRoaXMuc25hcGxpbmVzID0gbmV3IGpvaW50LnVpLlNuYXBsaW5lcyh7IHBhcGVyOiBwYXBlciB9KTtcclxuXHJcbiAgICBjb25zdCBwYXBlclNjcm9sbGVyID0gdGhpcy5wYXBlclNjcm9sbGVyID0gbmV3IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXIoe1xyXG4gICAgICBwYXBlcixcclxuICAgICAgYXV0b1Jlc2l6ZVBhcGVyOiB0cnVlLFxyXG4gICAgICBjdXJzb3I6ICdncmFiJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFwZXIub24oJ2JsYW5rOnBvaW50ZXJkb3duJywgcGFwZXJTY3JvbGxlci5zdGFydFBhbm5pbmcpO1xyXG4gICAgJCh0aGlzLnBhcGVyQ29udGFpbmVyKS5hcHBlbmQocGFwZXJTY3JvbGxlci5lbCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG4gICAgdGhpcy5yZW5kZXJMaW5rc18yKClcclxuXHJcbiAgICBwYXBlclNjcm9sbGVyLnJlbmRlcigpO1xyXG4gICAgaWYgKHRoaXMucHJvcHMuY2VudGVyKSB7IHBhcGVyU2Nyb2xsZXIuY2VudGVyKCkgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMuem9vbVRvRml0KSB7IHBhcGVyU2Nyb2xsZXIuem9vbVRvRml0KCkgfVxyXG5cclxuICAgIG5ldyBqb2ludC51aS5Ub29sdGlwKHtcclxuICAgICAgdGFyZ2V0OiAnW2RhdGEtdG9vbHRpcF0nLFxyXG4gICAgICBjb250ZW50OiAodGFyZ2V0OiBhbnkpID0+IHtcclxuICAgICAgICBsZXQgdGlwcyA9IF8uc3BsaXQodGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtdG9vbHRpcCddLm5vZGVWYWx1ZSwgJ3wnKVxyXG4gICAgICAgIHJldHVybiBfLm1hcChfLnNwbGl0KHRhcmdldC5hdHRyaWJ1dGVzWydkYXRhLXRvb2x0aXAnXS5ub2RlVmFsdWUsICd8JyksIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IDAgJiYgdGlwcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aXBzWzBdICE9IHRpcHNbMV0pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gYDxiPiR7aXRlbX08L2I+PGhyIC8+YFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiDlj4zlh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgcGFwZXIub24oJ2NlbGw6cG9pbnRlcmRibGNsaWNrJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgaWYgKHRoaXMucHJvcHMub25EYmxjbGljaykge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25EYmxjbGljayhjZWxsVmlldylcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIOWPs+WHu+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBwYXBlci5vbignY2VsbDpjb250ZXh0bWVudScsIChjZWxsVmlldzogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHBhcGVyLm9uKCdibGFuazpwb2ludGVyY2xpY2snLCAoY2VsbFZpZXc6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgcGFwZXIub24oJ2JsYW5rOmNvbnRleHRtZW51JywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICog5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIC8vIHRoaXMuYnRuX2NoYW5nZUxheW91dF90Yi5vbmNsaWNrID0gdGhpcy5jaGFuZ2VMYXlvdXRfdGIuYmluZCh0aGlzKVxyXG4gICAgLy8gdGhpcy5idG5fY2hhbmdlTGF5b3V0X2J0Lm9uY2xpY2sgPSB0aGlzLmNoYW5nZUxheW91dF9idC5iaW5kKHRoaXMpXHJcbiAgICAvLyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfbHIub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X2xyLmJpbmQodGhpcylcclxuICAgIC8vIHRoaXMuYnRuX2NoYW5nZUxheW91dF9ybC5vbmNsaWNrID0gdGhpcy5jaGFuZ2VMYXlvdXRfcmwuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fZnVuY3Rpb25fMS5vbmNsaWNrID0gdGhpcy5mdW5jdGlvbl8xLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2Z1bmN0aW9uXzIub25jbGljayA9IHRoaXMuZnVuY3Rpb25fMi5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9mdW5jdGlvbl8zLm9uY2xpY2sgPSB0aGlzLmZ1bmN0aW9uXzMuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fZnVuY3Rpb25fNC5vbmNsaWNrID0gdGhpcy5mdW5jdGlvbl80LmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX21hcC5vbmNsaWNrID0gdGhpcy5zbWFsbF9tYXAuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fem9vbWluLm9uY2xpY2sgPSB0aGlzLnpvb21Jbi5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl96b29tb3V0Lm9uY2xpY2sgPSB0aGlzLnpvb21PdXQuYmluZCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiDnvKnnlaXlm75cclxuICAgKi9cclxuICBpbml0aWFsaXplTmF2aWdhdG9yKCkge1xyXG4gICAgdmFyIG5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yID0gbmV3IGpvaW50LnVpLk5hdmlnYXRvcih7XHJcbiAgICAgIHdpZHRoOiAyNDAsXHJcbiAgICAgIGhlaWdodDogMTE1LFxyXG4gICAgICBwYXBlclNjcm9sbGVyOiB0aGlzLnBhcGVyU2Nyb2xsZXIsXHJcbiAgICAgIHpvb206IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICAkKCcubmF2aWdhdG9yJykuYXBwZW5kKG5hdmlnYXRvci5lbCk7XHJcbiAgICBuYXZpZ2F0b3IucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIOaJk+W8gOWFs+mXree8qeeVpeWbvlxyXG4gICAqL1xyXG4gIHNtYWxsX21hcCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLnZpc2FibGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgdmlzYWJsZTogZmFsc2VcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHZpc2FibGU6IHRydWVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog5oyJ6ZKu5Yqf6IO9XHJcbiAgICovXHJcbiAgZnVuY3Rpb25fMSgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzEnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb25fMigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzInKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb25fMygpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzMnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb25fNCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPmZ1bmN0aW9uXzQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog5biD5bGA5YiH5o2iXHJcbiAgICovXHJcbiAgcmVuZGVyTGF5b3V0KCkge1xyXG4gICAgbGV0IGdyYXBoQkJveCA9IGpvaW50LmxheW91dC5EaXJlY3RlZEdyYXBoLmxheW91dCh0aGlzLmdyYXBoLCB7XHJcbiAgICAgIG5vZGVTZXA6IDUwLFxyXG4gICAgICBlZGdlU2VwOiA4MCxcclxuICAgICAgbWFyZ2luWDogMTAwLFxyXG4gICAgICBtYXJnaW5ZOiAxMDAsXHJcbiAgICAgIHJhbmtTZXA6IDgwLFxyXG4gICAgICByYW5rRGlyOiAnTFInXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICog5biD5bGA5ZCO55qE6L+e57q/XHJcbiAgICovXHJcbiAgcmVuZGVyTGlua3NfMigpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3NfMikge1xyXG4gICAgICBfLm1hcCh0aGlzLnByb3BzLmRhdGEubGlua3NfMiwgKGxpbmtfMikgPT4ge1xyXG4gICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGlua18yKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICAqIOS/ruaUueW4g+WxgOaMiemSrlxyXG4gICAgKi9cclxuICAvLyBjaGFuZ2VMYXlvdXRfdGIoKSB7XHJcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcclxuICAvLyAgICAgcmFua0RpcjogJ1RCJ1xyXG4gIC8vICAgfSwgKCkgPT4ge1xyXG4gIC8vICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuICAvLyBjaGFuZ2VMYXlvdXRfYnQoKSB7XHJcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcclxuICAvLyAgICAgcmFua0RpcjogJ0JUJ1xyXG4gIC8vICAgfSwgKCkgPT4ge1xyXG4gIC8vICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuICAvLyBjaGFuZ2VMYXlvdXRfbHIoKSB7XHJcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcclxuICAvLyAgICAgcmFua0RpcjogJ0xSJ1xyXG4gIC8vICAgfSwgKCkgPT4ge1xyXG4gIC8vICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuICAvLyBjaGFuZ2VMYXlvdXRfcmwoKSB7XHJcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcclxuICAvLyAgICAgcmFua0RpcjogJ1JMJ1xyXG4gIC8vICAgfSwgKCkgPT4ge1xyXG4gIC8vICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuXHJcbiAgLypcclxuICAgKiDmlL7lpKfnvKnlsI9cclxuICAgKi9cclxuICB6b29tSW4oKSB7XHJcbiAgICB0aGlzLnBhcGVyU2Nyb2xsZXIuem9vbSgwLjIsIHsgbWF4OiAyIH0pO1xyXG4gIH1cclxuICB6b29tT3V0KCkge1xyXG4gICAgdGhpcy5wYXBlclNjcm9sbGVyLnpvb20oLTAuMiwgeyBtaW46IDAuMiB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBNYWluUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIC8vIHJhbmtEaXI6ICdMUicsXHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgdmlzYWJsZTogdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5pbml0aWFsaXplUGFwZXIoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU5hdmlnYXRvcigpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyTWFwKCkge1xyXG4gICAgbGV0IHsgdmlzYWJsZSB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgaWYgKHZpc2FibGUgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdG9yXCIgaWQ9XCJuYXZpZ2F0b3JcIiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLm5hdmlnYXRvciA9IG5vZGUgfX0gLz5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvclwiIGlkPVwibmF2aWdhdG9yXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpZ2F0b3IgPSBub2RlIH19IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fSAvPlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGlua18xKCkge1xyXG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tPmxpbmstMScpO1xyXG4gIH1cclxuXHJcbiAgbGlua18yKCkge1xyXG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tPmxpbmstMicpO1xyXG4gIH1cclxuXHJcbiAgbGlua18zKCkge1xyXG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tPmxpbmstMycpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgbGV0IF9zdHlsZSA9IHt9XHJcbiAgICBsZXQgdG9vbHRpcDEgPSAnJywgdG9vbHRpcDIgPSAnJywgdG9vbHRpcDMgPSAnJywgdG9vbHRpcDQgPSAnJ1xyXG4gICAgbGV0IHRvb2x0aXBfc3R5bGUgPSB7fVxyXG4gICAgbGV0IG1vcmVfc3R5bGUgPSB7fVxyXG4gICAgaWYgKHRoaXMuc3RhdGUuZGlzYWJsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIF9zdHlsZSA9IHtcclxuICAgICAgICBjb2xvcjogJ3JnYmEoMCwwLDAsLjI1KScsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y1ZjVmNScsXHJcbiAgICAgICAgYm9yZGVyQ29sb3I6ICcjZDlkOWQ5JyxcclxuICAgICAgICBjdXJzb3I6ICdub3QtYWxsb3dlZCdcclxuICAgICAgfVxyXG4gICAgICB0b29sdGlwMSA9IHRvb2x0aXAyID0gdG9vbHRpcDMgPSB0b29sdGlwNCA9ICfor7fpgInkuK3lhYPku7YnXHJcbiAgICAgIHRvb2x0aXBfc3R5bGUgPSB7IGN1cnNvcjogJ25vdC1hbGxvd2VkJyB9XHJcbiAgICAgIG1vcmVfc3R5bGUgPSB7IGRpc3BsYXk6ICdub25lJyB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b29sdGlwMSA9ICflip/og70xJ1xyXG4gICAgICB0b29sdGlwMiA9ICflip/og70yJ1xyXG4gICAgICB0b29sdGlwMyA9ICflip/og70zJ1xyXG4gICAgICB0b29sdGlwNCA9ICflip/og700J1xyXG4gICAgICB0b29sdGlwX3N0eWxlID0geyBjdXJzb3I6ICdwb2ludGVyJyB9XHJcbiAgICB9XHJcbiAgICBsZXQgb25NYXAgPSB0aGlzLnN0YXRlLnZpc2FibGUgPT09IHRydWUgPyAn5YWz6Zet57yp55Wl5Zu+JyA6ICfmiZPlvIDnvKnnlaXlm74nXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlRvcG9sb2d5XCIgc3R5bGU9e3sgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQgfX0gID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG9sb2d5LWFwcFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHAtYm9keVwiPlxyXG4gICAgICAgICAgICB7LyogPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfdGIgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC10YlwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2NoYW5nZUxheW91dF9idCA9IG5vZGUgfX0gaWQ9XCJidG4tY2hhbmdlTGF5b3V0LWJ0XCIgY2xhc3NOYW1lPVwiYnRuXCI+4oaRPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X2xyID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtbHJcIiBjbGFzc05hbWU9XCJidG5cIj7ihpI8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfcmwgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC1ybFwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkDwvZGl2PiAqL31cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW4tYnRuLWFyZWFcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzEgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXAxfSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9MTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzIgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXAyfSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9MjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzMgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXAzfSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9MzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bmN0aW9uXzQgPSBub2RlIH19IHN0eWxlPXtfc3R5bGV9IGlkPVwiYnRuLWZ1bmN0aW9uLTFcIiBjbGFzc05hbWU9XCJmdW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRvb2x0aXA9e3Rvb2x0aXA0fSBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBzdHlsZT17dG9vbHRpcF9zdHlsZX0+5Yqf6IO9NDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bi1pdGVtLW1vcmVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fbW9yZSA9IG5vZGUgfX0gc3R5bGU9e19zdHlsZX0gaWQ9XCJidG4tZnVuY3Rpb24tMVwiIGNsYXNzTmFtZT1cImZ1bi1idG5cIj5cclxuICAgICAgICAgICAgICAgICAg5pu05aSaXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24tY29udGVudFwiIHN0eWxlPXttb3JlX3N0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphY2FzY3JpcHQ6O1wiIG9uQ2xpY2s9e3RoaXMubGlua18xLmJpbmQodGhpcyl9PuS4i+aLieiPnOWNlemhuSAxPC9hPlxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamFjYXNjcmlwdDo7XCIgb25DbGljaz17dGhpcy5saW5rXzIuYmluZCh0aGlzKX0+5LiL5ouJ6I+c5Y2V6aG5IDI8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYWNhc2NyaXB0OjtcIiBvbkNsaWNrPXt0aGlzLmxpbmtfMy5iaW5kKHRoaXMpfT7kuIvmi4noj5zljZXpobkgMzwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9tYXAgPSBub2RlIH19IGlkPVwiYnRuLW1hcFwiIGNsYXNzTmFtZT1cImJ0blwiPntvbk1hcH08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29taW4gPSBub2RlIH19IGlkPVwiYnRuLXpvb21pblwiIGNsYXNzTmFtZT1cImJ0blwiPis8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29tb3V0ID0gbm9kZSB9fSBpZD1cImJ0bi16b29tb3V0XCIgY2xhc3NOYW1lPVwiYnRuXCI+LTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcGVyLWNvbnRhaW5lclwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMucGFwZXJDb250YWluZXIgPSBub2RlIH19ID5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hcCgpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlL2luZGV4J1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQgVG9wb2xvZ3kgZnJvbSAnLi9tb2R1bGUvdmlldy9tYWluJztcclxuXHJcbmNvbnN0IGluaXQgPSAobW91bnROb2RlSWQgPSAncm9vdCcsIG9wdDogYW55KSA9PiB7XHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFRvcG9sb2d5XHJcbiAgICAgIHJhbmtEaXI9e29wdC5yYW5rRGlyfVxyXG4gICAgICBhbmltYXRlPXtvcHQuYW5pbWF0ZX1cclxuICAgICAgY2lkPXtvcHQuY2lkfVxyXG4gICAgICBkYXRhPXtvcHQuZGF0YX1cclxuICAgICAgaW1hZ2VzPXtvcHQuaW1hZ2VzfVxyXG4gICAgICBvbkRibGNsaWNrPXtvcHQub25EYmxjbGlja31cclxuICAgICAgd2lkdGg9e29wdC53aWR0aH1cclxuICAgICAgaGVpZ2h0PXtvcHQuaGVpZ2h0fVxyXG4gICAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vdW50Tm9kZUlkKSk7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGluaXQsXHJcbiAgVG9wb2xvZ3lcclxufSJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlJlYWN0LmNyZWF0ZUVsZW1lbnQiLCJSZWFjdC5Db21wb25lbnQiLCJSZWFjdERPTS5yZW5kZXIiLCJUb3BvbG9neSJdLCJtYXBwaW5n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TUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO2dCQUNqQyxNQUFNO1NBQ2I7UUFDRCxRQUFRLEdBQUcsQ0FBQyxLQUFLO1lBQ2IsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO2dCQUN4QyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO2dCQUN4QyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO2dCQUN4QyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO2dCQUN4QyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO2dCQUN4QyxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdB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
