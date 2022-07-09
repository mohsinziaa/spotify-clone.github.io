//Required Variables.
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let myGif = document.getElementById("myGif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currentSong = document.getElementById("currentSong");

// songArray();
let songArray = [
  {
    songName: "Aaja Ve Mahiya",
    filePath: "songs/AVM.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Bewafa",
    filePath: "songs/Bewafa.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Fight Back",
    filePath: "songs/FB.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Grateful",
    filePath: "songs/Grateful.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Gulshan",
    filePath: "songs/Gulshan.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Cry On The Cue",
    filePath: "songs/COTC.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Bikhra",
    filePath: "songs/Bikhra.mp3",
    coverPath: "covers/8.jpg",
  },
];

// Setting the song list boxes.
for (let index = 0; index < songItems.length; index++) {
  songItems[index].getElementsByTagName("img")[0].src =
    songArray[index].coverPath;
  songItems[index].getElementsByClassName("songName")[0].innerText =
    songArray[index].songName;
}

// What happens when user clicks on main button.
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    //If song was paused before.
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    myGif.style.opacity = 1;
    let currentlyOn = document.getElementById(songIndex);
    currentlyOn.classList.remove("fa-play-circle");
    currentlyOn.classList.add("fa-pause-circle");
  } else {
    //If song was playing before
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    myGif.style.opacity = 0;
    let currentlyOn = document.getElementById(songIndex);
    currentlyOn.classList.remove("fa-pause-circle");
    currentlyOn.classList.add("fa-play-circle");
  }
});

// For range update in the horizontal scroll bar.
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

// If user tries to change progress bar.
myProgressBar.addEventListener("change", () => {
  audioElement.pause();
  let currentTime = (myProgressBar.value * audioElement.duration) / 100;
  audioElement.currentTime = currentTime;
  audioElement.play();
});

// This makes all button to play.
function makeAllPlay() {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
}

// Fetching the array of songlist.
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlay();
      if (audioElement.paused || audioElement.currentTime == 0) {
        songIndex = parseInt(e.target.id); //Here we are actually targeting the id of that element.
        currentSong.innerText = songArray[songIndex].songName;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        if (songIndex == 1) {
          audioElement.src = `songs/${songIndex + 1}.m4A`;
        } else {
          audioElement.src = `songs/${songIndex + 1}.mp3`;
        }
        audioElement.play();
        myGif.style.opacity = 1;
      } else {
        e.target.classList.add("fa-play-circle");
        e.target.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        audioElement.pause();
        myGif.style.opacity = 0;
      }
    });
  }
);

// What happens when user clicks on previous song button.
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex == 0) {
    songIndex = 6;
  } else {
    songIndex -= 1;
  }
  if (songIndex == 1) {
    audioElement.src = `songs/${songIndex + 1}.m4A`;
  } else {
    audioElement.src = `songs/${songIndex + 1}.mp3`;
  }
  currentSong.innerText = songArray[songIndex].songName;
  audioElement.play();
  makeAllPlay();
  myGif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  let currentlyOn = document.getElementById(songIndex);
  currentlyOn.classList.remove("fa-play-circle");
  currentlyOn.classList.add("fa-pause-circle");
});

// What happens when user clicks on next song button.
document.getElementById("next").addEventListener("click", () => {
  if (songIndex == 6) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  if (songIndex == 1) {
    audioElement.src = `songs/${songIndex + 1}.m4A`;
  } else {
    audioElement.src = `songs/${songIndex + 1}.mp3`;
  }
  currentSong.innerText = songArray[songIndex].songName;
  audioElement.play();
  makeAllPlay();
  myGif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  let currentlyOn = document.getElementById(songIndex);
  currentlyOn.classList.remove("fa-play-circle");
  currentlyOn.classList.add("fa-pause-circle");
});

//Checking if the song is over or not.
setInterval(() => {
  if (audioElement.currentTime == audioElement.duration) {
    document.getElementById("next").click();
  }
}, 2000);
