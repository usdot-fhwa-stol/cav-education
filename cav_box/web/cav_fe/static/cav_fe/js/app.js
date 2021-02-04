$(document).ready(function(){
    $(function() {
        $('#datetimepicker_end_datetime').datetimepicker();
        $('#datetimepicker_start_datetime').datetimepicker();
        $('#real-time-btn').click(function(){
            $('#real-time-canvas').css('display','');
            $('#history-canvas').css('display','none');
            $(this).addClass('active');
            $('#history-btn').removeClass('active');
        });
        $('#history-btn').click(function(){
            $('#real-time-canvas').css('display','none');
            $('#history-canvas').css('display','');
            $(this).addClass('active');
            $('#real-time-btn').removeClass('active');
        })
    });
});