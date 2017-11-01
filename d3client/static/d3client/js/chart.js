$(function() {
  $('#data').submit(function() {

    var options = {
      url:'file-upload',
      type:'post',
      success:function(d){
        console.log(d);
      }
    }
    $(this).ajaxSubmit(options);
    return false;
  });
});
