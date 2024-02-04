let val =  sessionStorage.getItem('ip');

async function getData(val){
    try {
        let response =  await fetch(`https://ipapi.co/${val}/json/`)
        let data = await response.json()
        //console.log(data)
        let response2 = await fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
        let data2 = await response2.json()
        //console.log(data2)
        basicinfo(data.latitude, data.longitude,data.city, data.org, data.region, data.ip)
        getmap(data.latitude, data.longitude)
        let timezone_currtime = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });       
        //console.log((data2[0].PostOffice))
        sessionStorage.setItem("pin",`${data.postal}`)
        moreinfo(data.timezone,data.postal,timezone_currtime,data2[0].Message)
        postoffice(data2[0].PostOffice)
    } catch (error) {
        console.log(error)
    }    
}

getData(val)
document.getElementById("ip-id").innerHTML = `IP Address: <span>${val}</span>`

function basicinfo(lat, long, city, org, reg, host){
    let perntele = document.getElementById('div1')
    perntele.innerHTML = `<table><tr>
        <td> Lat:</td>
        <td>${lat}</td>
        <td> City:</td>
        <td> ${city}</td>
        <td>Organisation: </td>
        <td>${org}</td> 
    </tr>
    <tr>
        <td> Long:</td>
        <td>${long}</td>
        <td> Region:</td>
        <td> ${reg}</td>
        <td>HostName: </td>
        <td>${host}</td> 
    </tr></table>`
}

function getmap(lat,long){
    let partele = document.getElementById("div2")
    let childele = document.createElement('div')
    childele.innerHTML=`<iframe src="https://maps.google.com/maps?q=${lat},${long}&output=embed"></iframe>`
    partele.appendChild(childele)
}

function moreinfo(zone,pin,date,message){
    let parele = document.getElementById('div3')
    let childele = document.createElement('div')
    childele.innerHTML = `<p> Time Zone: <span>${zone}</span></p>
    <p> Date and Time: <span>${date}</span></p>
    <p> Pincode: <span>${pin}</span></p>
    <p> Message: <span>${message}</span></p>`

    parele.appendChild(childele)

}
function postoffice(data){
  //  let respo = Object.entries(data)
    let parele = document.getElementById("post")
    data.forEach(element => {
        let childele = document.createElement('div')
        childele.innerHTML = `<p> Name : ${element.Name}</p>
        <p> Branch Type : ${element.BranchType}</p>
        <p> Delivery Status : ${element.DeliveryStatus}</p>
        <p> District : ${element.District}</p>
        <p> Division : ${element.Division}</p>`
        parele.appendChild(childele)       
    });
}

let pin = sessionStorage.getItem("pin")

document.getElementById("search-btn").addEventListener("click",(e)=>{
        e.preventDefault()
        let term = document.getElementById("search").value
        search(pin,term)
})

async function search(pin, searchparam){
    let response2 = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
    let data2 = await response2.json()
    let searchResults = performSearch(searchparam, data2[0].PostOffice);
   // document.getElementById("post").innerHTML =""
    postoffice(searchResults)
}

function performSearch(term,data) {
    console.log(data.filter(item => item.Name.toLowerCase().includes(term)))
    return data.filter(item => item.Name.toLowerCase().includes(term));
}
//console.log(glob)