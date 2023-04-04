import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game6View')
export class Game6View extends Component {
    @property({type:Node})
    private board6: Node

    @property ({type: Button})
    private backBtn: Button

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

    start() {

    }

    update(deltaTime: number) {
        
    }
}

