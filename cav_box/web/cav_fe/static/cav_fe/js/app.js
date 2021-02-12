$(document).ready(function(){
    $(function() {
        $('#datetimepicker_end_datetime').datetimepicker();
        $('#datetimepicker_start_datetime').datetimepicker(); 
        $('#history_end_datetime').datetimepicker();
        $('#history_start_datetime').datetimepicker();
        $('#map-view-tab').css('background-color',' rgb(129, 129, 129)');
        

        $('#real-time-btn').click(function(){
            $('#graphMsgTypes').css('display','none');
            $('#real-time-canvas').css('display','');
            $('#history-canvas').css('display','none');
            $('#history_datetime_filters').css('display','none');
            $(this).addClass('active');
            $('#history-btn').removeClass('active');
        });

        $('#history-btn').click(function(){
            $('#graphMsgTypes').css('display','inline-block');
            $('#real-time-canvas').css('display','none');
            $('#history-canvas').css('display','');
            $('#history_datetime_filters').css('display','');
            $(this).addClass('active');
            $('#real-time-btn').removeClass('active'); 
        });
        
        //
        $('#map-view-tab').click(function(){
            // $(this).attr('style', 'color: black !important');
            $(this).css('background-color',' rgb(129, 129, 129)');
            $('#map-view').css('display','');
            $('#table-view').css('display','none');
            $('#table-view-tab').css('background-color','rgba(175, 175, 175, 0.877)');
            $('#table-view-tab').attr('style', 'color: white !important');
        });
        
        $('#table-view-tab').click(function(){
            // $(this).attr('style', 'color: black !important');
            $(this).css('background-color',' rgb(129, 129, 129)');
            $('#table-view').css('display','');
            $('#map-view').css('display','none');
            $('#map-view-tab').css('background-color','rgba(175, 175, 175, 0.877)');
            $('#map-view-tab').attr('style', 'color: white !important');
        });
    });

    //Line charts

    //table filters
    $("#table_filter_search").on('click', function() {
    
       let datetimepicker_start_datetime_str = $("#datetimepicker_start_datetime").val();
       let datetimepicker_end_datetime_str = $("#datetimepicker_end_datetime").val();
       let datetimepicker_start_datetime = new Date(datetimepicker_start_datetime_str);
       let datetimepicker_end_datetime = new Date(datetimepicker_end_datetime_str);
       let filter_msg_type = $("#filter_msg_type option:selected").val();

        
       if(datetimepicker_end_datetime_str.length==0 || datetimepicker_start_datetime_str.length==0)
       {
           alert("start and end date is required");
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
        'datetimepicker_start_datetime_str': datetimepicker_start_datetime_str,
        'datetimepicker_end_datetime_str': datetimepicker_end_datetime_str,
        'filter_msg_type': filter_msg_type,
        'csrfmiddlewaretoken': csrftoken
        
    },
    function(data,success){
        console.log(data);
        console.log(success);
        if(success)
            $("#message-table tbody").empty();
        
        if(success&& data !=null && data.length>0){

        data.forEach(function(instance){
            var fields = instance["fields"];
            console.log(fields);
            $("#message-table tbody").prepend(
                    `<tr>
                    <td>${fields["messageId"]||""}</td>
                    <td>${fields["value"]||""}</td>
                    <td>${fields["timestamp"]||""}</td>
                    <td>${fields["payload"]||""}</td>
                    </tr>`
                )
        })
           
        }
       
    });

});


 });
