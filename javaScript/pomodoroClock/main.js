// I assumed that break wont be longer than 00:59//
// and work time longer than 11:59

var hours = 0,
    minutes = 0,
    seconds = 0,
    breakTime = 0,
    //button text
    text,
    //changing hands color flag
    i = 0,
    //changing bcakground color flag
    j = 1,
    //constant hour and min values needed for arches in updateTime()
    fullHours,
    fullMinutes,
    fullBreakTime;


//validating numbers in inputs
function validate(){

  //value too big
  if(hours <= 0){
    //max hours = 11, max min = 59
    hours = 1;
    minutes = 1;
  }
  //value negative - break
  else if(hours > 12){
    //break
    breakTime = 60;
  }

  //value too big
  if(minutes < 0){
    //max minutes value = 59
    minutes = 1;
  }
  //value negative - break
  else if(minutes > 60){
    //break
    breakTime = 60;
  }

  //value too big
  if(breakTime <= 0){
    //max breakTime value = 59
    breakTime = 1;
  }
  //value negative - break
  else if(breakTime > 60){
    breakTime = 60;
  }

  //returning updated values
  document.getElementById('hoursVal').value = 12 - hours;
  document.getElementById('minutesVal').value = 60 - minutes;
  document.getElementById('breakTime').value = 60 - breakTime;

  return 0;
}

//function triggering updateTime()
function start(){

  //value from button will be a trigger
  text = document.getElementById('btn-start').innerHTML;

  //if value is start then run update time with given parameter
  if(text === "START"){

    //flash screen
    flash();

    //variables
    minutes = 60 - Math.floor(document.getElementById('minutesVal').value);
    hours = 12 - Math.floor(document.getElementById('hoursVal').value);
    breakTime = 60 - Math.floor(document.getElementById('breakTime').value);

    //validate variables
    validate();

    //this constants will be needed for proper arches display
    fullHours = 12 - hours;
    fullMinutes = 60 - minutes;
    fullBreakTime = 60 - breakTime;

    updateTime(seconds, minutes);
  }
  //if text is stop, break the updateTime function
  else if(text === "STOP"){
    return reset();
  }
  //update button text value
  document.getElementById('btn-start').innerHTML = text;

  return 0;
}

//main function
function updateTime(sec, min) { // Update the SVG clock
  //preventing engaging when not enough values
  if(hours === 12 && minutes === 60 && breakTime === 60) {
    return reset();
  }

  //change button text
  if(text === "START"){
   text = "STOP";
   document.getElementById('btn-start').innerHTML = text;
  }

  //calculations for ticks
  var secAngle = seconds*6;
  var minAngle= (minutes%60)*6; //% guarantees proper display of the work arch
  var hourAngle = hours*30;

  //setting up arches propperly//
  //when workTime is longer than 1 hour
  if(minutes <= fullHours*60){
    document.getElementById("breakArch").setAttribute("d", describeArc(50, 50, 53, breakTime*6, 360));
    document.getElementById("workArch").setAttribute("d", describeArc(50, 50, 50, hourAngle, 360));
    i = 1;
  }
  //when working time is less than 1 hour
  else if(minutes < fullHours*60 + 60){
    document.getElementById("breakArch").setAttribute("d", describeArc(50, 50, 53, breakTime*6, 360));
    document.getElementById("workArch").setAttribute("d", describeArc(50, 50, 50, minAngle, 360));
    i = 2;
  }
  //when workTime ends and breakTime begins
  else if(minutes >= fullHours*60 + 60){
    minAngle = breakTime*6;
    document.getElementById("breakArch").setAttribute("d", "");
    document.getElementById("workArch").setAttribute("d", describeArc(50, 50, 50, minAngle, 360));
    i = 3;
    flash();
  }

  //update colors
  changeColor();

  //setting up SVG elements//
  // Get SVG elements for the hands of the clock
  var sechand = document.getElementById('secondhand');
  var minhand = document.getElementById("minutehand");
  var hourhand = document.getElementById("hourhand");
  // Set an SVG attribute on them to move them around the clock face
  sechand.setAttribute("transform", "rotate(" + secAngle + ",50,50)");
  minhand.setAttribute("transform", "rotate(" + minAngle + ",50,50)");
  hourhand.setAttribute("transform", "rotate(" + hourAngle + ",50,50)");

  //updating values of breaktime, minutes and hours//
  if(breakTime !== 60 && seconds >= 60 && seconds % 60 === 0 && minutes >= fullHours*60 + 60 && hours === 12){
    breakTime += 1;
  }

  if(hours <= 12 && seconds >= 60 && seconds % 60 === 0){
    minutes += 1;
  }

  if(seconds >= 60 && seconds % 60 === 0 && hours !== 12){
    //there is a special case here. when hours > 0 and minutes start from zero program didn't update value for hourhand.//

    //this option updates every next hour
    if(minutes % 60 === 0){
      hours += 1;

    //this option start if workTime is whole hour at the beginning
    } else if(61 - minutes === 0){
      hours+=1;
    }
  }

  seconds += 1;

  //break updateTime when breakTime reach 0//
  if(breakTime === 60){
    j = 3;
    flash();
    return reset();}

  //invoking updateTime after a second
  setTimeout(function(){updateTime(seconds,minutes);}, 1000);
}

//math for arch
// I wont be axplaining math behing it
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

//clearing all values
function reset(){
  //clearing values
  minutes = 60;
  seconds = 0;
  hours = 12;
  breakTime = 60;
  i = 0;
  j = 1;
  //clearing colors
  changeColor();

  //setting hands properly
  document.getElementById('secondhand').setAttribute("transform", "rotate(" + 0 + ",50,50)");
  document.getElementById("minutehand").setAttribute("transform", "rotate(" + 0 + ",50,50)");
  document.getElementById("hourhand").setAttribute("transform", "rotate(" + 0 + ",50,50)");

  //clearing arches
  document.getElementById("workArch").setAttribute("d", "");
  document.getElementById("breakArch").setAttribute("d", "");

  //clearing input values
  document.getElementById('minutesVal').value = 0;
  document.getElementById('hoursVal').value = 0;
  document.getElementById('breakTime').value = 0;

  //change button text value and update it
  text = "START";
  document.getElementById('btn-start').innerHTML = text;

  return 0;
}

//chenging colors
function changeColor(){

  //for reset function
  if(i === 0){
    document.getElementById('minutehand').style.stroke = "black";
    document.getElementById('hourhand').style.stroke = "black";
    document.getElementById('workArch').style.stroke = "#004FC4";
  }
  //when work time is more than 1 hour
  //hourhand is in a color of workArch
  else if(i === 1){
    document.getElementById('hourhand').style.stroke = "#004FC4";
    document.getElementById('workArch').style.stroke = "#004FC4";
    document.getElementById('breakArch').style.stroke = "#D7B305";
  }
  //when work time is less than 1 hour
  //minutehan in color of workArch
  else if(i === 2){
    document.getElementById('minutehand').style.stroke = "#004FC4";
    document.getElementById('hourhand').style.stroke = "black";
    document.getElementById('workArch').style.stroke = "#004FC4";
    document.getElementById('breakArch').style.stroke = "#D7B305";
  }
  //when break time starts
  //arch changes color
  else if(i === 3){
    document.getElementById('minutehand').style.stroke = "#D7B305";
    document.getElementById('workArch').style.stroke = "#D7B305";
    document.getElementById('breakArch').style.stroke = "";
  }

  return 0;
}

//flashing screen function
function flash(){
  //start
  if(j === 1){
    document.bgColor= "004FC4";
    setTimeout(function(){
      document.bgColor = "#ffffff"
    },200);
    j++;
  }
  //break starts
  else if (j === 2){
    document.bgColor= "D7B305";
    setTimeout(function(){
      document.bgColor = "#ffffff"
    },300);
    j = 0;
  }
  //end
  else if (j === 3){
    document.bgColor= "D7B305";
    setTimeout(function(){
      document.bgColor = "#ffffff"
    },2000);
    j = 1;
  }

  return 0;
}
