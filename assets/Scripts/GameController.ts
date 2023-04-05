import { _decorator, Component, Node, instantiate, Vec3, Graphics, Color, Button, director, UITransform, color, Sprite, Game, Prefab } from 'cc';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
import { ListFormat } from 'typescript';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameView})
        View: GameView

    @property({type:GameModel})
        Model: GameModel
    
    private static xPos: number;
    private static yPos: number;

    private static xPosCur: number;
    private static yPosCur: number;

    private static xPosStart: number;
    private static yPosStart: number;

    private static xPosEnd: number;
    private static yPosEnd: number;

    private static xPosPre: number;
    private static yPosPre: number;

    private static mousePosX: number;
    private static mousePosY: number;

    private static num: number;
    private static arrayLine1: Node[] = [];
    private static arrayLine2: Node[] = [];
    private static arrayLine3: Node[] = [];
    private static arrayLine4: Node[] = [];
    private static arrayLine5: Node[] = [];
    private static arrayLine6: Node[] = [];

    private static selected: boolean = false;
    private static won: boolean = false;

    private static board5Init = [[1,0,0,0,3],
                                [0,0,0,0,4],
                                [0,0,0,0,0],
                                [0,2,0,0,0],
                                [0,1,2,3,4]]

    start() {
        this.View.Board5.active = true;
        this.dotDisplay();
        GameController.selected = false;
        GameController.won = false;
        this.View.BackBtn.node.on(Button.EventType.CLICK, this.backBtn, this);
        GameController.selected = false;
    }

    update(deltaTime: number) {
        
    }
    
    private dotDisplay() {
        for (let j = 0; j < GameController.board5Init.length; j++) {
            if (j == 0) {
                GameController.yPos = 160;
            }         
            for (let i = 0; i < GameController.board5Init[j].length; i++) {
                if (i == 0) {
                    GameController.xPos = -160;
                }
                this.numToColor(GameController.board5Init[j][i]);
                GameController.xPos += 80;
            }       
            GameController.yPos -= 80;
        }
    }

    private backBtn(PlayBtn6: Button) {
        director.loadScene('Level');
    }

    public numToColor(num: number) {
        let lineDrawMap = new Map<number, Node[]>();
        if (num == 1) {
            let blueDot = instantiate(this.Model.CircleBLue);
            this.View.Board5.addChild(blueDot);
            blueDot.position = new Vec3(GameController.xPos, GameController.yPos, 0)
            
            blueDot.on(Node.EventType.TOUCH_START, (event) => {
                
                GameController.xPosCur = blueDot.position.x;
                GameController.yPosCur = blueDot.position.y;
                console.log(GameController.xPosCur);
                console.log(GameController.yPosCur);
                for (let value1 of lineDrawMap.values()) {
                    for (let key of lineDrawMap.keys()) {

                        console.log(value1);
                        console.log('1');
                        for(var i = 0; i < value1.length; i++)
                        {
                            if (key == 1) {
                                console.log('delete1');
                                value1[i].destroy();
                            } 
                        }
                        console.log(lineDrawMap);
                    }
                }

            }, this);

            blueDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                
                GameController.mousePosX = Math.round(event.getUILocation().x - 480);
                GameController.mousePosY = Math.round(event.getUILocation().y - 320);
                let blueLine = instantiate(this.Model.LineDraw);
                if (GameController.xPosCur > GameController.mousePosX + 60) {
                    this.View.Board5.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    console.log('X-');
                    blueLine.angle = 0;
                    blueLine.position = new Vec3(GameController.xPosCur - 40, GameController.yPosCur , 0);
                    GameController.xPosCur -= 80;
                    GameController.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, GameController.arrayLine1);
                    console.log(lineDrawMap);
                }
                else if (GameController.xPosCur < GameController.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board5.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    blueLine.angle = 180;
                    blueLine.position = new Vec3(GameController.xPosCur + 40, GameController.yPosCur , 0);
                    GameController.xPosCur += 80;
                    console.log(blueLine);
                    GameController.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, GameController.arrayLine1);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur > GameController.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board5.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    blueLine.angle = 90;
                    blueLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur - 40, 0);
                    GameController.yPosCur -= 80;
                    GameController.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, GameController.arrayLine1);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur < GameController.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board5.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    blueLine.angle = -90;
                    blueLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur + 40, 0);
                    GameController.yPosCur += 80;
                    GameController.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, GameController.arrayLine1);
                    console.log(lineDrawMap);
                }
            }, this);
        }
        if (num == 2) {
            let redDot = instantiate(this.Model.CircleRed);
            this.View.Board5.addChild(redDot);
            redDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
            redDot.on(Node.EventType.TOUCH_START, (event) => {
                for (let value2 of lineDrawMap.values()) {
                    for (let key of lineDrawMap.keys()) {

                        console.log(value2);
                        console.log('2');
                        for(var i = 0; i < value2.length; i++)
                        {
                            if (key == 2) {
                                console.log('delete2');
                                value2[i].destroy();
                            } 
                        }
                        console.log(lineDrawMap);
                    }
                }
                
                GameController.xPosCur = redDot.position.x;
                GameController.yPosCur = redDot.position.y;
                console.log(GameController.xPosCur);
                console.log(GameController.yPosCur);
            }, this);

            redDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                
                GameController.mousePosX = Math.round(event.getUILocation().x - 480);
                GameController.mousePosY = Math.round(event.getUILocation().y - 320);
                let redLine = instantiate(this.Model.LineDraw);
                if (GameController.xPosCur > GameController.mousePosX + 60) {
                    this.View.Board5.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    console.log('X-');
                    redLine.angle = 0;
                    redLine.position = new Vec3(GameController.xPosCur - 40, GameController.yPosCur , 0);
                    GameController.xPosCur -= 80;
                    GameController.arrayLine2.push(redLine);
                    lineDrawMap.set(2, GameController.arrayLine2);
                    console.log(lineDrawMap);
                }
                else if (GameController.xPosCur < GameController.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board5.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    redLine.angle = 180;
                    redLine.position = new Vec3(GameController.xPosCur + 40, GameController.yPosCur , 0);
                    GameController.xPosCur += 80;
                    GameController.arrayLine2.push(redLine);
                    lineDrawMap.set(2, GameController.arrayLine2);
                    console.log(lineDrawMap);
                }

                else if (GameController.yPosCur > GameController.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board5.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    redLine.angle = 90;
                    redLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur - 40, 0);
                    GameController.yPosCur -= 80;
                    GameController.arrayLine2.push(redLine);
                    lineDrawMap.set(2, GameController.arrayLine2);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur < GameController.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board5.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    redLine.angle = -90;
                    redLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur + 40, 0);
                    GameController.yPosCur += 80;
                    GameController.arrayLine2.push(redLine);
                    lineDrawMap.set(2, GameController.arrayLine2);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 3) {
            let yellowDot = instantiate(this.Model.CircleYellow);
            this.View.Board5.addChild(yellowDot);
            yellowDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
            yellowDot.on(Node.EventType.TOUCH_START, (event) => {
                for (let value3 of lineDrawMap.values()) {
                    for (let key of lineDrawMap.keys()) {

                        console.log(value3);
                        console.log('3');
                        for(var i = 0; i < value3.length; i++)
                        {
                            if (key == 3) {
                                console.log('delete2');
                                value3[i].destroy();
                            } 
                        }
                        console.log(lineDrawMap);
                    }
                }
                
                GameController.xPosCur = yellowDot.position.x;
                GameController.yPosCur = yellowDot.position.y;
                console.log(GameController.xPosCur);
                console.log(GameController.yPosCur);
            }, this);

            yellowDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                GameController.mousePosX = Math.round(event.getUILocation().x - 480);
                GameController.mousePosY = Math.round(event.getUILocation().y - 320);
                let yellowLine = instantiate(this.Model.LineDraw);
                if (GameController.xPosCur > GameController.mousePosX + 60) {
                    this.View.Board5.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    console.log('X-');
                    yellowLine.angle = 0;
                    yellowLine.position = new Vec3(GameController.xPosCur - 40, GameController.yPosCur , 0);
                    GameController.xPosCur -= 80;
                    GameController.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, GameController.arrayLine3);
                    console.log(lineDrawMap);
                    
                }
                else if (GameController.xPosCur < GameController.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board5.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    yellowLine.angle = 180;
                    yellowLine.position = new Vec3(GameController.xPosCur + 40, GameController.yPosCur , 0);
                    GameController.xPosCur += 80;
                    GameController.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, GameController.arrayLine3);
                    console.log(lineDrawMap);
                }

                else if (GameController.yPosCur > GameController.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board5.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    yellowLine.angle = 90;
                    yellowLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur - 40, 0);
                    GameController.yPosCur -= 80;
                    GameController.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, GameController.arrayLine3);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur < GameController.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board5.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    yellowLine.angle = -90;
                    yellowLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur + 40, 0);
                    GameController.yPosCur += 80;
                    GameController.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, GameController.arrayLine3);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 4) {
            let greenDot = instantiate(this.Model.CircleGreen);
            this.View.Board5.addChild(greenDot);
            greenDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
            greenDot.on(Node.EventType.TOUCH_START, (event) => {
                for (let value4 of lineDrawMap.values()) {
                    for (let key of lineDrawMap.keys()) {

                        console.log(value4);
                        console.log('4');
                        for(var i = 0; i < value4.length; i++)
                        {
                            if (key == 4) {
                                console.log('delete2');
                                value4[i].destroy();
                            } 
                        }
                        console.log(lineDrawMap);
                    }
                }
                GameController.xPosCur = greenDot.position.x;
                GameController.yPosCur = greenDot.position.y;
                console.log(GameController.xPosCur);
                console.log(GameController.yPosCur);
            }, this);

            greenDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                GameController.mousePosX = Math.round(event.getUILocation().x - 480);
                GameController.mousePosY = Math.round(event.getUILocation().y - 320);
                let greenLine = instantiate(this.Model.LineDraw);
                if (GameController.xPosCur > GameController.mousePosX + 60) {
                    this.View.Board5.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    console.log('X-');
                    greenLine.angle = 0;
                    greenLine.position = new Vec3(GameController.xPosCur - 40, GameController.yPosCur , 0);
                    GameController.xPosCur -= 80;
                    GameController.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, GameController.arrayLine4);
                    console.log(lineDrawMap);
                }
                else if (GameController.xPosCur < GameController.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board5.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    greenLine.angle = 180;
                    greenLine.position = new Vec3(GameController.xPosCur + 40, GameController.yPosCur , 0);
                    GameController.xPosCur += 80;
                    GameController.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, GameController.arrayLine4);
                    console.log(lineDrawMap);
                }

                else if (GameController.yPosCur > GameController.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board5.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    greenLine.angle = 90;
                    greenLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur - 40, 0);
                    GameController.yPosCur -= 80;
                    GameController.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, GameController.arrayLine4);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur < GameController.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board5.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    greenLine.angle = -90;
                    greenLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur + 40, 0);
                    GameController.yPosCur += 80;
                    GameController.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, GameController.arrayLine4);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 5) {
            let orangeDot = instantiate(this.Model.CircleOrange);
            this.View.Board5.addChild(orangeDot);
            orangeDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
            orangeDot.on(Node.EventType.TOUCH_START, (event) => {
                for (let value5 of lineDrawMap.values()) {
                    for (let key of lineDrawMap.keys()) {

                        console.log(value5);
                        console.log('5');
                        for(var i = 0; i < value5.length; i++)
                        {
                            if (key == 5) {
                                console.log('delete5');
                                value5[i].destroy();
                            } 
                        }
                        console.log(lineDrawMap);
                    }
                }
                
                GameController.xPosCur = orangeDot.position.x;
                GameController.yPosCur = orangeDot.position.y;
                console.log(GameController.xPosCur);
                console.log(GameController.yPosCur);
            }, this);

            orangeDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                GameController.mousePosX = Math.round(event.getUILocation().x - 480);
                GameController.mousePosY = Math.round(event.getUILocation().y - 320);
                let orangeLine = instantiate(this.Model.LineDraw);
                if (GameController.xPosCur > GameController.mousePosX + 60) {
                    this.View.Board5.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    console.log('X-');
                    orangeLine.angle = 0;
                    orangeLine.position = new Vec3(GameController.xPosCur - 40, GameController.yPosCur , 0);
                    GameController.xPosCur -= 80;
                    GameController.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, GameController.arrayLine5);
                    console.log(lineDrawMap);
                }
                else if (GameController.xPosCur < GameController.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board5.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    orangeLine.angle = 180;
                    orangeLine.position = new Vec3(GameController.xPosCur + 40, GameController.yPosCur , 0);
                    GameController.xPosCur += 80;
                    GameController.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, GameController.arrayLine5);
                    console.log(lineDrawMap);
                }

                else if (GameController.yPosCur > GameController.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board5.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    orangeLine.angle = 90;
                    orangeLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur - 40, 0);
                    GameController.yPosCur -= 80;
                    GameController.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, GameController.arrayLine5);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur < GameController.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board5.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    orangeLine.angle = -90;
                    orangeLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur + 40, 0);
                    GameController.yPosCur += 80;
                    GameController.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, GameController.arrayLine5);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 6) {
            let softBlueDot = instantiate(this.Model.CircleSoftBlue);
            this.View.Board5.addChild(softBlueDot);
            softBlueDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
            softBlueDot.on(Node.EventType.TOUCH_START, (event) => {
                for (let value6 of lineDrawMap.values()) {
                    for (let key of lineDrawMap.keys()) {

                        console.log(value6);
                        console.log('6');
                        for(var i = 0; i < value6.length; i++)
                        {
                            if (key == 6) {
                                console.log('delete6');
                                value6[i].destroy();
                            } 
                        }
                        console.log(lineDrawMap);
                    }
                }
                
                GameController.xPosCur = softBlueDot.position.x;
                GameController.yPosCur = softBlueDot.position.y;
                console.log(GameController.xPosCur);
                console.log(GameController.yPosCur);
            }, this);

            softBlueDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                GameController.mousePosX = Math.round(event.getUILocation().x - 480);
                GameController.mousePosY = Math.round(event.getUILocation().y - 320);
                let softBlueLine = instantiate(this.Model.LineDraw);
                if (GameController.xPosCur > GameController.mousePosX + 60) {
                    this.View.Board5.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    console.log('X-');
                    softBlueLine.angle = 0;
                    softBlueLine.position = new Vec3(GameController.xPosCur - 40, GameController.yPosCur , 0);
                    GameController.xPosCur -= 80;
                    GameController.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, GameController.arrayLine6);
                    console.log(lineDrawMap);
                }
                else if (GameController.xPosCur < GameController.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board5.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    softBlueLine.angle = 180;
                    softBlueLine.position = new Vec3(GameController.xPosCur + 40, GameController.yPosCur , 0);
                    GameController.xPosCur += 80;
                    GameController.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, GameController.arrayLine6);
                    console.log(lineDrawMap);
                }

                else if (GameController.yPosCur > GameController.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board5.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    softBlueLine.angle = 90;
                    softBlueLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur - 40, 0);
                    GameController.yPosCur -= 80;
                    GameController.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, GameController.arrayLine6);
                    console.log(lineDrawMap);
                }
                else if (GameController.yPosCur < GameController.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board5.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    softBlueLine.angle = -90;
                    softBlueLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur + 40, 0);
                    GameController.yPosCur += 80;
                    GameController.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, GameController.arrayLine6);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
    }

    public drawLine() {
    }
}

