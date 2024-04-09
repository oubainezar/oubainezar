$(document).ready(function(){
  $(document).ajaxStart(function(){
    $("#wait").css("display", "block");
  });
  $(document).ajaxComplete(function(){
    $("#wait").css("display", "none");
  });
  $("button").click(function(){
    $("#ajax-content").load("https://codepen.io/hsoubacadimyweb/pen/eYYWdvm.html");
  });
});
