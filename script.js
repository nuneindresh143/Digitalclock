const selectmenu = document.querySelectorAll("select");
let setalarmbtn = document.querySelector("button");
let content = document.querySelector(".content")
let alarmtime,isAlarmSet = false,
ringtone = new Audio("ringtone.mp3");
const formatswitchbtn =document.querySelector('.format-switch-btn');
 formatswitchbtn.addEventListener("click",() =>
{
    formatswitchbtn.classList.toggle("active")
    let formatvalue = formatswitchbtn.getAttribute("data-format");
    if(formatvalue=="12")
    {
        formatswitchbtn.setAttribute("data-format","24");
    }
    else
    {
        formatswitchbtn.setAttribute("data-format","12");
    }
});
function clock()
{
    let today = new Date();
    let hours= today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let period = "AM";
    if(hours>=12)
    {
        period="PM";
    }
    let formatvalue = formatswitchbtn.getAttribute("data-format");
    if(formatvalue=="12")
    {
        hours=hours>12?hours%12:hours;
    }
    if(hours<10)
    {
        hours="0"+hours;
    }
    if(minutes<10)
    {
        minutes="0"+minutes;
    }
    if(seconds<10)
    {
        seconds="0"+seconds;
    }  
    document.querySelector(".hours").innerHTML=hours;
    document.querySelector(".minutes").innerHTML=minutes;
    document.querySelector(".seconds").innerHTML=seconds;
    document.querySelector(".period").innerHTML=period;
    currenttime = `${hours}:${minutes} ${seconds} ${period}`;
    if(alarmtime == `${hours}:${minutes} ${period}`)
    {
        ringtone.play();
        ringtone.loop = true;
    }
}
let updateclock=setInterval(clock, 1000);
let today = new Date();
const daynumber = today.getDate();
const year = today.getFullYear();
const dayname = today.toLocaleString("default",{weekday:"long"});
const monthname = today.toLocaleString("default",{month:"short"});
document.querySelector(".month-name").innerHTML=monthname;
document.querySelector(".day-name").innerHTML=dayname;
document.querySelector(".day-number").innerHTML=daynumber;
document.querySelector(".year").innerHTML=year;
const dotmenubtn = document.querySelector(".dot-menu-btn");
const dotmenu = document.querySelector(".dot-menu");
dotmenubtn.addEventListener("click",()=>{
    dotmenu.classList.toggle("active");
});
document.addEventListener("click",(e)=>{
    if(e.target.id !== "active-menu")
    {
        dotmenu.classList.remove("active");
    }
});
for(let i=12;i>0;i--)
{
    i=i<10?"0"+i:i;
    let option = `<option value="${i}">${i}</option>`
    selectmenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--)
{
    i=i<10?"0"+i:i;
    let option = `<option value="${i}">${i}</option>`
    selectmenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--)
{
    let ampm = i ==1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`
    selectmenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
function setalarm()
{
    if(isAlarmSet)
    {
        alarmtime="";
        ringtone.pause();
        content.classList.remove("disable");
        setalarmbtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time =`${selectmenu[0].value}:${selectmenu[1].value} ${selectmenu[2].value}`;
    if(time.includes("Hour")||time.includes("Minutes")||time.includes("AM/PM"))
    {
        return alert("Please, select a valid time to set alarm");
    }
    isAlarmSet = true;
    alarmtime = time;
    content.classList.add("disable");
    setalarmbtn.innerText = "Clear Alarm";
}
setalarmbtn.addEventListener("click",setalarm);