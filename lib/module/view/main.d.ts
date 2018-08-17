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
    btn_function_1: HTMLDivElement;
    btn_function_2: HTMLDivElement;
    btn_function_3: HTMLDivElement;
    btn_function_4: HTMLDivElement;
    btn_more: HTMLDivElement;
    btn_zoomin: HTMLDivElement;
    btn_map: HTMLDivElement;
    btn_zoomout: HTMLDivElement;
    navigator: HTMLDivElement;
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
    small_map(): void;
    function_1(): void;
    function_2(): void;
    function_3(): void;
    function_4(): void;
    renderLayout(): void;
    renderLinks_2(): void;
    zoomIn(): void;
    zoomOut(): void;
    constructor(props: MainProps);
    componentWillMount(): void;
    componentDidMount(): void;
    renderMap(): JSX.Element;
    link_1(): void;
    link_2(): void;
    link_3(): void;
    render(): JSX.Element;
}
