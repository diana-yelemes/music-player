const audio = document.getElementById('audio');
const albumCover = document.getElementById('album-cover');
const songList = document.querySelectorAll('.song-list li');
const playPauseButton = document.getElementById('play-pause');
const volumeControl = document.getElementById('volume');
const skipBackwardButton = document.getElementById('skip-backward');
const skipForwardButton = document.getElementById('skip-forward');

let currentSong = 0;

function playSong(index) {
    const song = songList[index];
    audio.src = song.getAttribute('data-src');
    albumCover.src = `album-covers/album-cover-${index + 1}.jpg`;
    audio.load();
    audio.play();
}

songList.forEach((song, index) => {
    song.addEventListener('click', () => {
        currentSong = index;
        playSong(currentSong);
    });
});

playPauseButton.addEventListener('click', togglePlayPause);
volumeControl.addEventListener('input', setVolume);
skipBackwardButton.addEventListener('click', skipBackward);
skipForwardButton.addEventListener('click', skipForward);

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

// Add a click event listener to each song name element
const songNames = document.querySelectorAll(".song-list li");
songNames.forEach((song) => {
    song.addEventListener("click", function () {
        // Toggle the Play/Pause button text
        if (playPauseButton.textContent === "Play") {
            playPauseButton.textContent = "Pause";
        } else {
            playPauseButton.textContent = "Play";
        }
    });
});

function setVolume() {
    audio.volume = volumeControl.value;
}

function skipBackward() {
    audio.currentTime -= 10;
}

function skipForward() {
    audio.currentTime += 10;
}

playSong(currentSong);

// Update the time and progress bar
audio.addEventListener('timeupdate', function () {
    const currentTime = formatTime(audio.currentTime);
    const totalTime = formatTime(audio.duration);
    const progressBar = (audio.currentTime / audio.duration) * 100;

    document.querySelector('.current-time').textContent = currentTime;
    document.querySelector('.total-time').textContent = totalTime;

    document.querySelector('.progress-bar').style.width = progressBar + '%';
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
