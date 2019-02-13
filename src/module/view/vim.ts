
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
                name: 'right',
                args: {
                    dx: 180,
                    dy: 50
                }
            }
        }
        option.target = {
            id: opt.target,
            anchor: {
                name: 'left',
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
    state?: string
    type?: string
    desc?: string
    displayType?: any
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
            '.label': {}, '.body': {}
        }
    }
    let dataTooltip = ''
    if (opt) {
        if (opt.id) {
            option.id = opt.id
        }
        /*元件的SVG*/
        if (opt.name) {
            dataTooltip = `data-tooltip="${opt.name}"`
            option.markup = `<g class="rotatable" ${dataTooltip}>
            <rect class="body"/><text class="label"/></g>`
        }
        if (opt.name) {
            option.attrs['.label'].text = '名称:' + getNewString(opt.name) + '\n' + '描述:' + getNewString(opt.desc)
        }
        /*元件的背景是亮还是暗*/
        switch (opt.state) {
            case 'ACTIVE':
                option.attrs['.body'].stroke = '#00B388'
                option.attrs['.body'].fill = '#00B388'
                break;
            case 'RESERVED':
                option.attrs['.body'].stroke = '#c73420'
                option.attrs['.body'].fill = '#c73420'
                break;
            case 'DESIGNED':
                option.attrs['.body'].stroke = '#f8cd46'
                option.attrs['.body'].fill = '#f8cd46'
                break;
            case 'PROVISIONED':
                option.attrs['.body'].stroke = '#53bdf9'
                option.attrs['.body'].fill = '#53bdf9'
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