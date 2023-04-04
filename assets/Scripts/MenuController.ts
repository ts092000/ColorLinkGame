import { _decorator, Component, Node, Button, director } from 'cc';
import { MenuModel } from './MenuModel';
import { MenuView } from './MenuView';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property({type:MenuView})
        View: MenuView
    @property({type:MenuModel})
        Model: MenuModel

    start() {
        this.View.PlayBtn.node.on(Button.EventType.CLICK, this.playBtn, this);
    }

    update(deltaTime: number) {
        
    }

    private playBtn(PlayBtn: Button) {
        director.loadScene('Level');
    }
}

