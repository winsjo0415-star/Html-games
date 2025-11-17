const games = [
  {
    name:"CloudMoonApp",
    url:"https://web.cloudmoonapp.com/",
    image:"images/cloudmoonapp-icon.png",
    videos:["images/cloudmoon-preview1.mp4","images/cloudmoon-preview2.mp4","images/cloudmoon-preview3.mp4"],
    tags:["website"],
    creator:"Cloud Team",
    lastUpdated:"2023-05-15",
    description:"Cloud gaming service"
  },
  {
    name:"Shooter Mania",
    url:"games/shooter.html",
    image:"images/shooter-icon.png",
    videos:["images/shooter-preview1.mp4","images/shooter-preview2.mp4","images/shooter-preview3.mp4"],
    tags:["shooter"],
    creator:"ShooterDev",
    lastUpdated:"2024-03-20",
    description:"Fast-paced shooting game"
  }
];

// DOM elements
const gameGrid=document.getElementById('gameGrid');
const searchBar=document.getElementById('searchBar');
const gameContainer=document.getElementById('gameContainer');
const gameFrame=document.getElementById('gameFrame');
const backBtn=document.getElementById('backBtn');
const fullscreenBtn=document.getElementById('fullscreenBtn');
const randomGamesDiv=document.getElementById('randomGames');
const gameDescription=document.getElementById('gameDescription');
const gameCreator=document.getElementById('gameCreator');
const gameLastUpdated=document.getElementById('gameLastUpdated');
const gameTags=document.getElementById('gameTags');
const newGamesContainer=document.getElementById('newGamesContainer');
const shareModal=document.getElementById('shareModal');
const shareBtn=document.getElementById('shareBtn');
const shareLink=document.getElementById('shareLink');
const copyBtn=document.getElementById('copyBtn');
const closeShare=document.getElementById('closeShare');

// ----- Main Hub -----
function renderGames(){
  gameGrid.innerHTML='';
  const filter=searchBar.value.toLowerCase();
  games.forEach(game=>{
    if(game.name.toLowerCase().includes(filter)){
      const card=document.createElement('div'); card.className='game-card';
      const img=document.createElement('img'); img.src=game.image;
      card.appendChild(img);

      // Hover video
      let videoIndex=0;
      let hoverInterval=null;
      card.addEventListener('mouseenter',()=>{
        if(game.videos.length>0){
          const video=document.createElement('video');
          video.src=game.videos[videoIndex];
          video.muted=true; video.autoplay=true; video.loop=false;
          card.replaceChild(video,img);
          hoverInterval=setInterval(()=>{
            videoIndex=(videoIndex+1)%game.videos.length;
            video.src=game.videos[videoIndex];
            video.play();
          },4000);
        }
      });
      card.addEventListener('mouseleave',()=>{
        if(hoverInterval) clearInterval(hoverInterval);
        card.replaceChild(img, card.querySelector('video'));
      });

      card.addEventListener('click',()=>{
        gameContainer.style.display='flex';
        gameFrame.src=game.url;
        gameDescription.textContent=game.description;
        gameCreator.textContent="Creator: "+game.creator;
        gameLastUpdated.textContent="Last Updated: "+game.lastUpdated;
        gameTags.textContent="Tags: "+game.tags.join(", ");
        renderRandomGames();
      });

      gameGrid.appendChild(card);
    }
  });
}

// ----- Right Sidebar -----
function renderRandomGames(){
  randomGamesDiv.innerHTML='';
  let shuffled=games.sort(()=>0.5-Math.random()).slice(0,20);
  shuffled.forEach(g=>{
    const card=document.createElement('div'); card.className='random-game-card';
    const img=document.createElement('img'); img.src=g.image;
    const overlay=document.createElement('div'); overlay.className='random-game-overlay'; overlay.textContent=g.name;
    card.appendChild(img); card.appendChild(overlay);

    // Hover videos
    let videoIndex=0;
    let hoverInterval=null;
    card.addEventListener('mouseenter',()=>{
      if(g.videos.length>0){
        const video=document.createElement('video');
        video.src=g.videos[videoIndex];
        video.muted=true; video.autoplay=true; video.loop=false;
        card.replaceChild(video,img);
        hoverInterval=setInterval(()=>{
          videoIndex=(videoIndex+1)%g.videos.length;
          video.src=g.videos[videoIndex];
          video.play();
        },4000);
      }
    });
    card.addEventListener('mouseleave',()=>{
      if(hoverInterval) clearInterval(hoverInterval);
      if(card.querySelector('video')) card.replaceChild(img, card.querySelector('video'));
    });

    card.addEventListener('click',()=>{
      gameFrame.src=g.url;
      gameDescription.textContent=g.description;
      gameCreator.textContent="Creator: "+g.creator;
      gameLastUpdated.textContent="Last Updated: "+g.lastUpdated;
      gameTags.textContent="Tags: "+g.tags.join(", ");
    });

    randomGamesDiv.appendChild(card);
  });
}

// ----- New Games Slider -----
function renderNewGamesSlider(){
  newGamesContainer.innerHTML='';
  // Last 15 games
  const newGames=games.slice(-15).reverse();
  newGames.forEach(game=>{
    const card=document.createElement('div'); card.className='new-game-card';
    const img=document.createElement('img'); img.src=game.image;
    const overlay=document.createElement('div'); overlay.className='new-game-overlay'; overlay.textContent=game.name;
    card.appendChild(img); card.appendChild(overlay);

    // Hover video
    let videoIndex=0;
    let hoverInterval=null;
    card.addEventListener('mouseenter',()=>{
      if(game.videos.length>0){
        const video=document.createElement('video');
        video.src=game.videos[videoIndex];
        video.muted=true; video.autoplay=true; video.loop=false;
        card.replaceChild(video,img);
        hoverInterval=setInterval(()=>{
          videoIndex=(videoIndex+1)%game.videos.length;
          video.src=game.videos[videoIndex];
          video.play();
        },4000);
      }
    });
    card.addEventListener('mouseleave',()=>{
      if(hoverInterval) clearInterval(hoverInterval);
      if(card.querySelector('video')) card.replaceChild(img, card.querySelector('video'));
    });

    card.addEventListener('click',()=>{
      gameContainer.style.display='flex';
      gameFrame.src=game.url;
      gameDescription.textContent=game.description;
      gameCreator.textContent="Creator: "+game.creator;
      gameLastUpdated.textContent="Last Updated: "+game.lastUpdated;
      gameTags.textContent="Tags: "+game.tags.join(", ");
      renderRandomGames();
    });

    newGamesContainer.appendChild(card);
  });
}

// ----- Share modal -----
shareBtn.addEventListener('click',()=>{
  shareModal.style.display='block';
  shareLink.value=window.location.href+"#"+gameFrame.src;
});
copyBtn.addEventListener('click',()=>{ shareLink.select(); document.execCommand('copy'); });
closeShare.addEventListener('click',()=>{ shareModal.style.display='none'; });

// ----- Controls -----
backBtn.addEventListener('click',()=>{ gameContainer.style.display='none'; gameFrame.src=''; });
fullscreenBtn.addEventListener('click',()=>{ if(gameFrame.requestFullscreen) gameFrame.requestFullscreen(); });

// ----- Search -----
searchBar.addEventListener('input', renderGames);

// ----- Initial render -----
renderGames();
renderRandomGames();
renderNewGamesSlider();
