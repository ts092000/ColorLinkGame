import { _decorator, Component, Node, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game6View')
export class Game6View extends Component {
    @property({type:Node})
    private board6: Node

    @property ({type: Button})
    private backBtn: Button

    @property({type:Node})
    private circle: Node

    @property({type:Node})
    private line: Node

    @property({type:Label})
    private winLabel: Label

    public get Board6() : Node {
        return this.board6;
    }
    
    public set Board6(board6 : Node) {
        this.board6 = board6;
    }

    public get BackBtn() : Button {
        return this.backBtn;
    }
    
    public set BackBtn(backBtn : Button) {
        this.backBtn = backBtn;
    }

    public get Circle() : Node {
        return this.circle;
    }
    
    public set Circle(circle : Node) {
        this.circle = circle;
    }

    public get Line() : Node {
        return this.line;
    }
    
    public set Line(line : Node) {
        this.line = line;
    }

    public get WinLabel() : Label {
        return this.winLabel;
    }
    
    public set WinLabel(winLabel : Label) {
        this.winLabel = winLabel;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

