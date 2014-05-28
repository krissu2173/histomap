$( document ).ready(function() {
	
	$( ".close2" ).click(function() {
			$('.error-label').text('');
	$('.has-error').removeClass('has-error');
			$("#pictureName").val("");
			$("#pictureDate").val("");
			$("#descriptionName").val("");
			$("#descriptionDate").val("");
			$("#descriptionContent").val("");
			$("#pictureInput").val("");
			$("#fileName").val("");
			$("#fileDate").val("");
			$("#fileInput").val("");
			$("#linkInput").val("");
			
});



	$( "#addPictureButton" ).click(function() {
		if (validatePicture() ===true){
		$( "#pictureFormSubmit" ).click();
		}
		
});
	$('#pictureForm').ajaxForm(function() { 
		var locationId = $('.markerId').text();
		var fileName = $("#pictureInput").val().replace(/.*(\/|\\)/, '').replace(" ","_");
		var pictureName = $("#pictureName").val();
		var pictureDate = $("#pictureDate").val();
		var addAttachmentURL = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?";
		if (pictureDate !== ""){
			var addData = {
						"location_id": locationId,	
						"attachment_type" :"picture",
						"attachment_fileName": fileName,
						"attachment_name": pictureName,
						"attachment_year": pictureDate
			}
		}
		else {
			var addData = {
						"location_id": locationId,	
						"attachment_type" :"picture",
						"attachment_fileName": fileName,
						"attachment_name": pictureName
			}
		}
		//	window.location.href = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?location_id="+locationId+"&attachment_fileName="+fileName+"&attachment_name="+pictureName+"&attachmentYear="+pictureDate
			$.getJSON(addAttachmentURL, addData, function(){
				$('#pictureAddModal').modal('hide');
				$("#pictureInput").val("");
				$("#pictureName").val("");
				$("#pictureDate").val("");
				$("#attachmentsViewBtn").click();
			});

}); 


	$( "#addFileButton" ).click(function() {
		if (validateFile() ===true){
		var fileName = $("#fileInput").val().replace(/ /g, '_');
		$( "#fileFormSubmit" ).click();}
		
});

$('#fileForm').ajaxForm(function() { 
		var locationId = $('.markerId').text();
		var fileFileName = $("#fileInput").val().replace(/.*(\/|\\)/, '').replace(/ /g, '_');
		var fileName = $("#fileName").val();
		var fileDate = $("#fileDate").val();
		var addAttachmentURL = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?";
		if (fileDate !== ""){
			var addData = {
						"location_id": locationId,	
						"attachment_type" :"file",
						"attachment_fileName": fileFileName,
						"attachment_name": fileName,
						"attachment_year": fileDate
			}
		}
		else {
			var addData = {
						"location_id": locationId,	
						"attachment_type" :"file",
						"attachment_fileName": fileFileName,
						"attachment_name": fileName
			}
		}
		//	window.location.href = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?location_id="+locationId+"&attachment_fileName="+fileName+"&attachment_name="+pictureName+"&attachmentYear="+pictureDate
			$.getJSON(addAttachmentURL, addData, function(){
				$('#fileAddModal').modal('hide');
				$("#fileInput").val("");
				$("#fileName").val("");
				$("#fileDate").val("");
				$("#attachmentsViewBtn").click();
			});

}); 


	$( "#addDescriptionButton" ).click(function() {
		if (validateDescription() ===true){
		var locationId = $('.markerId').text();
		var description = $('#descriptionContent').val().replace(/\n/g, '<br />');
		var descriptionName = $("#descriptionName").val();
		var descriptionDate = $("#descriptionDate").val();
		var addAttachmentURL = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?";
		if (descriptionDate !== ""){
			var addData = {
						"location_id": locationId,
						"attachment_type" :"description",						
						"attachment_name": descriptionName,
						"attachment_year": descriptionDate,
						"attachment_description": description
			}
		}
		else {
			var addData = {
						"location_id": locationId,
						"attachment_type" :"description",
						"attachment_name": descriptionName,
						"attachment_description": description
			}
		}
		//	window.location.href = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?location_id="+locationId+"&attachment_fileName="+fileName+"&attachment_name="+pictureName+"&attachmentYear="+pictureDate
			$.getJSON(addAttachmentURL, addData, function(){
				$('#descriptionAddModal').modal('hide');
				$("#descriptionContent").val("");
				$("#descriptionName").val("");
				$("#descriptionDate").val("");
				$("#attachmentsViewBtn").click();
			});
		
		
		}
		
});

$( "#addLinkButton" ).click(function() {
		if (validateLink() ===true){
		var locationId = $('.markerId').text();
		var link = $('#linkInput').val();
		
		if ((!link.startsWith("http://"))&&(!link.startsWith("https://"))){link = "http://"+link}
		var addAttachmentURL = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?";
		var addData = {
						"location_id": locationId,
						"attachment_type" :"link",						
						"attachment_link": link,
						
			}
		//	window.location.href = "http://dijkstra.cs.ttu.ee/~t112991/cgi-bin/mAPPsy/saveAttachment.py?location_id="+locationId+"&attachment_fileName="+fileName+"&attachment_name="+pictureName+"&attachmentYear="+pictureDate
			$.getJSON(addAttachmentURL, addData, function(){
				$('#addLinkModal').modal('hide');
				$("#linkInput").val("");
				$("#attachmentsViewBtn").click();
			});
		}
});


function validatePicture(){

	var YearReg = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-2][0-9][0-9][0-9])$/;
	var pictureFileRegJPG = /^.*jpg/;
	var pictureFileRegPNG = /^.*png/;
	var pictureFileRegJPEG = /^.*jpeg/;
	var pictureName = $("#pictureName").val();
	var pictureDate = $("#pictureDate").val();
	var picture = $("#pictureInput").val().toLowerCase();
	var hasErrors = false
	$('.error-label').text('');
	$('.has-error').removeClass('has-error');
	
	if(!(picture===""||(pictureFileRegJPG.test(picture))||(pictureFileRegJPEG.test(picture))||pictureFileRegPNG.test(picture))){
			hasErrors = true;
			$('#pictureFileDiv').addClass('has-error');
			$('#pictureFile-error').text('File format wrong');
		}
	else if (picture === ""){
	
			hasErrors = true;
			$('#pictureFileDiv').addClass('has-error');
			$('#pictureFile-error').text('You must upload picture file');
	}
	else if (picture.length > 200){
		hasErrors = true;
			$('#fileNameDiv').addClass('has-error');
			$('#fileName-error').text('File name too long');
	}
	if (pictureName ===""){
			hasErrors = true;
			$('#pictureNameDiv').addClass('has-error');
			$('#pictureName-error').text('Add picture name');
		}

	else if (pictureName.length > 50){
		hasErrors = true;
			$('#pictureNameDiv').addClass('has-error');
			$('#pictureName-error').text('Picture name too long');
	}
	
	if ((!(pictureDate===""))&&(!(YearReg.test(pictureDate)))){
			hasErrors = true;
			$('#pictureYearDiv').addClass('has-error');
			$('#pictureYear-error').text('Year unrealistic or wrong format');
		}

	

		if (hasErrors == true){
			return false;}
		else{return true;}

}
function validateFile(){

	var YearReg = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-2][0-9][0-9][0-9])$/;
	var FileRegPDF = /^.*pdf/;
	var FileRegTXT = /^.*txt/;
	var FileRegDOC = /^.*doc/;
	var FileRegDOCX = /^.*docx/;
	var fileName = $("#fileName").val();
	var fileDate = $("#fileDate").val();
	var file = $("#fileInput").val().toLowerCase();
	var hasErrors = false
	$('.error-label').text('');
	$('.has-error').removeClass('has-error');
		
	if(!(file===""||(FileRegPDF.test(file))||(FileRegDOC.test(file))||(FileRegDOCX.test(file))||(FileRegTXT.test(file)))){
			hasErrors = true;
			$('#fileFileDiv').addClass('has-error');
			$('#fileFile-error').text('File format wrong');
		}
	else if (file === ""){
	
			hasErrors = true;
			$('#fileFileDiv').addClass('has-error');
			$('#fileFile-error').text('You must upload file');
	}

	else if (file.length > 200){
		hasErrors = true;
			$('#fileNameDiv').addClass('has-error');
			$('#fileName-error').text('File name too long');
	}

	if (fileName ===""){
			hasErrors = true;
			$('#fileNameDiv').addClass('has-error');
			$('#fileName-error').text('Add file name');
		}

	else if (fileName.length > 50){
		hasErrors = true;
			$('#fileNameDiv').addClass('has-error');
			$('#fileName-error').text('File name too long');
	}
	
	if ((!(fileDate===""))&&(!(YearReg.test(fileDate)))){
			hasErrors = true;
			$('#fileYearDiv').addClass('has-error');
			$('#fileYear-error').text('Year unrealistic or wrong format');
		}

		if (hasErrors == true){
			return false;}
		else{return true;}

}

function validateDescription(){

	var YearReg = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-2][0-9][0-9][0-9])$/;
	var descriptionName = $("#descriptionName").val();
	var descriptionDate = $("#descriptionDate").val();
	var description = $("#descriptionContent").val();
	var hasErrors = false
	$('.error-label').text('');
	$('.has-error').removeClass('has-error');
		
	if (descriptionName ===""){
			hasErrors = true;
			$('#descriptionNameDiv').addClass('has-error');
			$('#descriptionName-error').text('Add description name');
		}
	else if (descriptionName.length > 50){
		hasErrors = true;
			$('#descriptionNameDiv').addClass('has-error');
			$('#descriptionName-error').text('Description name too long');
	}
	if (description === ""){
			hasErrors = true;
			$('#descriptionDiv').addClass('has-error');
			$('#description-error').text('You must enter description');
		}
	if ((!(descriptionDate===""))&&(!(YearReg.test(descriptionDate)))){
			hasErrors = true;
			$('#descriptionYearDiv').addClass('has-error');
			$('#descriptionYear-error').text('Year unrealistic or wrong format');
		}

		if (hasErrors == true){
			return false;}
		else{return true;}

}

function validateLink(){

	var UrlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
	var link = $("#linkInput").val();
	var hasErrors = false;
	$('.error-label').text('');
	$('.has-error').removeClass('has-error');
	
		
	if ((!(link===""))&&(!(UrlReg.test(link)))){
			hasErrors = true;
			$('#linkDiv').addClass('has-error');
			$('#link-error').text('Url format wrong'); 
	}
	else if (link ===""){
		hasErrors = true;
		$('#linkDiv').addClass('has-error');
		$('#link-error').text('Enter URL');
	}
	else if (link.length > 200){
		hasErrors = true;
			$('#linkDiv').addClass('has-error');
			$('#link-error').text('Url too long');
	}
	
		
		if (hasErrors == true){
			return false;}
		else{return true;}

}
});

String.prototype.startsWith = function (str)
{
   return this.indexOf(str) == 0;
}