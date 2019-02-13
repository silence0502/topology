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
                fill: '#fff'
            },
            '.body': {
                'ref-width': '100%',
                'ref-height': '100%',
                'rx': '2px',
                'ry': '2px',
                stroke: '#fff',
                'stroke-width': 2,
                fill: '#fff'
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
        option.source = {
            id: opt.source,
            anchor: {
                name: 'right',
                args: {
                    dx: 180,
                    dy: 50
                }
            }
        };
        option.target = {
            id: opt.target,
            anchor: {
                name: 'left',
                args: {
                    dx: 0,
                    dy: 50
                }
            }
        };
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
            '.label': {}, '.body': {}
        }
    };
    var dataTooltip = '';
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
        }
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = "data-tooltip=\"" + opt.name + "\"";
            option.markup = "<g class=\"rotatable\" " + dataTooltip + ">\n            <rect class=\"body\"/><text class=\"label\"/></g>";
        }
        if (opt.name) {
            option.attrs['.label'].text = '名称:' + getNewString(opt.name) + '\n' + '描述:' + getNewString(opt.desc);
        }
        /*元件的背景是亮还是暗*/
        switch (opt.state) {
            case 'ACTIVE':
                option.attrs['.body'].stroke = '#00B388';
                option.attrs['.body'].fill = '#00B388';
                break;
            case 'RESERVED':
                option.attrs['.body'].stroke = '#c73420';
                option.attrs['.body'].fill = '#c73420';
                break;
            case 'DESIGNED':
                option.attrs['.body'].stroke = '#f8cd46';
                option.attrs['.body'].fill = '#f8cd46';
                break;
            case 'PROVISIONED':
                option.attrs['.body'].stroke = '#53bdf9';
                option.attrs['.body'].fill = '#53bdf9';
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
            var de = document.getElementById('topology_open');
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
            visable_instance: true,
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
        paperScroller.render();
        if (this.props.zoomToFit) {
            paperScroller.zoomToFit();
        }
        paperScroller.zoomToFit();
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
         * 解决全屏不显示tooltip
         */
        paper.on('cell:mouseover', function (cellView) {
            if (cellView.model.attributes.type === 'VIM') {
                if (_this.state.isFullScreen === true) {
                    var topology_open = document.getElementById('topology_open');
                    var joint_tooltips = document.getElementsByClassName('joint-tooltip')[0];
                    topology_open.append(joint_tooltips);
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
        this.btn_saveimg.onclick = this.saveImg.bind(this);
        /*
         * 缩略图
         */
        // this.renderNavigator();
        paper.on('cell:pointerclick', function (cellView, evt) {
            if (cellView.model.attributes.type === 'VIM') {
                console.log(cellView);
            }
        });
    };
    Main.prototype.renderNavigator = function () {
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
    //下载图片
    Main.prototype.download = function (filename, imgData) {
        this.downloadFile(filename, imgData);
    };
    //下载
    Main.prototype.downloadFile = function (fileName, content) {
        var aLink = document.createElement('a');
        var blob = this.base64ToBlob(content); //new Blob([content]);
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
    };
    //base64转blob
    Main.prototype.base64ToBlob = function (code) {
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
    };
    Main.prototype.saveImg = function () {
        var paper = this.paper;
        paper.toPNG(function (dataURL) {
            new joint.ui.Lightbox({
                image: dataURL,
                downloadable: true,
            }).open();
            // self.download('topo.png', dataURL)
        }, {
            padding: 10,
        });
    };
    /*
     * 自动布局
     */
    Main.prototype.renderLayout = function () {
        // var graphBBox = joint.layout.DirectedGraph.layout(this.graph, {
        //     nodeSep: 50,
        //     edgeSep: 80,
        //     marginX: 100,
        //     marginY: 100,
        //     rankSep: 80,
        //     rankDir: 'LR'
        // });
        var graphLayout = new joint.layout.TreeLayout({
            graph: this.graph,
            parentGap: 80,
            siblingGap: 100
        });
        var root = this.graph.getElements()[0].position(200, 200);
        graphLayout.layout({ myFlag: true });
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
        this.renderNavigator();
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
        return React.createElement("div", { ref: function (node) { _this.btn_fullscreen = node; }, id: "btn-fullscreen", className: "btn" }, "\u5168\u5C4F");
    };
    Main.prototype.render = function () {
        var _this = this;
        var onMap = this.state.visable_instance === true ? '关闭缩略图' : '打开缩略图';
        return (React.createElement("div", null,
            React.createElement("div", { className: "topology_open", id: "topology_open" },
                React.createElement("div", { className: "topology-app", style: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    } },
                    React.createElement("div", { className: "app-body" },
                        this.renderFullscreenBtn(),
                        React.createElement("div", { ref: function (node) { _this.btn_saveimg = node; }, id: "btn_saveimg", className: "btn" }, "\u5BFC\u51FA\u56FE\u7247"),
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
        data: {},
        center: false,
        zoomToFit: false,
    };
    return Main;
}(React.Component));

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    ReactDOM.render(React.createElement(Main, { animate: opt.animate, cid: opt.cid, data: opt.data, width: opt.width, height: opt.height }), document.getElementById(mountNodeId));
};

//# sourceMappingURL=topology_instance.js.map

exports.init = init;
exports.TopologyInstance = Main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wb2xvZ3lfaW5zdGFuY2UuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvbW9kdWxlL3ZpZXcvdmltLnRzIiwiLi4vc3JjL21vZHVsZS92aWV3L21haW4udHN4IiwiLi4vc3JjL3RvcG9sb2d5X2luc3RhbmNlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5kZWNsYXJlIGNvbnN0IGpvaW50OiBhbnlcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmxldCBWSU0gPSBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5leHRlbmQoe1xyXG4gICAgbWFya3VwOiAnPGcgY2xhc3M9XCJyb3RhdGFibGVcIj48cmVjdCBjbGFzcz1cImJvZHlcIi8+PHJlY3QgY2xhc3M9XCJjYXJkXCIvPjxyZWN0IGNsYXNzPVwiYWxhcm1cIi8+PHJlY3QgY2xhc3M9XCJwZXJmXCIvPjx0ZXh0IGNsYXNzPVwibGFiZWxcIi8+PHRleHQgY2xhc3M9XCJ0eXBlXCIvPjwvZz4nLFxyXG4gICAgZGVmYXVsdHM6IF8uZGVmYXVsdHNEZWVwKHtcclxuICAgICAgICB0eXBlOiAnVklNJyxcclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAnLic6IHtcclxuICAgICAgICAgICAgICAgIG1hZ25ldDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy5sYWJlbCc6IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgJ3JlZi14JzogLjA1LFxyXG4gICAgICAgICAgICAgICAgJ3JlZi15JzogLjEsXHJcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogMTQsXHJcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNmZmYnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcuYm9keSc6IHtcclxuICAgICAgICAgICAgICAgICdyZWYtd2lkdGgnOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAncmVmLWhlaWdodCc6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICdyeCc6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgJ3J5JzogJzJweCcsXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6ICcjZmZmJyxcclxuICAgICAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAyLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyNmZmYnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5wcm90b3R5cGUuZGVmYXVsdHMpLFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqb2ludC5zaGFwZXMuYmFzaWMuR2VuZXJpYy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmxldCBMaW5rID0gam9pbnQuZGlhLkxpbmsuZXh0ZW5kKHtcclxuICAgIGRlZmF1bHRzOiBfLmRlZmF1bHRzRGVlcCh7XHJcbiAgICAgICAgdHlwZTogJ0xpbmsnLFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuY29ubmVjdGlvbic6IHsgc3Ryb2tlOiAnI0M2QzlDQScsICdzdHJva2Utd2lkdGgnOiAxIH0sXHJcbiAgICAgICAgICAgICcubGluay10b29scyc6IHsgZGlzcGxheTogJ25vbmUnIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLWFycm93aGVhZHMnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci12ZXJ0ZXgnOiB7IGRpc3BsYXk6ICdub25lJyB9LFxyXG4gICAgICAgICAgICAnLm1hcmtlci12ZXJ0aWNlcyc6IHsgZGlzcGxheTogJ25vbmUnIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHo6IC0xXHJcbiAgICB9LCBqb2ludC5kaWEuTGluay5wcm90b3R5cGUuZGVmYXVsdHMpLFxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpvaW50LmRpYS5MaW5rLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLypcclxuKirov57mjqXnur/kuI7nrq3lpLTmoLflvI9cclxuKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbGlua09wdGlvbiB7XHJcbiAgICBzdGF0ZT86IG51bWJlclxyXG4gICAgc291cmNlPzogYW55XHJcbiAgICB0YXJnZXQ/OiBhbnlcclxuICAgIHNvdXJjZU9iaj86IGFueVxyXG4gICAgdGFyZ2V0T2JqPzogYW55XHJcbn1cclxubGV0IGxpbmtPcHRpb24gPSAob3B0OiBJbGlua09wdGlvbikgPT4ge1xyXG4gICAgbGV0IG9wdGlvbjogYW55ID0ge1xyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcuY29ubmVjdGlvbic6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLFxyXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiAnJyxcclxuICAgICAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcubWFya2VyLXRhcmdldCc6IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNDNkM5Q0EnLCAvLyDnrq3lpLTovrnmoYZcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjQzZDOUNBJywgLy8g566t5aS06aKc6ImyXHJcbiAgICAgICAgICAgICAgICBkOiAnTSAxMCAwIEwgMCA1IEwgMTAgMTAgeicgLy8g566t5aS05qC35byPXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdXRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbWFuaGF0dGFuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbm5lY3Rvcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChvcHQpIHtcclxuICAgICAgICBvcHRpb24uc291cmNlID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0LnNvdXJjZSxcclxuICAgICAgICAgICAgYW5jaG9yOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgYXJnczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGR4OiAxODAsXHJcbiAgICAgICAgICAgICAgICAgICAgZHk6IDUwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9uLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgaWQ6IG9wdC50YXJnZXQsXHJcbiAgICAgICAgICAgIGFuY2hvcjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgYXJnczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGR4OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5OiA1MFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb3B0aW9uLnN0YXRlID0gb3B0LnNvdXJjZU9iai5zdGF0ZVxyXG4gICAgLyrov57mjqXnur/popzoibIqL1xyXG4gICAgc3dpdGNoIChvcHRpb24uc3RhdGUpIHtcclxuICAgICAgICBjYXNlIFwiQUNUSVZFXCI6XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLXdpZHRoJ10gPSAnMydcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0M2QzlDQSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmNvbm5lY3Rpb24nXVsnc3Ryb2tlLWRhc2hhcnJheSddID0gJzUgMydcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubWFya2VyLXRhcmdldCddLmZpbGwgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLm1hcmtlci10YXJnZXQnXS5zdHJva2UgPSAnI0QxMDAwMic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvblxyXG59XHJcblxyXG4vKlxyXG4qKuWOn+S7tuagt+W8j1xyXG4qL1xyXG5leHBvcnQgaW50ZXJmYWNlIEl2aW1PcHRpb24ge1xyXG4gICAgaWQ/OiBzdHJpbmdcclxuICAgIG5hbWU/OiBzdHJpbmdcclxuICAgIHN0YXRlPzogc3RyaW5nXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBkZXNjPzogc3RyaW5nXHJcbiAgICBkaXNwbGF5VHlwZT86IGFueVxyXG59XHJcbi8q5YWD5Lu25pi+56S65paH5a2X55qE6ZW/55+tKi9cclxubGV0IGdldE5ld1N0cmluZyA9IChzdHI6IGFueSkgPT4ge1xyXG4gICAgbGV0IHJlYWxMZW5ndGggPSAwLCBsZW4gPSBzdHIubGVuZ3RoLCBjaGFyQ29kZSA9IC0xLCBiID0gJydcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpXHJcbiAgICAgICAgaWYgKGNoYXJDb2RlID49IDAgJiYgY2hhckNvZGUgPD0gMTI4KSB7XHJcbiAgICAgICAgICAgIHJlYWxMZW5ndGggKz0gMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlYWxMZW5ndGggKz0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlYWxMZW5ndGggPD0gMTgpIHtcclxuICAgICAgICAgICAgYiA9IGIgKyBzdHIuY2hhckF0KGkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYjtcclxufVxyXG5sZXQgdmltT3B0aW9uID0gKG9wdDogSXZpbU9wdGlvbikgPT4ge1xyXG4gICAgbGV0IG9wdGlvbjogYW55ID0ge1xyXG4gICAgICAgIHNpemU6IHt9LFxyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICcubGFiZWwnOiB7fSwgJy5ib2R5Jzoge31cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgZGF0YVRvb2x0aXAgPSAnJ1xyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICAgIGlmIChvcHQuaWQpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmlkID0gb3B0LmlkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8q5YWD5Lu255qEU1ZHKi9cclxuICAgICAgICBpZiAob3B0Lm5hbWUpIHtcclxuICAgICAgICAgICAgZGF0YVRvb2x0aXAgPSBgZGF0YS10b29sdGlwPVwiJHtvcHQubmFtZX1cImBcclxuICAgICAgICAgICAgb3B0aW9uLm1hcmt1cCA9IGA8ZyBjbGFzcz1cInJvdGF0YWJsZVwiICR7ZGF0YVRvb2x0aXB9PlxyXG4gICAgICAgICAgICA8cmVjdCBjbGFzcz1cImJvZHlcIi8+PHRleHQgY2xhc3M9XCJsYWJlbFwiLz48L2c+YFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0Lm5hbWUpIHtcclxuICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycubGFiZWwnXS50ZXh0ID0gJ+WQjeensDonICsgZ2V0TmV3U3RyaW5nKG9wdC5uYW1lKSArICdcXG4nICsgJ+aPj+i/sDonICsgZ2V0TmV3U3RyaW5nKG9wdC5kZXNjKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKuWFg+S7tueahOiDjOaZr+aYr+S6rui/mOaYr+aalyovXHJcbiAgICAgICAgc3dpdGNoIChvcHQuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnQUNUSVZFJzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzAwQjM4OCdcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5maWxsID0gJyMwMEIzODgnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUkVTRVJWRUQnOlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLnN0cm9rZSA9ICcjYzczNDIwJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmF0dHJzWycuYm9keSddLmZpbGwgPSAnI2M3MzQyMCdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdERVNJR05FRCc6XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uc3Ryb2tlID0gJyNmOGNkNDYnXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cnNbJy5ib2R5J10uZmlsbCA9ICcjZjhjZDQ2J1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BST1ZJU0lPTkVEJzpcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5zdHJva2UgPSAnIzUzYmRmOSdcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyc1snLmJvZHknXS5maWxsID0gJyM1M2JkZjknXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBWSU0sXHJcbiAgICB2aW1PcHRpb24sXHJcbiAgICBMaW5rLFxyXG4gICAgbGlua09wdGlvblxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWSU0sIExpbmssIHZpbU9wdGlvbiwgbGlua09wdGlvbiB9IGZyb20gJy4vdmltJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSBsZXQgVjogYW55XHJcbmRlY2xhcmUgY29uc3Qgam9pbnQ6IGFueVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xyXG4gICAgYW5pbWF0ZT86IGJvb2xlYW5cclxuICAgIHdpZHRoPzogYW55XHJcbiAgICBoZWlnaHQ/OiBhbnlcclxuICAgIGRyYXdHcmlkPzogYm9vbGVhblxyXG4gICAgb25DbGljaz86IEZ1bmN0aW9uXHJcbiAgICBkYXRhOiBhbnlcclxuICAgIGNlbnRlcj86IGJvb2xlYW5cclxuICAgIHpvb21Ub0ZpdD86IGJvb2xlYW5cclxuICAgIHBhcGVyX3dpZHRoPzogbnVtYmVyXHJcbiAgICBwYXBlcl9oZWlnaHQ/OiBudW1iZXJcclxuICAgIGNpZD86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE1haW5Qcm9wcywgYW55PiB7XHJcbiAgICAvLyBDb25hdGluZXJcclxuICAgIHBhcGVyQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX21vcmU6IEhUTUxEaXZFbGVtZW50XHJcbiAgICBidG5fem9vbWluOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX21hcDogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl96b29tb3V0OiBIVE1MRGl2RWxlbWVudFxyXG4gICAgbmF2aTogSFRNTERpdkVsZW1lbnRcclxuICAgIGJ0bl9mdWxsc2NyZWVuOiBIVE1MRGl2RWxlbWVudFxyXG4gICAgYnRuX3NhdmVpbWc6IEhUTUxEaXZFbGVtZW50XHJcblxyXG4gICAgLy8gcmFwcGlkIHRoaW5nc1xyXG4gICAgZ3JhcGg6IGpvaW50LmRpYS5HcmFwaDtcclxuICAgIGdyYXBoMjogam9pbnQuZGlhLkdyYXBoO1xyXG4gICAgY29tbWFuZE1hbmFnZXI6IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcjtcclxuICAgIHBhcGVyOiBqb2ludC5kaWEuUGFwZXI7XHJcbiAgICBwYXBlclNjcm9sbGVyOiBqb2ludC51aS5QYXBlclNjcm9sbGVyO1xyXG4gICAgbmF2aWdhdG9yOiBqb2ludC51aS5OYXZpZ2F0b3I7XHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBNYWluUHJvcHMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICB3aWR0aDogODAwLFxyXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG4gICAgICAgIHBhcGVyX3dpZHRoOiAxMDAwLFxyXG4gICAgICAgIHBhcGVyX2hlaWdodDogMTAwMCxcclxuICAgICAgICBkcmF3R3JpZDogZmFsc2UsXHJcbiAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgY2VudGVyOiBmYWxzZSxcclxuICAgICAgICB6b29tVG9GaXQ6IGZhbHNlLFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7kvKDpgJLliqjnlLtcclxuICAgICAqL1xyXG4gICAgZG9BbmltYXRlKCkge1xyXG4gICAgICAgIGxldCBncmFwaCA9IHRoaXMuZ3JhcGhcclxuICAgICAgICBsZXQgcGFwZXIgPSB0aGlzLnBhcGVyXHJcbiAgICAgICAgZ3JhcGgub24oJ3NpZ25hbCcsIGZ1bmN0aW9uIChjZWxsOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIGpvaW50LmRpYS5MaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5hdHRyaWJ1dGVzLnN0YXRlID09PSAnQUNUSVZFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gZ3JhcGguZ2V0Q2VsbChjZWxsLmdldCgndGFyZ2V0JykuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzOiBhbnkgPSBwYXBlci5maW5kVmlld0J5TW9kZWwoY2VsbClcclxuICAgICAgICAgICAgICAgICAgICBzLnNlbmRUb2tlbihWKCdjaXJjbGUnLCB7IHI6IDcsIGZpbGw6ICdncmVlbicgfSkubm9kZSwgMTAwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG91dGJvdW5kTGlua3MgPSBncmFwaC5nZXRDb25uZWN0ZWRMaW5rcyhjZWxsLCB7IG91dGJvdW5kOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKG91dGJvdW5kTGlua3MsIGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluay50cmlnZ2VyKCdzaWduYWwnLCBsaW5rKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzOiBhbnkgPSBbXVxyXG4gICAgICAgIGxldCB0YXJnZXRzOiBhbnkgPSBbXVxyXG4gICAgICAgIF8ubWFwKGdyYXBoLmdldExpbmtzKCksIChsaW5rOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc291cmNlcy5wdXNoKGxpbmsuZ2V0KCdzb3VyY2UnKS5pZClcclxuICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKGxpbmsuZ2V0KCd0YXJnZXQnKS5pZClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCB0cmlnZ2VycyA9IF8uc29ydGVkVW5pcShfLmRpZmZlcmVuY2Uoc291cmNlcywgdGFyZ2V0cykpXHJcbiAgICAgICAgZnVuY3Rpb24gc2ltdWxhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfLm1hcCh0cmlnZ2VycywgKHRyaWdnZXI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gZ3JhcGguZ2V0Q2VsbCh0cmlnZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZWxsLnRyaWdnZXIoJ3NpZ25hbCcsIHRhcmdldENlbGwpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNpbXVsYXRlKClcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pWw5o2u6Kej5p6QXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmi5PmiZHmlbDmja5cclxuICAgICAqL1xyXG4gICAgcGFyc2VEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChkYXRhLm5vZGVzKSB7XHJcbiAgICAgICAgICAgIF8ubWFwKGRhdGEubm9kZXMsIChub2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIaWdobGlnaHQ6IChub2RlLmlkID09PSB0aGlzLnByb3BzLmNpZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ldyBWSU0odmltT3B0aW9uKF8ubWVyZ2Uobm9kZSwgb3B0KSkpLmFkZFRvKHRoaXMuZ3JhcGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3MpIHtcclxuICAgICAgICAgICAgXy5tYXAodGhpcy5wcm9wcy5kYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgKiDliJ3lp4vljJbnlLvluINcclxuICAgICovXHJcbiAgICBpbml0aWFsaXplUGFwZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaDtcclxuICAgICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbmV3IGpvaW50LmRpYS5Db21tYW5kTWFuYWdlcih7IGdyYXBoOiBncmFwaCB9KTtcclxuICAgICAgICBjb25zdCBwYXBlciA9IHRoaXMucGFwZXIgPSBuZXcgam9pbnQuZGlhLlBhcGVyKHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMucGFwZXJfd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5wYXBlcl9oZWlnaHQsXHJcbiAgICAgICAgICAgIGdyaWRTaXplOiAxMCxcclxuICAgICAgICAgICAgZHJhd0dyaWQ6IHRoaXMucHJvcHMuZHJhd0dyaWQsXHJcbiAgICAgICAgICAgIG1vZGVsOiBncmFwaCxcclxuICAgICAgICAgICAgcGVycGVuZGljdWxhckxpbmtzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXN0cmljdFRyYW5zbGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLCAvKuaYr+WQpuWPr+S7peaLluWKqCovXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYXJzZURhdGEodGhpcy5wcm9wcy5kYXRhKVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kb0FuaW1hdGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXBlclNjcm9sbGVyID0gdGhpcy5wYXBlclNjcm9sbGVyID0gbmV3IGpvaW50LnVpLlBhcGVyU2Nyb2xsZXIoe1xyXG4gICAgICAgICAgICBwYXBlcixcclxuICAgICAgICAgICAgYXV0b1Jlc2l6ZVBhcGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdncmFiJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcGVyLm9uKCdibGFuazpwb2ludGVyZG93bicsIHBhcGVyU2Nyb2xsZXIuc3RhcnRQYW5uaW5nKTtcclxuICAgICAgICAkKHRoaXMucGFwZXJDb250YWluZXIpLmFwcGVuZChwYXBlclNjcm9sbGVyLmVsKTtcclxuICAgICAgICB0aGlzLnJlbmRlckxheW91dCgpXHJcbiAgICAgICAgcGFwZXJTY3JvbGxlci5yZW5kZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy56b29tVG9GaXQpIHsgcGFwZXJTY3JvbGxlci56b29tVG9GaXQoKSB9XHJcbiAgICAgICAgcGFwZXJTY3JvbGxlci56b29tVG9GaXQoKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogdG9vbHRpcOWIneWni+WMllxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0b29sX3RpcCA9IG5ldyBqb2ludC51aS5Ub29sdGlwKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnW2RhdGEtdG9vbHRpcF0nLFxyXG4gICAgICAgICAgICBjb250ZW50OiAodGFyZ2V0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0aXBzID0gXy5zcGxpdCh0YXJnZXQuYXR0cmlidXRlc1snZGF0YS10b29sdGlwJ10ubm9kZVZhbHVlLCAnfCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tYXAodGlwcywgKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRpcHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGlwc1swXSAhPT0gdGlwc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke2l0ZW19PC9iPjxociAvPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiDop6PlhrPlhajlsY/kuI3mmL7npLp0b29sdGlwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGFwZXIub24oJ2NlbGw6bW91c2VvdmVyJywgKGNlbGxWaWV3OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGxWaWV3Lm1vZGVsLmF0dHJpYnV0ZXMudHlwZSA9PT0gJ1ZJTScpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3BvbG9neV9vcGVuOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3lfb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpvaW50X3Rvb2x0aXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnam9pbnQtdG9vbHRpcCcpWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wb2xvZ3lfb3Blbi5hcHBlbmQoam9pbnRfdG9vbHRpcHMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIOaMiemSrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnRuX21hcC5vbmNsaWNrID0gdGhpcy5zbWFsbF9tYXAuYmluZCh0aGlzKVxyXG4gICAgICAgIHRoaXMuYnRuX3pvb21pbi5vbmNsaWNrID0gdGhpcy56b29tSW4uYmluZCh0aGlzKVxyXG4gICAgICAgIHRoaXMuYnRuX3pvb21vdXQub25jbGljayA9IHRoaXMuem9vbU91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fZnVsbHNjcmVlbi5vbmNsaWNrID0gdGhpcy5mdWxsU2NyZWVuLmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLmJ0bl9zYXZlaW1nLm9uY2xpY2sgPSB0aGlzLnNhdmVJbWcuYmluZCh0aGlzKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICog57yp55Wl5Zu+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXJOYXZpZ2F0b3IoKTtcclxuXHJcbiAgICAgICAgcGFwZXIub24oJ2NlbGw6cG9pbnRlcmNsaWNrJywgKGNlbGxWaWV3OiBhbnksIGV2dDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsVmlldy5tb2RlbC5hdHRyaWJ1dGVzLnR5cGUgPT09ICdWSU0nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjZWxsVmlldyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlck5hdmlnYXRvcigpIHtcclxuICAgICAgICBsZXQgbmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3IgPSBuZXcgam9pbnQudWkuTmF2aWdhdG9yKHtcclxuICAgICAgICAgICAgd2lkdGg6IDI0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMTUsXHJcbiAgICAgICAgICAgIHBhcGVyU2Nyb2xsZXI6IHRoaXMucGFwZXJTY3JvbGxlcixcclxuICAgICAgICAgICAgem9vbTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGlzLm5hdmkpLmFwcGVuZChuYXZpZ2F0b3IuZWwpO1xyXG4gICAgICAgIG5hdmlnYXRvci5yZW5kZXIoKVxyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAqIOaJk+W8gOWFs+mXree8qeeVpeWbvlxyXG4gICAgICovXHJcbiAgICBzbWFsbF9tYXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlzYWJsZV9pbnN0YW5jZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZpc2FibGVfaW5zdGFuY2U6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB2aXNhYmxlX2luc3RhbmNlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/kuIvovb3lm77niYdcclxuICAgIGRvd25sb2FkKGZpbGVuYW1lOiBzdHJpbmcsIGltZ0RhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZG93bmxvYWRGaWxlKGZpbGVuYW1lLCBpbWdEYXRhKVxyXG4gICAgfVxyXG4gICAgLy/kuIvovb1cclxuICAgIGRvd25sb2FkRmlsZShmaWxlTmFtZTogYW55LCBjb250ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgYUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbGV0IGJsb2IgPSB0aGlzLmJhc2U2NFRvQmxvYihjb250ZW50KTsgLy9uZXcgQmxvYihbY29udGVudF0pO1xyXG5cclxuICAgICAgICBsZXQgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xyXG4gICAgICAgIGV2dC5pbml0RXZlbnQoXCJjbGlja1wiLCB0cnVlLCB0cnVlKTsgLy9pbml0RXZlbnQg5LiN5Yqg5ZCO5Lik5Liq5Y+C5pWw5ZyoRkbkuIvkvJrmiqXplJkgIOS6i+S7tuexu+Wei++8jOaYr+WQpuWGkuazoe+8jOaYr+WQpumYu+atoua1j+iniOWZqOeahOm7mOiupOihjOS4ulxyXG4gICAgICAgIGFMaW5rLmRvd25sb2FkID0gZmlsZU5hbWU7XHJcbiAgICAgICAgYUxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICB9XHJcbiAgICAvL2Jhc2U2NOi9rGJsb2JcclxuICAgIGJhc2U2NFRvQmxvYihjb2RlOiBhbnkpIHtcclxuICAgICAgICBsZXQgcGFydHMgPSBjb2RlLnNwbGl0KCc7YmFzZTY0LCcpO1xyXG4gICAgICAgIGxldCBjb250ZW50VHlwZSA9IHBhcnRzWzBdLnNwbGl0KCc6JylbMV07XHJcbiAgICAgICAgbGV0IHJhdyA9IHdpbmRvdy5hdG9iKHBhcnRzWzFdKTtcclxuICAgICAgICBsZXQgcmF3TGVuZ3RoID0gcmF3Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgbGV0IHVJbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShyYXdMZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd0xlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHVJbnQ4QXJyYXlbaV0gPSByYXcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt1SW50OEFycmF5XSwge1xyXG4gICAgICAgICAgICB0eXBlOiBjb250ZW50VHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2F2ZUltZygpIHtcclxuICAgICAgICBsZXQgcGFwZXIgPSB0aGlzLnBhcGVyO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHBhcGVyLnRvUE5HKGZ1bmN0aW9uIChkYXRhVVJMOiBhbnkpIHtcclxuICAgICAgICAgICAgbmV3IGpvaW50LnVpLkxpZ2h0Ym94KHtcclxuICAgICAgICAgICAgICAgIGltYWdlOiBkYXRhVVJMLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuZG93bmxvYWQoJ3RvcG8ucG5nJywgZGF0YVVSTClcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIOaJk+W8gOWFs+mXreWFqOWxj1xyXG4gICAgICovXHJcbiAgICBmdWxsU2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog6L+b5YWl5YWo5bGPXHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3RGdWxsU2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBkZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcG9sb2d5X29wZW4nKTtcclxuICAgICAgICBpZiAoZGUucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUucmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICBkZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICog6YCA5Ye65YWo5bGPXHJcbiAgICAgKi9cclxuICAgIGV4aXRGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBkZTogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgaWYgKGRlLmV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZS5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRlLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlLndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZGUud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKlxyXG4gICAgKiDnm5HlkKxmdWxsc2NyZWVuY2hhbmdl5LqL5Lu2XHJcbiAgICAqL1xyXG4gICAgd2F0Y2hGdWxsU2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGU6IGFueSA9IGRvY3VtZW50XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS5mdWxsc2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS5tb3pGdWxsU2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGdWxsU2NyZWVuOiBkZS53ZWJraXRJc0Z1bGxTY3JlZW5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog6Ieq5Yqo5biD5bGAIFxyXG4gICAgICovXHJcbiAgICByZW5kZXJMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gdmFyIGdyYXBoQkJveCA9IGpvaW50LmxheW91dC5EaXJlY3RlZEdyYXBoLmxheW91dCh0aGlzLmdyYXBoLCB7XHJcbiAgICAgICAgLy8gICAgIG5vZGVTZXA6IDUwLFxyXG4gICAgICAgIC8vICAgICBlZGdlU2VwOiA4MCxcclxuICAgICAgICAvLyAgICAgbWFyZ2luWDogMTAwLFxyXG4gICAgICAgIC8vICAgICBtYXJnaW5ZOiAxMDAsXHJcbiAgICAgICAgLy8gICAgIHJhbmtTZXA6IDgwLFxyXG4gICAgICAgIC8vICAgICByYW5rRGlyOiAnTFInXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdmFyIGdyYXBoTGF5b3V0ID0gbmV3IGpvaW50LmxheW91dC5UcmVlTGF5b3V0KHtcclxuICAgICAgICAgICAgZ3JhcGg6IHRoaXMuZ3JhcGgsXHJcbiAgICAgICAgICAgIHBhcmVudEdhcDogODAsXHJcbiAgICAgICAgICAgIHNpYmxpbmdHYXA6IDEwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByb290ID0gdGhpcy5ncmFwaC5nZXRFbGVtZW50cygpWzBdLnBvc2l0aW9uKDIwMCwgMjAwKTtcclxuICAgICAgICBncmFwaExheW91dC5sYXlvdXQoeyBteUZsYWc6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5biD5bGA5ZCO55qE6L+e57q/XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckxpbmtzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGlua3MpIHtcclxuICAgICAgICAgICAgXy5tYXAodGhpcy5wcm9wcy5kYXRhLmxpbmtzLCAobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IExpbmsobGlua09wdGlvbihsaW5rKSkuYWRkVG8odGhpcy5ncmFwaClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICog5pS+5aSn57yp5bCPXHJcbiAgICAgKi9cclxuICAgIHpvb21JbigpIHtcclxuICAgICAgICB0aGlzLnBhcGVyU2Nyb2xsZXIuem9vbSgwLjIsIHsgbWF4OiAyIH0pO1xyXG4gICAgfVxyXG4gICAgem9vbU91dCgpIHtcclxuICAgICAgICB0aGlzLnBhcGVyU2Nyb2xsZXIuem9vbSgtMC4yLCB7IG1pbjogMC4yIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IE1haW5Qcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2aXNhYmxlX2luc3RhbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVQYXBlcigpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJOYXZpZ2F0b3IoKTtcclxuICAgICAgICB0aGlzLndhdGNoRnVsbFNjcmVlbigpXHJcbiAgICB9XHJcbiAgICByZW5kZXJNYXAoKSB7XHJcbiAgICAgICAgbGV0IHsgdmlzYWJsZV9pbnN0YW5jZSB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgICAgIGlmICh2aXNhYmxlX2luc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIGlkPVwibmF2aWdhdG9yX2luc3RhbmNlXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpID0gbm9kZSB9fSAvPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvcl9pbnN0YW5jZVwiIGlkPVwibmF2aWdhdG9yX2luc3RhbmNlXCIgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5uYXZpID0gbm9kZSB9fSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXJGdWxsc2NyZWVuQnRuKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX2Z1bGxzY3JlZW4gPSBub2RlIH19IGlkPVwiYnRuLWZ1bGxzY3JlZW5cIiBjbGFzc05hbWU9XCJidG5cIj7lhajlsY88L2Rpdj5cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgb25NYXAgPSB0aGlzLnN0YXRlLnZpc2FibGVfaW5zdGFuY2UgPT09IHRydWUgPyAn5YWz6Zet57yp55Wl5Zu+JyA6ICfmiZPlvIDnvKnnlaXlm74nXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3lfb3BlblwiIGlkPVwidG9wb2xvZ3lfb3BlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wb2xvZ3ktYXBwXCIgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGdWxsc2NyZWVuQnRuKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX3NhdmVpbWcgPSBub2RlIH19IGlkPVwiYnRuX3NhdmVpbWdcIiBjbGFzc05hbWU9XCJidG5cIj7lr7zlh7rlm77niYc8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHsgdGhpcy5idG5fbWFwID0gbm9kZSB9fSBpZD1cImJ0bi1tYXBcIiBjbGFzc05hbWU9XCJidG5cIj57b25NYXB9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7IHRoaXMuYnRuX3pvb21pbiA9IG5vZGUgfX0gaWQ9XCJidG4tem9vbWluXCIgY2xhc3NOYW1lPVwiYnRuXCI+KzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLmJ0bl96b29tb3V0ID0gbm9kZSB9fSBpZD1cImJ0bi16b29tb3V0XCIgY2xhc3NOYW1lPVwiYnRuXCI+LTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXBlci1jb250YWluZXJcIiByZWY9eyhub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4geyB0aGlzLnBhcGVyQ29udGFpbmVyID0gbm9kZSB9fSA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXAoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgJy4vc3R5bGUvaW5kZXgnXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCBUb3BvbG9neUluc3RhbmNlIGZyb20gJy4vbW9kdWxlL3ZpZXcvbWFpbic7XHJcblxyXG5jb25zdCBpbml0ID0gKG1vdW50Tm9kZUlkID0gJ3Jvb3QnLCBvcHQ6IGFueSkgPT4ge1xyXG4gIFJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxUb3BvbG9neUluc3RhbmNlXHJcbiAgICAgIGFuaW1hdGU9e29wdC5hbmltYXRlfVxyXG4gICAgICBjaWQ9e29wdC5jaWR9XHJcbiAgICAgIGRhdGE9e29wdC5kYXRhfVxyXG4gICAgICB3aWR0aD17b3B0LndpZHRofVxyXG4gICAgICBoZWlnaHQ9e29wdC5oZWlnaHR9XHJcbiAgICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW91bnROb2RlSWQpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgaW5pdCxcclxuICBUb3BvbG9neUluc3RhbmNlXHJcbn0iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJSZWFjdC5jcmVhdGVFbGVtZW50IiwiUmVhY3QuQ29tcG9uZW50IiwiUmVhY3RET00ucmVuZGVyIiwiVG9wb2xvZ3lJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNoQyxFQUFF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
