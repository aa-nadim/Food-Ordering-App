const buttonInputLetter = document.getElementById('get-a-letter');
        buttonInputLetter.addEventListener('click', function(event){
            const enterLetter = document.getElementById('enter-a-letter').value;

            if(enterLetter.length === 1 && enterLetter >= 'a' && enterLetter <= 'z'){
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${enterLetter}`)
                .then(res => res.json())
                .then(data => displayfoods(data))
                .catch(error => console.log(error))

                const displayfoods = foods => {
                    const foodsDiv = document.getElementById('foods');
                    foods.meals.forEach(food =>{
                        const foodDiv = document.createElement('div');
                        foodDiv.className = 'food';
                        const foodInfo = `
                            <img onclick="displayFoodDetail('${food.strMeal}')" src="${food.strMealThumb}" width="200" height="120">
                            <p onclick="displayFoodDetail('${food.strMeal}')" class="food-name">${food.strMeal}</p>
                        `;
                        foodDiv.innerHTML = foodInfo;
                        foodsDiv.appendChild(foodDiv);      
                    });
                } 
                document.getElementById('foods').innerHTML="";
                const errorArea = document.getElementById("ErrorArea");
                errorArea.style.display = "none";
            }
            else{
                const errorArea = document.getElementById("ErrorArea");
                errorArea.style.display = "block";
                document.getElementById('foods').innerHTML="";
            }
        })

const displayFoodDetail = name => {
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
    .then(res => res.json())
    .then(data => renderFoodInfo(data.meals[0]));
}

const renderFoodInfo = food => {
    console.log(food);
    const foodDiv = document.getElementById('foodDetail');
    foodDiv.innerHTML =`
        <img src="${food.strMealThumb}">
        <h1>${food.strMeal}</h1>
        <h3>Ingredients</h3>
        <li>${food.strMeasure1} ${food.strIngredient1}</li> 
        <li>${food.strMeasure2} ${food.strIngredient2}</li>
        <li>${food.strMeasure3} ${food.strIngredient3}</li>
        <li>${food.strMeasure4} ${food.strIngredient4}</li>
        <li>${food.strMeasure5} ${food.strIngredient5}</li>
        <li>${food.strMeasure6} ${food.strIngredient6}</li>
    `
}