import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelView')
export class LevelView extends Component {
    @property({type: Button})
    private playBtn5: Button

    @property({type: Button})
    private playBtn6: Button

    @property ({type: Button})
    private audioBtn: Button

    @property ({type: Button})
    private backBtn: Button

    public get PlayBtn5() : Button {
        return this.playBtn5;
    }
    
    public set PlayBtn5(playBtn5 : Button) {
        this.playBtn5 = playBtn5;
    }

    public get PlayBtn6() : Button {
        return this.playBtn6;
    }
    
    public set PlayBtn6(playBtn6 : Button) {
        this.playBtn6 = playBtn6;
    }
    
    public get AudioBtn() : Button {
        return this.audioBtn;
    }
    
    public set AudioBtn(audioBtn : Button) {
        this.audioBtn = audioBtn;
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

