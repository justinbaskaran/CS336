$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  console.log(form.serialize());

  $.ajax({
    type: 'POST',
    url: '/data/save',
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( resp );
    }
  });
});