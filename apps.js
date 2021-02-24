document.getElementById('searchBtn').addEventListener("click", function () {

    const mealList = document.getElementById('mealList');
    let getInputText = document.getElementById('getInput').value;
    //Search meal by name
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getInputText}`)
        .then(res => res.json())
        .then(data => {

            if (data.meals) {
                data.meals.forEach(meal => {

                    const div = document.createElement('div');
                    div.className = 'meal-item';
                    const mealInfo = `
                            <div onclick="displayDetails('${meal.idMeal}')"<div>
                                <img src="${meal.strMealThumb}" alt="food">
                                <h3>${meal.strMeal}<h3>
                            </div>
                            `;

                    div.innerHTML = mealInfo;
                    mealList.appendChild(div);
                });
            }
            else {
                document.getElementById('errorMessage').innerHTML = "Sorry, we didn't find any meal!";

            }


        })

    document.getElementById('IngredientOfMeal').innerHTML = "";
    document.getElementById('mealList').innerHTML = "";
    document.getElementById('errorMessage').innerHTML = "";
    document.getElementById('getInput').value = "";
})

//Search meal by Id
const displayDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => detailsPerMeal(data.meals[0]));
}

// Ingredient of single meal
const detailsPerMeal = item => {
    const mealDiv = document.getElementById('IngredientOfMeal');
    mealDiv.innerHTML = `
    <img src="${item.strMealThumb}" alt="food">
    <h3>${item.strMeal}<h3>
    <h3>Ingredients</h3>
    <li>${item.strIngredient1}</li>
    <li>${item.strIngredient2}</li>
    <li>${item.strIngredient3}</li>
    <li>${item.strIngredient4}</li>
    <li>${item.strIngredient5}</li>
    <li>${item.strIngredient6}</li>
   `;
}