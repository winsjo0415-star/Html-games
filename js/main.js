// © 2025 Winston Harry Roger Sjöstrand. All rights reserved.
// No part of this code may be used, copied, or distributed without permission.

// ==========================
// Add your games here
// ==========================
const games = [
  // Template example:
  /*
  {
    name: "Example Game",
    url: "games/example-game/index.html",
    image: "images/example-game.png",
    videos: [], // optional hover videos
    tags: ["shooter", "multiplayer"],
    creator: "Your Name",
    lastUpdated: "2025-01-01",
    description: "This is a description of the game."
  }
  */
];

document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------
  // HUB PAGE
  // ---------------------------
  if(window.location.pathname.endsWith("index.html") || window.location.pathname === "/"){
    const gameGrid = document.getElementById("gameGrid");
    const newGamesContainer = document.getElementById("newGamesContainer");
    const searchBar = document.getElementById("searchBar");

    function renderGames(){
      gameGrid.innerHTML = "";
      games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        const img = document.createElement("img");
        img.src = game.image;
        card.appendChild(img);

        const name = document.createElement("h4");
        name.textContent = game.name;
        card.appendChild(name);

        card.addEventListener("click", ()=>{
          window.location.href = "game.html?game=" + encodeURIComponent(game.name);
        });

        gameGrid.appendChild(card);
      });
    }

    function renderNewGames(){
      newGamesContainer.innerHTML = "";
      const lastGames = games.slice(-15).reverse();
      lastGames.forEach(game=>{
        const card = document.createElement("div");
        card.className = "game-card";
        const img = document.createElement("img");
        img.src = game.image;
        card.appendChild(img);
        newGamesContainer.appendChild(card);
      });
    }

    searchBar.addEventListener("input", ()=>{
      const text = searchBar.value.toLowerCase();
      gameGrid.childNodes.forEach(card=>{
        const name = card.querySelector("h4").textContent.toLowerCase();
        card.style.display = name.includes(text) ? "flex" : "none";
      });
    });

    renderGames();
    renderNewGames();
  }

  // ---------------------------
  // GAME PAGE
  // ---------------------------
  if(window.location.pathname.includes("game.html")){
    const params = new URLSearchParams(window.location.search);
    const gameName = params.get("game");
    const game = games.find(g => g.name === gameName);

    if(!game) return;

    // Game iframe
    const iframe = document.getElementById("gameFrame");
    iframe.src = game.url;

    document.getElementById("gameName").textContent = game.name;
    document.getElementById("gameDescription").textContent = game.description;
    document.getElementById("gameCreator").textContent = "Creator: "+game.creator;
    document.getElementById("gameLastUpdated").textContent = "Last Updated: "+game.lastUpdated;
    document.getElementById("gameTags").textContent = "Tags: "+game.tags.join(", ");

    // Random games list
    const randomContainer = document.getElementById("randomGames");
    randomContainer.innerHTML = "";
