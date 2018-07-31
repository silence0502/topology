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
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 z';
                break;
            case 1:
                option.attrs['.connection'].stroke = '#D10002';
                option.attrs['.marker-target'].fill = '#fff';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].stroke = '#D10002';
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z';
                break;
            case 2:
                option.attrs['.connection'].stroke = '#FF9901';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '';
                option.attrs['.marker-target'].stroke = '';
                option.attrs['.marker-target'].d = '';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 0 5 z';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z';
                break;
            default:
                option.attrs['.connection'].stroke = '#31d0c6';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#31d0c6';
                option.attrs['.marker-target'].stroke = '#31d0c6';
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
        if (opt.isHighlight) {
            option.attrs['.body'].stroke = '#2AD2C9';
        }
        if (opt.bizFields) {
            option.bizFields = opt.bizFields;
        }
        if (opt.label) {
            dataTooltip = "data-tooltip=\"" + opt.label + "\"";
            switch (opt.type) {
                case 'switches':
                    dataIcon = "xlink:href=" + opt.switches;
                    break;
                case 'router':
                    dataIcon = "xlink:href=" + opt.router;
                    break;
                case 'firewall':
                    dataIcon = "xlink:href=" + opt.firewall;
                    break;
                case 'server':
                    dataIcon = "xlink:href=" + opt.server;
                    break;
                default:
                    dataIcon = "xlink:href=" + opt.switches;
                    break;
            }
            option.markup = "<g class=\"rotatable\" " + dataTooltip + "><image " + dataIcon + " x=\"0\" y=\"0\" height=\"100px\" width=\"100px\"/> </g>";
        }
        if (opt.type) {
            option.attrs['.label'].text = opt.type;
        }
        // switch (opt.state) {
        //     case 0:
        //         option.attrs['.alarm'].width = 0
        //         option.attrs['.alarm'].height = 0
        //         break;
        //     case 1:
        //         option.attrs['.alarm'].fill = '#D10002'
        //         break;
        //     case 2:
        //         option.attrs['.alarm'].fill = '#FF9901'
        //         break;
        //     case 3:
        //         option.attrs['.alarm'].fill = '#DFB202'
        //         break;
        //     case 4:
        //         option.attrs['.alarm'].fill = '#00BFFF'
        //         break;
        //     default:
        //         option.attrs['.alarm'].width = 0
        //         option.attrs['.alarm'].height = 0
        //         break;
        // }
        // switch (opt.type) {
        //     case 'pnc':
        //         option.size = {
        //             width: 140,
        //             height: 60
        //         }
        //         break;
        //     case 'pno':
        //         option.size = {
        //             width: 80,
        //             height: 40
        //         }
        //         break;
        //     case 'ovs':
        //         option.size = {
        //             width: 320,
        //             height: 60
        //         }
        //         break;
        //     case 'vnc':
        //         option.size = {
        //             width: 20,
        //             height: 20
        //         }
        //         break;
        //     case 'vm':
        //         option.size = {
        //             width: 140,
        //             height: 60
        //         }
        //         break;
        //     case 'HA':
        //         option.size = {
        //             width: 140,
        //             height: 60
        //         }
        //         break;
        //     default:
        //         break;
        // }
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
                if (cell.attributes.state == 0) {
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
        paper.on('cell:contextmenu', function (cellView, w) {
            // console.log(w, '==========================>w');
            // if (this.props.onDblclick) {
            //   this.props.onDblclick(cellView)
            // }
            if (cellView.model instanceof joint.dia.Link)
                return;
            var halo = new joint.ui.Halo({
                cellView: cellView,
                type: 'pie'
            });
            halo.render();
        });
        this.btn_changeLayout_tb.onclick = this.changeLayout_tb.bind(this);
        this.btn_changeLayout_bt.onclick = this.changeLayout_bt.bind(this);
        this.btn_changeLayout_lr.onclick = this.changeLayout_lr.bind(this);
        this.btn_changeLayout_rl.onclick = this.changeLayout_rl.bind(this);
        this.btn_zoomin.onclick = this.zoomIn.bind(this);
        this.btn_zoomout.onclick = this.zoomOut.bind(this);
    };
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
    Main.prototype.renderLayout = function () {
        var graphBBox = joint.layout.DirectedGraph.layout(this.graph, {
            nodeSep: 50,
            edgeSep: 80,
            marginX: 100,
            marginY: 20,
            rankSep: 100,
            rankDir: this.state.rankDir,
        });
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
        return (React.createElement("div", { className: "Topology", style: { width: this.props.width, height: this.props.height } },
            React.createElement("div", { className: "topology-app" },
                React.createElement("div", { className: "app-body" },
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_tb = node; }, id: "btn-changeLayout-tb", className: "btn" }, "\u2193"),
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_bt = node; }, id: "btn-changeLayout-bt", className: "btn" }, "\u2191"),
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_lr = node; }, id: "btn-changeLayout-lr", className: "btn" }, "\u2192"),
                    React.createElement("div", { ref: function (node) { _this.btn_changeLayout_rl = node; }, id: "btn-changeLayout-rl", className: "btn" }, "\u2190"),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3kuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48dGV4dCBjbGFzcz1cInR5cGVcIi8+PC9nPicsXHJcbiAgICBkZWZhdWx0czogXy5kZWZhdWx0c0RlZXAoe1xyXG4gICAgICAgIHR5cGU6ICdWSU0nLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA2MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgJy4nOiB7XHJcbiAgICAgICAgICAgICAgICBtYWduZXQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC41LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjQsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDAwJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLnR5cGUnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICdyZWYteCc6IC4wNSxcclxuICAgICAgICAgICAgICAgICdyZWYteSc6IC43LFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IDE0LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYWxhcm0nOiB7XHJcbiAgICAgICAgICAgICAgICByZWZYOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICByZWZYMjogLTEwLFxyXG4gICAgICAgICAgICAgICAgcmVmWTogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgcmVmWTI6IC0xMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYm9keSc6IHtcclxuICAgICAgICAgICAgICAgICdyZWYtd2lkdGgnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncmVmLWhlaWdodCc6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyMwMEIzODgnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIGpvaW50LnNoYXBlcy5iYXNpYy5HZW5lcmljLnByb3RvdHlwZS5kZWZhdWx0cyksXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LnNoYXBlcy5iYXNpYy5HZW5lcmljLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubGV0IExpbmsgPSBqb2ludC5kaWEuTGluay5leHRlbmQoe1xyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnTGluaycsXHJcbiAgICAgICAgLy8gcm91dGVyOiB7IG5hbWU6ICdtYW5oYXR0YW4nIH0sXHJcbiAgICAgICAgLy8gY29ubmVjdG9yOiB7IG5hbWU6ICdyb3VuZGVkJyB9LFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuY29ubmVjdGlvbic6IHsgc3Ryb2tlOiAnI0M2QzlDQScsICdzdHJva2Utd2lkdGgnOiAzIH0sXHJcbiAgICAgICAgICAgICcubGluay10b29scyc6IHsgZGlzcGxheTogJ25vbmUnIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLWFycm93aGVhZHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgejogLTFcclxuICAgIH0sIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5kZWZhdWx0cyksXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgam9pbnQuZGlhLkxpbmsucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxufSk7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWxpbmtPcHRpb24ge1xyXG4gICAgc3RhdGU/OiBudW1iZXJcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICAgdGFyZ2V0Pzogc3RyaW5nXHJcbn1cclxubGV0IGxpbmtPcHRpb24gPSAob3B0OiBJbGlua09wdGlvbikgPT4ge1xyXG4gICAgbGV0IG9wdGlvbjogYW55ID0ge1xyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuY29ubmVjdGlvbic6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiAnJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci10YXJnZXQnOiB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6ICcjQzZDOUNBJywvL+eureWktOi+ueahhlxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNDNkM5Q0EnLC8v566t5aS06aKc6ImyXHJcbiAgICAgICAgICAgICAgICBkOiAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeicvL+eureWktOagt+W8j1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBvcHRpb24uc3RhdGUgPSBvcHQuc3RhdGVcclxuICAgICAgICBvcHRpb24uc291cmNlID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnNvdXJjZVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24udGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnRhcmdldFxyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKG9wdC5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyNDNkM5Q0EnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRDEwMDAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyNmZmYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDIwIDUgeic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddLnN0cm9rZSA9ICcjRkY5OTAxJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuY29ubmVjdGlvbiddWydzdHJva2UtZGFzaGFycmF5J10gPSAnNSAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5maWxsID0gJyc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0RGQjIwMidcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZmlsbCA9ICcjREZCMjAyJztcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0RGQjIwMic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uZCA9ICdNIDEwIDAgTCAwIDUgTCAxMCAxMCBMIDAgNSB6JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyMwMEJGRkYnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnIzAwQkZGRic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyMwMEJGRkYnO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmQgPSAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgTCAyMCA1IHonO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ10uc3Ryb2tlID0gJyMzMWQwYzYnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5jb25uZWN0aW9uJ11bJ3N0cm9rZS1kYXNoYXJyYXknXSA9ICc1IDInO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnIzMxZDBjNic7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5tYXJrZXItdGFyZ2V0J10uc3Ryb2tlID0gJyMzMWQwYzYnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXZpbU9wdGlvbiB7XHJcbiAgICBpZD86IHN0cmluZ1xyXG4gICAgZGVzYz86IHN0cmluZ1xyXG4gICAgbGFiZWw/OiBzdHJpbmdcclxuICAgIHN0YXRlPzogbnVtYmVyXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBiaXpGaWVsZHM/OiBhbnlcclxuICAgIGlzSGlnaGxpZ2h0PzogYm9vbGVhblxyXG4gICAgc3dpdGNoZXM/OiBhbnlcclxuICAgIHJvdXRlcj86IGFueVxyXG4gICAgZmlyZXdhbGw/OiBhbnlcclxuICAgIHNlcnZlcj86IGFueVxyXG59XHJcbmxldCB2aW1PcHRpb24gPSAob3B0OiBJdmltT3B0aW9uKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9uOiBhbnkgPSB7IHNpemU6IHt9LCBhdHRyczogeyAnLmxhYmVsJzoge30sICcudHlwZSc6IHt9LCAnLmFsYXJtJzoge30sICcuYm9keSc6IHt9IH0gfVxyXG4gICAgbGV0IGRhdGFUb29sdGlwID0gJydcclxuICAgIGxldCBkYXRhSWNvbiA9ICcnXHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgICAgaWYgKG9wdC5pZCkge1xyXG4gICAgICAgICAgICBvcHRpb24uaWQgPSBvcHQuaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC5pc0hpZ2hsaWdodCkge1xyXG4gICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyMyQUQyQzknXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQuYml6RmllbGRzKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5iaXpGaWVsZHMgPSBvcHQuYml6RmllbGRzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHQubGFiZWwpIHtcclxuICAgICAgICAgICAgZGF0YVRvb2x0aXAgPSBgZGF0YS10b29sdGlwPVwiJHtvcHQubGFiZWx9XCJgXHJcbiAgICAgICAgICAgIHN3aXRjaCAob3B0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3aXRjaGVzJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnN3aXRjaGVzfWBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JvdXRlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUljb24gPSBgeGxpbms6aHJlZj0ke29wdC5yb3V0ZXJ9YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlyZXdhbGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQuZmlyZXdhbGx9YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VydmVyJzpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSWNvbiA9IGB4bGluazpocmVmPSR7b3B0LnNlcnZlcn1gXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJY29uID0gYHhsaW5rOmhyZWY9JHtvcHQuc3dpdGNoZXN9YFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbi5tYXJrdXAgPSBgPGcgY2xhc3M9XCJyb3RhdGFibGVcIiAke2RhdGFUb29sdGlwfT48aW1hZ2UgJHtkYXRhSWNvbn0geD1cIjBcIiB5PVwiMFwiIGhlaWdodD1cIjEwMHB4XCIgd2lkdGg9XCIxMDBweFwiLz4gPC9nPmBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC50eXBlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmxhYmVsJ10udGV4dCA9IG9wdC50eXBlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzd2l0Y2ggKG9wdC5zdGF0ZSkge1xyXG4gICAgICAgIC8vICAgICBjYXNlIDA6XHJcbiAgICAgICAgLy8gICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLndpZHRoID0gMFxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5oZWlnaHQgPSAwXHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAxOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNEMTAwMDInXHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAyOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNGRjk5MDEnXHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAzOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyNERkIyMDInXHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSA0OlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLmF0dHJzWycuYWxhcm0nXS5maWxsID0gJyMwMEJGRkYnXHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIG9wdGlvbi5hdHRyc1snLmFsYXJtJ10ud2lkdGggPSAwXHJcbiAgICAgICAgLy8gICAgICAgICBvcHRpb24uYXR0cnNbJy5hbGFybSddLmhlaWdodCA9IDBcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBzd2l0Y2ggKG9wdC50eXBlKSB7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgJ3BuYyc6XHJcbiAgICAgICAgLy8gICAgICAgICBvcHRpb24uc2l6ZSA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlaWdodDogNjBcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlICdwbm8nOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLnNpemUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlaWdodDogNDBcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlICdvdnMnOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLnNpemUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgd2lkdGg6IDMyMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZWlnaHQ6IDYwXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAndm5jJzpcclxuICAgICAgICAvLyAgICAgICAgIG9wdGlvbi5zaXplID0ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHdpZHRoOiAyMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZWlnaHQ6IDIwXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAndm0nOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLnNpemUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZWlnaHQ6IDYwXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAnSEEnOlxyXG4gICAgICAgIC8vICAgICAgICAgb3B0aW9uLnNpemUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZWlnaHQ6IDYwXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBWSU0sXHJcbiAgICB2aW1PcHRpb24sXHJcbiAgICBMaW5rLFxyXG4gICAgbGlua09wdGlvblxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWSU0sIExpbmssIHZpbU9wdGlvbiwgbGlua09wdGlvbiB9IGZyb20gJy4vdmltJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSBsZXQgVjogYW55XHJcbmRlY2xhcmUgY29uc3Qgam9pbnQ6IGFueVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xyXG4gIGFuaW1hdGU/OiBib29sZWFuXHJcbiAgd2lkdGg/OiBhbnlcclxuICBoZWlnaHQ/OiBhbnlcclxuICBkcmF3R3JpZD86IGJvb2xlYW5cclxuICByYW5rRGlyPzogJ1RCJyB8ICdCVCcgfCAnTFInIHwgJ1JMJztcclxuICBvbkRibGNsaWNrPzogRnVuY3Rpb25cclxuICBkYXRhOiBhbnlcclxuICBpbWFnZXM6IGFueVxyXG4gIGNlbnRlcj86IGJvb2xlYW5cclxuICB6b29tVG9GaXQ/OiBib29sZWFuXHJcbiAgcGFwZXJfd2lkdGg/OiBudW1iZXJcclxuICBwYXBlcl9oZWlnaHQ/OiBudW1iZXJcclxuICBjaWQ/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxNYWluUHJvcHMsIGFueT4ge1xyXG5cclxuICAvLyBDb25hdGluZXJcclxuICBwYXBlckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X3RiOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl9jaGFuZ2VMYXlvdXRfYnQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX2NoYW5nZUxheW91dF9scjogSFRNTERpdkVsZW1lbnRcclxuICBidG5fY2hhbmdlTGF5b3V0X3JsOiBIVE1MRGl2RWxlbWVudFxyXG4gIGJ0bl96b29taW46IEhUTUxEaXZFbGVtZW50XHJcbiAgYnRuX3pvb21vdXQ6IEhUTUxEaXZFbGVtZW50XHJcbiAgbmF2aWdhdG9yOiBIVE1MRGl2RWxlbWVudFxyXG5cclxuICAvLyByYXBwaWQgdGhpbmdzXHJcbiAgZ3JhcGg6IGpvaW50LmRpYS5HcmFwaDtcclxuICBjb21tYW5kTWFuYWdlcjogam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyO1xyXG4gIHBhcGVyOiBqb2ludC5kaWEuUGFwZXI7XHJcbiAgc25hcGxpbmVzOiBqb2ludC51aS5TbmFwbGluZXM7XHJcbiAgcGFwZXJTY3JvbGxlcjogam9pbnQudWkuUGFwZXJTY3JvbGxlcjtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBNYWluUHJvcHMgPSB7XHJcbiAgICBhbmltYXRlOiB0cnVlLFxyXG4gICAgd2lkdGg6IDgwMCxcclxuICAgIGhlaWdodDogNjAwLFxyXG4gICAgcGFwZXJfd2lkdGg6IDEwMDAsXHJcbiAgICBwYXBlcl9oZWlnaHQ6IDEwMDAsXHJcbiAgICBkcmF3R3JpZDogZmFsc2UsXHJcbiAgICByYW5rRGlyOiAnVEInLFxyXG4gICAgZGF0YToge30sXHJcbiAgICBpbWFnZXM6IHt9LFxyXG4gICAgY2VudGVyOiBmYWxzZSxcclxuICAgIHpvb21Ub0ZpdDogZmFsc2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruS8oOmAkuWKqOeUu1xyXG4gICAqL1xyXG4gIGRvQW5pbWF0ZSgpIHtcclxuICAgIGxldCBncmFwaCA9IHRoaXMuZ3JhcGhcclxuICAgIGxldCBwYXBlciA9IHRoaXMucGFwZXJcclxuICAgIGdyYXBoLm9uKCdzaWduYWwnLCBmdW5jdGlvbiAoY2VsbDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBqb2ludC5kaWEuTGluaykge1xyXG4gICAgICAgIGlmIChjZWxsLmF0dHJpYnV0ZXMuc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBncmFwaC5nZXRDZWxsKGNlbGwuZ2V0KCd0YXJnZXQnKS5pZCk7XHJcbiAgICAgICAgICBsZXQgczogYW55ID0gcGFwZXIuZmluZFZpZXdCeU1vZGVsKGNlbGwpXHJcbiAgICAgICAgICBzLnNlbmRUb2tlbihWKCdjaXJjbGUnLCB7IHI6IDcsIGZpbGw6ICdncmVlbicgfSkubm9kZSwgMTAwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBvdXRib3VuZExpbmtzID0gZ3JhcGguZ2V0Q29ubmVjdGVkTGlua3MoY2VsbCwgeyBvdXRib3VuZDogdHJ1ZSB9KTtcclxuICAgICAgICBfLmVhY2gob3V0Ym91bmRMaW5rcywgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgIGxpbmsudHJpZ2dlcignc2lnbmFsJywgbGluayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzb3VyY2VzOiBhbnkgPSBbXVxyXG4gICAgbGV0IHRhcmdldHM6IGFueSA9IFtdXHJcbiAgICBfLm1hcChncmFwaC5nZXRMaW5rcygpLCAobGluaykgPT4ge1xyXG4gICAgICBzb3VyY2VzLnB1c2gobGluay5nZXQoJ3NvdXJjZScpLmlkKVxyXG4gICAgICB0YXJnZXRzLnB1c2gobGluay5nZXQoJ3RhcmdldCcpLmlkKVxyXG4gICAgfSlcclxuICAgIGxldCB0cmlnZ2VycyA9IF8uc29ydGVkVW5pcShfLmRpZmZlcmVuY2Uoc291cmNlcywgdGFyZ2V0cykpXHJcbiAgICBmdW5jdGlvbiBzaW11bGF0ZSgpIHtcclxuICAgICAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBfLm1hcCh0cmlnZ2VycywgKHRyaWdnZXI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBncmFwaC5nZXRDZWxsKHRyaWdnZXIpO1xyXG4gICAgICAgICAgdGFyZ2V0Q2VsbC50cmlnZ2VyKCdzaWduYWwnLCB0YXJnZXRDZWxsKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuICAgIHNpbXVsYXRlKClcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDmlbDmja7op6PmnpBcclxuICAgKiBAcGFyYW0gZGF0YSDmi5PmiZHmlbDmja5cclxuICAgKi9cclxuICBwYXJzZURhdGEoZGF0YTogYW55LCBpbWFnZXM6IGFueSkge1xyXG4gICAgaWYgKGRhdGEubm9kZXMpIHtcclxuICAgICAgXy5tYXAoZGF0YS5ub2RlcywgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBvcHQgPSB7XHJcbiAgICAgICAgICBpc0hpZ2hsaWdodDogKG5vZGUuaWQgPT09IHRoaXMucHJvcHMuY2lkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXcgVklNKHZpbU9wdGlvbihfLm1lcmdlKG5vZGUsIG9wdCwgaW1hZ2VzKSkpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChkYXRhLmxpbmtzKSB7XHJcbiAgICAgICAgXy5tYXAoZGF0YS5saW5rcywgKGxpbmspID0+IHtcclxuICAgICAgICAgIG5ldyBMaW5rKGxpbmtPcHRpb24obGluaykpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZVBhcGVyKCkge1xyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaDtcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBuZXcgam9pbnQuZGlhLkNvbW1hbmRNYW5hZ2VyKHsgZ3JhcGg6IGdyYXBoIH0pO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyID0gdGhpcy5wYXBlciA9IG5ldyBqb2ludC5kaWEuUGFwZXIoe1xyXG4gICAgICAvLyBlbDogdGhpcy5wYXBlckNvbnRhaW5lcixcclxuICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgLy8gZGVmYXVsdExpbms6IG5ldyBqb2ludC5zaGFwZXMuYXBwLkxpbmsoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wYXJzZURhdGEodGhpcy5wcm9wcy5kYXRhLCB0aGlzLnByb3BzLmltYWdlcylcclxuXHJcblxyXG5cclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5hbmltYXRlKSB7XHJcbiAgICAgIHRoaXMuZG9BbmltYXRlKClcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vIHRoaXMuc25hcGxpbmVzID0gbmV3IGpvaW50LnVpLlNuYXBsaW5lcyh7IHBhcGVyOiBwYXBlciB9KTtcclxuXHJcbiAgICBjb25zdCBwYXBlclNjcm9sbGVyID0gdGhpcy5wYXBlclNjcm9sbGVyID0gbmV3IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXIoe1xyXG4gICAgICBwYXBlcixcclxuICAgICAgYXV0b1Jlc2l6ZVBhcGVyOiB0cnVlLFxyXG4gICAgICBjdXJzb3I6ICdncmFiJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFwZXIub24oJ2JsYW5rOnBvaW50ZXJkb3duJywgcGFwZXJTY3JvbGxlci5zdGFydFBhbm5pbmcpO1xyXG4gICAgJCh0aGlzLnBhcGVyQ29udGFpbmVyKS5hcHBlbmQocGFwZXJTY3JvbGxlci5lbCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJMYXlvdXQoKVxyXG5cclxuICAgIHBhcGVyU2Nyb2xsZXIucmVuZGVyKCk7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5jZW50ZXIpIHsgcGFwZXJTY3JvbGxlci5jZW50ZXIoKSB9XHJcbiAgICBpZiAodGhpcy5wcm9wcy56b29tVG9GaXQpIHsgcGFwZXJTY3JvbGxlci56b29tVG9GaXQoKSB9XHJcblxyXG4gICAgbmV3IGpvaW50LnVpLlRvb2x0aXAoe1xyXG4gICAgICB0YXJnZXQ6ICdbZGF0YS10b29sdGlwXScsXHJcbiAgICAgIGNvbnRlbnQ6ICh0YXJnZXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCB0aXBzID0gXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpXHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKF8uc3BsaXQodGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtdG9vbHRpcCddLm5vZGVWYWx1ZSwgJ3wnKSwgKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPT0gMCAmJiB0aXBzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRpcHNbMF0gIT0gdGlwc1sxXSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBgPGI+JHtpdGVtfTwvYj48aHIgLz5gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBwYXBlci5vbignY2VsbDpjb250ZXh0bWVudScsIChjZWxsVmlldzogYW55LCB3OiBhbnkpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2codywgJz09PT09PT09PT09PT09PT09PT09PT09PT09PncnKTtcclxuICAgICAgLy8gaWYgKHRoaXMucHJvcHMub25EYmxjbGljaykge1xyXG4gICAgICAvLyAgIHRoaXMucHJvcHMub25EYmxjbGljayhjZWxsVmlldylcclxuICAgICAgLy8gfVxyXG4gICAgICBpZiAoY2VsbFZpZXcubW9kZWwgaW5zdGFuY2VvZiBqb2ludC5kaWEuTGluaykgcmV0dXJuO1xyXG5cclxuICAgICAgdmFyIGhhbG8gPSBuZXcgam9pbnQudWkuSGFsbyh7XHJcbiAgICAgICAgY2VsbFZpZXc6IGNlbGxWaWV3LFxyXG4gICAgICAgIHR5cGU6ICdwaWUnXHJcbiAgICAgIH0pO1xyXG4gICAgICBoYWxvLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3RiLm9uY2xpY2sgPSB0aGlzLmNoYW5nZUxheW91dF90Yi5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfYnQub25jbGljayA9IHRoaXMuY2hhbmdlTGF5b3V0X2J0LmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX2NoYW5nZUxheW91dF9sci5vbmNsaWNrID0gdGhpcy5jaGFuZ2VMYXlvdXRfbHIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3JsLm9uY2xpY2sgPSB0aGlzLmNoYW5nZUxheW91dF9ybC5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmJ0bl96b29taW4ub25jbGljayA9IHRoaXMuem9vbUluLmJpbmQodGhpcylcclxuICAgIHRoaXMuYnRuX3pvb21vdXQub25jbGljayA9IHRoaXMuem9vbU91dC5iaW5kKHRoaXMpXHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplTmF2aWdhdG9yKCkge1xyXG4gICAgdmFyIG5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yID0gbmV3IGpvaW50LnVpLk5hdmlnYXRvcih7XHJcbiAgICAgIHdpZHRoOiAyNDAsXHJcbiAgICAgIGhlaWdodDogMTE1LFxyXG4gICAgICBwYXBlclNjcm9sbGVyOiB0aGlzLnBhcGVyU2Nyb2xsZXIsXHJcbiAgICAgIHpvb206IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICAkKCcubmF2aWdhdG9yJykuYXBwZW5kKG5hdmlnYXRvci5lbCk7XHJcbiAgICBuYXZpZ2F0b3IucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJMYXlvdXQoKSB7XHJcbiAgICBsZXQgZ3JhcGhCQm94ID0gam9pbnQubGF5b3V0LkRpcmVjdGVkR3JhcGgubGF5b3V0KHRoaXMuZ3JhcGgsIHtcclxuICAgICAgbm9kZVNlcDogNTAsXHJcbiAgICAgIGVkZ2VTZXA6IDgwLFxyXG4gICAgICBtYXJnaW5YOiAxMDAsXHJcbiAgICAgIG1hcmdpblk6IDIwLFxyXG4gICAgICByYW5rU2VwOiAxMDAsXHJcbiAgICAgIHJhbmtEaXI6IHRoaXMuc3RhdGUucmFua0RpcixcclxuICAgIH0pO1xyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfdGIoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ1RCJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfYnQoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ0JUJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfbHIoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ0xSJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGFuZ2VMYXlvdXRfcmwoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcmFua0RpcjogJ1JMJ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICB6b29tSW4oKSB7XHJcbiAgICB0aGlzLnBhcGVyU2Nyb2xsZXIuem9vbSgwLjIsIHsgbWF4OiAyIH0pO1xyXG4gIH1cclxuICB6b29tT3V0KCkge1xyXG4gICAgdGhpcy5wYXBlclNjcm9sbGVyLnpvb20oLTAuMiwgeyBtaW46IDAuMiB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBNYWluUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHJhbmtEaXI6ICdUQicsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVBhcGVyKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVOYXZpZ2F0b3IoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVG9wb2xvZ3lcIiBzdHlsZT17eyB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCB9fSAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3ktYXBwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3RiID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtdGJcIiBjbGFzc05hbWU9XCJidG5cIj7ihpM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl9jaGFuZ2VMYXlvdXRfYnQgPSBub2RlIH19IGlkPVwiYnRuLWNoYW5nZUxheW91dC1idFwiIGNsYXNzTmFtZT1cImJ0blwiPuKGkTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2NoYW5nZUxheW91dF9sciA9IG5vZGUgfX0gaWQ9XCJidG4tY2hhbmdlTGF5b3V0LWxyXCIgY2xhc3NOYW1lPVwiYnRuXCI+4oaSPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fY2hhbmdlTGF5b3V0X3JsID0gbm9kZSB9fSBpZD1cImJ0bi1jaGFuZ2VMYXlvdXQtcmxcIiBjbGFzc05hbWU9XCJidG5cIj7ihpA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29taW4gPSBub2RlIH19IGlkPVwiYnRuLXpvb21pblwiIGNsYXNzTmFtZT1cImJ0blwiPis8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29tb3V0ID0gbm9kZSB9fSBpZD1cImJ0bi16b29tb3V0XCIgY2xhc3NOYW1lPVwiYnRuXCI+LTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcGVyLWNvbnRhaW5lclwiIHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMucGFwZXJDb250YWluZXIgPSBub2RlIH19ID5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdG9yXCIgaWQ9XCJuYXZpZ2F0b3JcIiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLm5hdmlnYXRvciA9IG5vZGUgfX0gPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAnLi9zdHlsZS9pbmRleCdcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IFRvcG9sb2d5IGZyb20gJy4vbW9kdWxlL3ZpZXcvbWFpbic7XHJcblxyXG5jb25zdCBpbml0ID0gKG1vdW50Tm9kZUlkID0gJ3Jvb3QnLCBvcHQ6IGFueSkgPT4ge1xyXG4gIFJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxUb3BvbG9neVxyXG4gICAgICByYW5rRGlyPXtvcHQucmFua0Rpcn1cclxuICAgICAgYW5pbWF0ZT17b3B0LmFuaW1hdGV9XHJcbiAgICAgIGNpZD17b3B0LmNpZH1cclxuICAgICAgZGF0YT17b3B0LmRhdGF9XHJcbiAgICAgIGltYWdlcz17b3B0LmltYWdlc31cclxuICAgICAgb25EYmxjbGljaz17b3B0Lm9uRGJsY2xpY2t9XHJcbiAgICAgIHdpZHRoPXtvcHQud2lkdGh9XHJcbiAgICAgIGhlaWdodD17b3B0LmhlaWdodH1cclxuICAgIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb3VudE5vZGVJZCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBpbml0LFxyXG4gIFRvcG9sb2d5XHJcbn0iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJSZWFjdC5jcmVhdGVFbGVtZW50IiwiUmVhY3QuQ29tcG9uZW50IiwiUmVhY3RET00ucmVuZGVyIiwiVG9wb2xvZ3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUMvQixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7U0FDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVks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
