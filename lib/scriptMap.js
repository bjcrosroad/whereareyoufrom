var map;
var delayInMilliseconds = 300;


// var latLngTmp;
var markerTmp;
var infoWindowTmp;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40, lng: 120},
	  zoom: 3
	});

	//load current 


	//add location with right click
	google.maps.event.addListener(map, "rightclick", function (event) {


        // createMarker();
        var text = prompt("Please enter something to add your location! ^_^\n和大家打个招呼吧！");
        if(name.length>0){

		    var latLng = event.latLng;
	        
	        var marker = new google.maps.Marker({
	          position: latLng,
	          map: map
	        });

        	marker.setAnimation(google.maps.Animation.BOUNCE);
        	marker.setAnimation(null);

        	var infowindow = new google.maps.InfoWindow({
		    		content: text+"\n"
		    	});       	

        	infoWindowTmp = infowindow;
	        marker.addListener('mouseover', function() {
	        	infowindow.open(map, marker);
	        });

	        marker.addListener('mouseout', function() {
	        	setTimeout(function() {
	        		infowindow.close();
	        	}, delayInMilliseconds);
	        });


	        infowindow.addListener('mouseover', function() {
	        	infowindow.open(map, marker);
	        });
	        
	        infowindow.addListener('mouseout', function() {
	        	infowindow.close();
	        });


	        //right click direct to nebulas explorer
	        marker.addListener('rightclick', function() {
	        	openInNewTab("https://explorer.nebulas.io/#/address/n1nggpdziVAZrxPfhcmUiEcy83pEVX7Li8T");
	        });
	    } else {
	    	window.alert("Input can't be empty!");
	    }
	});

}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
