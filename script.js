const bars = document.querySelector(".bars");
const navbar = document.querySelector(".navbar");
const xmark = document.querySelector(".xmark");
const overlay = document.querySelector(".overlay");
const menuLinks = document.querySelectorAll(".menu-link"); // Tambahkan ini

// Event listener untuk membuka navbar dan menampilkan overlay
bars.addEventListener("click", () => {
  navbar.classList.add("active");
  overlay.style.display = "block"; // Tampilkan overlay
});

// Event listener untuk menutup navbar dengan mengklik close-btn (opsional)
xmark.addEventListener("click", () => {
  navbar.classList.remove("active");
  overlay.style.display = "none"; // Sembunyikan overlay
});

// Event listener untuk menutup navbar jika overlay diklik
overlay.addEventListener("click", () => {
  navbar.classList.remove("active");
  overlay.style.display = "none"; // Sembunyikan overlay
});

// Menutup navbar jika klik di luar navbar
document.addEventListener("click", (event) => {
  // Cek apakah klik terjadi di luar navbar dan menu-bar
  if (!navbar.contains(event.target) && !bars.contains(event.target)) {
    navbar.classList.remove("active");
    overlay.style.display = "none"; // Sembunyikan overlay
  }
});

// Tambahkan event listener untuk setiap menu-link
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", () => {
    navbar.classList.remove("active"); // Tutup navbar
    overlay.style.display = "none"; // Sembunyikan overlay
  });
});

// Music
const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "assets/1.mp3",
    displayName: "Gasoline",
    cover: "assets/1.jpg",
    artist: "I Prevail",
  },
  {
    path: "assets/2.mp3",
    displayName: "Unsainted",
    cover: "assets/2.jpg",
    artist: "Slipknot",
  },
  {
    path: "assets/3.mp3",
    displayName: "Dead Clown",
    cover: "assets/3.jpg",
    artist: "510",
  },
  {
    path: "assets/4.mp3",
    displayName: "n/A",
    cover: "assets/4.jpg",
    artist: "Bring Me The Horizon",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
// Music
