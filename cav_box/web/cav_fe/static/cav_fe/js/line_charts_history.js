var config_history = {
	type: 'line',
	data: {
		labels: [ ],
		datasets: 
		[]
	},
	options: {
		title: {
			text: 'Messages Line Chart'
		},
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					parser: timeFormat,
					round: 'minute',
					unit: 'minute',
					tooltipFormat: 'll HH:mm',
					stepSize: 5,
					displayFormats: {
						'millisecond': 'MMM DD',
						'second': 'DD/MM HH:mm:ss',
						'minute': 'DD/MM HH:mm',
						'hour': 'MMM DD',
						'day': 'MMM DD',
						'week': 'MMM DD',
						'month': 'MMM DD',
						'quarter': 'MMM DD',
						'year': 'MMM DD',
					}
				},
				scaleLabel: {
					display: true,
					labelString: 'Date Time (1 Min per count, X-axis unit of 5 Mins)'
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Message Count',
					stepSize: 10
				}
			}]
		},
	}
};

$('#history-btn').click(function(){
	var ctx = document.getElementById('history-canvas').getContext('2d');
	window.myLineHistory = new Chart(ctx, config_history);
});

	//addDataset for both live_lines and history_line
	var colorNames = Object.keys(window.chartColors);
	document.getElementById('inlineCheckboxBSM').addEventListener('click', function() {
		//add line
		if($(this).prop("checked")){
			addHistoryLine(this);
		}else{
			//remove line
		    removeArryElementbyName(config_history.data.datasets, "BasicSafetyMessage");
		}
		if(window.myLineHistory!=null && window.myLineHistory!='undefined')
			window.myLineHistory.update();
	});

	document.getElementById('inlineCheckboxMAP').addEventListener('click', function() {

		//add line
		if($(this).prop("checked")){
			addHistoryLine(this);

		}else{
			//remove line
		    removeArryElementbyName(config_history.data.datasets, "MAP");
		}
		if(window.myLineHistory!=null && window.myLineHistory!='undefined')
			window.myLineHistory.update();
	});

	document.getElementById('inlineCheckboxSPAT').addEventListener('click', function() {

		//add line
		if($(this).prop("checked")){
			addHistoryLine(this);
		}else{
			//remove line
		    removeArryElementbyName(config_history.data.datasets, "SPAT");
		}
		
		if(window.myLineHistory!=null && window.myLineHistory!='undefined')
			window.myLineHistory.update();
	});

	document.getElementById('inlineCheckboxTIM').addEventListener('click', function() {

		//add line
		if($(this).prop("checked")){
			addHistoryLine(this);
		}else{
			//remove line
		    removeArryElementbyName(config_history.data.datasets, "TIM");
		}

		//Apply changes to window dom
		if(window.myLineHistory!=null && window.myLineHistory!='undefined')
			window.myLineHistory.update();
	});


function addHistoryLine(checkbox)
{
    var colorName = colorNames[config_history.data.datasets.length % colorNames.length];
        var newColor = window.chartColors[colorName];
        var newDataset = {
            label: checkbox.value + (config_history.data.datasets.length ),
            borderColor: newColor,
            backgroundColor: color(newColor).alpha(0.5).rgbString(),
            data: [],
        };
        config_history.data.datasets.push(newDataset);
}

function addTIM_SPAT_MAP_BSM_history_lines()
{
    let checkboxes = document.getElementsByName('messageTypeCheckbox');
    checkboxes.forEach(checkbox=>{
        addHistoryLine(checkbox);
    });
}


    //Line history charts
    document.getElementById('search_history_graph_data').addEventListener('click', function() {

       let history_start_datetime_str = $("#history_start_datetime").val();
       let history_end_datetime_str = $("#history_end_datetime").val();
       let message_type_boxes = document.getElementsByName('messageTypeCheckbox');
       let filter_msg_type = '';
       let message_type_array = [];
       message_type_boxes.forEach(elem=>{
            if($(elem).prop('checked'))
            {
               message_type_array.push(elem.value) ;
            }
       });
       filter_msg_type = message_type_array.toString(); //generate comma separated variables
       console.log(filter_msg_type);

       if(history_end_datetime_str.length==0 || history_start_datetime_str.length==0 || filter_msg_type.length ==0)
       {
           alert("message type ,start and end date are required");
           return;
       }

        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        const csrftoken = getCookie('csrftoken');

        $.post( "post/ajax/message_filters",
        {
            'datetimepicker_start_datetime_str': history_start_datetime_str,
            'datetimepicker_end_datetime_str': history_end_datetime_str ,
            'filter_msg_type': filter_msg_type,
            'csrfmiddlewaretoken': csrftoken

        },
        function(data,success){
            console.log(data);
            console.log(success);

            //remove data from all different message history lines
            removeTIM_BSM_SPAT_MAP_data_history_line();
            if(window.myLineHistory!=null && window.myLineHistory!='undefined')
                window.myLineHistory.update();

            if(data!=null && data.length>0){
                //load data count to hsitory line
                addDataToHistoryLine(data);

				if(window.myLineHistory!=null && window.myLineHistory!='undefined')
					window.myLineHistory.update();
            }
        });
    });

    //remove data
    function removeTIM_BSM_SPAT_MAP_data_history_line()
    {
         //remove data from all different message history lines
         removeArryElementDatabyName(config_history.data.datasets, "TIM");
         removeArryElementDatabyName(config_history.data.datasets, "SPAT");
         removeArryElementDatabyName(config_history.data.datasets, "BasicSafetyMessage");
         removeArryElementDatabyName(config_history.data.datasets, "MAP");
    }

	//add data
	function addDataToHistoryLine(historyData)
	{
	        let history_start_datetime_sr = document.getElementById("history_start_datetime").value;
	        let history_end_datetime_sr = document.getElementById("history_end_datetime").value;

			let history_start_datetime = new Date(history_start_datetime_sr);
			let history_end_datetime = new Date(history_end_datetime_sr);

	        if(history_end_datetime_sr!=null && history_end_datetime_sr.length > 0 && history_end_datetime_sr.includes("PM"))
	        {
                history_start_datetime = history_start_datetime.setHours(history_start_datetime.getHours()+ 12);
                console.log("history_start_datetime: " + history_start_datetime);
                console.log("history_start_datetime_sr: " + history_start_datetime_sr);
	        }

	        if(history_end_datetime_sr!=null && history_end_datetime_sr.length > 0 && history_end_datetime_sr.includes("PM"))
	        {
                history_end_datetime = history_end_datetime.setHours(history_end_datetime.getHours()+ 12);
                console.log("history_end_datetime: " + history_end_datetime);
	        }
			let Axes_total_seconds = (history_end_datetime-history_start_datetime)/1000;
			let Axes_total_minutess = Axes_total_seconds / 60;
			let Axes_total_hours = Axes_total_minutess / 60;

			if (config_history.data.datasets.length > 0) 
			{
                    //remove y-axis data
                    removeTIM_BSM_SPAT_MAP_data_history_line();
                    //remove x-axis data
                    config_history.data.labels=[];

					//Add data 
                    console.log("data labels length: "+config_history.data.labels.length)
					console.log(Axes_total_minutess + " Total minutes counted");

					//1 minute per count
					let history_step_datetime = history_start_datetime_sr;
					for (var i=0 ;i<Axes_total_minutess;i++)
					{
						//calculate count within one minutes from the history_step_datetime
						let count = countHistoryDataByDatetimeRange(historyData,"BasicSafetyMessage" ,moment(history_step_datetime).toDate(), moment(history_step_datetime).add(1, 'm').toDate());
                        updateArryElementDataCountbyName(config_history.data.datasets,"BasicSafetyMessage",count);

                        count = countHistoryDataByDatetimeRange(historyData,"TIM" ,moment(history_step_datetime).toDate(), moment(history_step_datetime).add(1, 'm').toDate());
                        updateArryElementDataCountbyName(config_history.data.datasets,"TIM",count);

                        count = countHistoryDataByDatetimeRange(historyData,"SPAT" ,moment(history_step_datetime).toDate(), moment(history_step_datetime).add(1, 'm').toDate());
                        updateArryElementDataCountbyName(config_history.data.datasets,"SPAT",count);

                        count = countHistoryDataByDatetimeRange(historyData,"MAP" ,moment(history_step_datetime).toDate(), moment(history_step_datetime).add(1, 'm').toDate());
                        updateArryElementDataCountbyName(config_history.data.datasets,"MAP",count);

						history_step_datetime = moment(history_step_datetime).add(1, 'm').toDate();

                        //update x-axis
                        console.log("data labels length: "+config_history.data.labels.length)
                        config_history.data.labels.push(history_step_datetime);
					}
			}
    }

function countHistoryDataByDatetimeRange(historyData,message_type,startDatetime, endDatetime)
{
    let count = 0;
    if(historyData!=null && historyData.length>0){
        historyData.forEach(incomming_dsrc_message=>{
               if(startDatetime <= moment(incomming_dsrc_message["fields"]["timestamp"])
                 && endDatetime >= moment(incomming_dsrc_message["fields"]["timestamp"])
                 && message_type == incomming_dsrc_message["fields"]["message_type"])
                 {
                    count++;
                    console.log(count);
                 }
        });
    }

    return count;
}


$(document).ready(function(){
    //add all lines
    if($('#inlineCheckboxTIM').prop("checked") && $('#inlineCheckboxBSM').prop("checked")
        && $('#inlineCheckboxSPAT').prop("checked") && $('#inlineCheckboxMAP').prop("checked"))
    {

        //defined in line_charts_history.js
        addTIM_SPAT_MAP_BSM_history_lines();
        if(window.myLineHistory!=null && window.myLineHistory!='undefined')
        window.myLineHistory.update();
    }
})