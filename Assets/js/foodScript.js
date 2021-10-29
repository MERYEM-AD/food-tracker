 /***************** Declaration of variables :/*********** */

 //API variables:
 const applicationID ='6990414a';
 const apiKey='3d8ad9f35d2437370735cde7b888087b';//73f2989310d7983c9986662b0350079f	


 //catch div that show up weight of the user 
 const weightDataDiv=document.querySelector(".weightDataDiv");

// Search Form variables :
 const searchFormEl = document.querySelector('#search-form');
 let searchInput= document.querySelector('#search-input');

 //catch divs that show up food selected by the user 
 const foodItems= document.querySelector('.foodItems');
 const foodTable = document.querySelector(".FoodTable");
 //Declare an array that will catch only the total calories of the selected food by the user
 const totalCalories =[]; 

//catch the div that will include the confirm button
 const CofirmDiv_Btn=document.querySelector(".CofirmDiv_Btn");
  CofirmDiv_Btn.setAttribute("class","hidden");

  const choicesDiv_Btn = document.querySelector(".choicesDiv_Btn");

 const dayConsumedCalories = document.querySelector("#dayConsumedCalories");


 
const startOver = document.querySelector("#StartOver");
const lastUpdate = document.querySelector("#LastUpdate");

  


//
 searchFormEl.addEventListener('submit',function(event){
     event.preventDefault();
     

     let searchInputVal = document.querySelector('#search-input').value.trim().toUpperCase();

    let foodRequest ="https://api.edamam.com/api/recipes/v2?type=public&q="+searchInputVal+"&app_id="+applicationID+"&app_key="+apiKey;

   //  **** to do : add condition of fetch  
   foodItems.textContent=""; // to refresh the searched food


   if(!searchInputVal){

   $( "#emptyVl" ).dialog();

 return; // message

   }

   //fetching DATA


    fetch(foodRequest)
   .then(function(response){
    if(response.status === 404){

      $('#invalidFood').dialog();

      
      return;

      
    }else{


      DisplaySearchFoodList(foodRequest);
     
    }


   });

   searchInput.value =null;


 });


 function DisplaySearchFoodList(urlRequest){

  fetch(urlRequest)
  .then(function(response){
     return response.json();
  })
  .then( function(data){
  
    if(data.hits.length===0){

      $('#invalidFood').dialog();
    
      return;
    }
    else {

     // console.log(data.hits[0].recipe.dietLabels);


        for (let i=0;i<4;i++){ // we can Display 20 results

      
      
      //create HTML ELEMENTS : 

      const foodOption = document.createElement('div');

      const card = document.createElement('div');

      const cardImage = document.createElement('div');
      const foodImage = document.createElement('img');
      const foodname =  document.createElement('span');

      const cardContent = document.createElement('div');
      const calorieDescription = document.createElement('p');
      const dietLabelsDescription = document.createElement('p');
      const cuisineTypeDescription = document.createElement('p');

      
      

      const cardAction = document.createElement('div');
      const btnAdd = document.createElement('button');
      const addIcon = document.createElement('i');
      const link = document.createElement('a');

      

      ///////////////////************* set class *************/////////////////

      foodOption.setAttribute("class","foodOption row");

      card.setAttribute("class","card");

      cardImage.setAttribute("class","card-image");
      foodImage.setAttribute("src",data.hits[i].recipe.image);
      foodname.setAttribute("class","card-title");
      foodname.setAttribute("style","background-color: brown;padding: 0;width: 100%;text-align: center;font-size: 14px;")
      foodname.textContent=data.hits[i].recipe.label;


      cardContent.setAttribute("class","card-content descriptionCardContent");
      calorieDescription.textContent="Calories : "+(data.hits[i].recipe.calories).toFixed(2)+" Cl";
      dietLabelsDescription.textContent="   Diet :"+data.hits[i].recipe.dietLabels;
      cuisineTypeDescription.textContent= "Cuisine :"+data.hits[i].recipe.cuisineType;

      cardAction.setAttribute("class","card-action descriptionCardAction");

      btnAdd.setAttribute("class","btn-floating btn-Medium waves-effect waves-light red");
   


      addIcon.setAttribute("class","material-icons");
      addIcon.setAttribute("data-food",data.hits[i].recipe.label+"/******/"+(data.hits[i].recipe.calories).toFixed(2));
      addIcon.addEventListener('click',AddFood);
      addIcon.textContent="add";

      link.setAttribute("href",data.hits[i].recipe.url);
      link.setAttribute("target","_blank");
      link.textContent=" Read the recipe ";


 ///////////////////************* Append HTML ELMENTS *************/////////////////

      cardImage.append(foodImage);
      cardImage.append(foodname);
 
      
      card.append(cardImage);
      card.append(cardContent);
      card.append(cardAction);

   

      cardContent.append(calorieDescription);
      cardContent.append(dietLabelsDescription);
      cardContent.append(cuisineTypeDescription);

      btnAdd.append(addIcon);
      cardAction.append(link);
      cardAction.append(btnAdd);

      foodOption.append(card);
  
      foodItems.append(foodOption);
   


 }}
  });



 }




/******************** FoodTable******************** */

const confirmBtn = document.createElement("button");
confirmBtn.setAttribute("class","aves-effect waves-light btn-large btttn");
confirmBtn.setAttribute("style","width:100%");

confirmBtn.textContent ="Confirm";

 


 const foodTabbody= document.createElement("tbody"); // rassembleur

 const foodTotalCalories= document.createElement("thead");
 foodTotalCalories.setAttribute("id","totalCalories");
 foodTotalCalories.setAttribute("style","border:none;");
 const totalCaloriesRow =document.createElement("tr");
 const totalCaloriescolum =  document.createElement("th");
 const caloriesPlus =  document.createElement("th");
 const caloriesMinus =  document.createElement("th");
 totalCaloriescolum.textContent="Total Calories : ";
 caloriesPlus.textContent="Need :"
 caloriesMinus.textContent="Get rid of ";


 
 //function AddFood
 function AddFood(event){

  foodTable.classList.remove("hidden")
  CofirmDiv_Btn.classList.remove("hidden");

  let foodName = event.target;

  if (foodName.matches("i")) {

    

      // create Food Table Elements 

 
 const foodTabRow = document.createElement("tr");
 const foodTabName = document.createElement("td");
 const foodTabCalorie = document.createElement("td");
 const deletefood = document.createElement("button");
 const deleteIcon = document.createElement("i");
 deleteIcon.setAttribute("class","Medium material-icons");
 
    let datafood = foodName.getAttribute("data-food");
   let  dataf = datafood.split("/******/");

   foodTabName.textContent=dataf[0];
   foodTabCalorie.textContent=dataf[1]+" Cl";
   
   
   totalCalories.push(dataf[1]); // aray of caloies 




   let somme =0;
   for(let i=0;i<totalCalories.length;i++){

    foodTotalCalories.textContent="";
      somme = somme + parseFloat(totalCalories[i]);
      totalCaloriescolum.textContent="Total Calories :"+somme.toFixed(2)+" Cl = "+(somme/3500).toFixed(2)+" lb";
      caloriesPlus.textContent="Need :"
      caloriesMinus.textContent="Get rid of ";

      
   }
   totalCalories.length=0;
   totalCalories.push(somme.toFixed(2));

   

   deletefood.setAttribute("class","delete_food btn btn-small ");
   deletefood.setAttribute("data-calorie",dataf[1]);
   deletefood.textContent="Remove Food";

  

 
   foodTabRow.append(foodTabName);
   foodTabRow.append(foodTabCalorie);
   foodTabRow.append(deletefood);
   foodTabbody.append(foodTabRow);
   foodTable.append(foodTabbody);

   totalCaloriesRow.append(totalCaloriescolum);
  totalCaloriesRow.append(caloriesPlus);
  totalCaloriesRow.append(caloriesMinus);
   foodTotalCalories.append(totalCaloriesRow);
   foodTable.append(foodTotalCalories);
   CofirmDiv_Btn.append(confirmBtn);

   

deletefood.addEventListener('click',DeleteRow);
   

} }


//function Delete food


 function DeleteRow(event){
 
    let deletebtn = event.target;
    let datacalorie = deletebtn.getAttribute("data-calorie");
    let somme =0;
     for(let i=0;i<totalCalories.length;i++){
       somme = somme + parseFloat(totalCalories[i]);

   }
    totalCalories.length=0;
    totalCaloriescolum.textContent="";
    totalCalories.push((somme-datacalorie).toFixed(2));
    totalCaloriescolum.textContent="Total Calories :"+(somme-datacalorie).toFixed(2)+" Cl = "+(totalCalories[0]/3500).toFixed(2)+" lb";
    deletebtn.parentElement.remove();
    //console.log( deletebtn.parentElement.nodeName); return  element name


  
  
 }

 


 //Display final ard of the user

 const UserCard = document.querySelector(".UserCard");
 const LSignIn = document.querySelector("#LSignIn");
 const UName = document.querySelector("#UName");
 const UGender = document.querySelector("#UGender");
 const UHeight = document.querySelector("#UHeight");
 const UCurrentWeight = document.querySelector("#UCurrentWeight");
 const UGoalWeight = document.querySelector("#UGoalWeight");
 const goalDaysNumber = document.querySelector("#goalDaysNumber");
 const dailyConsumedCalories = document.querySelector("#dailyConsumedCalories");
 const ttCalories_FoodList= document.querySelector("#ttCalories_FoodList");




 confirmBtn.addEventListener('click',SaveUserData);


function GetUserData(){


  let User = localStorage.getItem("newUsers");
  if( User === null){       
      User = [];
  LSignIn.textContent=moment(); 
  UName.textContent=document.getElementById("userLogged").innerHTML;
  UGender.textContent= "No Information";
  UHeight.textContent="No Information";
  UCurrentWeight.textContent="No Information";
  UGoalWeight.textContent="No Information";
  goalDaysNumber.textContent="No Information";
  dailyConsumedCalories.textContent="No Information";
  ttCalories_FoodList.textContent= "0 Cal";  

       
      }else{

        User = JSON.parse(User);

        for(let i=User.length-1;i<User.length;i++) // for 1 user  we will last saved data from the array object
           {
      
            LSignIn.textContent=User[i].LastSignIn; 
            UName.textContent=User[i].name;
            UGender.textContent= User[i].gender;
            UHeight.textContent=User[i].height;
            UCurrentWeight.textContent=User[i].currentWeight;
            UGoalWeight.textContent=User[i].goalWeight;
            goalDaysNumber.textContent=User[i].timeline;
            dailyConsumedCalories.textContent=User[i].daily;
            ttCalories_FoodList.textContent=User[i].ttCal_FoodList;
           }
   

  }    
  return User;
  
}



function SaveUserData(){


  foodTable.setAttribute("class","hidden");
  CofirmDiv_Btn.setAttribute("class","hidden");
  searchFormEl.setAttribute("class","hidden");
  foodItems.textContent="";
  dayConsumedCalories.textContent=totalCalories[0]+" Cl  = "+(totalCalories[0]/3500).toFixed(2)+" lb" ;



  const users=GetUserData();
  
  const userName =  localStorage.getItem('user');
  const userGender = localStorage.getItem('gender');
  const userHeight = localStorage.getItem('height');
  const userCurrentWeight = localStorage.getItem('weight');
  const userGoalWeight = localStorage.getItem('user_goal_weight');
  const userTimeline = localStorage.getItem('timeline');
  const userDailyCalorie = localStorage.getItem('daily');
  const ttCal_FoodList = (totalCalories[0]/3500).toFixed(2);

  


    const NewUser={

      name :userName,
      gender :userGender,
      height :userHeight,
      currentWeight :userCurrentWeight,
      goalWeight: userGoalWeight,
      timeline:userTimeline,
      daily:userDailyCalorie,
      ttCal_FoodList :ttCal_FoodList,
      LastSignIn :moment()
  
    }

 //   console.log(users);
  
for(let i=0;i<users.length;i++){

  
  if(users[i].name === NewUser.name && users[i].gender == NewUser.gender && users[i].height === NewUser.height){

    
  //  $('#ExistingUser').dialog();
    users.splice(i,1);
   
  }
  


}


$('#SavedData').dialog();
users.push(NewUser);
let newUsers =JSON.stringify(users);
localStorage.setItem("newUsers", newUsers);
startOver.classList.remove('hidden');




}



const CardInfo1 =document.querySelector(".CardInfo1"); /*** */
const CardInfo2 =document.querySelector(".CardInfo2"); /*** */
const CardInfo3 =document.querySelector(".CardInfo3"); /*** */

startOver.addEventListener('click',function(){

  totalCalories.length=0;
foodTotalCalories.textContent='';
foodTabbody.textContent='';
searchFormEl.classList.remove("hidden");
startOver.setAttribute("class","waves-effect waves-light btn-large hidden");

});

lastUpdate.addEventListener('click',GetUserData); //getdata user