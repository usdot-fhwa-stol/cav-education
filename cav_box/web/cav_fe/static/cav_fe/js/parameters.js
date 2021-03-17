var INTERVAL_SECS = 1;//live data axes seconds
var MAX_LIVE_DATASETS_LENGTH = 30;
var timeFormat = 'MM/DD/YYYY HH:mm';
var color= Chart.helpers.color;
var BSMLiveLineIndex = 0;
var MAPLiveLineIndex = 1;
var SPATLiveLineIndex = 2;
var TIMLiveLineIndex = 3;

var BSMLiveCount = 0;
var TIMLiveCount = 0;
var SPATLiveCount = 0;
var MAPLiveCount = 0;

var BSMHistoryLineIndex = 0;
var MAPHistoryLineIndex = 1;
var SPATHistoryLineIndex = 2;
var TIMHistoryLineIndex = 3;


var ColorStr = {
    Orange: '#ffbf00',
    Blue: '#3FB1CE',
    Green: '#80ff00',
    Red: '#ff0000'

}