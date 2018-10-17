  $( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
      $("<em>", {html: "no data yet..."}).appendTo("body");
    	   

         let jsPromise = Promise.resolve($.ajax({
        url: "/hello",
        type: "GET",
        data: {
            name: "Hello World! This is lab7!"
        }
    }));
    jsPromise.then(function (result) {
        console.log('AJAX request succeeded...');
       // $("<em>", {html: result.content}).appendTo("body");
    	$( "em" ).html(result.content );
    }, function (xhr) {
        console.log('AJAX request failed...');
        $( "em" ).html('AJAX request failed...');
    })
      event.preventDefault();
    } );
  } );
