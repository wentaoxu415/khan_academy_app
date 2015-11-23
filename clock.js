

//-------------------- BEGIN OBJECTS -----------------------------------------
// dim object stores the values of element's dimensiom
var dim = {
    "radius": 90,
    "diameter": 180, 
    "center_x": 200,
    "center_y": 190,
    "hour_hand": 60,
    "min_hand": 80
};

// loc object stores the value of each clock hand's location
var loc = {
    "hour_x": dim.center_x,
    "hour_y": dim.center_y + dim.hour_hand,
    "min_x": dim.center_x,
    "min_y": dim.center_y - dim.min_hand
};

// time object stores the value of the user provided time
var time = {
    "hour": 6,
    "tenth_min": 0,
    "oneth_min": 0
};

var stateMap = {
    "current_step": 1
};
    
//-------------------- BEGIN CLASS CONSTRUCTORS ------------------------------
// Button is a constructor that creates Button class for time update
var Button = function(x, y, w, h, direction){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;
};

// Button.draw() creates a button instance for time update
Button.prototype.draw = function() {
    if (this.direction === 'UP'){
        fill(48, 163, 2);
    }
    else if (this.direction === 'DOWN'){
        fill(222, 20, 20);
    }
    rect(this.x, this.y, this.w, this.h, 5); 
    fill(255, 255, 255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(this.direction, this.x, this.y, this.w, this.h);
};

// Declare button instances for time update
var HourUpButton = new Button(90, 5, 90, 20, 'UP');
var HourDownButton = new Button(90, 75, 90, 20, 'DOWN');
var TenthMinUpButton = new Button(220, 5, 40, 20, 'UP');
var TenthMinDownButton = new Button(220, 75, 40, 20, 'DOWN');
var OnethMinUpButton = new Button(270, 5, 40, 20, 'UP');
var OnethMinDownButton = new Button(270, 75, 40, 20, 'DOWN');
var next_button = new Button(350, 290, 40, 80, 'NEXT'); 
var prev_button = new Button(50, 290, 40, 80, 'PREV');

//--------------- BEGIN HELPER FUNCTIONS -------------------------------------
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

var handleClicks = function(){
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
        else if (isClickInButton(x, y, next_button)){
            stateMap.current_step += 1;   
        }
    };
};

var TimeBoxes = function(){
    fill(255, 255, 255);
    rect(90, 30, 40, 40, 5);
    rect(140, 30, 40, 40, 5);
    rect(220, 30, 40, 40, 5);
    rect(270, 30, 40, 40, 5);
};

var TimeColons = function(){
    fill(0, 0, 0);
    ellipse(200, 40, 8, 8);
    ellipse(200, 60, 8, 8);
};

var TimeTenthHourText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text((time.hour >= 10 ? '1': '0'), 90, 25, 40, 40);
};
var TimeOnethHourText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(time.hour % 10, 140, 25, 40, 40);
};

var TimeTenthMinText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(time.tenth_min, 220, 25, 40, 40);  
};

var TimeOnethMinText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(time.oneth_min, 270, 25, 40, 40);  
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

//-------------------- BEGIN HELPER DRAW FUNCTION ----------------------------
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

var message_object = {
    1: "This tutorial will help you understand how to calculate the angles between the hands of a clock. Let's start our journey!",
    2: "First, let's calculate the minute hand angle. We define the minute hand angle to be the angle between the minute hand and the 12 O'Clock mark.",
    3: "Since there are 360 degrees in a circle and there are 60 minutes in one hour, each minute will move the minute hand by 360/60 or 6 degrees. ",
    4: "Try changing the minutes on the clock above. You should see that for each minute that you change, the minute hand moves by 6 degree!",
    5: "Next, let's calculate the hour hand angle. We define the hour hand angle to be the angle between the hour hand and the 12 O'Clock mark.",
    6: "This is actually a little trickier problem since while the hour hand moves as the hour changes, the hour hand also moves as each minute changes",
    7: "This means that the hour hand angle is composed of 2 parts: the part that is moved by changes in hour and another part that is moved by changes in minutes",
    8: "Now, let's calculate the part of the hour hand angle that is moved by changes in hour. Since there are 12 hours in one cycle of the clock, each hour will move the hour hand by 360/12 or 30 degrees.  ",
    9: "Then, let's calculate the part of the hour hand angle that is moved by changes in minutes. As we saw in previous step, one hour moves the hour hand by 30 degrees.",
    10: "This also means that 60 minutes also moves the hour hand by 30 degrees. As a result, each minute will move the hour hand by 30/60 or 0.5 degrees.",
    11: "In short, the hour hand can be expressed as the formula below \nhour hand angle = 30 x hour + 0.5 x minute ",
    12: ""
};

var fill_color = function(color){
    switch(color){
        case "green":
            return fill(0, 200, 100);
    }
};

var drawTutorial = function(){
  image(getImage("avatars/mr-pants-with-hat"), 5, 350, 30, 30);
  fill(255, 255, 255);
  rect(50, 290, 340, 80, 5);
  
  fill_color("green");
  next_button.draw();
  fill(0, 0, 0);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(message_object[stateMap.current_step], 100, 290, 250, 80);
};



//-------------------- BEGIN MAIN DRAW FUNCTION ------------------------------
var draw = function() {
    background(240, 240, 240);
    strokeWeight(1);
    drawClock();
    handleClicks();
    if (stateMap.current_step === 0){
        drawControl();
        drawTutorial();
    }
};
