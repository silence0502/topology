import * as React from 'react';
export interface MainProps {
    animate?: boolean;
    width?: any;
    height?: any;
    drawGrid?: boolean;
    onClick?: Function;
    data: any;
    center?: boolean;
    zoomToFit?: boolean;
    paper_width?: number;
    paper_height?: number;
    cid?: string;
}
export default class Main extends React.Component<MainProps, any> {
    paperContainer: HTMLDivElement;
    btn_more: HTMLDivElement;
    btn_zoomin: HTMLDivElement;
    btn_map: HTMLDivElement;
    btn_zoomout: HTMLDivElement;
    navi: HTMLDivElement;
    btn_fullscreen: HTMLDivElement;
    btn_saveimg: HTMLDivElement;
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
    parseData(data: any): void;
    initializePaper(): void;
    renderNavigator(): void;
    small_map(): void;
    download(filename: string, imgData: any): void;
    downloadFile(fileName: any, content: any): void;
    base64ToBlob(code: any): Blob;
    saveImg(): void;
    fullScreen: () => void;
    requestFullScreen: () => void;
    exitFullscreen: () => void;
    watchFullScreen: () => void;
    renderLayout(): void;
    renderLinks(): void;
    zoomIn(): void;
    zoomOut(): void;
    constructor(props: MainProps);
    componentWillMount(): void;
    componentDidMount(): void;
    renderMap(): JSX.Element;
    renderFullscreenBtn(): JSX.Element;
    render(): JSX.Element;
}
