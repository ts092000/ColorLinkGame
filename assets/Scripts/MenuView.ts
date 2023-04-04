import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuView')
export class MenuView extends Component {
    @property({type: Button})
    private playBtn: Button

    @property ({type: Button})
    private audioBtn: Button

    public get PlayBtn() : Button {
        return this.playBtn;
    }
    
    public set PlayBtn(playBtn : Button) {
        this.playBtn = playBtn;
    }
    
    public get AudioBtn() : Button {
        return this.audioBtn;
    }

    
    public set AudioBtn(audioBtn : Button) {
        this.audioBtn = audioBtn;
    }
}

