var dim = {
    radius: 100,
    diameter: 200, 
    center_x: 200,
    center_y: 210,
    hour_hand: 60,
    min_hand: 80
};

var loc = {
    hour_x: dim.center_x,
    hour_y: dim.center_y + dim.hour_hand,
    min_x: dim.center_x,
    min_y: dim.center_y - dim.min_hand
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

var getHourHandAngle = function(){
    var hourHandAngle = 30*(time.hour) + 0.5*(time.tenth_min*10 + time.oneth_min);
    return hourHandAngle;
};

var getMinHandAngle = function(){
    var minHandAngle = 6*(time.tenth_min*10 + time.oneth_min); 
    return minHandAngle;
};

var getUpdatedX = function(hand_length, angle){
    return dim.center_x + sin(angle)*hand_length;
};

var getUpdatedY = function(hand_length, angle){
    return dim.center_y - cos(angle)*hand_length;
};

var updateHourHand = function(){
    var hourHandAngle = getHourHandAngle();
    loc.hour_x = getUpdatedX(dim.hour_hand, hourHandAngle);
    loc.hour_y = getUpdatedY(dim.hour_hand, hourHandAngle);
};

var updateMinHand = function(){
    var hourHandAngle = getHourHandAngle();
    var minHandAngle = getMinHandAngle();
    loc.hour_x = getUpdatedX(dim.hour_hand, hourHandAngle);
    loc.hour_y = getUpdatedY(dim.hour_hand, hourHandAngle);
    loc.min_x = getUpdatedX(dim.min_hand, minHandAngle);
    loc.min_y = getUpdatedY(dim.min_hand, minHandAngle);
};

var updateTime = function(){
    mouseClicked = function(){
        var x = mouseX;
        var y = mouseY;
        if (isClickInButton(x, y, HourUpButton)){
            time.hour = ((time.hour + 1) % 12);
            updateHourHand();
        }
        else if (isClickInButton(x, y, HourDownButton)){
            time.hour = (time.hour > 0 ? time.hour - 1 : 11);
            updateHourHand();
        }
        else if (isClickInButton(x, y, TenthMinUpButton)){
            time.tenth_min = (time.tenth_min + 1) % 6;   
            updateMinHand();
        }
        else if (isClickInButton(x, y, TenthMinDownButton)){
            time.tenth_min = (time.tenth_min > 0 ? time.tenth_min - 1 : 5);
            updateMinHand();
        }
        else if (isClickInButton(x, y, OnethMinUpButton)){
            time.oneth_min = (time.oneth_min + 1) % 10;
            updateMinHand();
        }
        else if (isClickInButton(x, y, OnethMinDownButton)){
            time.oneth_min = (time.oneth_min > 0 ? time.oneth_min - 1 : 9);
            updateMinHand();
        }
    };
};

var TimeBoxes = function(){
    fill(255, 255, 255);
    rect(70, 30, 50, 50, 5);
    rect(130, 30, 50, 50, 5);
    rect(220, 30, 50, 50, 5);
    rect(280, 30, 50, 50, 5);
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
    line(dim.center_x, dim.center_y, loc.hour_x, loc.hour_y);
};

var ClockMinHand = function(){
    strokeWeight(3);
    line(dim.center_x, dim.center_y, loc.min_x, loc.min_y);
};

var ClockHourArc = function(){
    strokeWeight(1);
    stroke(0, 21, 255);
    noFill();
    var angle = getHourHandAngle() - 90;
    arc(dim.center_x, dim.center_y, dim.hour_hand, dim.hour_hand, -90, angle);  
};

var ClockMinArc = function(){
    strokeWeight(1);
    stroke(255, 0, 0);
    noFill();
    var angle = getMinHandAngle() - 90;
    arc(dim.center_x, dim.center_y, dim.min_hand, dim.min_hand, -90, angle);  
};

var ClockDiffArc = function(){
    var hour_angle, min_angle, initial_angle, final_angle;
    strokeWeight(1);
    stroke(0, 255, 166);
    noFill();
    hour_angle = getHourHandAngle() - 90;
    min_angle = getMinHandAngle() - 90;
    if (abs(hour_angle - min_angle) <= 180){
        if (min_angle <= hour_angle){
            initial_angle = min_angle;
            final_angle = hour_angle;
        }
        else{
            initial_angle = hour_angle;
            final_angle = min_angle;
        }
    }
    else{
        if (min_angle < hour_angle){
            initial_angle = hour_angle;
            final_angle = min_angle + 360;
        }
        else{
            initial_angle = min_angle;
            final_angle = hour_angle + 360;
        }
    }
    arc(dim.center_x, dim.center_y, dim.min_hand+20, dim.min_hand+20, initial_angle, final_angle);
};
var ClockCenter = function(){
    fill(0, 0, 0);
    ellipse(dim.center_x, dim.center_y, 10, 10);    
};

var ClockFrame = function(){
    stroke(0, 0, 0);
    fill(255, 255, 255);
    ellipse(dim.center_x, dim.center_y, dim.diameter, dim.diameter);       
};

var ClockMarks = function(){
    var i, angle, x, y;
    textSize(12);
    textAlign(CENTER, CENTER);
    for(i = 1; i <= 12; i++){
        angle = (30*i) % 360;
        x = getUpdatedX(dim.radius - 10, angle);
        y = getUpdatedY(dim.radius - 10, angle);        
        text(i, x, y);
    }
};

var ClockDottedLine = function(){
    var i;
    stroke(0, 0, 0);
    for (i = dim.center_y - dim.radius; i < dim.center_y; i+=2){
        point(dim.center_x, i);
    }
};
var drawClock = function(){
    ClockFrame();
    ClockCenter();
    ClockHourHand();
    ClockMinHand();
    ClockMarks();
    ClockHourArc();
    ClockMinArc();
    ClockDiffArc();
    ClockDottedLine();
};

var drawTable = function(){
    fill(255, 0, 0);
    rect(30, 320, 100, 20);
    
    fill(0, 34, 255);
    rect(30, 340, 100, 20);  
    
    fill(0, 255, 242);
    rect(30, 360, 100, 20);  
    
    fill(255, 255, 255);
    rect(130, 320, 250, 20);
    rect(130, 340, 250, 20);
    rect(130, 360, 250, 20);    
    
    fill(255, 255, 255);
    textSize(10);
    textAlign(LEFT, CENTER);
    text(" Minute Angle", 30, 320, 70, 20);
    text(" Hour Angle", 30, 340, 70, 20);
    textSize(8);
    text(" Angle in Between", 30, 360, 70, 20);
};

var drawEquation = function(){
    var min, min_angle, hour, hour_angle, diff;
    min = time.tenth_min*10+time.oneth_min;
    min_angle = getMinHandAngle();
    hour = time.hour;
    hour_angle = getHourHandAngle();
    diff = abs(min_angle - hour_angle);
    fill(0, 0, 0);
    textSize(10);
    textAlign(LEFT, CENTER);

    text(" 6° x " + min + " minutes = " + min_angle+"°", 130, 320, 250, 20);  
    text(" 30° x " + hour + " hours + 0.5° x " + min + " minutes = " + hour_angle +"°", 130, 340, 250, 20);
        
    text(" |"+ min_angle + "° - " + hour_angle+ "°| = " + diff + "°", 130, 360, 250, 20);
};

var drawAnswer = function(){
    drawTable();
    drawEquation();
};

var draw = function() {
    background(240, 240, 240);
    strokeWeight(1);
    drawControl();
    drawClock();
    drawAnswer();
    updateTime();
};
