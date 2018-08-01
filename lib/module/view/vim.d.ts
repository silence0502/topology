declare let VIM: any;
declare let Link: any;
export interface IlinkOption {
    state?: number;
    source?: string;
    target?: string;
    type?: number;
}
declare let linkOption: (opt: IlinkOption) => any;
export interface IvimOption {
    id?: string;
    desc?: string;
    label?: string;
    state?: number;
    type?: string;
    bizFields?: any;
    isHighlight?: boolean;
    switch?: any;
    vm?: any;
    vnf?: any;
    vnfc?: any;
    server?: any;
}
declare let vimOption: (opt: IvimOption) => any;
export { VIM, vimOption, Link, linkOption };
