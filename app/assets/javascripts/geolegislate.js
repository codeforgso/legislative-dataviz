var reps = {};

window.onload = function() {
  document.getElementById("status").innerHTML = "Fetching your representatives..."
}

//geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLegislatures);
    } else {
      document.getElementById("status").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getLegislatures(position) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        reps = JSON.parse(xhr.responseText);
        displayReps(reps);
        document.getElementById("status").innerHTML = ""
        }
    }
    xhr.open("GET", "http://openstates.org/api/v1/legislators/geo/?lat=" + position.coords.latitude + "&long=" + position.coords.longitude + "&apikey=c43a4b70a3494d0c8c7748950c305d2c", true);
    xhr.send();
    //console.log(xhr.status);
    //console.log(xhr.statusText);
}

function displayReps(representatives) {

    var repNum = "1";
    for (var rep in representatives) {

       var myRep = "myRep" + repNum;
       var img = representatives[rep].photo_url;
       var website = representatives[rep].url;
       var name = representatives[rep].full_name;
       var party = representatives[rep].party;
       var phone = representatives[rep].offices[0].phone;
       var email = representatives[rep].email;
       var address = representatives[rep].offices[0].address;
       var ul = "<ul><li><a href=" + website + ">" + name +"</a></li><li>" + party + "</li><li><a href=\"tel:" + phone + "\">" + phone + "</a></li><li><a href=\"mailto:" + email + "\">" + email + "</a></li><li>" + address + "</li></ul><br>";
       document.getElementById(myRep).innerHTML = ul;
       repNum = "2";
   }
}

getLocation();
