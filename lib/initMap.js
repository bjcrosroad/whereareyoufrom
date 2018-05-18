function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40, lng: 120},
	  zoom: 3
	});

	//add location with right click
	google.maps.event.addListener(map, "rightclick", function (event) {
		event_tmp = event;

        // createMarker();
        var text = prompt("给你的家乡来句评论吧!^_^ \nPlease comment your hometown! ");
        if(text!=null&&text.length>0){
        	
        	//set marker without right click function
        	var marker = set_marker("", text, event.latLng);

        	//write info to blockchain
        	write_marker_to_neb(text, event.latLng);


	    } else {
	    	window.alert("Input can't be empty!");
	    }
	});

}