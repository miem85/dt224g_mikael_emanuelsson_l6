"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Mikael Emanuelsson
 */

// Hämta formuläret, sökfältet och felmeddelandet från HTML
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");

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

// Hämta recept från API:et
async function fetchRecipes(searchTerm) {
  try {
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Kunde inte hämta recept.");
    }

    const data = await response.json();

    console.log("API-svar:", data);
  } catch (error) {
    console.error("Fel vid hämtning:", error);
  }
}
