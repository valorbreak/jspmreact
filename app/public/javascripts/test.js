function reqListener () {
    console.log(this.responseText);
}
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "/api/users", true);
oReq.send();
