$( document ).ready(function() {

	 $( "#attachmentsViewBtn" ).click(function() {
	 $("#picturesTable > tbody").html("");
	  $("#filesTable > tbody").html("");
	  $("#descriptionsTable > tbody").html("");
	   $("#linksTable > tbody").html("");
	   $("#locationImportanceHeader").html("");
	    $("#locationNameHeader").html("");
	$("#sidebar").css({"display":"none"});
	$("#contentBox").css({"display":"block"});
	$("#map-canvas").removeClass();
	$("#map-canvas").addClass('col-md-4');
	$("#map-canvas").addClass('smallMap');
	var locationId = $( ".markerId" ).text();
	var locationTitle = $( "#markerTitle" ).text();
	var locationImportance = $( "#markerImportance" ).text();
	var headerText = locationTitle+" <button id=\"back\" type=\"button\" class=\" btn btn-info\">Back to main view</button>"
	var subHeaderText = "<small>"+locationImportance+"</small>"
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
	$( "#mainPage" ).click(function() {
		
		$("#myMap").removeClass("smallerMap");
		$("#sidebar").css({"display":"block"});
		$("#contentBox").css({"display":"none"});
		$("#map-canvas").removeClass();
		$("#map-canvas").addClass('col-md-9');
		$("#map-canvas").addClass('bigMap');
		$("#locationNameHeader").text("");

});	




	$('#pictures a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});
	
	$('#files a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

$('#descriptions a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});


$('#links a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});
	
	
});

function getAttachments(locationId){


var getAttachmentsURL = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/getAttachments.py?";
		
	var locationData = {
						"location_id": locationId,	
		}
		
	$.getJSON(getAttachmentsURL, locationData, function(data) {
					
					for (var i = 0; i < data.length; i++) {
						
						jsonType = data[i].attachment_type;
						
						if (jsonType === "picture"){
							var attachment_id = data[i].attachment_id;
							var pictureFile = data[i].attachment_fileName;
							var pictureName = data[i].attachment_name;
							var pictureYear =  data[i].attachment_year;
							var dateAdded = data[i].create_time;
							var pictureURL = "http://dijkstra.cs.ttu.ee/~t112991/mAPPsy/files/"+pictureFile
							
							
							if (pictureYear === "None"){pictureYear = "";}
							
							$("#picturesTable").append("<tr id=" + attachment_id + ">");
							$("#" + attachment_id).append("<td class=\"pictureTitle\">" + pictureName + "</td>");
							$("#" + attachment_id).append("<td class=\"pictureYear\">" + pictureYear + "</td>");
							$("#" + attachment_id).append("<td class=\"dateAdded\">" + dateAdded + "</td>");
							$("#" + attachment_id).append("<td class=\"picture\"><img class=\"locationThumbnail\" src="+pictureURL+" alt="+pictureName+" ></td>");
							$("#" + attachment_id).append("<td ><button type=\"button\" class=\"deleteAttachment btn-sm btn btn-primary\">Delete</button></td>");
							$("#picturesTable").append("</tr>");
						}
						else if (jsonType === "file"){
							var attachment_id = data[i].attachment_id;
							var file = data[i].attachment_fileName;
							var fileName = data[i].attachment_name;
							var fileYear =  data[i].attachment_year;
							var dateAdded = data[i].create_time;
							var fileURL = "http://dijkstra.cs.ttu.ee/~t112991/mAPPsy/files/"+file
							if (fileYear === "None"){pictureYear = "";}
							$("#filesTable").append("<tr id=" + attachment_id + ">");
							$("#" + attachment_id).append("<td class=\"fileTitle\">" + fileName + "</td>");
							$("#" + attachment_id).append("<td class=\"fileYear\">" + fileYear + "</td>");
							$("#" + attachment_id).append("<td class=\"fileAdded\">" + dateAdded + "</td>");
							$("#" + attachment_id).append("<td class=\"file\"><form method=\"get\" action="+fileURL+"><button class=\"btn-sm btn btn-primary \" type=\"submit\">File</button></form></td>");
							$("#" + attachment_id).append("<td ><button type=\"button\" class=\"deleteAttachment btn-sm btn btn-primary\">Delete</button></td>");
							$("#filesTable").append("</tr>");
						
						}
						else if (jsonType === "description"){
							var attachment_id = data[i].attachment_id;
							var descriptionName = data[i].attachment_name;
							var descriptionYear =  data[i].attachment_year;
							var dateAdded = data[i].create_time;
							var description =  data[i].attachment_description;
							$("#descriptionsTable").append("<tr id=" + attachment_id + ">");
							$("#" + attachment_id).append("<td class=\"descriptionTitle\">" + descriptionName + "</td>");
							$("#" + attachment_id).append("<td class=\"descriptionYear\">" + descriptionYear + "</td>");
							$("#" + attachment_id).append("<td class=\"dateAdded\">" + dateAdded + "</td>");
							$("#" + attachment_id).append("<td class=\"description\">" + description + "</td>");
							$("#" + attachment_id).append("<td ><button type=\"button\" class=\"deleteAttachment btn-sm btn btn-primary\">Delete</button></td>");
							$("#descriptionTable").append("</tr>");
						
						} 
						else if (jsonType === "link"){
							var attachment_id = data[i].attachment_id;
							var dateAdded = data[i].create_time;
							var link = data[i].attachment_link;
							$("#linksTable").append("<tr id=" + attachment_id + ">");
							$("#" + attachment_id).append("<td class=\"dateAdded\">" + dateAdded + "</td>");
							$("#" + attachment_id).append("<td class=\"link\"><a href=\""+link+"\">" + link + "</a></td>");
							$("#" + attachment_id).append("<td ><button type=\"button\" class=\"deleteAttachment btn-sm btn btn-primary\">Delete</button>");
							$("#linksTable").append("</tr>");
						} 
						
					}
			$( ".locationThumbnail" ).click(function() {
			var src = $(this).prop('src');
			$("#picModal-body").empty();
			$( "#picModal" ).modal("show");
			$( "#picModal-body" ).append( "<img class=\"bigImg\" src=\""+src+"\" > ");
});

			$( ".deleteAttachment" ).click(function() {
				var deleteAttachmentUrl = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/deleteAttachment.py";
				attachment_id = $(this).parent().parent().attr("id");
				
				var attachmentData = {
						"attachment_id": attachment_id,	
			}
				$.getJSON(deleteAttachmentUrl, attachmentData, function(){		
					$("table #"+attachment_id+"").remove();
		});	
				
			});
	
	});	
	

}