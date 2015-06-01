
mainTableJson=
{
	"courses": [
		{
			"CourseID":"COMP1010",
			"CourseName":"Intro to Computer Science",
			"CreditHours":"3",
			"Faculty":"Science",
			"Department":"Computer Science",
			"Prerequisites":"None"
		},
		
		{
			"CourseID":"COMP1260",
			"CourseName":"Computer Usage",
			"CreditHours":"3",
			"Faculty":"Science",
			"Department":"Computer Science",
			"Prerequisites":"None"
		},
		{
			"CourseID":"COMP2160",
			"CourseName":"Data Structures",
			"CreditHours":"3",
			"Faculty":"Science",
			"Department":"Computer Science",
			"Prerequisites":"COMP1010"
		}
		
	]
	
};


function fillSecTable(courseID, rowIndex){
	
	st=$('table#'+courseID).DataTable( {
		/*"data": mainTableJson["courses"][rowIndex]["Sections"],*/
		"data":mainTableJson["courses"],
		"columns": [
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
				"title": "Credit Hours"
			}
			
			
			
		],
		"bPaginate":false,
		"bInfo":false,
		"bFilter":false,
		"processing": true
	} );
	
}


function nestedDT()
{
	
	
	mainDT=$('#mainTable').DataTable({
		"data": mainTableJson["courses"],
		"columns":[
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
				"title": "Credit Hours"
			},
			{
				"data": "Faculty",
				"title": "Credit Faculty"
			},
			{
				"data": "Department",
				"title": "Credit Department"
			},
			{
				"data": "Prerequisites",
				"title": "Prerequisites(s)"
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
			/*row.child("").show();*/
			row.child(createSecTable(row.data().CourseID)).show();
			fillSecTable(row.data().CourseID, row.index());
			tr.addClass('shown');
			
		}
	});
}


function createSecTable (courseID) {
	var retVal="";
	
	retVal=retVal+'<table id="'+ courseID +'" width="90%" class="cell-border hover" style="margin-left:50px">';
	
	retVal=retVal+'</table>';
	
	return retVal;
}

/*
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
