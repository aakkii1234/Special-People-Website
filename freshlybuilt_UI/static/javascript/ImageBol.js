// Variables for Preview
const wrapper=document.querySelector(".wrapper");
const fileName=document.querySelector(".file-name");
const cancelBtn=document.querySelector("#cancel-btn");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const img = document.querySelector("#img1");
let regExp= /[ 0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
// Variables for Audio
var songs = ["static/Vakratunda-Mahakay-Shlok-Mp3-Ringtone.mp3","Song2.mp3","Song3.mp3"];
var songTitle = document.getElementById("songTitle");
var fillBar = document.getElementById("fill");
var song = new Audio();
	var currentSong = 0;    
    // Preview
    function defaultBtnActive(){
       defaultBtn.click();
    }
    defaultBtn.addEventListener("change", function(){
      const file=this.files[0];
      if(file){
        const reader= new FileReader();
        reader.onload=function(){
          const result= reader.result;
          img.src=result;
          wrapper.classList.add("active");
        }
        cancelBtn.addEventListener("click", function(){
          img.src="";
           wrapper.classList.remove("active");
        });  
        reader.readAsDataURL(file);
      }
      if(this.value){
        let valueStore=this.value.match(regExp);
        fileName.textContent= valueStore; 
        }
    });
// Audio player
		window.onload = playSong;   
        function playSong(){
			song.src = songs[currentSong];  
			songTitle.textContent = songs[currentSong]; 
			song.play();    
        }
		function playOrPauseSong(){
				if(song.paused){
					song.play();
				$("#play img").attr("src","static/images/Pause.png");
				}
				else{
					song.pause();
				$("#play img").attr("src","static/images/Play.png");
				}
		}
		song.addEventListener('timeupdate',function(){ 
			var	position = song.currentTime / song.duration;
				fillBar.style.width = position * 100 +'%';
			});
		function next(){
			currentSong++;
			if(currentSong > 2){
				currentSong = 0;
			}
			playSong();
			$("#play img").attr("src","static/images/Pause.png");
		}
		function pre(){
			currentSong--;
			if(currentSong < 0){
				currentSong = 2;
			}
			playSong();
			$("#play img").attr("src","static/images/Pause.png");
		}