mainTableJson=
{
	"courses": [
		{
			"CourseID":"COMP1010",
			"CourseName":"Intro to Computer Science",
			"CreditHours":"3",
			"Faculty":"Science",
			"Department":"Computer Science",
			"Prerequisites":"None",
			"Sections":[
				{
					"SecID":"A01",
					"Instructor":"Tom",
					"Days" : "MWF",
					"Location": "Armes 200",
					"Labs":[
						{
							"LabID":"B01",
							"Instructor":"Green",
							"Days" : "F",
							"Location": "Armes 100"
						},
						{
							"LabID":"B02",
							"Instructor":"Red",
							"Days" : "M",
							"Location": "Machray 100"
						}

					]
				}
			],
			//to allow main data table to search through nested datatable sections
			"Days":["MWF","TTH"],
			"Location":["Armes 200", "E2 110"],
			"Instructor":["Tom","Paul"]

		},

		{
			"CourseID":"COMP1260",
			"CourseName":"Computer Usage",
			"CreditHours":"3",
			"Faculty":"Science",
			"Department":"Computer Science",
			"Prerequisites":"None",
			"Sections":[
				{
					"SecID":"A01",
					"Instructor":"John",
					"Days" : "TTH",
					"Location": "E2 400"
				},
				{
					"SecID":"A02",
					"Instructor":"Paul",
					"Days" : "TTH",
					"Location": "E2 110"
				}
			],
			//to allow main data table to search through nested datatable sections
			"Days":["TTH"],
			"Location":["E2 400"],
			"Instructor":["John"]


		},
		{
			"CourseID":"COMP2160",
			"CourseName":"Data Structures",
			"CreditHours":"3",
			"Faculty":"Science",
			"Department":"Computer Science",
			"Prerequisites":"COMP1010",
			"Sections":[
				{
					"SecID":"A01",
					"Instructor":"John",
					"Days" : "MWF",
					"Location": "E2 100",
					"Labs":[
						{
							"LabID":"B01",
							"Instructor":"Mark",
							"Days" : "W",
							"Location": "Tier 404"
						},
						{
							"LabID":"B02",
							"Instructor":"Lee",
							"Days" : "W",
							"Location": "Tier 304"
						}

					]
				},
				{
					"SecID":"A02",
					"Instructor":"Smith",
					"Days" : "MWF",
					"Location": "Tier 340",
					"Labs":[
						{
							"LabID":"B03",
							"Instructor":"Alex",
							"Days" : "TH",
							"Location": "EDU 131"
						},
						{
							"LabID":"B04",
							"Instructor":"Lee",
							"Days" : "T",
							"Location": "EDU 112"
						}

					]
				},
				{
					"SecID":"A03",
					"Instructor":"Allan",
					"Days" : "TTH",
					"Location": "E2 303",
					"Labs":[
						{
							"LabID":"B05",
							"Instructor":"Josh",
							"Days" : "W",
							"Location": "EITC 101"
						}

					]
				}
			],
			//to allow main data table to search through nested datatable sections
			"Days":["MWF","TTH"],
			"Location":["E2 100", "Tier 340", "E2 303"],
			"Instructor":["John","Smith","Allan"]
		}

	]

};


var secDict = new Object();

function getCourseIndex(courseID){
	res=-1;
	for(i=0; i<mainTableJson["courses"].length; i++)
	{
		if (mainTableJson["courses"][i]["CourseID"]==courseID)
		{
			res=i;
			break
		}

	}

	return res
}


function fillLabTable(courseID, secID, rowIndex){
	courseIndex=getCourseIndex(courseID)

	$('table#'+courseID+secID).DataTable( {
		"data": mainTableJson["courses"][courseIndex]["Sections"][rowIndex]["Labs"],
		"columnDefs": [
			{ className: "dt-center", "targets": ["_all"] }
		],
		"columns": [

			{
				"data": "LabID",
				"title": "Lab ID"
			},
			{
				"data": "Instructor",
				"title": "Instructor"
			},
			{
				"data": "Days",
				"title": "Days"
			},
			{
				"data": "Location",
				"title": "Location"
			},

			{
				"data":"LabID",
				"title":"",
				"orderable": false,
				"render": function(data){
					return '<button	 id="enrollButton_' + (courseID+secID+data)+'" onclick=handleEnroll("'+courseID+"_"+secID+"_"+data+'") > Enroll </button>'
				}
			}

		],
		"bPaginate":false,
		"bInfo":false,
		"bFilter":false,
		"processing": true
	} );

}

function handleEnroll(asd)
{
	alert("Enrolled for " + asd.split('_'));
}

function hasLabs(rowIndex)
{
	res=false;
	for(i=0; i<mainTableJson["courses"][rowIndex]["Sections"].length; i++)
	{
		if ("Labs" in mainTableJson["courses"][rowIndex]["Sections"][i])
		{
			res=true;
			break;
		}
	}
	return res
}

function fillSecTable(courseID, rowIndex){
	if (hasLabs(rowIndex))
	{

		st=$('table#'+courseID).DataTable( {
			"data": mainTableJson["courses"][rowIndex]["Sections"],
			"columnDefs": [
				{ className: "dt-center", "targets": ["_all"] }
			],
			"columns": [
				{
					"className": "expand",
					"orderable": false,
					"data": null,
					"defaultContent": ""
				},
				{
					"data": "SecID",
					"title": "Section"
				},
				{
					"data": "Instructor",
					"title": "Instructor"
				},
				{
					"data":"Days",
					"title":"Days"
				},
				{
					"data":"Location",
					"title":"Location"
				}

			],
			"bPaginate":false,
			"bInfo":false,
			"bFilter":false,
			"processing": true
		} );

		secDict[courseID]=st

		$('table#'+courseID+ ' tbody').on('click', 'tr', function () {
			var tr = $(this).closest('tr');
			var row = secDict[courseID].row( tr );

			if (row.data()){
				if ( row.child.isShown() ) {
					row.child("").hide();
					tr.removeClass('shown');
				}
				else {
					row.child("").show();

					row.child(createLabTable(courseID+ row.data().SecID)).show();
					fillLabTable(courseID, row.data().SecID, row.index());
					tr.addClass('shown');

				}
			}
		});
	}

	else
	{

		st=$('table#'+courseID).DataTable( {
			"data": mainTableJson["courses"][rowIndex]["Sections"],
			"columnDefs": [
				{ className: "dt-center", "targets": ["_all"] }
			],
			"columns": [
				{
					"data": "SecID",
					"title": "Section"
				},
				{
					"data": "Instructor",
					"title": "Instructor"
				},
				{
					"data":"Days",
					"title":"Days"
				},
				{
					"data":"Location",
					"title":"Location"
				},
				{
					"data":"SecID",
					"title":"",
					"orderable": false,
					"render": function(data){
						return '<button	 id="enrollButton_' + (courseID+data)+'" onclick=handleEnroll("'+courseID+"_"+data+'") > Enroll </button>'
					}
				}


			],
			"bPaginate":false,
			"bInfo":false,
			"bFilter":false,
			"processing": true
		} );

		secDict[courseID]=st
	}
}


function nestedDT()
{

	mainDT=$('#mainTable').DataTable({
		"data": mainTableJson["courses"],
		"columnDefs": [
			{ className: "dt-center", "targets": ["_all"] }
		],
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
				"title": "Faculty"
			},
			{
				"data": "Department",
				"title": "Department"
			},
			{
				"data": "Prerequisites",
				"title": "Prerequisites(s)",
				"bSearchable": false
			},
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
			}


		],
		"order": [[1, 'asc']]//ascending order on second column(CourseID)
	});

	$('#mainTable tbody').on('click', 'tr', function () {
		var tr = $(this).closest('tr');
		var row = mainDT.row( tr );

		if (row.data()){


			if ( row.child.isShown() ) {
				row.child("").hide();
				tr.removeClass('shown');
			}
			else {

				row.child(createSecTable(row.data().CourseID)).show();
				fillSecTable(row.data().CourseID, row.index());
				tr.addClass('shown');

			}
		}
	});
}

function createSecTable (courseID) {
	var retVal="";

	retVal=retVal+'<table id="'+ courseID +'" width="90%" class="hover" style="margin-left:50px">';

	retVal=retVal+'</table>';

	return retVal;
}

function createLabTable (courseSecID) {
	var retVal="";

	retVal=retVal+'<table id="'+ courseSecID +'" width="90%" class="cell-border" style="margin-left:125px">';

	retVal=retVal+'</table>';

	return retVal;
}