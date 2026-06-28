// ============================================
// CODEALPHA MUSIC PLAYER
// Part 1
// ============================================

// Songs List

const songs = [
{
    title: "Neon Beats",
    artist: "Royalty Free",
    src: "assets/music/song1.mp3",
    cover: "assets/images/cover1.png"
},
{
    title: "Sunset Vibes",
    artist: "Royalty Free",
    src: "assets/music/song2.mp3",
    cover: "assets/images/cover2.png"
},
{
    title: "Midnight Waves",
    artist: "Royalty Free",
    src: "assets/music/song3.mp3",
    cover: "assets/images/cover3.png"
}
];

// ============================================
// Elements
// ============================================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistItems =
document.querySelectorAll("#playlist li");

let currentSong = 0;

let isPlaying = false;

// ============================================
// Load Song
// ============================================

function loadSong(index){

    title.innerHTML = songs[index].title;

    artist.innerHTML = songs[index].artist;

    cover.src = songs[index].cover;

    audio.src = songs[index].src;

    updatePlaylist();

}

loadSong(currentSong);

// ============================================
// Play Song
// ============================================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

}

// ============================================
// Pause Song
// ============================================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}

// ============================================
// Play Button
// ============================================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

// ============================================
// Next Song
// ============================================

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}

nextBtn.addEventListener("click",nextSong);

// ============================================
// Previous Song
// ============================================

function previousSong(){

    currentSong--;

    if(currentSong < 0){

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

}

prevBtn.addEventListener("click",previousSong);

// ============================================
// Progress Bar
// ============================================

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.innerHTML =
            formatTime(audio.currentTime);

        duration.innerHTML =
            formatTime(audio.duration);
    }

});

// ============================================
// Seek Song
// ============================================

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});

// ============================================
// Volume
// ============================================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// ============================================
// Playlist Click
// ============================================

playlistItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(currentSong);

        playSong();

    });

});

// ============================================
// Active Playlist Item
// ============================================

function updatePlaylist() {

    playlistItems.forEach((item) => {

        item.classList.remove("active");

    });

    playlistItems[currentSong].classList.add("active");

}

// ============================================
// Time Format
// ============================================

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {

        seconds = "0" + seconds;

    }

    return `${minutes}:${seconds}`;

}

// ============================================
// Auto Play Next Song
// ============================================

audio.addEventListener("ended", () => {

    nextSong();

});

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }

    if (e.code === "ArrowRight") {

        nextSong();

    }

    if (e.code === "ArrowLeft") {

        previousSong();

    }

});

// ============================================
// Initialize Volume
// ============================================

audio.volume = volume.value;

// ============================================
// Initial Playlist Highlight
// ============================================

updatePlaylist();
