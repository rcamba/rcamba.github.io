
function nestedDT()
{
	mainTableJson=
	{
		"main": [
			{
			
				"Column1":"Value1",
				"Column2":"Value2",
				"Column3":"Value3"
			},
			
			{
			
				"Column1":"Value4",
				"Column2":"Value5",
				"Column3":"Value6"
			},
			{
			
				"Column1":"Value7",
				"Column2":"Value8",
				"Column3":"Value9"
			}
			
		
		]
		
		
	};
	
	mainDT=$('#mainTable').DataTable({
		"data": mainTableJson["main"],
		"columns":[
			{
				"className": "expand",
				"orderable": false,
				"data": null,
				"defaultContent": ""
			},
			{
			
				"data": "Column1",
				"title": "C1"
			},
			{
				"data": "Column2",
				"title": "C2"
			
			},
			{
				"data": "Column3",
				"title": "C3"
			
			}
			
			
			
		]
	});
	
	$('#mainTable tbody').on('click', 'tr', function () {
		var tr = $(this).closest('tr');
		var row = mainDT.row( tr );
	
		if ( row.child.isShown() ) {
			row.child("").hide();
			tr.removeClass('shown');
		}
		else {
			row.child("").show();
			tr.addClass('shown');
			
		}
	});
}

/*
function createSecTable (data) {
	var retVal="";
	
	retVal=retVal+'<table id="'+ data.CourseID +'" width="90%" class="cell-border hover" style="margin-left:50px">';
	
	retVal=retVal+'</table>';
	
	return retVal;
}


function createAddCoursesTable(global_enrollCourseListJson)
{
	global_addCoursesTable=$('#courseTable').DataTable( {
		"data": global_enrollCourseListJson["courses"],
		"columns": [
			{
				"className": "expand",
				"orderable": false,
				"data": null,
				"defaultContent": ""
			},
			{ 
				"data": "CourseID",
				"title": "Course ID" 
			},
			{ 
				"data": "CourseName",
				"title": "Course Name" 
			},
			{ 
				"data": "CreditHours",
				"title": "Credit Hours",
				"bSearchable": false
			},
			
			{
				"data": "Faculty",
				"title": "Faculty"
			},
			{
				"data": "Department",
				"title": "Department"
			},
			{ 
				"data": "Description",
				"title": "Description"
			},
			{ 
				"data": "PreReqs",
				"title": "Prerequisite(s)",
				"bSearchable": false
			},
			
			
			//this items are displayed as false because we just want them to be searchable in the dataTable
			{ 
				"data": "Days",
				"visible": false
			},
			{ 
				"data": "Location",
				"visible": false
			},
			{ 
				"data": "Instructor",
				"visible": false
			},
			{ 
				"data": "ClassTime",
				"visible": false
			}
			
		],
		"order": [[1, 'asc']]//ascending order on second column(CourseID)
	} );
	
	$('#courseTable tbody').on('click', 'tr', function () {
		var tr = $(this).closest('tr');
		var row = global_addCoursesTable.row( tr );
	
		if ( row.child.isShown() ) {
			row.child(" ").hide();
			tr.removeClass('shown');
		}
		else if (row.data() != null) {
			row.child(createSecTable(row.data())).show();
			fillSecTable(row.data().CourseID, row.index());
			tr.addClass('shown');
		}
	});
}

function fillSecTable(courseID, rowIndex){
	
	
	st=$('table#'+courseID).DataTable( {
		"data": global_enrollCourseListJson["courses"][rowIndex]["Sections"],
		"columns": [

			{ 
				"data": "CRN",
				"title": "CRN"
			},
			{ 
				"data": "SectionID",
				"title": "Section"
			},
			{ 
				"data": "Days",
				"title": "Days"
			},
			{ 
				"data": "SectionCap",
				"title": "Capactiy"
			},
			{ 
				"data": "AvailableSpace",
				"title": "Vacant"
			},
			{ 
				"data": "ClassTime",
				"title": "Class Time"
			},
			{ 
				"data": "Instructor",
				"title": "Instructor"
			},
			{ 
				"data": "Location",
				"title": "Location"
			},
			{ 
				"data": "CRN",
				"title": "Switch with",
				"orderable": false,
				"render": function(data){
					return createEnrolledDropDown(data);
				}
			},
			{ 
				"data": "CRN",
				"title":"",
				"orderable": false,
				"render": function(data){
					return '<button  id="addButton_' + (data)+'" onclick=handleAdd("'+data+'") > Add </button>'
				}
			}
			
			
		],
		"bPaginate":false,
		"bInfo":false,
		"bFilter":false,
		"processing": true
	} );
	
}


function requestCourseList(){ 
	var AJAX_RESPONSE_READY = 4;
	var ajaxRequest = new XMLHttpRequest();
	
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == AJAX_RESPONSE_READY){
			
			global_enrollCourseListJson = JSON.parse(ajaxRequest.responseText);
			createAddCoursesTable(global_enrollCourseListJson);
		}
	}
	ajaxRequest.open("GET", "/api/unenrolledCourses", true);
	ajaxRequest.send(null);
}
*/
