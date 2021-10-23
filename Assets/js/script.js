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
    // window.location.replace("http://127.0.0.1:5500/getstarted.html");

  } else {
      var loginButton = document.getElementById("btn_login");

      loginButton.addEventListener("click", function(){
        // e.preventDefault;
        user = document.getElementById("username").value;
        if( user != "" && user!=null) {
            setCookie("username", user, 30);
        }
        window.location.replace("http://127.0.0.1:5500/getstarted.html");
      })
      
  }