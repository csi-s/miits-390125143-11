window.onload = function () {
    var f = new Object();
    var b = window.location.toString();
    var e = b.indexOf("?");
    if (e > 0) {
        var d = b.substring(e + 1, b.length);
        if (d != null && d != "") {
            var c = d.indexOf("&");
            if (c > 0) {
                f.co = d.substring(0, c);
                f.cl = d.substring(c + 1);
            }
        }
    }
    var a = leapclient.request("getPhoneData", {
        par: f
    }, null, null, "web", "web");
    if (a != null) {
        document.getElementById("nae").innerHTML = a.name;
        document.getElementById("cmn").innerHTML = a.companyname;
        document.getElementById("cll").innerHTML = a.certlevel;
        document.getElementById("cto").innerHTML = a.certificateno;
        document.getElementById("adt").innerHTML = a.avaidtime;
        document.getElementById("apt").innerHTML = a.approvetime;
        document.getElementById("arc").innerHTML = a.areacn;
        document.getElementById("rmk").innerHTML = a.remarks;
    }
};