import * as React from 'react';
export interface MainProps {
    animate?: boolean;
    width?: any;
    height?: any;
    drawGrid?: boolean;
    rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
    onDblclick?: Function;
    data: any;
    images: any;
    center?: boolean;
    zoomToFit?: boolean;
    paper_width?: number;
    paper_height?: number;
    cid?: string;
}
export default class Main extends React.Component<MainProps, any> {
    paperContainer: HTMLDivElement;
    btn_changeLayout_tb: HTMLDivElement;
    btn_changeLayout_bt: HTMLDivElement;
    btn_changeLayout_lr: HTMLDivElement;
    btn_changeLayout_rl: HTMLDivElement;
    btn_zoomin: HTMLDivElement;
    btn_zoomout: HTMLDivElement;
    navigator: HTMLDivElement;
    contextmenu: HTMLDivElement;
    graph: joint.dia.Graph;
    commandManager: joint.dia.CommandManager;
    paper: joint.dia.Paper;
    snaplines: joint.ui.Snaplines;
    paperScroller: joint.ui.PaperScroller;
    static defaultProps: MainProps;
    /**
     * 数据传递动画
     */
    doAnimate(): void;
    /**
     * 数据解析
     * @param data 拓扑数据
     */
    parseData(data: any, images: any): void;
    initializePaper(): void;
    initializeNavigator(): void;
    renderLayout(): void;
    changeLayout_tb(): void;
    changeLayout_bt(): void;
    changeLayout_lr(): void;
    changeLayout_rl(): void;
    zoomIn(): void;
    zoomOut(): void;
    renderContextmenu(): JSX.Element;
    constructor(props: MainProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
