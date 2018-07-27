
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
export interface IlinkOption {
    state?: number
    source?: string
    target?: string
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
                option.attrs['.connection'].stroke = '#FF9901'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '';
                option.attrs['.marker-target'].stroke = '';
                option.attrs['.marker-target'].d = '';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#DFB202';
                option.attrs['.marker-target'].stroke = '#DFB202';
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 0 5 z';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#00BFFF';
                option.attrs['.marker-target'].stroke = '#00BFFF';
                option.attrs['.marker-target'].d = 'M 10 0 L 0 5 L 10 10 L 20 5 z';
                break;
            default:
                option.attrs['.connection'].stroke = '#31d0c6'
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                option.attrs['.marker-target'].fill = '#31d0c6';
                option.attrs['.marker-target'].stroke = '#31d0c6'
                break;
        }
    }
    return option
}

export interface IvimOption {
    id?: string
    desc?: string
    label?: string
    state?: number
    type?: string
    bizFields?: any
    isHighlight?: boolean
    switches?: any
    router?: any
    firewall?: any
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
        if (opt.isHighlight) {
            option.attrs['.body'].stroke = '#2AD2C9'
        }
        if (opt.bizFields) {
            option.bizFields = opt.bizFields
        }
        if (opt.label) {
            dataTooltip = `data-tooltip="${opt.label}"`
            switch (opt.type) {
                case 'switches':
                    dataIcon = `xlink:href=${opt.switches}`
                    break;
                case 'router':
                    dataIcon = `xlink:href=${opt.router}`
                    break;
                case 'firewall':
                    dataIcon = `xlink:href=${opt.firewall}`
                    break;
                case 'server':
                    dataIcon = `xlink:href=${opt.server}`
                    break;
                default:
                    dataIcon = `xlink:href=${opt.switches}`
                    break;
            }
            option.markup = `<g class="rotatable" ${dataTooltip}><image ${dataIcon} x="0" y="0" height="100px" width="100px"/> </g>`
        }
        if (opt.type) {
            option.attrs['.label'].text = opt.type
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
    return option
}


export {
    VIM,
    vimOption,
    Link,
    linkOption
}