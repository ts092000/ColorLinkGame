import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type:Prefab})
    private circle: Prefab

    @property({type:Prefab})
    private lineDraw: Prefab
    
    @property ({type: Prefab})
    private squared: Prefab

    public get Circle() : Prefab {
        return this.circle;
    }
    
    public set Circle(circle : Prefab) {
        this.circle = circle;
    }

    public get LineDraw() : Prefab {
        return this.lineDraw;
    }
    
    public set LineDraw(lineDraw : Prefab) {
        this.lineDraw = lineDraw;
    }
    
    public get Squared() : Prefab {
        return this.squared;
    }
    
    public set Squared(squared : Prefab) {
        this.squared = squared;
    }


    start() {

    }

    update(deltaTime: number) {
        
    }
}

