var maxTemp = [], minTemp = [], days = [], weatherCode = [];

// function displaying name of browser from userAgent, if possible
navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

// *******************  weather API ****************************
// ajax with jQuery
var weather = function ( lat, lon ) {
  days = [];
  maxTemp= [];
  minTemp = [];
  weatherCode = [];
  $.ajax( {
    type: 'GET',
    url: 'https://simple-weather.p.mashape.com/weatherdata?lat=' + lat + '&lng=' + lon + '\'',
    data: {},
    dataType: 'json',

    success: function( data ) {
      // MAIN INFO

      // place
      place = data.query.results.channel.item.title;
      // slice it to display  only place
      var temp0 = place.search( 'for' ),
      temp1 = place.search( ',' );

      place = place.slice( temp0 + 3, temp1 );
      document.querySelector( '#place' ).innerHTML = '<p>' + place + '</p>';

      // conditions
      conditions = data.query.results.channel.item.condition.text;
      document.querySelector( '#text' ).innerHTML = '<p>' + conditions + '</p>';
      // condition icon
      code = data.query.results.channel.item.condition.code;
      code2Icon(code);

      //temperature
      temperature = data.query.results.channel.item.condition.temp;
      document.querySelector( '#temperature' ).innerHTML = '<p>' + temperature + ' &deg;C</p>';

      // FORECAST
      for ( var i = 1; i <= 7; i++ ) {

        // getting proper object from arr
        var objNum = data.query.results.channel.item.forecast[ i ];
        // parts of the object that I'm interested in
        var parts = [ "day", "high", "low", "code" ];
        //running through object elem
        var temp = "", value = "";

        for ( var j = 1; j <= 4; j++ ) {
          // getting values from delivered object
          value = objNum[ parts[ j - 1 ] ];

          //passing values to proper arrays
          switch ( j ){
            case 1:
            days.push(value);
            break;
            case 2:
            maxTemp.push(Number(value));
            break;
            case 3:
            minTemp.push(Number(value));
            break;
            case 4:
            weatherCode.push(Number(value));
            break;
          }
        }
      }
      // paint the graph
      chart(days, maxTemp, minTemp);
      // and add icons to it
      showButtons();
      code2Icon(weatherCode);

    },

    complete: function () {
      $('.container').css('display', 'block');
    },

    error: function( jqXHR, exception) {
      var msg = '';
      if ( jqXHR.status === 0 ) {
        msg = 'Not connect.\n Verify Network.';
      } else if ( jqXHR.status == 404 ) {
        msg = 'Requested page not found. [404]';
      } else if ( jqXHR.status == 500 ) {
        msg = 'Internal Server Error [500].';
      } else if ( exception === 'parsererror' ) {
        msg = 'Requested JSON parse failed.';
      } else if ( exception === 'timeout' ) {
        msg = 'Time out error.';
      } else if ( exception === 'abort' ) {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      $( '#answer' ).innerHtml = '<p>' + msg + '</p>';
    },

    //custom mashape header
    beforeSend: function( xhr ) {
      xhr.setRequestHeader( "X-Mashape-Authorization", "oOYqBRMO8qmshVQb8Vk9zU3Lj003p1Si6zRjsnnxcTdqjfox7V" );
    }
  } );
};

// *******************  geolocation  ****************************
// Ask for permission.
// Track anyway with IP.
function position() {
  // var place = document.getElementById("place");

  function success(data) {
    var lat = data.coords.latitude,
        lon = data.coords.longitude;
    console.log("success");
    return weather( lat, lon );
  }

  function error(err) {
    switch(err.code) {
      case err.PERMISSION_DENIED:
        console.log('User denied the request for Geolocation.');
        break;
      case err.POSITION_UNAVAILABLE:
        console.log('Location information is unavailable.');
        break;
      case err.TIMEOUT:
        console.log('The request to get user location timed out.');
        break;
      case err.UNKNOWN_ERROR:
        console.log('An unknown err occurred.');
        break;
    }
    console.log('error');
    $.getJSON('https://ipinfo.io/geo', function(response) {
      var loc = response.loc.split(',');
      return weather ( loc[0], loc[1] );
    });

  }
  // that's the place when navigator.sayswho works
  if (navigator.sayswho.match(/firefox/gi)) {
    console.log(navigator.sayswho);
    // fire error function as main geolocation
    $.getJSON('https://ipinfo.io/geo', function(response) {
      var loc = response.loc.split(',');
      return weather ( loc[0], loc[1] );
    });
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy:true,
        maximumAge:15000,
        timeout:5000}
      );
    } else {
      document.getElementById("place").innerHTML = "<p>Geolocation is not supported by your browser</p>";
    }
  }
}

// transforming Yahoo code in to icon
var code2Icon = function ( code ) {
  var icon = '';

  // console.log(code.length);
  // console.log(weatherCode);

  function getIcon(givenCode){
    icon = '';
    givenCode = parseInt(givenCode);
    switch (givenCode) {
      case 0: icon = 'wi-tornado'; break;
      case 1: icon = 'wi-tornado'; break;
      case 2: icon = 'wi-tornado'; break;
      case 3: icon = 'wi-thunderstorm'; break;
      case 4: icon = 'wi-thunderstorm'; break;
      case 5: icon = 'wi-rain-mix'; break;
      case 6: icon = 'wi-rain-mix'; break;
      case 7: icon = 'wi-rain-mix'; break;
      case 8: icon = 'wi-hail'; break;
      case 9: icon = 'wi-sprinkle'; break;
      case 10: icon = 'wi-hail'; break;
      case 11: icon = 'wi-showers'; break;
      case 12: icon = 'wi-showers'; break;
      case 13: icon = 'wi-snow'; break;
      case 14: icon = 'wi-snow'; break;
      case 15: icon = 'wi-snow'; break;
      case 16: icon = 'wi-snow'; break;
      case 17: icon = 'wi-hail'; break;
      case 18: icon = 'wi-hail'; break;
      case 19: icon = 'wi-fog'; break;
      case 20: icon = 'wi-fog'; break;
      case 21: icon = 'wi-fog'; break;
      case 22: icon = 'wi-fog'; break;
      case 23: icon = 'wi-cloudy-gusts'; break;
      case 24: icon = 'wi-cloudy-windy'; break;
      case 25: icon = 'wi-thermometer-exterior'; break;
      case 26: icon = 'wi-cloudy'; break;
      case 27: icon = 'wi-night-cloudy'; break;
      case 28: icon = 'wi-day-cloudy'; break;
      case 29: icon = 'wi-night-cloudy'; break;
      case 30: icon = 'wi-day-cloudy'; break;
      case 31: icon = 'wi-night-clear'; break;
      case 32: icon = 'wi-day-sunny'; break;
      case 33: icon = 'wi-night-clear'; break;
      case 34: icon = 'wi-day-sunny-overcast'; break;
      case 35: icon = 'wi-rain-mix'; break;
      case 36: icon = 'wi-day-sunny'; break;
      case 37: icon = 'wi-thunderstorm'; break;
      case 38: icon = 'wi-thunderstorm'; break;
      case 39: icon = 'wi-thunderstorm'; break;
      case 40: icon = 'wi-thunderstorm'; break;
      case 41: icon = 'wi-snow'; break;
      case 42: icon = 'wi-snow'; break;
      case 43: icon = 'wi-snow'; break;
      case 44: icon = 'wi-day-cloudy'; break;
      case 45: icon = 'wi-storm-showers'; break;
      case 46: icon = 'wi-snow'; break;
      case 47: icon = 'wi-thunderstorm'; break;
      case 3200: icon = 'wi-cloud'; break;
      default: return '';
    }
    // console.log(icon);
    return icon;
  }
  if(code.length < 6) {
    getIcon(code);
    document.querySelector('#mainIcon').innerHTML = '<i class=\"wi ' + icon + '\" style=\"color: #ADC9FF; font-size: 3em;\"></i>';
  } else {
    // looping through arr of codes
    var l = 0, weatherCodeLength = weatherCode.length;
    var forecast = document.getElementById('forecast-icons');
    var div = '';
    // var text = document.createTextNode("Water");
    for(; l <= weatherCodeLength - 1; l++) {
      getIcon( code[l] );
      console.log(code[l]);
      console.log(icon);
      div = document.createElement("div");
      div.className = "new-icon";
      div.innerHTML = '<i class=\"wi ' + icon + '\" ></i>';

      forecast.appendChild(div);
      div = '';
    }
    return 0;
  }
};

// *******************  chart  ****************************
// plotting chart with Highcharts
// After second thought I want this clean and
// simple, so I disabled many options in chart()
var chart = function ( daysArr, maxArr, minArr ){
  Highcharts.chart('chart', {
    chart: {
      type: 'column',
      backgroundColor: '#00256F',
    },
    title: {       // disabled bu 'null'
    text: null, //'<p>Forecast</p>',
    useHTML: true,
    style: {
      color: '#ADC9FF',
      font: '1em "Playfair Display", serif, Verdana, serif',
    }
  },
  xAxis: {
    categories: daysArr,
    lineColor: '#ADC9FF',
    labels: {
      style: {
        color: '#ADC9FF',
        font: '1em "Playfair Display", serif, Verdana, serif',
      }
    }
  },
  yAxis: {
    title: {
      enabled: false,       // disabled
      text: 'Temperature ( &deg;C )',
      style: {
        color: '#ADC9FF',
        font: '1em "Playfair Display", serif, Verdana, serif',
      }
    },
    gridLineColor: '#ADC9FF',
    labels: {
      enabled: false,       // disabled
      style: {
        color: '#ADC9FF'
      }
    }
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y:1f}',
        style: {
          color: '#ADC9FF',
          font: '2em  Verdana, serif',
        }
      }
    }
  },
  credits: {
    enabled: false      // disabled
  },
  legend: {
    enabled: false      // disabled
  },
  series: [{
    name: 'max: ',
    color: '#4B71B9',
    data: maxArr,
  }, {
    name: 'min: ',
    color: '#9DBFFF',
    data: minArr
  }]
});
};

// *******************  change C/F  ****************************
// function for changing C to F or the other way
var changeTemp = function (){
  var currT = "", newT = 0, sign = "", length = 0;

  // take current temperature
  currT = document.querySelector( '#temperature' ).innerHTML;

  length = currT.length;
  sign = currT.slice( length - 5, length - 4 );
  newT = Number(currT.slice(3, 5));

  //functions for using map on maxTemp and minTemp
  var toF = function ( value ){ return Math.round( value * 9/5 + 32 );};
  var toC = function ( value ){ return Math.round(( value - 32 ) * 5/9 );};

  // decide which way to go by sign
  if(sign === 'C'){
    maxTemp = maxTemp.map(toF);
    minTemp = minTemp.map(toF);
    newT = Math.round( newT * 9/5 + 32 );
    sign = 'F';
  } else {
    maxTemp = maxTemp.map(toC);
    minTemp = minTemp.map(toC);
    newT = Math.round(( newT - 32) * 5/9 );
    sign = 'C';
  }

  //update displayed value
  document.querySelector( '#temperature' ).innerHTML = '<p>' + newT + " &deg; " + sign + '</p>';
  //update chart
  return chart(days, maxTemp, minTemp);
};

//changing button colors - need to work on this solution
var changeColor = function (){
  var check = $('.btn').css('background-color');

  if(check === 'rgb(32, 65, 158)'){
    $('#btn-C').css('background-color', 'rgb(49,106,212)');
    $('#btn-F').css('background-color', 'rgb(32,65,158)');
    return changeTemp();
  } else {
    $('#btn-C').css('background-color', 'rgb(32,65,158)');
    $('#btn-F').css('background-color', 'rgb(49,106,212)');
    return changeTemp();
  }
};

// show buttons after ajax.complete
var showButtons = function(){
  $('.btn').addClass('show');
  return 0;
};


// this one is for setting the same
//height of 4 elements in weather section
var height = function(){
  var highestBox = 0;

  $('div.col-3 div.col-4').each(function() {
    // find highest element
    if ($(this).height() > highestBox) {
      // change height of
      highestBox = $(this).height();
    }
  });
  //set up height
  $('div.col-3 div').css("height", highestBox + "px");
};
height();
