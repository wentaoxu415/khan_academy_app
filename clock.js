var dim = {
    radius: 100,
    diameter: 200, 
    center_x: 200,
    center_y: 210,
    hour_hand: 60,
    min_hand: 80
};

var time = {
    hour: 6,
    tenth_min: 0,
    oneth_min: 0
};
    
var Button = function(x, y, w, h, direction){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;
};

Button.prototype.draw = function() {
    if (this.direction === 'UP'){
        fill(48, 163, 2);
    }
    else {
        fill(222, 20, 20);
    }
    rect(this.x, this.y, this.w, this.h, 5); 
    fill(255, 255, 255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(this.direction, this.x, this.y, this.w, this.h);
};

var HourUpButton = new Button(70, 5, 110, 20, 'UP');
var HourDownButton = new Button(70, 85, 110, 20, 'DOWN');
var TenthMinUpButton = new Button(220, 5, 50, 20, 'UP');
var TenthMinDownButton = new Button(220, 85, 50, 20, 'DOWN');
var OnethMinUpButton = new Button(280, 5, 50, 20, 'UP');
var OnethMinDownButton = new Button(280, 85, 50, 20, 'DOWN');

var isClickInButton = function(x, y, button){
    if (x > button.x && x < (button.x + button.w) && y > button.y && y < (button.y + button.h     )){
       return true; 
    }
    return false;
};

var handleMouse = function(){
    mouseClicked = function(){
        var x = mouseX;
        var y = mouseY;
        if (isClickInButton(x, y, HourUpButton)){
            time.hour = ((time.hour + 1) % 12);
        }
        else if (isClickInButton(x, y, HourDownButton)){
            time.hour = (time.hour > 0 ? time.hour - 1 : 11) ;
        }
        else if (isClickInButton(x, y, TenthMinUpButton)){
            time.tenth_min = (time.tenth_min + 1) % 6;   
        }
        else if (isClickInButton(x, y, TenthMinDownButton)){
            time.tenth_min = (time.tenth_min > 0 ? time.tenth_min - 1 : 5);
        }
        else if (isClickInButton(x, y, OnethMinUpButton)){
            time.oneth_min = (time.oneth_min + 1) % 10;
        }
        else if (isClickInButton(x, y, OnethMinDownButton)){
            time.oneth_min = (time.oneth_min > 0 ? time.oneth_min - 1 : 9);
        }
    };
};


var TimeBoxes = function(){
    fill(255, 255, 255);
    rect(70, 30, 50, 50);
    rect(130, 30, 50, 50);
    rect(220, 30, 50, 50);
    rect(280, 30, 50, 50);
};

var TimeColons = function(){
    fill(0, 0, 0);
    ellipse(200, 40, 10, 10);
    ellipse(200, 70, 10, 10);
};

var TimeTenthHourText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text((time.hour >= 10 ? '1': '0'), 70, 30, 50, 50);
};
var TimeOnethHourText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(time.hour % 10, 130, 30, 50, 50);
};

var TimeTenthMinText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(time.tenth_min, 220, 30, 50, 50);  
};

var TimeOnethMinText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(time.oneth_min, 280, 30, 50, 50);  
};

var drawControl = function(){
    TimeBoxes();
    TimeColons();
    TimeTenthHourText();
    TimeOnethHourText();
    TimeTenthMinText();
    TimeOnethMinText();
    HourUpButton.draw();
    HourDownButton.draw();
    TenthMinUpButton.draw();
    TenthMinDownButton.draw();
    OnethMinUpButton.draw();
    OnethMinDownButton.draw();
};

var ClockHourHand = function(){
    strokeWeight(5);
    line(dim.center_x, dim.center_y, dim.center_x, dim.center_y+dim.hour_hand);
};

var ClockMinHand = function(){
    strokeWeight(3);
    line(dim.center_x, dim.center_y, dim.center_x, dim.center_y-dim.min_hand);
};

var ClockCenter = function(){
    fill(0, 0, 0);
    ellipse(dim.center_x, dim.center_y, 10, 10);    
};

var ClockFrame = function(){
    fill(255, 255, 255);
    ellipse(dim.center_x, dim.center_y, dim.diameter, dim.diameter);       
};


var drawClock = function(){
    ClockFrame();
    ClockCenter();
    ClockHourHand();
    ClockMinHand();
};

var draw = function() {
    background(255, 255, 200);
    strokeWeight(1);
    drawControl();
    drawClock();
    handleMouse();
};
