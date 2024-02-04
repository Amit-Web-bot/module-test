
let val =  sessionStorage.getItem('ip');
console.log(val)
document.getElementById("cont2").innerHTML = `Your current Ip Address is <b>${val}</b>`

document.getElementById("nxtpg").addEventListener("click",(event)=>{
    window.location.href= "/detail.html"
})
//console.log(dang)
//let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
