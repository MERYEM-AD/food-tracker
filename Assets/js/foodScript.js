 //Declaration of variables :

 const applicationID ='6990414a';
 const apiKey='73f2989310d7983c9986662b0350079f';
 const searchFormEl = document.querySelector('#search-form');
 let searchInput= document.querySelector('#search-input');
 const foodItems= document.querySelector('.foodItems');

 //////////////////// Tables Variables///////////////////////////

  const foodTable = document.querySelector(".FoodTable");




 searchFormEl.addEventListener('submit',function(event){
     event.preventDefault();

     let searchInputVal = document.querySelector('#search-input').value;

    let foodRequest ="https://api.edamam.com/api/recipes/v2?type=public&q="+searchInputVal+"&app_id="+applicationID+"&app_key="+apiKey;

    // console.log(searchInputVal);
    // console.log(foodRequest);


   foodItems.textContent="";

  
 
   //fetching DATA

   fetch(foodRequest)
   .then(function(response){

    if(response.status===200){
  
      return response.json();
    }
  
   })
   .then( function(data){
      
 //   console.log(data.hits[0]);
     
    
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
        calorieDescription.textContent="Calories : "+(data.hits[i].recipe.calories).toFixed(2);

        cardAction.setAttribute("class","card-action");
        btnAdd.setAttribute("class","btn-floating btn-large waves-effect waves-light red");
        addIcon.setAttribute("class","material-icons");
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
     


   }

   });

   searchInput.value =null;


 });


/******************** FoodTable******************** */


// const foodTable = document.createElement("table");


////////////////////////////////////////////////////////////////////////////////////////////////////////