 /***************** Declaration of variables :/*********** */

 //API variables:
 const applicationID ='6990414a';
 const apiKey='73f2989310d7983c9986662b0350079f';

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

 //show the final resault in the Final_Resault div
 const Final_Resault= document.querySelector(".Final_Resault");

 //404 page 

 const UnfoundedFood = "./404.html";

  



//
 searchFormEl.addEventListener('submit',function(event){
     event.preventDefault();
     

     let searchInputVal = document.querySelector('#search-input').value.trim().toUpperCase();

    let foodRequest ="https://api.edamam.com/api/recipes/v2?type=public&q="+searchInputVal+"&app_id="+applicationID+"&app_key="+apiKey;

   //  **** to do : add condition of fetch  
   foodItems.textContent=""; // to refresh the searched food


   if(!searchInputVal){
    return; // message

   }

   //fetching DATA


    fetch(foodRequest)
   .then(function(response){
    if(response.status === 404){

      return;

      // console.log ("Sorry ,Unfounded Food ");
      // document.location.href=UnfoundedFood;
      
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
      
      console.log("food not founed ") ; // message 

      return;
    }
    else {

        for (let i=0;i<4;i++){ // we can Display 20 results

      
      
      //create HTML ELEMENTS : 

      const foodOption = document.createElement('div');

      const card = document.createElement('div');

      const cardImage = document.createElement('div');
      const foodImage = document.createElement('img');
      const foodname =  document.createElement('span');

      const cardContent = document.createElement('div');
      const calorieDescription = document.createElement('p');

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


      cardContent.setAttribute("class","card-content");
      calorieDescription.textContent="Calories : "+(data.hits[i].recipe.calories).toFixed(2)+" kcl";

      cardAction.setAttribute("class","card-action");

      btnAdd.setAttribute("class","btn-floating btn-large waves-effect waves-light red");
   


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
 totalCaloriescolum.textContent="Total Calories : ";

 //function AddFood
 function AddFood(event){
  
  CofirmDiv_Btn.classList.remove("hidden");

  let foodName = event.target;

  if (foodName.matches("i")) {

    

      // create Food Table Elements 

 
 const foodTabRow = document.createElement("tr");
 const foodTabName = document.createElement("td");
 const foodTabCalorie = document.createElement("td");
 const deletefood = document.createElement("button");
 
    let datafood = foodName.getAttribute("data-food");
   let  dataf = datafood.split("/******/");

   foodTabName.textContent=dataf[0];
   foodTabCalorie.textContent=dataf[1]+" kcl";
   
   
   totalCalories.push(dataf[1]); // aray of caloies 




   let somme =0;
   for(let i=0;i<totalCalories.length;i++){

    foodTotalCalories.textContent="";
      somme = somme + parseFloat(totalCalories[i]);
      totalCaloriescolum.textContent="Total Calories :"+somme.toFixed(2)+" kcl";
      
   }
   totalCalories.length=0;
   totalCalories.push(somme.toFixed(2));

   

   deletefood.setAttribute("class","delete_food");
   deletefood.setAttribute("data-calorie",dataf[1]);
   deletefood.textContent="delete food";

  

 
   foodTabRow.append(foodTabName);
   foodTabRow.append(foodTabCalorie);
   foodTabRow.append(deletefood);
   foodTabbody.append(foodTabRow);
   foodTable.append(foodTabbody);

   totalCaloriesRow.append(totalCaloriescolum);
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
    totalCaloriescolum.textContent="Total Calories :"+(somme-datacalorie).toFixed(2)+" kcl";
    deletebtn.parentElement.remove();
    //console.log( deletebtn.parentElement.nodeName); return  element name


  
  
 }

 


 //Display final ard of the user

 const userCard = document.querySelector(".userCard");

 confirmBtn.addEventListener('click',function(){

 const showUserWeight= document.querySelector("#showUserWeight");
 const showUserGoalWeight= document.querySelector("#showUserGoalWeight");

 const userGender = document.createElement("p");
 const userHeight = document.createElement("p");
 const userCurrentWeight = document.createElement("p");
 const userGoalWeight = document.createElement("p");
 const userGainPound = document.createElement("p");


 
 userGender.textContent ="Gender : "+localStorage.getItem('gender');
 userHeight.textContent="Height : "+localStorage.getItem('height');
 //pounds = calories ÷ 3500
 userGainPound.textContent = "You will gain "+(totalCalories[0]/3500).toFixed(2)+" lb";
 userCurrentWeight.textContent="Your current weight : "+showUserWeight.innerHTML+" lb";
 userGoalWeight.textContent = "Your goal weight : "+showUserGoalWeight.innerHTML+" lb";



 userCard.append(userGender);
 userCard.append(userHeight);
 userCard.append(userCurrentWeight);
 userCard.append(userGoalWeight);
 userCard.append(userGainPound);

 foodItems.textContent="";
 foodTable.setAttribute("class","hidden");
 weightDataDiv.setAttribute("class","hidden");
 CofirmDiv_Btn.setAttribute("class","hidden");
 Final_Resault.classList.remove("hidden");


 


});




const saveBtn = document.querySelector("#save");
const resetBtn = document.querySelector("#reset");






resetBtn.addEventListener('click',function(){
  totalCalories.length=0;
  
 foodTable.classList.remove("hidden");
 foodTotalCalories.textContent='';
 foodTabbody.textContent='';
 weightDataDiv.classList.remove("hidden");
 userCard.textContent="";
 Final_Resault.setAttribute("class","hidden");

 

});



function GetUserData(){


  let User = localStorage.getItem("newUsers");
  if( User === null){       
      User = [];
       
      }else{

        User = JSON.parse(User);

        for(let i=0;i<User.length;i++)
           {

            console.log("Hi"+User[i].name+" add card and show user last information");
           }
   

  }    
  return User;
  
}





saveBtn.addEventListener('click',SaveUserData); 


function SaveUserData(){


  const users=GetUserData();
  
  const userName =  localStorage.getItem('user');
  const userGender = localStorage.getItem('gender');
  const userHeight = localStorage.getItem('height');
  const userCurrentWeight = localStorage.getItem('weight');
  const userGoalWeight = localStorage.getItem('user_goal_weight');
  const userGainPound = (totalCalories[0]/3500).toFixed(2);

  


    const NewUser={

      name :userName,
      gender :userGender,
      height :userHeight,
      currentWeight :userCurrentWeight,
      goalWeight: userGoalWeight,
      gainPound :userGainPound
  
    }
  
for(let i=0;i<users.length;i++){
  if(users[i].name === NewUser.name && users[i].gender == NewUser.gender && users[i].height === NewUser.height ){

    users.splice(i,1);


  }


}
    
    users.push(NewUser);
    let newUsers =JSON.stringify(users);
    localStorage.setItem("newUsers", newUsers);




}