console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songNames = Array.from(document.getElementsByClassName('songName'));

let songs = [
    {songName: "Sweet Dreams - Alan Walker", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "On My Way - Alan Walker", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Ignite - Alan Walker", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Sing Me To Sleep - Alan Walker", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "The Drum - Alan Walker", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Unity - Alan Walker", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Alone - Alan Walker", filePath: "songs/7.mp3", coverPath: "covers/7.png"},
    {songName: "The Spectre - Alan Walker", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Darkside - Alan Walker", filePath: "songs/9.mp3", coverPath: "covers/9.png"},
    {songName: "Faded - Alan Walker", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        //console.log(audioElement.currentTime);
        songNames.forEach((element)=> {
            if(element.innerText === masterSongName.innerText) {
                element.nextElementSibling.childNodes[0].childNodes[1].classList.remove('fa-play-circle');
                element.nextElementSibling.childNodes[0].childNodes[1].classList.add('fa-pause-circle');
            }
        })
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        songNames.forEach((element)=> {
            if(element.innerText === masterSongName.innerText) {
                element.nextElementSibling.childNodes[0].childNodes[1].classList.remove('fa-pause-circle');
                element.nextElementSibling.childNodes[0].childNodes[1].classList.add('fa-play-circle');
            }
        })
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
  
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(e.target.classList.contains('fa-play-circle')) {
            songIndex = parseInt(e.target.id);
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            })
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            console.log(audioElement.currentTime);
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else if(e.target.classList.contains('fa-pause-circle'))  {
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            //console.log(audioElement.currentTime);
            audioElement.pause();
            //console.log(audioElement.currentTime);
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    songNames.forEach((element)=> {
        if(element.innerText === masterSongName.innerText) {
            element.nextElementSibling.childNodes[0].childNodes[1].classList.remove('fa-pause-circle');
            element.nextElementSibling.childNodes[0].childNodes[1].classList.add('fa-play-circle');
        }
    })

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songNames.forEach((element)=> {
        if(element.innerText === masterSongName.innerText) {
            element.nextElementSibling.childNodes[0].childNodes[1].classList.remove('fa-play-circle');
            element.nextElementSibling.childNodes[0].childNodes[1].classList.add('fa-pause-circle');
        }
    })
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    songNames.forEach((element)=> {
        if(element.innerText === masterSongName.innerText) {
            element.nextElementSibling.childNodes[0].childNodes[1].classList.remove('fa-pause-circle');
            element.nextElementSibling.childNodes[0].childNodes[1].classList.add('fa-play-circle');
        }
    })

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songNames.forEach((element)=> {
        if(element.innerText === masterSongName.innerText) {
            element.nextElementSibling.childNodes[0].childNodes[1].classList.remove('fa-play-circle');
            element.nextElementSibling.childNodes[0].childNodes[1].classList.add('fa-pause-circle');
        }
    })
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})