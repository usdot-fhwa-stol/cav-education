function newDate(days) {
    return moment().add(days, 'd').toDate();
}

function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
}

function newSec(secs) {
    return moment().add(secs, 'seconds').toDate();
}

function newMin(Mins) {
    console.log(moment().add(Mins, 'minutes').toDate());
    return moment().add(Mins, 'minutes').toDate();
}

function newHours(hours) {
    console.log(moment().add(hours, 'hours').toDate());
    return moment().add(hours, 'hours').toDate();
}

function current()
{
    return moment().format();
}
