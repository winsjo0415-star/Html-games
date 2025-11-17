// © 2025 Winston Harry Roger Sjöstrand. All rights reserved.
// No part of this code may be used, copied, or distributed without permission.

document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // Template for adding games
  // =======================
  const games = [
    // Example game structure:
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

  // =======================
  // Hub Page Rendering
  // =======================
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

  // =======================
  // Game Page Rendering
  // =======================
  if(window.location.pathname.includes("game.html")){
    const params = new URLSearchParams(window.location.search);
    const gameName = params.get("game");
    const game = games.find(g => g.name === gameName);

    if(game){
      const iframe = document.getElementById("gameFrame");
      iframe.src = game.url;

      document.getElementById("gameName").textContent = game.name;
      document.getElementById("gameDescription").textContent = game.description;
      document.getElementById("gameCreator").textContent = "Creator: "+game.creator;
      document.getElementById("gameLastUpdated").textContent = "Last Updated: "+game.lastUpdated;
      document.getElementById("gameTags").textContent = "Tags: "+game.tags.join(", ");

      const randomContainer = document.getElementById("randomGames");
      randomContainer.innerHTML = "";
      const shuffled = [...games].sort(()=>0.5 - Math.random()).slice(0,15);
      shuffled.forEach(g=>{
        const div = document.createElement("div");
        div.className = "game-card";
        const img = document.createElement("img");
        img.src = g.image;
        div.appendChild(img);
        const name = document.createElement("h5");
        name.textContent = g.name;
        div.appendChild(name);
        div.addEventListener("click", ()=>{
          window.location.href = "game.html?game="+encodeURIComponent(g.name);
        });
        randomContainer.appendChild(div);
      });

      // Share modal
      const shareBtn = document.getElementById("shareBtn");
      const modal = document.getElementById("shareModal");
      const shareLink = document.getElementById("shareLink");
      const copyBtn = document.getElementById("copyBtn");
      const closeShare = document.getElementById("closeShare");

      shareBtn.addEventListener("click", ()=>{
        shareLink.value = window.location.href;
        modal.style.display = "block";
      });
      copyBtn.addEventListener("click", ()=>{
        shareLink.select();
        document.execCommand("copy");
        alert("Copied to clipboard!");
      });
      closeShare.addEventListener("click", ()=>{
        modal.style.display = "none";
      });

      document.getElementById("backBtn").addEventListener("click", ()=>{
        window.location.href = "index.html";
      });

      document.getElementById("fullscreenBtn").addEventListener("click", ()=>{
        if(iframe.requestFullscreen) iframe.requestFullscreen();
      });

      const favoriteBtn = document.getElementById("favoriteBtn");
      favoriteBtn.addEventListener("click", ()=>{
        const favorites = JSON.parse(localStorage.getItem("favorites")||"[]");
        if(favorites.includes(game.name)){
          favorites.splice(favorites.indexOf(game.name),1);
          favoriteBtn.textContent = "☆";
        } else {
          favorites.push(game.name);
          favoriteBtn.textContent = "★";
        }
        localStorage.setItem("favorites",JSON.stringify(favorites));
      });

      const favorites = JSON.parse(localStorage.getItem("favorites")||"[]");
      if(favorites.includes(game.name)) favoriteBtn.textContent = "
