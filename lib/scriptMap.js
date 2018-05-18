var map;
var delayInMilliseconds = 200;
// var dappAddress = "n21spexEBGSmfGPYcNvSskyLMX7eM76GjKU";//testnet
var dappAddress = "n1qyeKsZ1zaXXEYMygHDjqpHUSJVZ2QB1j7";//mainnet


var fullData = null;
var markerInfoList = null;

var NebPay = require("nebpay");
var nebPay = new NebPay();
var delayInMillisecondsLong = 3000;

function set_marker(from,text, latLng) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
	var markerInfo = new google.maps.InfoWindow({
    	content: text+"\n"
    });

    marker.addListener('mouseover', function() {
    	markerInfo.open(map, marker);
    });

    marker.addListener('mouseout', function() {
    	setTimeout(function() {
    		markerInfo.close();
    	}, delayInMilliseconds);
    });

    //right click direct to nebulas explorer
    if(from.length!=0){
	    marker.addListener('rightclick', function() {
	    	openInNewTab("https://explorer.nebulas.io/#/address/"+from);
	    });
    }

    return marker;
}


function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


function write_marker_to_neb(text, latLng) {
	var to = dappAddress;
	var value = "0";
	var callFunction = "set";
	var callArgs = "[\"" + text + "\",\"" + parseFloat(latLng.lat()) + "\",\"" + parseFloat(latLng.lng()) +"\"]";
	nebPay.call(to,value,callFunction,callArgs,{
		listener: function(resp) {
			tx_tmp = JSON.stringify(resp);
		}
	});	
}

function get_all_info_from_neb(){
	var to = dappAddress;
	var value = "0";
	var callFunction = "get_all";
	var callArgs = "";
	nebPay.simulateCall(to,value,callFunction,callArgs,{
		listener: function(resp) {
			fullData = JSON.parse(JSON.parse(resp.result));
		}
	});	
}

function prepare_all_markers() {
	var result = {};
	fromList = fullData.fromList;
	textList=fullData.textList;
	latList=fullData.latList;
	lngList=fullData.lngList;
	for(var i=0;i<fromList.length;i++) {
		var from = fromList[i]
		result[from] = {'text':textList[i], "latLng":{'lat':parseFloat(latList[i]),'lng':parseFloat(lngList[i])}};
	}
	return result;
}

function show_markers(){
	for(var key in markerInfoList) {
		set_marker(key, markerInfoList[key].text,markerInfoList[key].latLng);
	}		
}


///////////////////////
get_all_info_from_neb(); // retrieve all data

setTimeout(function() {
	markerInfoList = prepare_all_markers();
}, delayInMillisecondsLong);

setTimeout(function() {
	show_markers();
}, delayInMillisecondsLong);










