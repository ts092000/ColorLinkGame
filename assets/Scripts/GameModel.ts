import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type:Prefab})
    private circleBLue: Prefab

    @property({type:Prefab})
    private circleRed: Prefab

    @property({type:Prefab})
    private circleYellow: Prefab

    @property({type:Prefab})
    private circleGreen: Prefab

    @property({type:Prefab})
    private circleOrange: Prefab

    @property({type:Prefab})
    private circleSoftBlue: Prefab

    @property({type:Prefab})
    private lineDraw: Prefab

    public get CircleBLue() : Prefab {
        return this.circleBLue;
    }
    
    public set CircleBLue(circleBLue : Prefab) {
        this.circleBLue = circleBLue;
    }

    public get CircleRed() : Prefab {
        return this.circleRed;
    }
    
    public set CircleRed(circleRed : Prefab) {
        this.circleRed = circleRed;
    }

    public get CircleYellow() : Prefab {
        return this.circleYellow;
    }
    
    public set CircleYellow(circleYellow : Prefab) {
        this.circleYellow = circleYellow;
    }

    public get CircleGreen() : Prefab {
        return this.circleGreen;
    }
    
    public set CircleGreen(circleGreen : Prefab) {
        this.circleGreen = circleGreen;
    }

    public get CircleOrange() : Prefab {
        return this.circleOrange;
    }
    
    public set CircleOrange(circleOrange : Prefab) {
        this.circleOrange = circleOrange;
    }

    public get CircleSoftBlue() : Prefab {
        return this.circleSoftBlue;
    }
    
    public set CircleSoftBlue(circleSoftBlue : Prefab) {
        this.circleSoftBlue = circleSoftBlue;
    }

    public get LineDraw() : Prefab {
        return this.lineDraw;
    }
    
    public set LineDraw(lineDraw : Prefab) {
        this.lineDraw = lineDraw;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

