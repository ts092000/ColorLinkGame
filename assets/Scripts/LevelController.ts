import { _decorator, Component, Node, Button, director } from 'cc';
import { LevelModel } from './LevelModel';
import { LevelView } from './LevelView';
const { ccclass, property } = _decorator;

@ccclass('LevelController')
export class LevelController extends Component {
    @property({type:LevelView})
        View: LevelView

    @property({type:LevelModel})
        Model: LevelModel

    start() {
        this.View.PlayBtn5.node.on(Button.EventType.CLICK, this.playBtn5, this);
        this.View.PlayBtn6.node.on(Button.EventType.CLICK, this.playBtn6, this);
        this.View.BackBtn.node.on(Button.EventType.CLICK, this.backBtn, this);
    }

    update(deltaTime: number) {
        
    }

    private playBtn5(PlayBtn5: Button) {
        director.loadScene('Game');
    }

    private playBtn6(PlayBtn6: Button) {
        director.loadScene('Game6');
    }

    private backBtn(PlayBtn6: Button) {
        director.loadScene('Menu');
    }
}

