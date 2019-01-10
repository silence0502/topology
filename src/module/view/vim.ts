
declare const joint: any
import _ from 'lodash';

let VIM = joint.shapes.basic.Generic.extend({
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

let Link = joint.dia.Link.extend({
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

/*
**连接线与箭头样式
*/
export interface IlinkOption {
    state?: number
    source?: any
    target?: any
    sourceObj?: any
    targetObj?: any
    linkType?: number
    arrowType?: number
}
let linkOption = (opt: IlinkOption) => {
    let option: any = {
        attrs: {
            '.connection': {
                stroke: '#C6C9CA',
                'stroke-dasharray': '',
                'stroke-width': 3
            },
            '.marker-target': {
                stroke: '#C6C9CA', // 箭头边框
                fill: '#C6C9CA', // 箭头颜色
                d: 'M 10 0 L 0 5 L 10 10 z' // 箭头样式
            }
        },
        router: {
            name: 'manhattan',
        },
        connector: {
            name: 'normal'
        }
    }
    if (opt) {
        // option.source = {
        //     x: opt.sourceObj.x + 90,
        //     y: opt.sourceObj.y + 30,
        // }
        // option.target = {
        //     x: opt.targetObj.x,
        //     y: opt.targetObj.y + 20,
        // }
        option.source = { id: opt.source }
        option.target = { id: opt.target }
    }
    option.state = opt.state
    option.linkType = opt.linkType
    option.arrowType = opt.arrowType
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
            option.attrs['.connection'].stroke = '#FF9901'
            option.attrs['.marker-target'].fill = '#FF9901';
            option.attrs['.marker-target'].stroke = '#FF9901';
            break;
        case 3:
            option.attrs['.connection'].stroke = '#DFB202'
            option.attrs['.marker-target'].fill = '#DFB202';
            option.attrs['.marker-target'].stroke = '#DFB202';
            break;
        case 4:
            option.attrs['.connection'].stroke = '#00BFFF'
            option.attrs['.marker-target'].fill = '#00BFFF';
            option.attrs['.marker-target'].stroke = '#00BFFF';
            break;
        default:
            option.attrs['.connection'].stroke = '#C6C9CA';
            option.attrs['.marker-target'].fill = '#C6C9CA';
            option.attrs['.marker-target'].stroke = '#C6C9CA';
            break;
    }
    return option
}

/*
**原件样式
*/
export interface IvimOption {
    id?: string
    name?: string
    status?: string
    type?: string
    alarm?: number
    align?: string
    perf?: number
    x?: number
    y?: number
    displayType?: any
    nodeId?: string
}
/*元件显示文字的长短*/
let getNewString = (str: any) => {
    let realLength = 0, len = str.length, charCode = -1, b = ''
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1
        } else {
            realLength += 2;
        }
        if (realLength <= 18) {
            b = b + str.charAt(i);
        };
    }
    return b;
}
let vimOption = (opt: IvimOption) => {
    let option: any = {
        size: {},
        attrs: {
            '.label': {}, '.type': {}, '.alarm': {}, '.perf': {}, '.logo': {}, '.body': {}
        }
    }
    let dataTooltip = ''
    let align = ''
    if (opt) {
        if (opt.id) {
            option.id = opt.id
        }
        // if (opt.x && opt.y) {
        //     option.position = { x: opt.x, y: opt.y }
        // }
        /*当前图标高亮*/
        if (opt.id === opt.nodeId) {
            option.attrs['.body'].fill = '#e8ad38'
        }
        /*元件的图标*/
        if (opt.displayType) {
            switch (opt.displayType) {
                case 'order':
                    dataIcon = `xlink:href='src/img/order.png'`
                    break;
                case 'ACCOUNT':
                    dataIcon = `xlink:href='src/img/tenant.png'`
                    break;
                case 'rfs':
                    dataIcon = `xlink:href='src/img/service.png'`
                    break;
                case 'cfs':
                    dataIcon = `xlink:href='src/img/service.png'`
                    break;
                default:
                    dataIcon = `xlink:href='src/img/service.png'`
                    break;
            }
        }
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = `data-tooltip="${opt.name}"`
            option.markup = `<g class="rotatable" ${dataTooltip} ${align}>
            <rect class="body"/><text class="label"/><text class="type"/></g>`
        }
        if (opt.name) {
            option.attrs['.label'].text = getNewString(opt.name)
        }
        /*元件的背景是亮还是暗*/
        switch (opt.status) {
            case 'ACTIVE':
                option.attrs['.logo'].fill = '#00B388'
                option.attrs['.body'].stroke = '#00B388'
                break;
            case 'STOP':
                option.attrs['.logo'].fill = '#84756b'
                option.attrs['.body'].stroke = '#84756b'
                break;
            default:
                option.attrs['.logo'].fill = '#00B388'
                option.attrs['.body'].stroke = '#00B388'
                break;
        }
    }
    return option
}

export {
    VIM,
    vimOption,
    Link,
    linkOption
}