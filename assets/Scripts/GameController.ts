import { _decorator, Component, Node, instantiate, Vec3, Graphics, Color, Button, director, UITransform, color, Sprite, Game } from 'cc';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
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

    private static xPosEnd: number;
    private static yPosEnd: number;

    private static xPosPre: number;
    private static yPosPre: number;

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
    }

    update(deltaTime: number) {
        
    }
    
    private dotDisplay() {
        let drawLine = this.View.Board5.addComponent(Graphics);
        drawLine = this.View.Board5.getComponent(Graphics);
        console.log(GameController.board5Init);
        for (let j = 0; j < GameController.board5Init.length; j++) {
            if (j == 0) {
                GameController.yPos = 160;
            }         
            for (let i = 0; i < GameController.board5Init[j].length; i++) {
                console.log(GameController.board5Init[j][i]);
                if (i == 0) {
                    GameController.xPos = -160;
                }
                console.log('x: ', GameController.xPos);
                console.log('y: ', GameController.yPos);
                
                if (GameController.board5Init[j][i] == 1) {
                    let blueDot = instantiate(this.Model.CircleBLue);
                    this.View.Board5.addChild(blueDot);
                    blueDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
                    
                    blueDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        let drawLine = instantiate(this.Model.LineDraw);
                        this.View.Board5.addChild(drawLine);
                        drawLine.position = new Vec3(blueDot.position.x, blueDot.position.y, 0);
                        drawLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    }, this);
                        
                    blueDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        let drawLine = instantiate(this.Model.LineDraw);
                        drawLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                        this.View.Board5.addChild(drawLine);
                        GameController.xPosCur = event.getUILocation().x - 480;
                        GameController.yPosCur = event.getUILocation().y - 320;
                        drawLine.position = new Vec3(GameController.xPosCur, GameController.yPosCur, 0);
                        GameController.xPosPre = GameController.xPosCur;
                        GameController.yPosPre = GameController.yPosCur;
                        drawLine.position = new Vec3(GameController.xPosPre, GameController.yPosPre, 0);
                    }, this);      
                    
                    // blueDot.on(Node.EventType.TOUCH_END, function(event) {
                    //     let drawLine = instantiate(this.Model.LineDraw);
                    //     drawLine.getComponent(Sprite).color = blueDot.getComponent(Sprite).color;
                    //     this.View.Board5.addChild(drawLine);
                    //     drawLine.position = new Vec3(GameController.xPosPre, GameController.yPosPre, 0);
                    // }, this);  
                }
                    
                if (GameController.board5Init[j][i] == 2) {
                    let redDot = instantiate(this.Model.CircleRed);
                    this.View.Board5.addChild(redDot);
                    redDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
                    // console.log(redLine);
                    redDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        this.lastPos = event.getUILocation();
                        console.log(this.lastPos);
                    }, this);

                    redDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        // set start of line to the end of the previous line
                        drawLine.moveTo(this.lastPos.x - 480, this.lastPos.y - 320);
                        // draw line to location of touch
                        drawLine.lineWidth = 25;
                        // drawLine.lineTo(bluedDot1.position.x, bluedDot1.position.y);
                        drawLine.lineTo(event.getUILocation().x - 480, event.getUILocation().y - 320);
                        drawLine.strokeColor = redDot.getComponent(Sprite).color;
                        drawLine.stroke();
                        drawLine.close();
                        
                        // remember location of touch for start of next line
                        this.lastPos = event.getUILocation();
                    }, this);
                }
                
                if (GameController.board5Init[j][i] == 3) {
                    let yewllowDot = instantiate(this.Model.CircleYellow);
                    this.View.Board5.addChild(yewllowDot);
                    yewllowDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
                    yewllowDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        this.lastPos = event.getUILocation();
                        console.log(this.lastPos);
                    }, this);

                    yewllowDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        // set start of line to the end of the previous line
                        drawLine.moveTo(this.lastPos.x - 480, this.lastPos.y - 320);
                        // draw line to location of touch
                        drawLine.lineWidth = 25;
                        // drawLine.lineTo(bluedDot1.position.x, bluedDot1.position.y);
                        drawLine.lineTo(event.getUILocation().x - 480, event.getUILocation().y - 320);
                        drawLine.strokeColor = yewllowDot.getComponent(Sprite).color;
                        drawLine.stroke();
                        drawLine.close();
                        
                    
                        // remember location of touch for start of next line
                        this.lastPos = event.getUILocation();
                    }, this);
                }
                
                if (GameController.board5Init[j][i] == 4) {
                    let greenDot = instantiate(this.Model.CircleGreen);
                    this.View.Board5.addChild(greenDot);
                    greenDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
                    greenDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        this.lastPos = event.getUILocation();
                        console.log(this.lastPos);
                    }, this);

                    greenDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        // set start of line to the end of the previous line
                        drawLine.moveTo(this.lastPos.x - 480, this.lastPos.y - 320);
                        // draw line to location of touch
                        drawLine.lineWidth = 25;
                        // drawLine.lineTo(bluedDot1.position.x, bluedDot1.position.y);
                        drawLine.lineTo(event.getUILocation().x - 480, event.getUILocation().y - 320);
                        drawLine.strokeColor = greenDot.getComponent(Sprite).color;
                        drawLine.stroke();
                        drawLine.close();
                        
                    
                        // remember location of touch for start of next line
                        this.lastPos = event.getUILocation();
                    }, this);
                }
                
                if (GameController.board5Init[j][i] == 5) {
                    let orangeDot = instantiate(this.Model.CircleOrange);
                    this.View.Board5.addChild(orangeDot);
                    orangeDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
                    orangeDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        this.lastPos = event.getUILocation();
                        console.log(this.lastPos);
                    }, this);

                    orangeDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        // set start of line to the end of the previous line
                        drawLine.moveTo(this.lastPos.x - 480, this.lastPos.y - 320);
                        // draw line to location of touch
                        drawLine.lineWidth = 25;
                        // drawLine.lineTo(bluedDot1.position.x, bluedDot1.position.y);
                        drawLine.lineTo(event.getUILocation().x - 480, event.getUILocation().y - 320);
                        drawLine.strokeColor = orangeDot.getComponent(Sprite).color;
                        drawLine.stroke();
                        drawLine.close();
                        
                    
                        // remember location of touch for start of next line
                        this.lastPos = event.getUILocation();
                    }, this);
                }
                
                if (GameController.board5Init[j][i] == 6) {
                    let softBlueDot = instantiate(this.Model.CircleSoftBlue);
                    this.View.Board5.addChild(softBlueDot);
                    softBlueDot.position = new Vec3(GameController.xPos, GameController.yPos, 0);
                    softBlueDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        this.lastPos = event.getUILocation();
                        console.log(this.lastPos);
                    }, this);

                    softBlueDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        // set start of line to the end of the previous line
                        drawLine.moveTo(this.lastPos.x - 480, this.lastPos.y - 320);
                        // draw line to location of touch
                        drawLine.lineWidth = 25;
                        // drawLine.lineTo(bluedDot1.position.x, bluedDot1.position.y);
                        drawLine.lineTo(event.getUILocation().x - 480, event.getUILocation().y - 320);
                        drawLine.strokeColor = softBlueDot.getComponent(Sprite).color;
                        drawLine.stroke();
                        drawLine.close();
                    
                        // remember location of touch for start of next line
                        this.lastPos = event.getUILocation();
                    }, this);
                }
                GameController.xPos += 80;
            }       
            GameController.yPos -= 80;
        }
    }

    private backBtn(PlayBtn6: Button) {
        director.loadScene('Level');
    }
}

