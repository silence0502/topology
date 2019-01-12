
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
        option.source = {
            id: opt.source,
            anchor: {
                name: 'bottomLeft',
                args: {
                    dx: 180,
                    dy: 50
                }
            }
        }
        option.target = {
            id: opt.target,
            anchor: {
                name: 'bottomLeft',
                args: {
                    dx: 0,
                    dy: 50
                }
            }
        }
    }
    option.state = opt.sourceObj.state
    /*连接线颜色*/
    switch (option.state) {
        case "ACTIVE":
            option.attrs['.connection'].stroke = '#C6C9CA';
            option.attrs['.connection']['stroke-width'] = '3'
            option.attrs['.marker-target'].fill = '#C6C9CA';
            option.attrs['.marker-target'].stroke = '#C6C9CA';
            break;
        default:
            option.attrs['.connection'].stroke = '#D10002';
            option.attrs['.connection']['stroke-dasharray'] = '5 3'
            option.attrs['.marker-target'].fill = '#D10002';
            option.attrs['.marker-target'].stroke = '#D10002';
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
    state?: string
    type?: string
    desc?: string
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
    if (opt) {
        if (opt.id) {
            option.id = opt.id
        }
        switch (opt.state) {
            case 'ACTIVE':
                option.attrs['.body']['stroke-width'] = '2'
                break;
            default:
                option.attrs['.body']['stroke-dasharray'] = '5 3'
                break;
        }
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = `data-tooltip="${opt.name}"`
            option.markup = `<g class="rotatable" ${dataTooltip}>
            <rect class="body"/><text class="label"/><text class="type"/></g>`
        }
        if (opt.name) {
            option.attrs['.label'].text = '名称:' + getNewString(opt.name) + '\n' + '描述:' + getNewString(opt.desc)
        }
        /*元件的背景是亮还是暗*/
        switch (opt.state) {
            case 'ACTIVE':
                option.attrs['.logo'].fill = '#00B388'
                option.attrs['.body'].stroke = '#00B388'
                break;
            default:
                option.attrs['.logo'].fill = '#84756b'
                option.attrs['.body'].stroke = '#84756b'
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