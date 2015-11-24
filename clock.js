

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
    "current_step": 0,
    "prev": 0,
    "needReset": true,
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
    "angle":{
        "hour_angle": 180,
        "min_angle": 0
    }
};

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
//-------------------- BEGIN OBJECTS ----------------------------------------- 
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
        println("Hey");
        if (stateMap.time.tenth_min === 0){
            stateMap.time.tenth_min = 5;
            updateHour(direction);
        }
        else{
            stateMap.tenth_min -= 1;
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

var setTime = function(hour, tenth_min, oneth_min){
    stateMap.time.hour = hour;
    stateMap.time.tenth_min = tenth_min;
    stateMap.time.oneth_min = oneth_min;
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
var hour_up_button = new Button(90, 5, 90, 20, 'UP');
var hour_down_button = new Button(90, 75, 90, 20, 'DOWN');
var tenth_min_up_button = new Button(220, 5, 40, 20, 'UP');
var tenth_min_down_button = new Button(220, 75, 40, 20, 'DOWN');
var oneth_min_up_button = new Button(270, 5, 40, 20, 'UP');
var oneth_min_down_button = new Button(270, 75, 40, 20, 'DOWN');

// Declare button instances for navigation
var start_button = new Button(170, 350, 60, 30, 'START');
var next_button = new Button(350, 290, 40, 100, 'NEXT'); 
var prev_button = new Button(50, 290, 40, 100, 'PREV');

//--------------- BEGIN HELPER FUNCTIONS -------------------------------------
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
        else if (isClickInButton(x, y, start_button)){
            if (stateMap.current_step === 0){
                stateMap.current_step = 1;
                stateMap.needReset = true;
                stateMap.prev = 0;
            }
        }
        else if (isClickInButton(x, y, next_button)){
            if (stateMap.current_step <= 16){
                stateMap.current_step += 1;   
                stateMap.needReset = true;
                stateMap.prev = 0;
            }
        }
        else if (isClickInButton(x, y, prev_button)){
            if (stateMap.current_step >= 1){
                stateMap.current_step -= 1;   
                stateMap.needReset = true;
                stateMap.prev = 0;
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
var ClockHourHand = function(){
    strokeWeight(5);
    line(dim.center_x, dim.center_y, stateMap.loc.hour_x, stateMap.loc.hour_y);
};

var ClockMinHand = function(){
    strokeWeight(3);
    line(dim.center_x, dim.center_y, stateMap.loc.min_x, stateMap.loc.min_y);
};

var ClockSplitHourArc = function(){
    var big_angle, small_angle, big_x, small_x, big_y, small_y;
    strokeWeight(1);
    noFill();
    
    big_angle = floor(stateMap.angle.hour_angle/30)*30;
    small_angle = stateMap.angle.hour_angle - 90;
    
    strokeColor("dark_blue");
    arc(dim.center_x, dim.center_y, dim.hour_hand, dim.hour_hand, -90, big_angle - 90);
    
    strokeColor("light_blue");
    arc(dim.center_x, dim.center_y, dim.hour_hand, dim.hour_hand, big_angle - 90, small_angle);
    
};

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
    textAlign(LEFT, TOP);
    text(stateMap.angle.hour_angle+"°", x, y, 30, 30);
};

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
    textAlign(LEFT, TOP);
    text(stateMap.angle.min_angle+"°", x, y, 30, 30);
};

var ClockDiffArc = function(){
    var hour_angle, min_angle, initial_angle, final_angle, diff_angle, diff_text_angle,     complement_text_angle, x, y, complement_x, complement_y;
    strokeWeight(1);

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

//-------------------- BEGIN HELPER DRAW FUNCTION ----------------------------
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

var drawClock = function(){
    ClockFrame();
    ClockCenter();
    ClockHourHand();
    ClockMinHand();
    ClockMarks();
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
    min = stateMap.time.tenth_min*10+stateMap.time.oneth_min;
    min_angle = stateMap.angle.min_angle;
    hour = stateMap.time.hour;
    hour_angle = stateMap.angle.hour_angle;
    diff = abs(min_angle - hour_angle);
    fillColor("black");
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

var drawTutorial = function(){
  image(getImage("avatars/mr-pants-with-hat"), 5, 350, 30, 30);
  
  strokeColor("black");
  fillColor("white");
  rect(50, 290, 340, 100, 5);
  
  if (stateMap.current_step <= 16){
    fillColor("green");
    next_button.draw();
  }
  fillColor("red");
  prev_button.draw();
  
  fillColor("black");
  textAlign(LEFT, CENTER);
  textSize(12);
  text(message_object[stateMap.current_step], 100, 290, 250, 80);
};

var drawMenuPage = function(){
    textSize(30);
    text("Clock Angle Problem", 10, 10, 380, 60); 
    textSize(14);
    text("Can you find the angle between the two hands of a clock?", 10, 280, 380, 60); 
    fillColor("blue");
    start_button.draw();
};

var spinClock = function(unit, interval){
    var current_time;
    current_time = floor(millis()/interval);
    if (current_time > (stateMap.prev + 1)){
        stateMap.prev = current_time;
        updateTime(unit, "UP");
        updateMinHand();
    }
};

var handleInteraction = function(){
    ClockDottedLine();
    if (stateMap.current_step === 1){
        if (stateMap.needReset){
            setTime(0, 0, 0);
            updateMinHand();
            stateMap.needReset = false;     
        }
    }
    else if (stateMap.current_step === 2){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }
        ClockMinArc();
    }
    else if (stateMap.current_step === 3){
        spinClock("oneth_min", 250);
        ClockMinArc(); 
    }
    else if (stateMap.current_step === 4){
        if (stateMap.needReset){ 
            setTime(1, 3, 0);
            stateMap.needReset = false;
        }
        updateMinHand();
        ClockMinArc();
    }
    else if (stateMap.current_step === 5){
        ClockMinArc();   
    }
    else if (stateMap.current_step === 6){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            stateMap.needReset = false;
        }
        ClockHourArc();
    }
    else if (stateMap.current_step === 7){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            stateMap.needReset = false;
        }
        spinClock("oneth_min", 250);
        ClockHourArc();
    }
    else if (stateMap.current_step === 8){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }
        ClockSplitHourArc();
    }
    else if (stateMap.current_step === 9){
        var x, y;
        spinClock("hour", 250);
        ClockSplitHourArc();
        x = getUpdatedX(dim.hour_hand/2, stateMap.angle.hour_angle/2);
        y = getUpdatedY(dim.hour_hand/2, stateMap.angle.hour_angle/2);
        fillColor("dark_blue");
        text(stateMap.angle.hour_angle+"°", x, y, 30, 30);
    }
    else if (stateMap.current_step === 10){
        var x, y, big_angle, small_angle;
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }
        ClockSplitHourArc();
        x = getUpdatedX(dim.hour_hand/2, stateMap.angle.hour_angle);
        y = getUpdatedY(dim.hour_hand/2, stateMap.angle.hour_angle);
        big_angle = stateMap.time.hour*30;
        small_angle = stateMap.angle.hour_angle - big_angle;
        fillColor("light_blue");
        text(small_angle+"°", x, y, 30, 30);
    }
    else if (stateMap.current_step === 11){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }
        var small_angle, x, y;
        spinClock("oneth_min", 250);
        ClockSplitHourArc();
        x = getUpdatedX(dim.hour_hand/2, stateMap.angle.hour_angle);
        y = getUpdatedY(dim.hour_hand/2, stateMap.angle.hour_angle);
        small_angle = stateMap.angle.hour_angle - stateMap.time.hour*30;
        fillColor("light_blue");
        text(small_angle+"°", x, y, 30, 30);
    }
    else if (stateMap.current_step === 12){
        var x, y;
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }
        ClockSplitHourArc();
        x = getUpdatedX(dim.hour_hand, stateMap.angle.hour_angle/2);
        y = getUpdatedY(dim.hour_hand, stateMap.angle.hour_angle/2);
        fillColor("blue");
        text(stateMap.angle.hour_angle+"°", x, y, 30, 30);
    }
    else if (stateMap.current_step === 13){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }  
        ClockHourArc();
        ClockMinArc();
        ClockDiffArc();
    }
    else if (stateMap.current_step === 14){
        if (stateMap.needReset){
            setTime(1, 3, 0);
            updateMinHand();
            stateMap.needReset = false;
        }  
        ClockHourArc();
        ClockMinArc();
        ClockDiffArc();
    }
    else if (stateMap.current_step === 15){
        if (stateMap.needReset){
            setTime(1, 5, 0);
            updateMinHand();
            stateMap.needReset = false;
        }  
        ClockDiffArc();
    }
    else if (stateMap.current_step === 16){
    }
    else if (stateMap.current_step === 17){
        if (stateMap.needReset){
            setTime(0, 0, 0);
            updateMinHand();
            stateMap.needReset = false;
        }  
        ClockHourArc();
        ClockMinArc();  
        ClockDiffArc();  
        drawAnswer();
    }
};
//-------------------- BEGIN MAIN DRAW FUNCTION ------------------------------
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
        handleInteraction();
        drawControl();
        drawTutorial();
    }
};
