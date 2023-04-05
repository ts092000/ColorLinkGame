import { _decorator, Component, Node, Graphics, instantiate, Color, Vec3, Button, director, Sprite, Prefab } from 'cc';
import { Game6View } from './Game6View';
import { Game6Model } from './Game6Model';
const { ccclass, property } = _decorator;

@ccclass('Game6Controller')
export class Game6Controller extends Component {
    @property({type:Game6View})
        View: Game6View

    @property({type:Game6Model})
        Model: Game6Model
    
    private static xPos: number;
    private static yPos: number;

    private static xPosCur: number;
    private static yPosCur: number;

    private static xPosEnd: number;
    private static yPosEnd: number;

    private static mousePosX: number;
    private static mousePosY: number;

    private static selected: boolean = false;
    private static won: boolean = false;

    private static arrayLine1: Node[] = [];
    private static arrayLine2: Node[] = [];
    private static arrayLine3: Node[] = [];
    private static arrayLine4: Node[] = [];
    private static arrayLine5: Node[] = [];
    private static arrayLine6: Node[] = [];

    private static board6Init = [[0,0,0,0,0,5],
                                [0,0,0,0,0,6],
                                [0,3,2,0,0,6],
                                [0,0,4,0,0,3],
                                [0,4,5,0,2,1],
                                [0,0,0,1,0,0]]

    start() {
        this.View.Board6.active = true;
        this.dotDisplay();
        Game6Controller.selected = false;
        Game6Controller.won = false;
        this.View.BackBtn.node.on(Button.EventType.CLICK, this.backBtn, this);

    }

    update(deltaTime: number) {
        
    }

    private dotDisplay() {
        for (let j = 0; j < Game6Controller.board6Init.length; j++) {
            if (j == 0) {
                Game6Controller.yPos = 200;
            }         
            for (let i = 0; i < Game6Controller.board6Init[j].length; i++) {
                console.log(Game6Controller.board6Init[j][i]);
                if (i == 0) {
                    Game6Controller.xPos = -200;
                }
                this.numToColor(Game6Controller.board6Init[j][i]);
                Game6Controller.xPos += 80;
            }       
            Game6Controller.yPos -= 80;
        }
    }

    private backBtn(PlayBtn6: Button) {
        director.loadScene('Level');
    }

    public numToColor(num: number) {
        let lineDrawMap = new Map<number, Node[]>();
        if (num == 1) {
            let blueDot = instantiate(this.Model.CircleBLue);
            this.View.Board6.addChild(blueDot);
            blueDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
            blueDot.on(Node.EventType.TOUCH_START, (event) => {
                
                Game6Controller.xPosCur = blueDot.position.x;
                Game6Controller.yPosCur = blueDot.position.y;
                console.log(Game6Controller.xPosCur);
                console.log(Game6Controller.yPosCur);
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
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                Game6Controller.mousePosX = Math.round(event.getUILocation().x - 480);
                Game6Controller.mousePosY = Math.round(event.getUILocation().y - 320);
                let blueLine = instantiate(this.Model.LineDraw);
                if (Game6Controller.xPosCur > Game6Controller.mousePosX + 60) {
                    this.View.Board6.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    console.log('X-');
                    blueLine.angle = 0;
                    blueLine.position = new Vec3(Game6Controller.xPosCur - 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur -= 80;
                    Game6Controller.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, Game6Controller.arrayLine1);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.xPosCur < Game6Controller.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board6.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    blueLine.angle = 180;
                    blueLine.position = new Vec3(Game6Controller.xPosCur + 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur += 80;
                    Game6Controller.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, Game6Controller.arrayLine1);
                    console.log(lineDrawMap);
                }

                else if (Game6Controller.yPosCur > Game6Controller.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board6.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    blueLine.angle = 90;
                    blueLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur - 40, 0);
                    Game6Controller.yPosCur -= 80;
                    Game6Controller.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, Game6Controller.arrayLine1);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.yPosCur < Game6Controller.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board6.addChild(blueLine);
                    blueLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    blueLine.angle = -90;
                    blueLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur + 40, 0);
                    Game6Controller.yPosCur += 80;
                    Game6Controller.arrayLine1.push(blueLine);
                    lineDrawMap.set(1, Game6Controller.arrayLine1);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 2) {
            let redDot = instantiate(this.Model.CircleRed);
            this.View.Board6.addChild(redDot);
            redDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
            redDot.on(Node.EventType.TOUCH_START, (event) => {
                
                Game6Controller.xPosCur = redDot.position.x;
                Game6Controller.yPosCur = redDot.position.y;
                console.log(Game6Controller.xPosCur);
                console.log(Game6Controller.yPosCur);
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
            }, this);

            redDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                Game6Controller.mousePosX = Math.round(event.getUILocation().x - 480);
                Game6Controller.mousePosY = Math.round(event.getUILocation().y - 320);
                let redLine = instantiate(this.Model.LineDraw);
                if (Game6Controller.xPosCur > Game6Controller.mousePosX + 60) {
                    this.View.Board6.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    console.log('X-');
                    redLine.angle = 0;
                    redLine.position = new Vec3(Game6Controller.xPosCur - 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur -= 80;
                    Game6Controller.arrayLine2.push(redLine);
                    lineDrawMap.set(2, Game6Controller.arrayLine2);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.xPosCur < Game6Controller.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board6.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    redLine.angle = 180;
                    redLine.position = new Vec3(Game6Controller.xPosCur + 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur += 80;
                    Game6Controller.arrayLine2.push(redLine);
                    lineDrawMap.set(2, Game6Controller.arrayLine2);
                    console.log(lineDrawMap);
                }

                else if (Game6Controller.yPosCur > Game6Controller.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board6.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    redLine.angle = 90;
                    redLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur - 40, 0);
                    Game6Controller.yPosCur -= 80;
                    Game6Controller.arrayLine2.push(redLine);
                    lineDrawMap.set(2, Game6Controller.arrayLine2);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.yPosCur < Game6Controller.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board6.addChild(redLine);
                    redLine.getComponent(Sprite).color = redDot.getComponent(Sprite).color;
                    redLine.angle = -90;
                    redLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur + 40, 0);
                    Game6Controller.yPosCur += 80;
                    Game6Controller.arrayLine2.push(redLine);
                    lineDrawMap.set(2, Game6Controller.arrayLine2);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 3) {
            let yellowDot = instantiate(this.Model.CircleYellow);
            this.View.Board6.addChild(yellowDot);
            yellowDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
            yellowDot.on(Node.EventType.TOUCH_START, (event) => {
                
                Game6Controller.xPosCur = yellowDot.position.x;
                Game6Controller.yPosCur = yellowDot.position.y;
                console.log(Game6Controller.xPosCur);
                console.log(Game6Controller.yPosCur);
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
            }, this);

            yellowDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                Game6Controller.mousePosX = Math.round(event.getUILocation().x - 480);
                Game6Controller.mousePosY = Math.round(event.getUILocation().y - 320);
                let yellowLine = instantiate(this.Model.LineDraw);
                if (Game6Controller.xPosCur > Game6Controller.mousePosX + 60) {
                    this.View.Board6.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    console.log('X-');
                    yellowLine.angle = 0;
                    yellowLine.position = new Vec3(Game6Controller.xPosCur - 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur -= 80;
                    Game6Controller.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, Game6Controller.arrayLine3);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.xPosCur < Game6Controller.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board6.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    yellowLine.angle = 180;
                    yellowLine.position = new Vec3(Game6Controller.xPosCur + 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur += 80;
                    Game6Controller.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, Game6Controller.arrayLine3);
                    console.log(lineDrawMap);
                }

                else if (Game6Controller.yPosCur > Game6Controller.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board6.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    yellowLine.angle = 90;
                    yellowLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur - 40, 0);
                    Game6Controller.yPosCur -= 80;
                    Game6Controller.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, Game6Controller.arrayLine3);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.yPosCur < Game6Controller.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board6.addChild(yellowLine);
                    yellowLine.getComponent(Sprite).color = yellowDot.getComponent(Sprite).color;
                    yellowLine.angle = -90;
                    yellowLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur + 40, 0);
                    Game6Controller.yPosCur += 80;
                    Game6Controller.arrayLine3.push(yellowLine);
                    lineDrawMap.set(3, Game6Controller.arrayLine3);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 4) {
            let greenDot = instantiate(this.Model.CircleGreen);
            this.View.Board6.addChild(greenDot);
            greenDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
            greenDot.on(Node.EventType.TOUCH_START, (event) => {
                
                Game6Controller.xPosCur = greenDot.position.x;
                Game6Controller.yPosCur = greenDot.position.y;
                console.log(Game6Controller.xPosCur);
                console.log(Game6Controller.yPosCur);
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
            }, this);

            greenDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                Game6Controller.mousePosX = Math.round(event.getUILocation().x - 480);
                Game6Controller.mousePosY = Math.round(event.getUILocation().y - 320);
                let greenLine = instantiate(this.Model.LineDraw);
                if (Game6Controller.xPosCur > Game6Controller.mousePosX + 60) {
                    this.View.Board6.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    console.log('X-');
                    greenLine.angle = 0;
                    greenLine.position = new Vec3(Game6Controller.xPosCur - 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur -= 80;
                    Game6Controller.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, Game6Controller.arrayLine4);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.xPosCur < Game6Controller.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board6.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    greenLine.angle = 180;
                    greenLine.position = new Vec3(Game6Controller.xPosCur + 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur += 80;
                    Game6Controller.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, Game6Controller.arrayLine4);
                    console.log(lineDrawMap);
                    
                    
                }

                else if (Game6Controller.yPosCur > Game6Controller.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board6.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    greenLine.angle = 90;
                    greenLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur - 40, 0);
                    Game6Controller.yPosCur -= 80;
                    Game6Controller.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, Game6Controller.arrayLine4);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.yPosCur < Game6Controller.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board6.addChild(greenLine);
                    greenLine.getComponent(Sprite).color = greenDot.getComponent(Sprite).color;
                    greenLine.angle = -90;
                    greenLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur + 40, 0);
                    Game6Controller.yPosCur += 80;
                    Game6Controller.arrayLine4.push(greenLine);
                    lineDrawMap.set(4, Game6Controller.arrayLine4);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 5) {
            let orangeDot = instantiate(this.Model.CircleOrange);
            this.View.Board6.addChild(orangeDot);
            orangeDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
            orangeDot.on(Node.EventType.TOUCH_START, (event) => {
                
                Game6Controller.xPosCur = orangeDot.position.x;
                Game6Controller.yPosCur = orangeDot.position.y;
                console.log(Game6Controller.xPosCur);
                console.log(Game6Controller.yPosCur);
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
            }, this);

            orangeDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                Game6Controller.mousePosX = Math.round(event.getUILocation().x - 480);
                Game6Controller.mousePosY = Math.round(event.getUILocation().y - 320);
                let orangeLine = instantiate(this.Model.LineDraw);
                if (Game6Controller.xPosCur > Game6Controller.mousePosX + 60) {
                    this.View.Board6.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    console.log('X-');
                    orangeLine.angle = 0;
                    orangeLine.position = new Vec3(Game6Controller.xPosCur - 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur -= 80;
                    Game6Controller.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, Game6Controller.arrayLine5);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.xPosCur < Game6Controller.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board6.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    orangeLine.angle = 180;
                    orangeLine.position = new Vec3(Game6Controller.xPosCur + 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur += 80;
                    Game6Controller.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, Game6Controller.arrayLine5);
                    console.log(lineDrawMap);
                }

                else if (Game6Controller.yPosCur > Game6Controller.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board6.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    orangeLine.angle = 90;
                    orangeLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur - 40, 0);
                    Game6Controller.yPosCur -= 80;
                    Game6Controller.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, Game6Controller.arrayLine5);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.yPosCur < Game6Controller.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board6.addChild(orangeLine);
                    orangeLine.getComponent(Sprite).color = orangeDot.getComponent(Sprite).color;
                    orangeLine.angle = -90;
                    orangeLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur + 40, 0);
                    Game6Controller.yPosCur += 80;
                    Game6Controller.arrayLine5.push(orangeLine);
                    lineDrawMap.set(5, Game6Controller.arrayLine5);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
        if (num == 6) {
            let softBlueDot = instantiate(this.Model.CircleSoftBlue);
            this.View.Board6.addChild(softBlueDot);
            softBlueDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
            softBlueDot.on(Node.EventType.TOUCH_START, (event) => {
                
                Game6Controller.xPosCur = softBlueDot.position.x;
                Game6Controller.yPosCur = softBlueDot.position.y;
                console.log(Game6Controller.xPosCur);
                console.log(Game6Controller.yPosCur);

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
            }, this);

            softBlueDot.on(Node.EventType.TOUCH_MOVE, (event) => {
                console.log(Math.round(event.getUILocation().x - 480));
                console.log(Math.round(event.getUILocation().y - 320));
                
                Game6Controller.mousePosX = Math.round(event.getUILocation().x - 480);
                Game6Controller.mousePosY = Math.round(event.getUILocation().y - 320);
                let softBlueLine = instantiate(this.Model.LineDraw);
                if (Game6Controller.xPosCur > Game6Controller.mousePosX + 60) {
                    this.View.Board6.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    console.log('X-');
                    softBlueLine.angle = 0;
                    softBlueLine.position = new Vec3(Game6Controller.xPosCur - 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur -= 80;
                    Game6Controller.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, Game6Controller.arrayLine6);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.xPosCur < Game6Controller.mousePosX - 60) {
                    console.log('X+');
                    this.View.Board6.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    softBlueLine.angle = 180;
                    softBlueLine.position = new Vec3(Game6Controller.xPosCur + 40, Game6Controller.yPosCur , 0);
                    Game6Controller.xPosCur += 80;
                    Game6Controller.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, Game6Controller.arrayLine6);
                    console.log(lineDrawMap);
                }

                else if (Game6Controller.yPosCur > Game6Controller.mousePosY + 60) {
                    console.log('Y-');
                    this.View.Board6.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    softBlueLine.angle = 90;
                    softBlueLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur - 40, 0);
                    Game6Controller.yPosCur -= 80;
                    Game6Controller.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, Game6Controller.arrayLine6);
                    console.log(lineDrawMap);
                }
                else if (Game6Controller.yPosCur < Game6Controller.mousePosY - 60) {
                    console.log('Y+');
                    this.View.Board6.addChild(softBlueLine);
                    softBlueLine.getComponent(Sprite).color = softBlueDot.getComponent(Sprite).color;
                    softBlueLine.angle = -90;
                    softBlueLine.position = new Vec3(Game6Controller.xPosCur, Game6Controller.yPosCur + 40, 0);
                    Game6Controller.yPosCur += 80;
                    Game6Controller.arrayLine6.push(softBlueLine);
                    lineDrawMap.set(6, Game6Controller.arrayLine6);
                    console.log(lineDrawMap);
                }            
            }, this);
        }
    }
}

