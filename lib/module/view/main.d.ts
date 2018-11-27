import * as React from 'react';
export interface MainProps {
    animate?: boolean;
    width?: any;
    height?: any;
    drawGrid?: boolean;
    rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
    onDblclick?: Function;
    data: any;
    nodeId?: string;
    center?: boolean;
    zoomToFit?: boolean;
    paper_width?: number;
    paper_height?: number;
    cid?: string;
    fullscreen_btn_disable?: boolean;
}
export default class Main extends React.Component<MainProps, any> {
    paperContainer: HTMLDivElement;
    btn_more: HTMLDivElement;
    btn_zoomin: HTMLDivElement;
    btn_map: HTMLDivElement;
    btn_zoomout: HTMLDivElement;
    navi: HTMLDivElement;
    btn_fullscreen: HTMLDivElement;
    graph: joint.dia.Graph;
    graph2: joint.dia.Graph;
    commandManager: joint.dia.CommandManager;
    paper: joint.dia.Paper;
    paperScroller: joint.ui.PaperScroller;
    navigator: joint.ui.Navigator;
    static defaultProps: MainProps;
    /**
     * 数据传递动画
     */
    doAnimate(): void;
    /**
     * 数据解析
     * @param data 拓扑数据
     */
    parseData(data: any, nodeId: any): void;
    initializePaper(): void;
    small_map(): void;
    fullScreen: () => void;
    requestFullScreen: () => void;
    exitFullscreen: () => void;
    watchFullScreen: () => void;
    renderLayout(): void;
    renderLayout2(): void;
    renderLinks_2(): void;
    renderLinks_3(): void;
    zoomIn(): void;
    zoomOut(): void;
    constructor(props: MainProps);
    componentWillMount(): void;
    componentDidMount(): void;
    renderMap(): JSX.Element;
    renderFullscreenBtn(): JSX.Element;
    render(): JSX.Element;
}
