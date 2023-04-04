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

    private static selected: boolean = false;
    private static won: boolean = false;

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
        let drawLine = this.View.Board6.addComponent(Graphics);
        console.log(Game6Controller.board6Init);
        drawLine = this.View.Board6.getComponent(Graphics);
        for (let j = 0; j < Game6Controller.board6Init.length; j++) {
            if (j == 0) {
                Game6Controller.yPos = 200;
            }         
            for (let i = 0; i < Game6Controller.board6Init[j].length; i++) {
                console.log(Game6Controller.board6Init[j][i]);
                if (i == 0) {
                    Game6Controller.xPos = -200;
                }
                console.log('x: ', Game6Controller.xPos);
                console.log('y: ', Game6Controller.yPos);
                
                
                if (Game6Controller.board6Init[j][i] == 1) {
                    let bluedDot = instantiate(this.Model.CircleBLue);
                    this.View.Board6.addChild(bluedDot);
                    bluedDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);

                    console.log(drawLine);
                    bluedDot.on(Node.EventType.TOUCH_START, function(event) {
                        // remember location so we know where to draw the first line from
                        this.lastPos = event.getUILocation();
                        console.log(this.lastPos);
                    }, this);

                    bluedDot.on(Node.EventType.TOUCH_MOVE, function(event) {
                        // set start of line to the end of the previous line
                        drawLine.moveTo(this.lastPos.x - 480, this.lastPos.y - 320);
                        // draw line to location of touch
                        drawLine.lineWidth = 25;
                        // drawLine.lineTo(bluedDot1.position.x, bluedDot1.position.y);
                        drawLine.lineTo(event.getUILocation().x - 480, event.getUILocation().y - 320);
                        drawLine.lineCap = Graphics.LineCap.ROUND;
                        drawLine.strokeColor = bluedDot.getComponent(Sprite).color;
                        drawLine.stroke();
                        drawLine.close();
                        
                    
                        // remember location of touch for start of next line
                        this.lastPos = event.getUILocation();
                    }, this);
                }
                
                if (Game6Controller.board6Init[j][i] == 2) {
                    let redDot = instantiate(this.Model.CircleRed);
                    this.View.Board6.addChild(redDot);
                    redDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
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
                
                if (Game6Controller.board6Init[j][i] == 3) {
                    let yewllowDot = instantiate(this.Model.CircleYellow);
                    this.View.Board6.addChild(yewllowDot);
                    yewllowDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
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
                
                if (Game6Controller.board6Init[j][i] == 4) {
                    let greenDot = instantiate(this.Model.CircleGreen);
                    this.View.Board6.addChild(greenDot);
                    greenDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
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
                
                if (Game6Controller.board6Init[j][i] == 5) {
                    let orangeDot = instantiate(this.Model.CircleOrange);
                    this.View.Board6.addChild(orangeDot);
                    orangeDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
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
                
                if (Game6Controller.board6Init[j][i] == 6) {
                    let softBlueDot = instantiate(this.Model.CircleSoftBlue);
                    this.View.Board6.addChild(softBlueDot);
                    softBlueDot.position = new Vec3(Game6Controller.xPos, Game6Controller.yPos, 0);
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
                Game6Controller.xPos += 80;
            }       
            Game6Controller.yPos -= 80;
        }
    }

    private backBtn(PlayBtn6: Button) {
        director.loadScene('Level');
    }
}

