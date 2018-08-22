
declare const joint: any
import _ from 'lodash';

let VIM = joint.shapes.basic.Generic.extend({
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

let Link = joint.dia.Link.extend({
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

/*
**连接线与箭头样式
*/
export interface IlinkOption {
    state?: number
    source?: string
    target?: string
    type?: number
}
let linkOption = (opt: IlinkOption) => {
    let option: any = {
        attrs: {
            '.connection': {
                stroke: '#C6C9CA',
                'stroke-dasharray': ''
            },
            '.marker-target': {
                stroke: '#C6C9CA',//箭头边框
                fill: '#C6C9CA',//箭头颜色
                d: 'M 10 0 L 0 5 L 10 10 z'//箭头样式
            },
        }
    }
    if (opt) {
        option.state = opt.state
        option.source = {
            id: opt.source
        }
        option.target = {
            id: opt.target
        }
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
                option.attrs['.connection'].stroke = '#FF9901'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#FF9901';
                option.attrs['.marker-target'].stroke = '#FF9901';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                break;
            default:
                option.attrs['.connection'].stroke = '#31d0c6'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#31d0c6';
                option.attrs['.marker-target'].stroke = '#31d0c6'
                break;
        }
        switch (opt.type) {
            case 0:
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 z';  //三角箭头
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
    return option
}

/*
**原件样式
*/
export interface IvimOption {
    id?: string
    desc?: string
    label?: string
    state?: number
    type?: string
    bizFields?: any
    isHighlight?: boolean
    switch?: any
    vm?: any
    vnf?: any
    vnfc?: any
    server?: any
}
let vimOption = (opt: IvimOption) => {
    let option: any = { size: {}, attrs: { '.label': {}, '.type': {}, '.alarm': {}, '.body': {} } }
    let dataTooltip = ''
    let dataIcon = ''
    if (opt) {
        if (opt.id) {
            option.id = opt.id
        }
        if (opt.bizFields) {
            option.bizFields = opt.bizFields
        }
        if (opt.label) {
            dataTooltip = `data-tooltip="${opt.label}"`
            switch (opt.type) {
                case 'switch':
                    dataIcon = `xlink:href=${opt.switch}`
                    break;
                case 'vm':
                    dataIcon = `xlink:href=${opt.vm}`
                    break;
                case 'vnf':
                    dataIcon = `xlink:href=${opt.vnf}`
                    break;
                case 'vnfc':
                    dataIcon = `xlink:href=${opt.vnfc}`
                    break;
                case 'server':
                    dataIcon = `xlink:href=${opt.server}`
                    break;
                default:
                    dataIcon = `xlink:href=${opt.switch}`
                    break;
            }
            option.markup = `<g class="rotatable" ${dataTooltip}><image ${dataIcon} x="0" y="0" height="50px" width="50px"/> </g>`
        }
        if (opt.type) {
            option.attrs['.label'].text = opt.type
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