$(document).ready(function(){
    $(function() {
        $('#datetimepicker_end_datetime').datetimepicker();
        $('#datetimepicker_start_datetime').datetimepicker(); 
        $('#history_end_datetime').datetimepicker();
        $('#history_start_datetime').datetimepicker();
        $('#map-view-tab').attr('style', 'color: white !important');
        $('#table-view-tab').attr('style', 'color: grey !important');
        

        $('#real-time-btn').click(function(){
            $('#real-time-canvas').css('display','');
            $('#history-canvas').css('display','none');
            $('#history_datetime_filters').css('display','none');
            $(this).addClass('active');
            $('#history-btn').removeClass('active');
            $('#clear_live_data_row').css('display','');
        });

        $('.clear_live_data_refresh').click(function(){
            $(this).addClass('glyphicon-remove');
            $(this).removeClass('glyphicon-refresh');
            //Clear live line data - refresh icon
            if(removeTIM_BSM_SPAT_MAP_data_live_line())
            {
                $('.clear_live_data_refresh').removeClass('glyphicon-remove');
                $('.clear_live_data_refresh').addClass('glyphicon-refresh');
            }

        });

        $('#history-btn').click(function(){
            $('#real-time-canvas').css('display','none');
            $('#history-canvas').css('display','');
            $('#history_datetime_filters').css('display','');
            $(this).addClass('active');
            $('#real-time-btn').removeClass('active');
            $('#clear_live_data_row').css('display','none');
        });
        
        //
        $('#map-view-tab').click(function(){
            $(this).attr('style', 'color: white !important');
            $('#map-view').css('display','');
            $('#table-view').css('display','none');
            $('#table-view-tab').css('color','white');
            $('#table-view-tab').attr('style', 'color: grey !important');
        });
        
        $('#table-view-tab').click(function(){
            $(this).attr('style', 'color: white !important');
            $('#table-view').css('display','');
            $('#map-view').css('display','none');
            $('#map-view-tab').css('color','white');
            $('#map-view-tab').attr('style', 'color: grey !important');
        });

    });


    //table filters
    $("#table_filter_search").on('click', function() {
    
       let datetimepicker_start_datetime_str = $("#datetimepicker_start_datetime").val();
       let datetimepicker_end_datetime_str = $("#datetimepicker_end_datetime").val();
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
                    <td>${fields["message_type"]||""}</td>
                    <td>${fields["timestamp"]||""}</td>
                    <td>${fields["payload"]||""}</td>
                    <td>${fields["original_message"]||""}</td>
                    </tr>`
                )
        })
           
        }
       
    });

});


 });
