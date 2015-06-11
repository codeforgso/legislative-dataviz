var autocomplete, address, status;

window.onload = function() {
  status = "Fetching representatives for your current location...";
  document.getElementById("status").innerHTML = status;
}

function initialize() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('address')), { types: ['geocode'] }
  );
  // When the user selects an address from the dropdown.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    address = document.getElementById('address').value;
    status = "N.C. legislators for " + address + "."
    getCoordForAddress();
  });
}

// Creates latitude and longitude coordinates from the address entered by the user,
// and wraps them in a json object. The object is passed in a call to get the legislators
// for the address.
function getCoordForAddress() {
  var geocoder = new google.maps.Geocoder().geocode( { 'address' : address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      var position = { "coords" :  {"latitude" : latitude, "longitude" : longitude } };
      getLegislators(position);
    }
  });
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

//Geolocation used to get the legislators for the users current location.
function getLocation() {
    if (navigator.geolocation) {
        status = "N.C. legislators for your current location:";
        navigator.geolocation.getCurrentPosition(getLegislators);
    } else {
      status = "Geolocation is not supported by this browser.";
      document.getElementById("status").innerHTML = status;
    }
}

// Makes a call to the open states API to retrieve the N.C. legislators for the coordinates passed in.
function getLegislators(position) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var reps = JSON.parse(xhr.responseText);
        displayReps(reps);
        document.getElementById("status").innerHTML = status;
        }
    }
    xhr.open("GET", "http://openstates.org/api/v1/legislators/geo/?lat=" + position.coords.latitude + "&long=" + position.coords.longitude + "&apikey=c43a4b70a3494d0c8c7748950c305d2c", true);
    xhr.send();
    //console.log(xhr.status);
    //console.log(xhr.statusText);
}

//Formats and displays the legislators information on the page.
function displayReps(representatives) {

    var repNum = "1";
    var img = "";
    var website = "";
    var name = "";
    var party = "";
    var phone = "";
    var email = "";
    var address = "";
    var myRep = "houseRep";
    for (var rep in representatives) {
       img = (representatives[rep].photo_url).replace("/hiRes", "");
       website = representatives[rep].sources[0].url;
       name = representatives[rep].full_name;
       party = representatives[rep].party;
       phone = representatives[rep].offices[0].phone;
       email = representatives[rep].email;
       address = (representatives[rep].offices[1].address).replace(/\r\n|\r|\n/g, "<br>");
       var ul = "<ul><li><img src=\"" + img + "\" style=\"height:235px;\"></li><li><a href=" + website + ">" + name +"</a></li><li>" + party + "</li><li>" + address + "</li><li><a href=\"tel:" + phone + "\">" + phone + "</a></li><li><a href=\"mailto:" + email + "\">" + email + "</a></li></ul><br>";
       document.getElementById(myRep).innerHTML = ul;
       myRep = "senateRep";
   }
}

getLocation();
