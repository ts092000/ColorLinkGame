import { _decorator, Component, Node, Sprite, SpriteFrame, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Node})
    private board5: Node

    @property ({type: Button})
    private backBtn: Button

    public get Board5() : Node {
        return this.board5;
    }
    
    public set Board5(board5 : Node) {
        this.board5 = board5;
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

