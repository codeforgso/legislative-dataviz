var reps = {};

//geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLegislatures);
    } else {
      document.getElementById("myReps").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getLegislatures(position) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        reps = JSON.parse(xhr.responseText);
        displayReps(reps);
        }
    }
    xhr.open("GET", "http://openstates.org/api/v1/legislators/geo/?lat=" + position.coords.latitude + "&long=" + position.coords.longitude + "&apikey=c43a4b70a3494d0c8c7748950c305d2c", true);
    xhr.send();
    //console.log(xhr.status);
    //console.log(xhr.statusText);
}

function displayReps(representatives) {

    var repNum = "1";
    var myRep = "";
    var img = "";
    var website = "";
    var name = "";
    var party = "";
    var phone = "";
    var email = "";
    var address = "";
    for (var rep in representatives) {

       myRep = "myRep" + repNum;
       img = representatives[rep].photo_url;
       website = representatives[rep].url;
       name = representatives[rep].full_name;
       party = representatives[rep].party;
       phone = representatives[rep].offices[0].phone;
       email = representatives[rep].email;
       address = representatives[rep].offices[0].address;
       var ul = "<ul><li><a href=" + website + ">" + name +"</a></li><li>" + party + "</li><li><a href=\"tel:" + phone + "\">" + phone + "</a></li><li><a href=\"mailto:" + email + "\">" + email + "</a></li><li>" + address + "</li></ul><br>";
       document.getElementById(myRep).innerHTML = ul;
       repNum = "2";
   }
}

getLocation();
