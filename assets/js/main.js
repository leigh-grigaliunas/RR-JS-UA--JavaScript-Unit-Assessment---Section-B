const musicContainer = document.getElementById('music-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('next');
const nextBtn = document.getElementById('prev');
const audio = document.getElementById('audio');
let volume_slider = document.querySelector('volume_slider');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const duration = document.getElementById('duration');
const artwork = document.getElementById('music-artwork');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const tracks = [
    {
        title: 'Ukulele',
        artist: 'Ben Sounds',
        length: '2:34',
        musicFile: 'ukulele.mp3',
        artFile: 'ukulele.jpeg',
        bgColor: '#daa0b2'
    },
    {
        title: 'Better Days',
        artist: 'Ben Sounds',
        length: '2:26',
        musicFile: 'betterdays.mp3',
        artFile: 'betterdays.jpeg',
        bgColor: '#eb5e82'
    },
    {
        title: 'Sunny',
        artist: 'Ben Sounds',
        length: '2:20',
        musicFile: 'sunny.mp3',
        artFile: 'sunny.jpeg',
        bgColor: '#736bf9'
    }
];

let songIndex = 0;
loadSong(tracks[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    duration.innerText = song.length;
    audio.src = `assets/music/${song.musicFile}`;
    artwork.src = `assets/img/${song.artFile}`;
    
    let myElements = document.querySelectorAll(".box");

    for (let i = 0; i < myElements.length; i++) {
	    myElements[i].style.background = song.bgColor;
    }
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = tracks.length - 1;
    }
    
    loadSong(tracks[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > tracks.length - 1) {
        songIndex = 0;
    }

    loadSong(tracks[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }
  
  //get duration & currentTime for Time of song
  function DurTime (e) {
      const {duration,currentTime} = e.srcElement;
      var sec;
      var sec_d;
  
      // define minutes currentTime
      let min = (currentTime==null)? 0:
       Math.floor(currentTime/60);
       min = min <10 ? '0'+min:min;
  
      // define seconds currentTime
      function get_sec (x) {
          if(Math.floor(x) >= 60){
              
              for (var i = 1; i<=60; i++){
                  if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                      sec = Math.floor(x) - (60*i);
                      sec = sec <10 ? '0'+sec:sec;
                  }
              }
          }else{
               sec = Math.floor(x);
               sec = sec <10 ? '0'+sec:sec;
           }
      } 
  
      get_sec (currentTime,sec);
  
      // change currentTime DOM
      currTime.innerHTML = min +':'+ sec;
  
      // define minutes duration
      let min_d = (isNaN(duration) === true)? '0':
          Math.floor(duration/60);
       min_d = min_d <10 ? '0'+min_d:min_d;
  
  
       function get_sec_d (x) {
          if(Math.floor(x) >= 60){
              
              for (var i = 1; i<=60; i++){
                  if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                      sec_d = Math.floor(x) - (60*i);
                      sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                  }
              }
          }else{
               sec_d = (isNaN(duration) === true)? '0':
               Math.floor(x);
               sec_d = sec_d <10 ? '0'+sec_d:sec_d;
           }
      } 
  
      // define seconds duration
      
      get_sec_d (duration);
  
      // change duration DOM
      durTime.innerHTML = min_d +':'+ sec_d;   
};

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    audio.volume = volume_slider.value / 100;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  
  // Change song
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  
  // Time/song update
  audio.addEventListener('timeupdate', updateProgress);
  
  // Click on progress bar
  progressContainer.addEventListener('click', setProgress);
  
  // Song ends
  audio.addEventListener('ended', nextSong);
  
  // Time of song
  audio.addEventListener('timeupdate',DurTime);
  
  