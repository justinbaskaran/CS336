  $( function() {
  	$( "span:last" ).html( "no data yet..." );
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {

    	   

         let jsPromise = Promise.resolve($.ajax({
        url: "/fetch",
        type: "GET",
        data: {
            name: "Hello World! This is lab7!"
        }
    }));
    jsPromise.then(function (result) {
        console.log('AJAX request succeeded...');
    	$( "span:last" ).html(result.content );
    }, function (xhr) {
        console.log('AJAX request failed...');
    })
      event.preventDefault();
    } );
  } );
