// This file is respon sible for two things: displaying stars and validating if
// form is correct. With displaying golden stars on companys review site, it
// will return value after click on the star, and it will send form id=rate
// through ajax to db.

// Problems with this solution: user probably would not click on a star.
// Thats why showTitle var is in here
$(document).ready(function(){
  var one = $('#1_star'),
      two = $('#2_star'),
      three = $('#3_star'),
      four = $('#4_star'),
      five = $('#5_star'),
      showTitle = $('#showTitle'),
      clickedValue = 0,
      rate = $('#rate');


  // first star
  one.hover(function(){
    one.attr('src', '/images/star-on.png');
    two.attr('src', '/images/star_off.png');
    three.attr('src', '/images/star_off.png');
    four.attr('src', '/images/star_off.png');
    five.attr('src', '/images/star_off.png');

    showTitle.html('<h3>Bad</h3>');
    clickedValue = 1;
    // console.log(clickedValue);

  });

  one.on('click', function(){
    clickedValue = 1;
    // console.log(clickedValue);
  });

  // second
  two.hover(function(){
    one.attr('src', '/images/star-on.png');
    two.attr('src', '/images/star-on.png');
    three.attr('src', '/images/star_off.png');
    four.attr('src', '/images/star_off.png');
    five.attr('src', '/images/star_off.png');

    showTitle.html('<h3>Poor</h3>');
    clickedValue = 2;
    // console.log(clickedValue);

  });

  two.on('click', function(){
    clickedValue = 2;
    // console.log(clickedValue);
  });

  // third
  three.hover(function(){
    one.attr('src', '/images/star-on.png');
    two.attr('src', '/images/star-on.png');
    three.attr('src', '/images/star-on.png');
    four.attr('src', '/images/star_off.png');
    five.attr('src', '/images/star_off.png');

    showTitle.html('<h3>Fair</h3>');
    clickedValue = 3;
    // console.log(clickedValue);

  });

  three.on('click', function(){
    // clickedValue = 3;
    // console.log(clickedValue);
  });

  // fourth
  four.hover(function(){
    one.attr('src', '/images/star-on.png');
    two.attr('src', '/images/star-on.png');
    three.attr('src', '/images/star-on.png');
    four.attr('src', '/images/star-on.png');
    five.attr('src', '/images/star_off.png');

    showTitle.html('<h3>Good</h3>');
    clickedValue = 4;
    // console.log(clickedValue);

  });

  four.on('click', function(){
    clickedValue = 4;
    // console.log(clickedValue);
  });

  // fifth
  five.hover(function(){
    one.attr('src', '/images/star-on.png');
    two.attr('src', '/images/star-on.png');
    three.attr('src', '/images/star-on.png');
    four.attr('src', '/images/star-on.png');
    five.attr('src', '/images/star-on.png');

    showTitle.html('<h3>Excellent</h3>');
    clickedValue = 5;
    // console.log(clickedValue);

  });

  five.on('click', function(){
    clickedValue = 5;
    // console.log(clickedValue);
  });



  // Validating and sending data
  // sending values from click functions with ajax
  rate.on('click', function(){
    // review is text in review form
    // sender is sendint company added automaticaly
    // id is hidden field connected with a user in db
    var review = $('#review').val(),
        sender = $('#sender').val(),
        id = $('#id').val();

    // var for validation
    var valid = true;

    //  if there are any errors with clickedValue
    if(clickedValue === 0 || clickedValue > 5) {
      valid = false;
      // creating error field
      $('#error').html('<div class="alert alert-danger">Please give a rating and review before you submit.</div>');
    // } else if(showTitle.html() === ''){
      // valid = false;
      // $('#error').html('<div class="alert alert-danger">Please give a rating before you submit.</div>');
    } else {
      // else set it to empty
      $('#error').html('');
    };

    // if form is valid we gona submit it with jQuery ajax
    if(valid === true) {
      $.ajax({
          url: '/review/' + id,
          type: 'POST',
          data: {
            clickedValue: clickedValue,
            review: review,
            sender: sender
          },
          success: function(){
            // right now just setting this values to empty
            $('#review').val(''),
            $('#sender').val(''),
            $('#id').val('');
          }
      });
    } else {
      return false;
    };
  });
});
