/*
Title: Clock Angle Problem
Author: Wentao Xu
Description: Clock angle problem is a problem that asks you to find the angle between the two hands of a clock. This progam helps to understand how to calculate the angle between the two hands of a clock.
How It Works: There are two modes in this progam. There is a tutorial mode that guides you through the entire calculatinon process set with clear animations and explanations. Another mode is the challenges mode that allows to you generate a new problem for you to figure out and interact with the clock. Let's see how good you can get with this problem! 
*/

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

var stateMap = {
    // Stores user's progress in tutorial
    "current_step": 0,
    // Stores the previous time to help spinClock() function work 
    "prev_time": 0,
    // Serves as a flag to see the need for clock reset
    "need_reset": true,
    // Stores the difficulty level of the problem
    "difficulty_level": "easy",
    // time object stores the value of the user provided time
    "time": {
        "hour": 6,
        "tenth_min": 0,
        "oneth_min": 0   
    },
    // loc object stores the value of each clock hand's location
    "loc": {
        "hour_x": dim.center_x,
        "hour_y": dim.center_y + dim.hour_hand,
        "min_x": dim.center_x,
        "min_y": dim.center_y - dim.min_hand    
    },
    // angle object stores the angle of each clock's hand 
    "angle":{
        "hour_angle": 180,
        "min_angle": 0
    },
    // show objects stores the flag that determines whether to show angles and
    // buttons in the last step of tutorial 
    "show":{
        "hour_angle": false,
        "min_angle": false,
        "answer": false
    }
};

// message_object stores the messages for each step of the tutorial
var message_object = {
    1: "This tutorial will help you understand how to calculate the angles between the hands of a clock. Let's start our journey!",
    2: "First, let's calculate the minute hand angle. We define the minute hand angle to be the angle between the minute hand and the 12 O'Clock mark.",
    3: "Since there are 360 degrees in a circle and there are 60 minutes in one hour, each minute will move the minute hand by 360/60 or 6 degrees. ",
    4: "Try changing the minutes on the clock above. You should see that for each minute that you change, the minute hand moves by 6 degree!",
    5: "In short, the minute hand can be expressed as the formula below \n\n minute hand angle = 6 x minute", 
    6: "Next, let's calculate the hour hand angle. We define the hour hand angle to be the angle between the hour hand and the 12 O'Clock mark.",
    7: "This is actually a little trickier problem since while the hour hand moves as the hour changes, the hour hand also moves as each minute changes",
    8: "This means that the hour hand angle is composed of 2 parts: the part that is moved by changes in hour and another part that is moved by changes in minutes",
    9: "Now, let's calculate the part of the hour hand angle that is moved by changes in hour. Since there are 12 hours in one cycle of the clock, each hour will move the hour hand by 360/12 or 30 degrees.  ",
    10: "Then, let's calculate the part of the hour hand angle that is moved by changes in minutes. As we saw in previous step, one hour moves the hour hand by 30 degrees.",
    11: "This also means that 60 minutes also moves the hour hand by 30 degrees. As a result, each minute will move the hour hand by 30/60 or 0.5 degrees.",
    12: "In short, the hour hand can be expressed as the formula below \n\n hour hand angle = 30 x hour + 0.5 x minute ",
    13: "Now that we know how to calculate the minute hand angle and the hour hand angle, we can calculate the angle between the two hands.",
    14: "The angle between the two hands can be calculated by subtracting one angle from another and taking the absolute value of the difference.\n Angle = abs(minute angle - hour angle)",
    15: "Sometimes, this difference can be greater than 180 degrees. In that case, we can get the smaller angle between the two hands by subtracting this difference from 360 degrees\n Smaller Angle = 360 - Greater Angle",
    16: "Congrats, you did it! Now you know how to solve this problem, press 'NEXT' to play around with the clock and see if you can calculate the angle by yourself!",
    17: ""
};
//-------------------- BEGIN HELPER FUNCTIONS -------------------------------- 
var getUpdatedX = function(length, angle){
    return dim.center_x + sin(angle)*length;
};

var getUpdatedY = function(length, angle){
    return dim.center_y - cos(angle)*length;
};

var updateHourX = function(){
    stateMap.loc.hour_x = getUpdatedX(dim.hour_hand, stateMap.angle.hour_angle);
};

var updateHourY = function(){
    stateMap.loc.hour_y = getUpdatedY(dim.hour_hand, stateMap.angle.hour_angle);
};

var updateMinX = function(){
    stateMap.loc.min_x = getUpdatedX(dim.min_hand, stateMap.angle.min_angle);
};

var updateMinY = function(){
    stateMap.loc.min_y = getUpdatedY(dim.min_hand, stateMap.angle.min_angle);
};

var updateHourHandAngle = function(){
    var minutes = stateMap.time.tenth_min*10 + stateMap.time.oneth_min;
    var hourHandAngle = 30*(stateMap.time.hour) + 0.5*(minutes);
    stateMap.angle.hour_angle = hourHandAngle;
};

var updateMinHandAngle = function(){
    var minHandAngle = 6*(stateMap.time.tenth_min*10 + stateMap.time.oneth_min); 
    stateMap.angle.min_angle = minHandAngle;
};

var updateHourHand = function(){
    updateHourHandAngle();
    updateHourX();
    updateHourY();
};

var updateMinHand = function(){
    updateHourHandAngle();
    updateMinHandAngle();
    updateHourHand();
    updateMinX();
    updateMinY();
};

var updateHour = function(direction){
    if (direction === "UP"){
        stateMap.time.hour = (stateMap.time.hour + 1) % 12;
    }
    else{
        stateMap.time.hour = (stateMap.time.hour > 0 ? stateMap.time.hour - 1 : 11);
    }    
};

var updateTenthMin = function(direction){
    if (direction === "UP"){
        if (stateMap.time.tenth_min === 5){
            stateMap.time.tenth_min = 0;
            updateHour(direction);
        }
        else{
            stateMap.time.tenth_min += 1;
        }
    }
    else{
        if (stateMap.time.tenth_min === 0){
            stateMap.time.tenth_min = 5;
            updateHour(direction);
        }
        else{

            stateMap.time.tenth_min -= 1;
        }
    }    
};

var updateOnethMin = function(direction){
    if (direction === "UP"){
        if (stateMap.time.oneth_min === 9){
            stateMap.time.oneth_min = 0;
            updateTenthMin(direction);
        }
        else{
            stateMap.time.oneth_min += 1;
        }
    }
    else{
        if (stateMap.time.oneth_min === 0){
            stateMap.time.oneth_min = 9;
            updateTenthMin(direction);
        }
        else{
            stateMap.time.oneth_min -= 1;
        }     
    }
};

var updateTime = function(time_unit, direction){
    var prev_hour = stateMap.time.hour;
    var prev_min  = stateMap.time.tenth_min * 10 + stateMap.time.oneth_min;
    if (time_unit === "hour"){
        updateHour(direction);            
    }
    else if (time_unit === "tenth_min"){
        updateTenthMin(direction);
    }
    else{
       updateOnethMin(direction);
    }
};

var resetTime = function(hour, tenth_min, oneth_min){
    if (stateMap.need_reset === true){
        stateMap.time.hour = hour;
        stateMap.time.tenth_min = tenth_min;
        stateMap.time.oneth_min = oneth_min;
        updateMinHand();
        stateMap.need_reset = false;
    }
};

// spinClock() shows the clock spinning based on given unit and interval
// Input: unit = oneth_min, tenth_min, hour; interval = time in milliseconds
var spinClock = function(unit, interval){
    var current_time;
    current_time = floor(millis()/interval);
    if (current_time > (stateMap.prev_time + 1)){
        stateMap.prev_time = current_time;
        updateTime(unit, "UP");
        updateMinHand();
    }
};

var getNewTime = function(){
    var part, hour, min, rounded_min, tenth_min, oneth_min;
    if (stateMap.difficulty_level === "easy"){
        part = round(random(0, 1)); 
        if (part === 0){ //Change the hour hand
            hour = round(random(0, 11));
            resetTime(hour, 0, 0);
        }
        else{ //Change the minute hand
            min = round(random(0, 59.99));
            rounded_min = floor(min/5)*5;
            tenth_min = floor((rounded_min/10));
            oneth_min = rounded_min - tenth_min*10;
            resetTime(0, tenth_min, oneth_min);
        }
    } 
    else if (stateMap.difficulty_level === "medium"){
        hour = round(random(0, 11));
        min = round(random(0, 59.99));
        rounded_min = floor(min/5)*5;
        tenth_min = floor((rounded_min/10));
        oneth_min = rounded_min - tenth_min*10;
        resetTime(hour, tenth_min, oneth_min);
    }
    else if (stateMap.difficulty_level === "hard"){
        hour = round(random(0, 11));
        min = round(random(0, 59.99));
        tenth_min = floor((min/10));
        oneth_min = min - tenth_min*10;
        resetTime(hour, tenth_min, oneth_min);
    }
};

var fillColor = function(color){
    switch(color){
        case "green":
            return fill(0, 200, 100);
        case "blue":
            return fill(100, 150, 255);
        case "dark_blue":
            return fill(0, 0, 150);
        case "light_blue":
            return fill(150, 200, 255);
        case "red": 
            return fill(255, 0, 0);    
        case "yellow":
            return fill(255, 200, 0);
        case "white":
            return fill(255, 255, 255);
        case "black":
            return fill(0, 0, 0);
        case "gray":
            return fill(100, 100, 100);
    }
};

var strokeColor = function(color){
    switch(color){
        case "green":
            return stroke(0, 200, 100);
        case "light_green":
            return stroke(150, 200, 100);
        case "blue":
            return stroke(100, 150, 255);
        case "dark_blue":
            return stroke(0, 0, 150);
        case "light_blue":
            return stroke(150, 200, 255);
        case "red":
            return stroke(255, 0, 0);
        case "black":
            return stroke(0, 0, 0);
        case "gray":
            return stroke(100, 100, 100);
    }
};
//-------------------- BEGIN CLASS CONSTRUCTORS ------------------------------
// Button is a constructor that creates the class for buttons 
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
        fillColor("green");
    }
    else if (this.direction === 'DOWN'){
        fillColor("red");
    }
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h, 5); 
    fillColor("white");
    textSize(10);
    textAlign(CENTER, CENTER);
    text(this.direction, this.x, this.y, this.w, this.h);
};

// Declare button instances for time update
var hour_up_button = new Button(90, 5, 90, 20, "UP");
var hour_down_button = new Button(90, 75, 90, 20, "DOWN");
var tenth_min_up_button = new Button(220, 5, 40, 20, "UP");
var tenth_min_down_button = new Button(220, 75, 40, 20, "DOWN");
var oneth_min_up_button = new Button(270, 5, 40, 20, "UP");
var oneth_min_down_button = new Button(270, 75, 40, 20, "DOWN");

// Declare button instances for navigation
var tutorial_button = new Button(160, 320, 80, 30, "TUTORIAL");
var challenge_button = new Button(160, 360, 80, 30, "CHALLENGES");
var next_button = new Button(350, 290, 40, 100, "NEXT"); 
var prev_button = new Button(50, 290, 40, 100, "PREV");

// Declare button instances for hints and answers at the last slide
var min_angle_button = new Button(10, 315, 70, 20, "Minute Angle");
var hour_angle_button = new Button(10, 340, 70, 20, "Hour Angle");
var answer_button = new Button(10, 365, 70, 20, "Answer");

// Declare button instances for difficulty level
var easy_button = new Button(10, 155, 60, 20, "Easy");
var medium_button = new Button(10, 180, 60, 20, "Medium");
var hard_button = new Button(10, 205, 60, 20, "Hard");

// Declare button instance for a new problem
var new_challenge_button = new Button(140, 285, 120, 20, "Display New Time");

//--------------- BEGIN HELPER FUNCTIONS FOR BUTTON INTERACTION --------------
var isClickInButton = function(x, y, button){
    if (x > button.x && x < (button.x + button.w) && y > button.y && y < (button.y + button.h)){
       return true; 
    }
    return false;
};

var handleClicks = function(){
    mouseClicked = function(){
        var x = mouseX;
        var y = mouseY;
        if (isClickInButton(x, y, hour_up_button)){
            updateTime("hour", "UP");
            updateHourHand();
        }
        else if (isClickInButton(x, y, hour_down_button)){
            updateTime("hour", "DOWN");
            updateHourHand();
        }
        else if (isClickInButton(x, y, tenth_min_up_button)){
            updateTime("tenth_min", "UP");
            updateMinHand();
        }
        else if (isClickInButton(x, y, tenth_min_down_button)){
            updateTime("tenth_min", "DOWN");
            updateMinHand();
        }
        else if (isClickInButton(x, y, oneth_min_up_button)){
            updateTime("oneth_min", "UP");
            updateMinHand();
        }
        else if (isClickInButton(x, y, oneth_min_down_button)){
            updateTime("oneth_min", "DOWN");
            updateMinHand();
        }
        
        if (stateMap.current_step === 0){
            if (isClickInButton(x, y, tutorial_button)){
                stateMap.current_step = 1;
                stateMap.need_reset = true;
                stateMap.prev_time = 0;
            }
            else if (isClickInButton(x, y, challenge_button)){
                stateMap.current_step = 17;
                stateMap.need_reset = true;
            }           
        }
        else if (stateMap.current_step >= 1 && stateMap.current_step <= 16){
            if (isClickInButton(x, y, next_button)){
                stateMap.current_step += 1;   
                stateMap.need_reset = true;
                stateMap.prev_time = 0;
            }
            else if (isClickInButton(x, y, prev_button)){
                stateMap.current_step -= 1;   
                stateMap.need_reset = true;
                stateMap.prev_time = 0;
            }   
        }
        else if (stateMap.current_step === 17){ 
            if (isClickInButton(x, y, min_angle_button)){
                if (stateMap.show.min_angle === true){
                    stateMap.show.min_angle = false;
                }
                else{
                    stateMap.show.min_angle = true;
                }
            }
            else if (isClickInButton(x, y, hour_angle_button)){
                if (stateMap.show.hour_angle === true){
                        stateMap.show.hour_angle = false;
                }
                else{
                        stateMap.show.hour_angle = true;
                }
            }
            else if (isClickInButton(x, y, answer_button)){
                if (stateMap.show.answer === true){
                    stateMap.show.answer = false;
                }
                else{
                    stateMap.show.answer = true;
                }
            }
            else if (isClickInButton(x, y, easy_button)){
                stateMap.difficulty_level = "easy";          
            }
            else if (isClickInButton(x, y, medium_button)){
                stateMap.difficulty_level = "medium";          
            }
            else if (isClickInButton(x, y, hard_button)){
                stateMap.difficulty_level = "hard";          
            }
            else if (isClickInButton(x, y, new_challenge_button)){
                stateMap.need_reset = true;
                getNewTime();
            }
        }
    };
};

//--------------- BEGIN TIME COMPONENTS --------------------------------------
var TimeBoxes = function(){
    fillColor("white");
    strokeWeight(1);
    rect(90, 30, 40, 40, 5);
    rect(140, 30, 40, 40, 5);
    rect(220, 30, 40, 40, 5);
    rect(270, 30, 40, 40, 5);
};

var TimeColons = function(){
    fillColor("black");
    ellipse(200, 40, 8, 8);
    ellipse(200, 60, 8, 8);
};

var TimeTenthHourText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text((stateMap.time.hour >= 10 ? '1': '0'), 90, 25, 40, 40);
};
var TimeOnethHourText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(stateMap.time.hour % 10, 140, 25, 40, 40);
};

var TimeTenthMinText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(stateMap.time.tenth_min, 220, 25, 40, 40);  
};

var TimeOnethMinText = function(){
    textSize(24);
    textAlign(CENTER, CENTER);
    text(stateMap.time.oneth_min, 270, 25, 40, 40);  
};

//--------------- BEGIN CLOCK COMPONENTS -------------------------------------
var ClockCenter = function(){
    fillColor("black");
    ellipse(dim.center_x, dim.center_y, 10, 10);    
};

var ClockFrame = function(){
    stroke(0, 0, 0);
    fillColor("white");
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
    strokeWeight(1);
    stroke(0, 0, 0);
    for (i = dim.center_y - dim.radius; i < dim.center_y; i+=2){
        point(dim.center_x, i);
    }
};

var ClockHourHand = function(){
    strokeWeight(5);
    line(dim.center_x, dim.center_y, stateMap.loc.hour_x, stateMap.loc.hour_y);
};

var ClockMinHand = function(){
    strokeWeight(3);
    line(dim.center_x, dim.center_y, stateMap.loc.min_x, stateMap.loc.min_y);
};

// ClockMinArc() displays the arc of the hour angle
var ClockHourArc = function(){
    var angle, x, y;
    strokeWeight(1);
    strokeColor("blue");
    noFill();
    angle = stateMap.angle.hour_angle - 90;
    arc(dim.center_x, dim.center_y, dim.hour_hand, dim.hour_hand, -90, angle);  
    x = getUpdatedX(dim.hour_hand/2+10, stateMap.angle.hour_angle/2);
    y = getUpdatedY(dim.hour_hand/2+10, stateMap.angle.hour_angle/2);
    fillColor("blue");
    textSize(10);
    textAlign(LEFT, TOP);
    text(stateMap.angle.hour_angle+"°", x, y, 30, 30);
};

// ClockMinArc() displays the arc of the minute angle
var ClockMinArc = function(){
    var angle, x, y;
    strokeWeight(1);
    strokeColor("red");
    noFill();
    angle = stateMap.angle.min_angle - 90;
    arc(dim.center_x, dim.center_y, dim.min_hand+10, dim.min_hand+10, -90, angle);  
    
    x = getUpdatedX(dim.min_hand/2+10, stateMap.angle.min_angle/2);
    y = getUpdatedY(dim.min_hand/2+10, stateMap.angle.min_angle/2);
    fillColor("red");
    textSize(10);
    textAlign(LEFT, TOP);
    text(stateMap.angle.min_angle+"°", x, y, 30, 30);
};

// ClockDiffArc() displays the arc of the angle between the clock's two hands
var ClockDiffArc = function(){
    var hour_angle, min_angle, initial_angle, final_angle, diff_angle, diff_text_angle,     
    complement_text_angle, x, y, complement_x, complement_y;
    strokeWeight(1);
    textSize(10);
    noFill();
    hour_angle = stateMap.angle.hour_angle - 90;
    min_angle = stateMap.angle.min_angle - 90;

    if (abs(hour_angle - min_angle) <= 180){
        diff_angle = abs(hour_angle - min_angle);
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
        diff_angle = 360 - abs(hour_angle - min_angle);
        if (min_angle < hour_angle){
            initial_angle = hour_angle;
            final_angle = min_angle + 360;
        }
        else{
            initial_angle = min_angle;
            final_angle = hour_angle + 360;
        }
        strokeColor("gray");
        arc(dim.center_x, dim.center_y, dim.min_hand+30, dim.min_hand+30, final_angle-360, initial_angle);
        complement_text_angle = (final_angle - 360 + 90)+(360-diff_angle)/2;
        complement_x = getUpdatedX(dim.min_hand/2+10, complement_text_angle);
        complement_y = getUpdatedY(dim.min_hand/2+10, complement_text_angle);
        fillColor("gray");
        textAlign(LEFT, CENTER);
        text(360-diff_angle+"°", complement_x, complement_y, 50, 30);
    }
    
    strokeColor("green");
    noFill();
    arc(dim.center_x, dim.center_y, dim.min_hand+30, dim.min_hand+30, initial_angle, final_angle);
   
    
    fillColor("green");
    diff_text_angle = (initial_angle + 90) + diff_angle/2;

    x = getUpdatedX(dim.min_hand/2+10, diff_text_angle);
    y = getUpdatedY(dim.min_hand/2+10, diff_text_angle);
    textAlign(LEFT, CENTER);
    text(diff_angle+"°", x, y, 50, 30);
    
};

// ClockSplitHourArc() splits the hour arc into the part moved by changes in 
// hour and another part moved by changes in minutes to enable easier 
// explanation in the tutorial
var ClockSplitHourArc = function(part){
    var hour_part, hour_x, hour_y, min_part, min_x, min_y, x, y;
    strokeWeight(1);
    noFill();
    textSize(10);
    hour_part = floor(stateMap.angle.hour_angle/30)*30;
    min_part = stateMap.angle.hour_angle - 90;
    
    strokeColor("dark_blue");
    arc(dim.center_x, dim.center_y, dim.hour_hand, dim.hour_hand, -90, hour_part - 90);
    
    strokeColor("light_blue");
    arc(dim.center_x, dim.center_y, dim.hour_hand, dim.hour_hand, hour_part - 90, min_part);
    
    hour_x = getUpdatedX(dim.hour_hand/2, stateMap.angle.hour_angle/2);
    hour_y = getUpdatedY(dim.hour_hand/2, stateMap.angle.hour_angle/2);
    hour_part = stateMap.time.hour*30;

    min_x = getUpdatedX(dim.hour_hand/2, stateMap.angle.hour_angle);
    min_y = getUpdatedY(dim.hour_hand/2, stateMap.angle.hour_angle);
    min_part = stateMap.angle.hour_angle - hour_part;

    x = getUpdatedX(dim.hour_hand, stateMap.angle.hour_angle/2);
    y = getUpdatedY(dim.hour_hand, stateMap.angle.hour_angle/2);
    
    if (part === "hour_part"){
        fillColor("dark_blue");
        text(hour_part+"°", hour_x, hour_y, 30, 30);
    }
    else if (part === "min_part"){
        fillColor("light_blue");
        text(min_part+"°", hour_x, hour_y, 30, 30);   
    }
    else if (part === "both"){
        fillColor("blue");
        text(stateMap.angle.hour_angle+"°", x, y, 30, 30);
    }

};

//-------------------- BEGIN HELPER DRAW FUNCTION ----------------------------
// drawControl() draws the clock control by getting all the necessary components
var drawControl = function(){
    strokeColor("black");
    TimeBoxes();
    TimeColons();
    TimeTenthHourText();
    TimeOnethHourText();
    TimeTenthMinText();
    TimeOnethMinText();
    hour_up_button.draw();
    hour_down_button.draw();
    tenth_min_up_button.draw();
    tenth_min_down_button.draw();
    oneth_min_up_button.draw();
    oneth_min_down_button.draw();
};

var drawLevels = function(){
    

    rect(10, 120, 75, 30, 5);
    rect(10, 260, 75, 50, 5);

    textSize(10);
    textAlign(LEFT, CENTER);
    
    fillColor("black");
    text("Get your hints and answer here", 15, 260, 65, 50);
    text("Select the difficulty level", 15, 120, 65, 30);

    fillColor("gray");
    if (stateMap.difficulty_level === "easy"){
        fillColor("green");    
    }
    easy_button.draw();
    
    fillColor("gray");
    if (stateMap.difficulty_level === "medium"){
        fillColor("yellow");
    }
    medium_button.draw();
    
    fillColor("gray");
    if (stateMap.difficulty_level === "hard"){
        fillColor("red");
    }
    hard_button.draw();

    fillColor("blue");
    new_challenge_button.draw();

};
// drawClock() draws the clock by getting all the necessary components
var drawClock = function(){
    ClockFrame();
    ClockCenter();
    ClockHourHand();
    ClockMinHand();
    ClockMarks();
};

// drawEquation() displays equations for hints and answers on the tutorial's 
// last step
var drawEquation = function(){
    var min, min_angle, hour, hour_angle, diff;
    
    min = stateMap.time.tenth_min*10+stateMap.time.oneth_min;
    min_angle = stateMap.angle.min_angle;
    hour = stateMap.time.hour;
    hour_angle = stateMap.angle.hour_angle;
    diff = abs(min_angle - hour_angle);
    
    fillColor("black");
    textSize(10);
    textAlign(LEFT, CENTER);
    if (stateMap.show.min_angle === true){
        text(" 6° x " + min + " minutes = " + min_angle+"°", 90, 315, 290, 20);  
    }
    if (stateMap.show.hour_angle === true){
        text(" 30° x " + hour + " hours + 0.5° x " + min + " minutes = " + hour_angle +"°", 90, 340, 290, 20);    
    }
    if (stateMap.show.answer === true){    
        text(" |"+ min_angle + "° - " + hour_angle+ "°| = " + diff + "°", 90, 365, 290, 20);
    }
};

// drawAnswer() displays the buttons that enable the user to get hints and 
// answer on the tutorial's last step
var drawAnswer = function(){
    drawEquation();
    fillColor("black");
    textSize(14);
    strokeColor("black");
    
    // Minute angle button
    fillColor("gray");
    if (stateMap.show.min_angle === true){
        fillColor("red");
        ClockMinArc();  
    }
    strokeColor("black");
    min_angle_button.draw();
    
    // Hour angle button
    fillColor("gray");
    if (stateMap.show.hour_angle === true){
        fillColor("blue");
        ClockHourArc();
    }
    strokeColor("black");
    hour_angle_button.draw();
    
    // Answer button
    fillColor("gray");
    if (stateMap.show.answer === true){
        fillColor("green");
        ClockDiffArc();
    }
    strokeColor("black");
    answer_button.draw();

};

// drawTutorial() displays the message box where the tutorial messages will go
var drawTutorial = function(){
  // avatar to cheer up the user! 
  image(getImage("avatars/mr-pants-with-hat"), 5, 350, 30, 30);
  
  // message box
  strokeWeight(1);
  strokeColor("black");
  fillColor("white");
  rect(50, 290, 340, 100, 5);
  
  // next button
  if (stateMap.current_step <= 16){
    fillColor("green");
    next_button.draw();
  }
  
  // previous button
  fillColor("red");
  prev_button.draw();
  
  // messages
  fillColor("black");
  textAlign(LEFT, CENTER);
  textSize(12);
  text(message_object[stateMap.current_step], 100, 290, 250, 80);
};

// drawMenuPage() displays the menu page when stateMap.current_step = 0
var drawMenuPage = function(){
    textSize(30);
    text("Clock Angle Problem", 10, 10, 380, 60); 
    textSize(14);
    text("Can you find the angle between the two hands of a clock?", 10, 270, 380, 60); 
    fillColor("blue");
    tutorial_button.draw();
    fillColor("green");
    challenge_button.draw();
};

// handleInteraction() controls which components to display based on user's 
// progress
var handleInteraction = function(){
    ClockDottedLine();
    if (stateMap.current_step === 1){
        resetTime(0, 0, 0);
    }
    else if (stateMap.current_step === 2){
        resetTime(1, 3, 0);        
        ClockMinArc();
    }
    else if (stateMap.current_step === 3){
        spinClock("oneth_min", 250);
        ClockMinArc(); 
    }
    else if (stateMap.current_step === 4){
        resetTime(1, 3, 0);        
        ClockMinArc();
    }
    else if (stateMap.current_step === 5){
        ClockMinArc();   
    }
    else if (stateMap.current_step === 6){
        resetTime(1, 3, 0);        
        ClockHourArc();
    }
    else if (stateMap.current_step === 7){
        resetTime(1, 3, 0);        
        spinClock("oneth_min", 250);
        ClockHourArc();
    }
    else if (stateMap.current_step === 8){
        resetTime(1, 3, 0);        
        ClockSplitHourArc("none");
    }
    else if (stateMap.current_step === 9){
        var x, y;
        spinClock("hour", 250);
        ClockSplitHourArc("hour_part");
    }
    else if (stateMap.current_step === 10){
        var x, y, big_angle, small_angle;
        resetTime(1, 3, 0);        
        ClockSplitHourArc("min_part");
    }
    else if (stateMap.current_step === 11){
        resetTime(1, 3, 0);        
        var small_angle, x, y;
        spinClock("oneth_min", 250);
        ClockSplitHourArc("min_part");
    }
    else if (stateMap.current_step === 12){
        var x, y;
        resetTime(1, 3, 0);        
        ClockSplitHourArc("both");
    }
    else if (stateMap.current_step === 13){
        resetTime(1, 3, 0);        
        ClockHourArc();
        ClockMinArc();
        ClockDiffArc();
    }
    else if (stateMap.current_step === 14){
        resetTime(1, 3, 0);        
        ClockHourArc();
        ClockMinArc();
        ClockDiffArc();
    }
    else if (stateMap.current_step === 15){
        resetTime(1, 5, 0);        
        ClockDiffArc();
    }
    else if (stateMap.current_step === 16){
    }
    else if (stateMap.current_step === 17){
        resetTime(0, 0, 0);        
        drawLevels();
        drawAnswer();
    }
};
//-------------------- BEGIN MAIN DRAW FUNCTION ------------------------------
// draw() calls all the functions necessary to start this program
var draw = function() {
    background(255, 255, 255);
    strokeWeight(1);
    drawClock();
    handleClicks();
    if (stateMap.current_step === 0){
        drawMenuPage();
        spinClock("oneth_min", 10);
    }
    else{
        if (stateMap.current_step <= 16){
            drawTutorial();    
        }
        drawControl();
        handleInteraction();
    }
};
