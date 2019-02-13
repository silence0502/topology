declare let VIM: any;
declare let Link: any;
export interface IlinkOption {
    state?: number;
    source?: any;
    target?: any;
    sourceObj?: any;
    targetObj?: any;
}
declare let linkOption: (opt: IlinkOption) => any;
export interface IvimOption {
    id?: string;
    name?: string;
    state?: string;
    type?: string;
    desc?: string;
    displayType?: any;
}
declare let vimOption: (opt: IvimOption) => any;
export { VIM, vimOption, Link, linkOption };
