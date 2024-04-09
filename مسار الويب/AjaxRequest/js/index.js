
function sendAJAXReq() {
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', 'https://codepen.io/hsoubacadimyweb/pen/eYYWdvm.html');
    myRequest.onreadystatechange = function () { 
        if (myRequest.readyState === 4) {
        document.getElementById('ajax-content').innerHTML = myRequest.responseText;
        }
    };
    myRequest.send();
    document.getElementById('reveal').style.display = 'none';
}

