let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
{
	name: "Girls Like You",
	artist: "Maroon 5 ft.Cardi B",
	image: "a3560682892_10.jpg",
	path: "Maroon 5 - Girls Like You ft. Cardi B (Official Music Video).mp3"
},
{
	name: "7 Rings",
	artist: "Ariana Grande",
	image: "ab67616d00001e0256ac7b86e090f307e218e9c8.jpeg",
	path: "Ariana Grande - 7 rings (Official Video).mp3"
},
{
	name: "STAY",
	artist: "The Kid LAROI, Justin Bieber",
	image: "download.jpeg",
	path: "The Kid LAROI, Justin Bieber - STAY (Official Video).mp3",
},
{
	name: "Call Me Baby",
	artist: "EXO",
	image: "i.webp",
	path: "Call Me Baby.mp3"
},
{
	name: "Play Date",
	artist: "Melanie Matinez",
	image: "images.jpeg",
	path: "Melanie Martinez - Play Date (Lyrics).mp3"
},
{
	name: "Sucker",
	artist: "Jonas Brothers",
	image: "artworks-2a8slAh7aZSyddvI-lfQOfQ-t500x500.jpg",
	path: "Jonas Brothers - Sucker (Official Video).mp3",
}
];


function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    updateTimer = setInterval(seekUpdate, 1000);
    
    curr_track.addEventListener("ended", nextTrack);
    
    random_bg_color();
    }
    
    function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    document.body.style.background = bgColor;
    }
    
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }

    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        curr_track.play();
        isPlaying = true;
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        loadTrack(track_index);
        playTrack();
        }
        

        function seekTo() {
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
loadTrack(track_index);
