function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

let user = getCookie("username");
if(user != "") {
    // alert("Welcome again " + user);
    document.getElementById("userLogged").innerHTML = user;
    document.getElementById("userVal").value = user;
    // window.location.replace("http://127.0.0.1:5500/getstarted.html");

} else {
    var loginButton = document.getElementById("btn_login");

    loginButton.addEventListener("click", function(){
    // e.preventDefault;
    user = new Array(document.getElementById("username").value); // add trim().toUpperCase()
    if( user != "" && user!=null) {
        setCookie("username", user, 30);
    }
  //  window.location.replace("http://127.0.0.1:5500/getstarted.html");        
      window.location.href='getstarted.html';
    })
    
}

let localWeight = {
    Female:{
        fiveZero: 100,
        dailyCalories: 2000
    },
    Male:{
        fiveZero: 100,
        dailyCalories: 2500
    }
}
// Creat table to show 

let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

document.getElementById('displayTable').appendChild(table);

// Creating and adding data to first row of the table
let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Day";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "Calories";


row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
// row_1.appendChild(heading_3);
thead.appendChild(row_1);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var saveUserBtn = document.getElementById("saveUserInfo");


/**************************** */
const CardInfo1 =document.querySelector(".CardInfo1"); /*** */
const CardInfo2 =document.querySelector(".CardInfo2"); /*** */
const CardInfo3 =document.querySelector(".CardInfo3"); /*** */


saveUserBtn.addEventListener("click", (e) => {
e.preventDefault();


    CardInfo1.classList.remove('hidden'); /*** */
    CardInfo2.classList.remove('hidden'); /*** */
    CardInfo3.classList.remove('hidden'); /*** */

    searchInput.removeAttribute("disabled");/*** */



    var userGender = document.getElementById("userGender").value;
    var timeLine = document.getElementById("timeLine").value;
    var userHeight = document.getElementById("userHeight").value;
    var userWeight = document.getElementById("weight").value;
    var userGoalWeight = document.getElementById("goal_weight").value;

    // Store
    localStorage.setItem("user", user);
    localStorage.setItem("gender", userGender);
    localStorage.setItem("timeline", timeLine);
    localStorage.setItem("height", userHeight);
    localStorage.setItem("weight", userWeight);
    localStorage.setItem("user_goal_weight", userGoalWeight);


    document.getElementById("showUserWeight").innerHTML = userWeight;
    document.getElementById("showUserGoalWeight").innerHTML = userGoalWeight;
    document.getElementById("show_day").innerHTML = timeLine;

    if(parseInt(userWeight) < parseInt(userGoalWeight)){
        var totalLoose = userWeight - userGoalWeight;

        var query = document.getElementById("sql");
        query.classList.add("loose");
        var num = (3500 * totalLoose) / timeLine;
        var roundNum = Math.round((num + Number.EPSILON) * 100) / 100
        query.innerHTML = "Loose: "+ numberWithCommas(roundNum) + " Calories";
        for(let i=0;i < timeLine;i++)
        {
            var Dailynum = num / timeLine;
            var roundDailyCal = Math.round((Dailynum + Number.EPSILON) * 100) / 100;
            let row_2 = document.createElement('tr');
            let row_2_data_1 = document.createElement('td');
            row_2_data_1.innerHTML = "Day"+[i];
            let row_2_data_2 = document.createElement('td');
            row_2_data_2.innerHTML = numberWithCommas(roundDailyCal);
        
            row_2.appendChild(row_2_data_1);
            row_2.appendChild(row_2_data_2);
            tbody.appendChild(row_2);
        }

    }else{
        var totalLoose = userGoalWeight - userWeight;

        var query = document.getElementById("sql");
        query.classList.add("gain");
        var num = (3500 * totalLoose) / timeLine;
        var roundNum = Math.round((num + Number.EPSILON) * 100) / 100
        query.innerHTML = "Gain: "+ numberWithCommas(roundNum) + " Calories";
        document.querySelector('.show_badg').classList.remove('hidden'); /*** */
        document.getElementById('daysTable').classList.remove('hidden');

        for(let i=0;i < timeLine;i++)
        {
            var Dailynum = num / timeLine;
            var roundDailyCal = Math.round((Dailynum + Number.EPSILON) * 100) / 100;
            let row_2 = document.createElement('tr');
            let row_2_data_1 = document.createElement('td');
            row_2_data_1.innerHTML = "Day"+[i];
            let row_2_data_2 = document.createElement('td');
            row_2_data_2.innerHTML = numberWithCommas(roundDailyCal);
        
            row_2.appendChild(row_2_data_1);
            row_2.appendChild(row_2_data_2);
            tbody.appendChild(row_2);
        }
        
    }

    var strGender = localStorage.getItem("gender");
    var strHeight = localStorage.getItem("height");

    if(strGender == "Male"){

        localStorage.setItem("daily", localWeight.Male.dailyCalories);
        // document.getElementById("tbDaily").innerHTML = localWeight.Male.dailyCalories;
        if(userHeight == "5'1" ){

            if(strHeight == localWeight.Male.fiveOne){

                localStorage.setItem("loose_weight", 0);
                localStorage.setItem("gain_weight", 0);

            }else if(strHeight < localWeight.Male.fiveOne){

                var totalWeight = localWeight.Male.fiveOne - strHeight;
                localStorage.setItem("loose_weight", 0);
                localStorage.setItem("gain_weight", totalWeight);


            }else if(strHeight > localWeight.Male.fiveOne){

                var totalWeight = strHeight - localWeight.Male.fiveZero;
                localStorage.setItem("loose_weight", totalWeight);
                localStorage.setItem("gain_weight", 0);
            }

        }

    }else if(strGender == "Female") {
        localStorage.setItem("daily", localWeight.Female.dailyCalories);
        // document.getElementById("tbDaily").innerHTML = localWeight.Male.dailyCalories;
        if(userHeight == "5'0" ){

            if(strHeight == localWeight.Female.fiveZero){

                localStorage.setItem("loose_weight", 0);
                localStorage.setItem("gain_weight", 0);

            }else if(strHeight < localWeight.Female.fiveZero){

                var totalWeight = localWeight.Female.fiveOne - strHeight;
                localStorage.setItem("loose_weight", 0);
                localStorage.setItem("gain_weight", totalWeight);


            }else if(strHeight > localWeight.Female.fiveZero){

                var totalWeight = strHeight - localWeight.Female.fiveZero;
                localStorage.setItem("loose_weight", totalWeight);
                localStorage.setItem("gain_weight", 0);
            }

        }

    }else{

    }

})
//   Get Data
var goalWeightStr = localStorage.getItem("user_goal_weight");
var weightStr = localStorage.getItem("weight");

document.getElementById("showUserWeight").innerHTML = weightStr;
var dayToShow = localStorage.getItem("timeline");
if(dayToShow > 1){
    document.getElementById("show_day").innerHTML = dayToShow+" days";
}else{
    document.getElementById("show_day").innerHTML = dayToShow+" day";
}
    document.getElementById("showUserGoalWeight").innerHTML = goalWeightStr;

if(parseInt(goalWeightStr) < parseInt(weightStr)){

    CardInfo1.classList.remove('hidden'); /*** */
    CardInfo2.classList.remove('hidden'); /*** */
    CardInfo3.classList.remove('hidden'); /*** */

    searchInput.removeAttribute("disabled");/*** */
    document.getElementById('daysTable').classList.remove('hidden');

    var totalLoose = weightStr - goalWeightStr;

    var query = document.getElementById("sql");
    var dailyLosCal = document.createElement('span');
    dailyLosCal.className = "loose";
    query.classList.add("loose");
    var num = (3500 * totalLoose) / dayToShow;
    var roundNum = Math.round((num + Number.EPSILON) * 100) / 100;
    query.innerHTML = "Loose: "+ numberWithCommas(roundNum) + " Calories";

    for(let i=0;i < dayToShow;i++)
    {
        var Dailynum = num / dayToShow;
        var roundDailyCal = Math.round((Dailynum + Number.EPSILON) * 100) / 100;
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "Day"+[i];
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = numberWithCommas(roundDailyCal);
    
        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        tbody.appendChild(row_2);
    }
}else {

    CardInfo1.classList.remove('hidden'); /*** */
    CardInfo2.classList.remove('hidden'); /*** */
    CardInfo3.classList.remove('hidden'); /*** */
    document.querySelector('.show_badg').classList.remove('hidden'); /*** */
    document.getElementById('daysTable').classList.remove('hidden');
    
    searchInput.removeAttribute("disabled");/*** */

    var totalLoose = goalWeightStr - weightStr;
    var query = document.getElementById("sql");
    query.classList.add("gain");
    var num = (3500 * totalLoose) / dayToShow;
    var roundNum = Math.round((num + Number.EPSILON) * 100) / 100
    var strDaily = localStorage.getItem("totalCalories");
    var dailyCalCal = Math.round((strDaily + Number.EPSILON) * 100) / 100;
    query.innerHTML = "Gain: "+ numberWithCommas(roundNum) + " Calories";
    document.querySelector("#dayConsumedCalories").innerHTML = numberWithCommas(strDaily) ;

    // Creating and adding data to second row of the table

    for(let i=0;i < dayToShow;i++)
    {
        var Dailynum = num / dayToShow;
        var roundDailyCal = Math.round((Dailynum + Number.EPSILON) * 100) / 100;
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "Day"+[i];
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = numberWithCommas(roundDailyCal);
    
        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        tbody.appendChild(row_2);
    }
}
