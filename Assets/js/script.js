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
        user = new Array(document.getElementById("username").value);
        if( user != "" && user!=null) {
            setCookie("username", user, 30);
        }
        window.location.replace("http://127.0.0.1:5500/getstarted.html");
      })
      
  }
  
  let localWeight = {
    Female:{
        fiveZero: 100,
        fiveOne: 116,
        fiveTwo: 121,
        fiveThree: 127,
        fiveFour: 132,
        fiveFive: 138,
        fiveSix: 143,
        fiveSeven: 149,
        fiveHeight: 154,
        fiveNine: 160,
        fiveTen: 165,
        fiveEleven: 171,
        sixZero: 176,
        sixOne: 182,
        sixTwo: 187,
        sixThree: 193
    },
    Male:{
        fiveZero: 100,
        fiveOne: 190,
        fiveTwo: 190,
        fiveThree: 190,
        fiveFour: 190,
        fiveFive: 190,
        fiveSix: 190,
        fiveSeven: 190,
        fiveHeight: 190,
        fiveNine: 190,
        fiveTen: 190,
        fiveEleven: 190,
        sixZero: 190,
        sixOne: 190,
        sixTwo: 190,
        sixThree: 190
    }
}

var saveUserBtn = document.getElementById("saveUserInfo");

  saveUserBtn.addEventListener("click", () => {
    // e.preventDefault;

    var userGender = document.getElementById("userGender").value;
    var userHeight = document.getElementById("userHeight").value;
    var userWeight = document.getElementById("weight").value;
    var userGoalWeight = document.getElementById("goal_weight").value;

    // Store
    localStorage.setItem("user", user);
    localStorage.setItem("gender", userGender);
    localStorage.setItem("height", userHeight);
    localStorage.setItem("weight", userWeight);
    localStorage.setItem("user_goal_weight", userGoalWeight);

    if(userGender == "Male"){


        if(userHeight == "fiveZero" ){

            if(userWeight == localWeight.Male.fiveZero){

                // document.getElementById("loose_weight").innerHTML = "Loose: "+ 0 +" Calorie";
                // document.getElementById("gain_weight").innerHTML = "Gain: "+ 0 +" Calorie";
                localStorage.setItem("loose_weight", 0);
                localStorage.setItem("gain_weight", 0);

            }else if(userWeight < localWeight.Male.fiveZero){

                var totalWeight = localWeight.Female.fiveZero - userWeight;
                localStorage.setItem("loose_weight", 0);
                localStorage.setItem("gain_weight", totalWeight);


            }else if(userWeight > localWeight.Female.fiveZero){

                var totalWeight = userWeight - localWeight.Female.fiveZero;
                localStorage.setItem("loose_weight", totalWeight);
                localStorage.setItem("gain_weight", 0);
            }

        }

    }else if(userGender == "Female") {

        alert("Female");

    }else{
        
    }

  })

    //   Get Data
    document.getElementById("showUserWeight").innerHTML = localStorage.getItem("weight");
    document.getElementById("showUserGoalWeight").innerHTML = localStorage.getItem("user_goal_weight");
    document.getElementById("gain_weight").innerHTML = "Gain: "+ localStorage.getItem("gain_weight") +" Calories";
    document.getElementById("loose_weight").innerHTML = "Loose: "+ localStorage.getItem("loose_weight") +" Calories";
