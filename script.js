let splash = document.querySelector(".splash");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll(".logo-intro");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove("active");
          span.classList.add("fade");
        }, (idx + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      splash.style.top = "-100vh";
    }, 2300);
  });
});

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

// Kanan-Kiri

// Selektor hanya untuk elemen di dalam .right-left
const container = document.querySelector(".right-left");
const el = document.querySelector(".kanan-kiri");

// Variabel untuk lebar container dan elemen
let containerWidth = container.offsetWidth;
let elWidth = el.offsetWidth;

// Variabel untuk posisi mouse
let mouseX = 0;
let prevMouseX = 0;

// Target animasi
let skewTarget = 0;
let translateTarget = 0;

// Variabel easing
let skewWithEasing = 0;
let translateWithEasing = 0;
const skewEasingFactor = 0.1;
const translateEasingFactor = 0.05;

// Event Listener
container.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleWindowResize);

// Fungsi menangani gerakan mouse
function handleMouseMove(e) {
  // Mengambil posisi mouse relatif terhadap container
  const rect = container.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
}

// Fungsi untuk menyesuaikan ulang ukuran
function handleWindowResize() {
  containerWidth = container.offsetWidth;
  elWidth = el.offsetWidth;
}

// Fungsi interpolasi (easing)
function lerp(start, end, factor) {
  return (1 - factor) * start + factor * end;
}

// Fungsi animasi
function animateMe() {
  // Menghitung perbedaan posisi mouse
  skewTarget = mouseX - prevMouseX;
  prevMouseX = mouseX;

  // Menghitung target terjemahan elemen
  translateTarget = ((elWidth - containerWidth) / containerWidth) * mouseX * -1;

  // Menambahkan easing untuk skew
  skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);
  skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

  // Menambahkan easing untuk translasi
  translateWithEasing = lerp(
    translateWithEasing,
    translateTarget,
    translateEasingFactor
  );

  // Mengatur transformasi elemen
  el.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;

  // Meminta frame berikutnya
  window.requestAnimationFrame(animateMe);
}

// Memulai animasi
window.requestAnimationFrame(animateMe);

// Kanan-Kiri
