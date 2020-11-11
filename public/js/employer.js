'use srtict';


$(document).ready(function () {
  $('select').change(function () {
    $('.imgsdiv').hide();
    let item = $('select').val();
    console.log(item);
    $('#people').children().each(function () {
      let divId=$(this).attr('id');
      if(item===divId){
        $(this).show();

      }
    });

  });


});


// $('#people').children().each(function () {

//     console.log($(this).attr('id'));
// });
