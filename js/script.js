const form = document.getElementById('google__form');
const name = form.querySelector("input[name='name']");
const phone = form.querySelector("input[name='phone']");
const email = form.querySelector("input[name='email']");
const note = form.querySelector("input[name='note']");
const honeypotsome = form.querySelector("input[name='honeypotsome']");
const startTime = form.querySelector("input[name='startTime']");
const endTime = form.querySelector("input[name='endTime']");
const startDate = form.querySelector("input[name='startDate']");
const endDate = form.querySelector("input[name='endDate']");
const errorElement = document.getElementById('error');
const successElement = document.getElementById('success');
const question = form.querySelector("input[name='question']");

let startMeeting = new Date();
let endMeeting = new Date();
let qa;

function setTimeDefaultValues() {
    const startDay = startMeeting.getDate() < 10 ? "0" + startMeeting.getDate() : startMeeting.getDate();
    const endDay = endMeeting.getDate() < 10 ? "0" + endMeeting.getDate() : endMeeting.getDate();
    startDate.value = startMeeting.getFullYear() + "-0" + (startMeeting.getMonth()+1) + "-" + startDay;
    endDate.value = endMeeting.getFullYear() + "-0" + (endMeeting.getMonth()+1) + "-" + endDay;
    startMeeting.setHours(0,0);
    startTime.value = "12:00"
    endMeeting.setHours(0,0);
    endTime.value = "12:00";

}
setTimeDefaultValues();

function generateSpamProtectionQuestion(){
    qa = {
        "What color is the sky?": "blue",
        "Zebra is black and": "white",
        "Day is the opposite of": "night"
    }
    const values = Object.values(qa);
    const keys = Object.keys(qa);
    const randIndex = Math.floor(Math.random()*keys.length);
    const quest = keys[randIndex];
    const answer = values[randIndex];
    return [quest,answer];
}

const [antispamQuestion, antispamAnswer] = generateSpamProtectionQuestion();
question.setAttribute('placeholder', antispamQuestion);

startTime.addEventListener('change',function(ev){
    endTime.value = startTime.value;
});
startDate.addEventListener('change',function(ev){
    endDate.value = startDate.value;
});

form.addEventListener("submit", function(ev){
    ev.preventDefault();
    const errors = [];
    const numbers = /^\+?[0-9]+$/;
    if (name.value === '' || name.value == null) errors.push('Fill in name');
    if (phone.value === '' || phone.value == null) {
        errors.push('Fill in phone');
    } else if(!phone.value.trim().match(numbers)) {
        errors.push("Phone must be in correct format +11122444")
    }

    if (email.value === '' || email.value == null) errors.push('Fill in email');
    if (honeypotsome != null) errors.push('This filed should be left empty, its used as spam protection.');
    if (question.value !== antispamAnswer) errors.push("Prove you're human invalid.")
    if (startTime.value === '' || startTime.value == null || endTime.value === '' || endTime.value == null ||
        startDate.value === '' || startDate.value == null || endDate.value === '' || endDate.value == null) {
        errors.push("Fill in time and date")
    } else {
        const [startHour,startMinute] = startTime.value.split(':');
        const [endHour,endMinute] = endTime.value.split(':');

        const [startYear,startMonth,startDay] = startDate.value.split("-");
        const [endYear,endMonth,endDay] = endDate.value.split("-");

        startMeeting.setHours(startHour,startMinute);
        startMeeting.setFullYear(startYear,startMonth-1,startDay);

        endMeeting.setHours(endHour,endMinute);
        endMeeting.setFullYear(endYear,endMonth-1,endDay);

        if ((endMeeting.getTime() - startMeeting.getTime()) < 0) {
            errors.push("Start meeting time is before end meeting time.")
        } else if (((new Date()).getTime()  - startMeeting.getTime()) > 0) {
            errors.push("Start meeting time is in the past.")
        }

    }


    if(errors.length > 0) {
        errorElement.innerText = errors.join(', ');
        errorElement.classList.add('active');
        if (successElement.classList.contains('active')) successElement.classList.remove('active');
        return;
    }
    successElement.classList.add('active');
    if (errorElement.classList.contains('active')) errorElement.classList.remove('active');
    handleGoogleAuth();
});