var autocomplete, address, status;
var repIDs = [];
var transparencyDataIDs = [];

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
    status = "Legislators for " + address + ".";
    repIDs = [];
    getCoordForAddress();
  });
  var mapHouse = L.map('mapHouse').setView([35.50, -80.00], 6);
  L.esri.basemapLayer('Gray').addTo(mapHouse);
  var mapSenate = L.map('mapSenate').setView([35.50, -80.00], 6);
  L.esri.basemapLayer('Gray').addTo(mapSenate);
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
        status = "Legislators for your current location:";
        navigator.geolocation.getCurrentPosition(getLegislators);
    } else {
      status = "Geolocation is not supported by this browser.";
      document.getElementById("status").innerHTML = status;
    }
}

// Makes a call to the open states API to retrieve the N.C. legislators for the coordinates passed in.
function getLegislators(position) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://openstates.org/api/v1/legislators/geo/?lat=" + position.coords.latitude +
    "&long=" + position.coords.longitude + "&apikey=c43a4b70a3494d0c8c7748950c305d2c", true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var reps = JSON.parse(xhr.responseText);
          displayReps(reps);
          console.log(xhr.responseText);
          document.getElementById("status").innerHTML = status;
      }
    }
    xhr.send();
    //console.log(xhr.status);
    //console.log(xhr.statusText);
}

//Formats and displays the legislators information on the page.
function displayReps(representatives) {

    var myRep = "houseLeg";
    var img = "";
    var website = "";
    var name = "";
    var party = "";
    var phone = "";
    var email = "";
    var address = "";
    for (var rep in representatives) {
       img = (representatives[rep].photo_url).replace("/hiRes", "");
       website = representatives[rep].sources[0].url;
       name = representatives[rep].full_name;
       party = representatives[rep].party;
       phone = representatives[rep].offices[0].phone;
       email = representatives[rep].email;
       address = (representatives[rep].offices[1].address).replace(/\r\n|\r|\n/g, "<br>");

       var ul = "<ul><li><img src=\"" + img +
       "\" style=\"height:235px;\"></li><li><a href=" + website +
       ">" + name +"</a></li><li>" + party + "</li><li>" + address +
       "</li><li><a href=\"tel:" + phone + "\">" + phone +
       "</a></li><li><a href=\"mailto:" + email + "\">" + email + "</a></li></ul><br>";

       document.getElementById(myRep).innerHTML = ul;
       repIDs.push(representatives[rep].leg_id);
       myRep = "senateLeg";
   }
   billsSponsoredBy();
}

// Provides the bills sponsored by the reps of interest.
function billsSponsoredBy() {
  var xhr = [];
  var repBills;
  for (var i = 0; i < 2; i++) {
    (function(i){
      xhr[i] = new XMLHttpRequest();

      var url = "http://openstates.org/api/v1/bills/?sponsor_id=" + repIDs[i] +
      "&search_window=session" + "&apikey=c43a4b70a3494d0c8c7748950c305d2c";

      xhr[i].open("GET", url, true);
      xhr[i].onreadystatechange = function() {
        if (xhr[i].readyState == 4 && xhr[i].status == 200) {
          repBills = JSON.parse(xhr[i].responseText);

          var billList = [];
          if (repBills.length == 0) {
            billList[i] = "No bills sponsored this session.";
          }
          else {
            var li = "";
            for (var j = 0; j < repBills.length; j++) {
              li += "<li>" + repBills[j].bill_id + ": " + repBills[j].title + "</li>";
            }
            billList[i] = "<ul>" + li + "</ul>";
          }

          if (i == 0) {
            document.getElementById("houseLegBills").innerHTML = billList[i];
          }
          else if (i == 1){
            document.getElementById("senateLegBills").innerHTML = billList[i];
          }
        }
      };
      xhr[i].send();
    })(i);
  }
};

// Stub for building the object that holds reps objects.
function buildRepsObject() {


}

getLocation();
