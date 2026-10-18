"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Mikael Emanuelsson
 */

// Hämta HTML-element som används vid sökning och receptvisning
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const recipeContainer = document.querySelector("#recipe");

// Lyssna efter att formuläret skickas
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Hämta sökfrasen och ta bort extra mellanslag
  const searchTerm = searchInput.value.trim();

  // Kontrollera att sökfältet inte är tomt
  if (searchTerm === "") {
    errorMessage.textContent = "Du måste ange en sökfras.";
    return;
  }

  // Ta bort tidigare felmeddelanden
  errorMessage.textContent = "";

  fetchRecipes(searchTerm);
});

// Sök efter recept via API:et och visa den första träffen
async function fetchRecipes(searchTerm) {
  try {
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url);

    // Kontrollera att API-anropet lyckades
    if (!response.ok) {
      throw new Error("Kunde inte hämta recept.");
    }

    // Omvandla JSON-svaret till ett JavaScript-objekt
    const data = await response.json();

    if (data.recipes.length > 0) {
      displayRecipe(data.recipes[0]);
    }
  } catch (error) {
    console.error("Fel vid hämtning:", error);
  }
}

// Visa receptets information på webbsidan
function displayRecipe(recipe) {
  // Ta bort tidigare recept innan ett nytt visas
  recipeContainer.innerHTML = "";

  // Skapa HTML-element för receptets innehåll
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const image = document.createElement("img");
  const recipeInfo = document.createElement("p");
  const ingredientsHeading = document.createElement("h4");
  const ingredientsList = document.createElement("ul");
  const instructionsHeading = document.createElement("h4");
  const instructionsList = document.createElement("ol");

  heading.textContent = recipe.name;
  image.src = recipe.image;
  image.alt = recipe.name;

  recipeInfo.textContent = `Portioner: ${recipe.servings} | Förberedelsetid: ${recipe.prepTimeMinutes} min | Tillagningstid: ${recipe.cookTimeMinutes} min | Svårighetsgrad: ${recipe.difficulty}`;
  ingredientsHeading.textContent = "Ingredienser";

  // Skapa en listpunkt för varje ingrediens
  recipe.ingredients.forEach(function (ingredient) {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    ingredientsList.appendChild(listItem);
  });

  instructionsHeading.textContent = "Tillagning";

  // Skapa ett numrerat steg för varje instruktion
  recipe.instructions.forEach(function (instruction) {
    const listItem = document.createElement("li");
    listItem.textContent = instruction;
    instructionsList.appendChild(listItem);
  });

  // Lägg till alla receptdelar i rätt ordning på webbsidan
  article.appendChild(heading);
  article.appendChild(image);
  article.appendChild(recipeInfo);
  article.appendChild(ingredientsHeading);
  article.appendChild(ingredientsList);
  article.appendChild(instructionsHeading);
  article.appendChild(instructionsList);
  recipeContainer.appendChild(article);
}
