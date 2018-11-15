$(document).ready(function() {
  var quote = '';
  var author = '';
  getQuote();

  //another one
  $('#anotherOne').on("click", function() {
    $('.movement').animate({left: '-=1000px'}, 400);
    getQuote();
    $('.movement').animate({left: '+=3000px'}, 0);
    $('.movement').animate({left: '-=2000px'}, 400);
  });


  //tweet
  //There was a problem when in quote is a \; sign.
  //It reads it as a end of the line. - solved
  var regExp = /[;]/gi;
  $('#twitter').on("click", function() {

    //if there is ;
    if(quote.match(regExp)){
      //find indexOf ;
      var tmp = quote.indexOf(quote.match(regExp)[0]);
      //replace and concat
      quote = quote.slice(0, tmp).concat(',', quote.slice(tmp + 1, quote.length));
    }

    var url = 'https://twitter.com/intent/tweet?text=' + '"' + quote + '"' + ' - ' + author;
    window.open(url);
    return false;
  });


  //work with API
  function getQuote() {
    $('#quote-cls').show();
    var output = $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous',
      type: 'GET',
      data: {},
      dataType: 'json',
      success: function(data) {
        quote = data.quote;
        author = data.author;
        document.getElementById('quote-cls').innerHTML = '<h2><p>"' + quote + '"</p></h2>';
        document.getElementById('author-cls').innerHTML = '<h4><p>- ' + author + '</p></h4>';

      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "oOYqBRMO8qmshVQb8Vk9zU3Lj003p1Si6zRjsnnxcTdqjfox7V");
      }
    });
  }
});
