var cookieZoom = $.cookie("zoom");
var cookieLatitude = $.cookie("latitude");
var cookieLongitude = $.cookie("longitude");


var getImportanceUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/otsi.py?table=importance";
var getLocationsUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/otsi.py?table=location";
var deleteMarkerUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/deleteMarker.py";
var changeMarkerUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/changeLocation.py";
var fileUploadUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/fileUpload.py";
var addMarkerMode = false;
var markers = [];
var localLat;
var localLng;
var importance_names = [];
var importance_ids = []
 
 
$( document ).ready(function() {

	$( ".navbar" ).click(function() {
	
	$( "#markerInfoContainer" ).removeClass( "elementVisible" );
	$( "#markerInfoContainer" ).addClass( "elementHidden" );
	
	});
	
	$.getJSON(getImportanceUrl, function(types) {
					for (var i = 0; i < types.length; i++) {
						jsonTypeId = types[i].importance_id;
						jsonTypeName = types[i].importance_name;
						importance_names.push(jsonTypeName);
						importance_ids.push(jsonTypeId);
						
						 $('#importanceSelect').append($("<option/>", {
							value: jsonTypeId,
							text: jsonTypeName
							}));
						 $('#markerImportanceChange').append($("<option/>", {
							value: jsonTypeId,
							text: jsonTypeName
							}));
					}
	});	
	
	$.getJSON(getLocationsUrl, function(locations) {
	
					for (var i = 0; i < locations.length; i++) {
						jsonLocationId = locations[i].location_id;
						jsonLocationName = locations[i].location_name;
						jsonLocationLat = locations[i].latitude;
						jsonLocationLng = locations[i].longitude;
						jsonLocationImportance = locations[i].importance;
						
						createMarker(jsonLocationLat,jsonLocationLng,jsonLocationName,jsonLocationId,jsonLocationImportance);				
	}
	
	for (var i = 0; i < markers.length; i++) {
					if (markers[i].importance > 1){
						markers[i].setMap(null);}
					else {
						markers[i].setMap(myMap);
					}
				
	}
	});	
	
	
	
	
	
	
	$( "#deleteMarker" ).click(function() {
	
	$('#deleteModal').modal('hide');
	
	var location_id = $(".markerId").text();
	var markerData = {
						"location_id": location_id,	
		}
		$.getJSON(deleteMarkerUrl, markerData, function(){		
				$( "#markerInfoContainer" ).removeClass( "elementVisible" );
				$( "#markerInfoContainer" ).addClass( "elementHidden" );
				for (var i = 0; i < markers.length ; i++){
					if(markers[i].id  === location_id){
						markers[i].setMap(null);
						if (i > -1) {
							markers.splice(i, 1);
						}
					} 
				} 
				setAllMap(myMap); 
		});	
	});
	
	$( "#changeButton" ).click(function() {
		$(".has-error").removeClass("has-error");
		$('.error-label').text('');
		$( "#markerInfoContainer" ).removeClass( "elementVisible" );
		$( "#markerInfoContainer" ).addClass( "elementHidden" );
		$( "#markerChangeContainer" ).removeClass( "elementHidden" );
		$( "#markerChangeContainer" ).addClass( "elementVisible" );
		var changableId = $( ".markerId").text();
		var changableTitle = $( "#markerTitle" ).text();
		var changableImportance = $( "#markerImportanceId" ).text();
		$( "#markerTitleChange" ).val(changableTitle);
		$( "#markerImportanceChange" ).val(changableImportance);
		
		$( "#cancelChange" ).click(function() {
			$( "#markerInfoContainer" ).removeClass( "elementHidden" );
			$( "#markerInfoContainer" ).addClass( "elementVisible" );
			$( "#markerChangeContainer" ).removeClass( "elementVisible" );
			$( "#markerChangeContainer" ).addClass( "elementHidden" );
		});
		
		
		
		$("#saveChange").click(function(event){
		var changableId = $( ".markerId").text();
		
		var changableTitle = $( "#markerTitleChange" ).val();
		var changableImportance = $( "#markerImportanceChange" ).val();
		
		if (validateChanges(changableTitle,changableImportance) === true){
		var changeData = {
						"location_id": changableId,	
						"location_name": changableTitle,
						"importance": changableImportance
		}
	
			//window.location.href = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/changeLocation.py?location_id="+changableId+"&location_name="+changableTitle+"&importance="+changableImportance
			$.getJSON(changeMarkerUrl, changeData, function(){
					$( "#markerInfoContainer" ).removeClass( "elementHidden" );
					$( "#markerInfoContainer" ).addClass( "elementVisible" );
					$( "#markerChangeContainer" ).removeClass( "elementVisible" );
					$( "#markerChangeContainer" ).addClass( "elementHidden" );
					$("#markerTitle").text(changableTitle);
					
					for (var i = 0; i < importance_ids.length;i++){
						if (importance_ids[i] === changableImportance){
							var changableImportanceName = importance_names[i];
						}
					} 
					for (var i = 0; i < markers.length ; i++){
						if (markers[i].id === changableId){
							markers[i].setTitle(changableTitle);
							markers[i].importance = changableImportance;
						}
					}
					$("#markerImportanceId").text(changableImportance);
					$("#markerImportance").text(changableImportanceName);
					var zoomLevel = myMap.getZoom();

			for (var i = 0; i < markers.length; i++) {
					if (zoomLevel === 2 && markers[i].importance > 1){
						markers[i].setMap(null);
						
					}
					else if (zoomLevel === 3 && markers[i].importance > 2){
						markers[i].setMap(null);
					}
					else if (zoomLevel === 4 && markers[i].importance > 3){
						markers[i].setMap(null);
					}
					else if (zoomLevel === 5 && markers[i].importance > 4){
						markers[i].setMap(null);
					}
					else {
						markers[i].setMap(myMap);
					}
			}
					
					
					
					
		});	
		}
	});
	
	
}); 

}); 

var myMap;
google.maps.event.addDomListener(window, 'load', initialize);


	  
  $( "#saveMarkerButton" ).click(function( event ) {
		event.preventDefault();
	
		
		if(validateMarker()!== false){
		var name = $("#locationName").val();
		var importance = $("#importanceSelect").val();
	//	window.location.href = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveMarker.py?latitude="+localLat+"&longitude="+localLng+"&location_name="+name+"&location_type="+type+"&importance="+importance+"&location_date="+date+"&location_description="+description+"&location_picture_links="+pictureLinks+"&location_file_links="+fileLinks;
		var markerData = {
							"latitude":localLat,
							"longitude": localLng,
							"location_name":name,
							"importance":importance,
							
		}
		var saveMarkerUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveMarker.py";
		$.getJSON(saveMarkerUrl, markerData, function(response){
						var markerId = response[0].addedId;
						var markerName = response[0].addedName;
						$('#myModal').scrollTop(0);
						$('#myModal').modal('hide');
						loc = new google.maps.LatLng(localLat,localLng);
						createMarker(localLat,localLng,markerName,markerId,importance);
						local = myMap.getCenter();
						$.cookie("latitude", myMap.getCenter().lat());
						$.cookie("longitude", myMap.getCenter().lng());
						$.cookie("zoom", myMap.getZoom());
						location.reload();
						
						});
		
		
		
		

	






		
	
	
					}
	
	
	});



	function createMarker(lat,lng,title,id,importance) {
      loc = new google.maps.LatLng(lat,lng);
				marker = new google.maps.Marker({
							position: loc,
							map: myMap,
							title:title,
							id:id,
							importance:importance
	
						});  
		markers.push(marker);
		
        google.maps.event.addListener(marker, 'click', function(event) {
			loc2 = new google.maps.LatLng(lat,lng);
			var zoomLevel = myMap.getZoom();
			if (zoomLevel < 8){
			myMap.setZoom(8);
			}
			
			myMap.setCenter(loc2);
			$( "#markerInfoContainer" ).removeClass( "elementHidden" );
			$( "#markerInfoContainer" ).addClass( "elementVisible" );
			$( "#markerChangeContainer" ).removeClass( "elementVisible" );
			$( "#markerChangeContainer" ).addClass( "elementHidden" );
			$( ".markerId" ).text(id);
			getData();
		
        });
}


	function getData(){
	
	$.getJSON(getLocationsUrl, function(locations) {
	
	 $("#picturesTable > tbody").html("");
	  $("#filesTable > tbody").html("");
	  $("#descriptionsTable > tbody").html("");
	   $("#linksTable > tbody").html("");
	   $("#locationImportanceHeader").html("");
	    $("#locationNameHeader").html("");
	   
	
					var found = false;
					for (var i = 0; i < locations.length; i++) {
						if(locations[i].location_id === $( ".markerId" ).text()){
						found = true;
						var locationId = locations[i].location_id;
						var locationName = locations[i].location_name;
						var locationImportanceId = locations[i].importance;
							}
						
					}
					for (var i = 0; i < importance_ids.length;i++){
						if (importance_ids[i] === locationImportanceId){
							var locationImportanceName = importance_names[i];
						}
					} 
					$("#markerTitle").text(locationName);
					$("#markerImportanceId").text(locationImportanceId);
					$("#markerImportance").text(locationImportanceName);
					var headerText = locationName+" <button id=\"back\" type=\"button\" class=\" btn btn-info\">Back to main view</button>"
					var subHeaderText = "<small>"+locationImportanceName+"</small>"
					$("#locationNameHeader").append(headerText);
					$("#locationImportanceHeader").append(subHeaderText);
					getAttachments(locationId);
	
					$( "#back" ).click(function() {
		
		$("#myMap").removeClass("smallerMap");
		$("#sidebar").css({"display":"block"});
		$("#contentBox").css({"display":"none"});
		$("#map-canvas").removeClass();
		$("#map-canvas").addClass('col-md-9');
		$("#map-canvas").addClass('bigMap');
		$("#locationNameHeader").text("");
		

});	
	
	
	
	});	
	}
	
	function validateMarker(){
		
		var YearReg = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-2][0-9][0-9][0-9])$/;
		var name = $("#locationName").val();
		var descriptionName = $("#descriptionName").val();
		var descriptionDate = $("#descriptionDate").val();
		var description = $("#locationDescription").val();
		
	
		var link = $("#locationLink").val();
		var hasErrors = false
		$('.error-label').text('');
		$('.has-error').removeClass('has-error');
		
		
		
		if (name ==""){
			hasErrors = true;
			$('#nameDiv').addClass('has-error');
			$('#name-error').text('Name is required');
		}
		else if (name.length > 50){
			hasErrors = true;
			$('#nameDiv').addClass('has-error');
			$('#name-error').text('Name is too long');
		}

	
		if (hasErrors == true){
			$('#myModal').scrollTop(0);
			return false;}
		else{return true;}
		
	
	}
	
	function validateChanges(title){
	
	var hasErrors = false
	
	if (title ==""){
			hasErrors = true;
			$('#changeTitleDiv').addClass('has-error');
			$('#changeTitle-error').text('Name is required');
		}
		else if (title.length > 50){
			hasErrors = true;
			$('#changeTitleDiv').addClass('has-error');
			$('#changeTitle-error').text('Name is too long');
		}
	
	
	if (hasErrors == true){
			return false;}
		else{return true;}
	
	}
	
	function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function mapClickHandler(location) {

	if(addMarkerMode==true){
	  addMarkerMode = false;
	myMap.setOptions({draggableCursor:'pointer'});
 localLat = location.lat();
  localLng = location.lng();
   $('#myModal').modal('show');
   	$('.error-label').text('');
    }
} 

function initialize() {

	   if (!((cookieZoom === "null")||(typeof cookieZoom ==="undefined"))){
		var localZoom = parseInt(cookieZoom);
		var localLatitude = parseFloat(cookieLatitude);
		var localLongitude = parseFloat(cookieLongitude);
		
	   $.cookie("zoom", null);
	   $.cookie("latitude", null);
		$.cookie("longitude", null);
		var mapOptions = {
          center: new google.maps.LatLng(localLatitude, localLongitude),
          zoom: localZoom,
		  minZoom: 2
        };
	   
	   } 
	   else{
		var mapOptions = {
          center: new google.maps.LatLng(25.363882, 0),
          zoom: 2,
		  minZoom: 2
        };
		}  	
		
		
        myMap = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
		 myMap.setOptions({draggableCursor:'pointer'});
	 setAllMap(myMap);
		 

		 google.maps.event.addListener(myMap, 'zoom_changed', function() {
			var zoomLevel = myMap.getZoom();
			for (var i = 0; i < markers.length; i++) {
					if (zoomLevel === 2 && markers[i].importance > 1){
						markers[i].setMap(null);
					}
					else if (zoomLevel === 3 && markers[i].importance > 2){
						markers[i].setMap(null);
					}
					else if (zoomLevel === 4 && markers[i].importance > 3){
						markers[i].setMap(null);
					}
					else if (zoomLevel === 5 && markers[i].importance > 4){
						markers[i].setMap(null);
					}
					else {
						markers[i].setMap(myMap);
					}
			}
		
});

		 
		 
	
	$( "#newMarker" ).click(function() {	
	$( "#markerInfoContainer" ).removeClass( "elementVisible" );
	$( "#markerInfoContainer" ).addClass( "elementHidden" );
		$("#locationName").val("");
		$("#descriptionName").val("");
		$("#descriptionDate").val("");
		$("#locationDescription").val("");
		$("#locationFileLinks").val("");
		$("#pictureName").val("");
		$("#pictureDate").val("");
		$("#pictureInput").val("");
		$("#fileName").val("");
		$("#fileDate").val("");
		$("#fileInput").val("");
		$("#locationLink").val("");
		
	$('.has-error').removeClass('has-error');
	$('#myModal').scrollTop(0);
		myMap.setOptions({draggableCursor:'crosshair'});
		addMarkerMode = true;
		
		
		$(document).click(function(event1){
			if(event1.target.id !== 'newMarker') {
			addMarkerMode =false;
			myMap.setOptions({draggableCursor:'pointer'});
			
			}
		});
		google.maps.event.addListener(myMap, 'click', function(event) {
	 	mapClickHandler(event.latLng);
  });
		
	}); 
	  
	  } 
