import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  audio = new Audio();
  panelOpenState: boolean = false;
  musicCurrentTime!: number;
  musicDuration!: number;
  musicArr: any[] = [
    
  ];
  isPlaying: boolean = false;
  musicId: number = 0;
  addToArr(e: any) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let music = files[i];
      let readMusic = new FileReader();
      readMusic.onload = () => {
        const musicData = {
          musicName: music.name,
          musicUrl: readMusic.result,
        };
        if (
          !this.musicArr.some((item) => item.musicName === musicData.musicName)
        ) {
          this.musicArr.push(musicData);
        }
      };
      readMusic.readAsDataURL(music);
    }
  }

  playPause() {
    if (this.musicArr.length == 0) {
      return;
    }
    if (!this.isPlaying) {
      if (this.audio.src != this.musicArr[this.musicId].musicUrl)
        this.audio.src = this.musicArr[this.musicId].musicUrl;
      this.audio
        .play()
        .then(() => (this.isPlaying = true))
        .catch((err) => {
          console.log("cany't play ", err);
        });
    } else {
      this.audio.pause();
      this.isPlaying = false;
    }
  }
  playMusic(music: any) {
    let url = music.musicUrl;
    this.audio.src = url;
    this.audio.play().then((_) => {
      this.isPlaying = true;
      this.musicId = this.musicArr.indexOf(music);
    });
  }
  prevMusic() {
    if (this.musicId == 0 || this.musicArr.length == 0) {
      return;
    }
    this.musicId--;
    this.audio.src = this.musicArr[this.musicId].musicUrl;
    this.audio.play().then((_) => {
      this.isPlaying = true;
    });
  }
  nextMusic() {
    if (this.musicId == this.musicArr.length - 1 || this.musicArr.length == 0) {
      return;
    }
    this.musicId++;
    this.audio.src = this.musicArr[this.musicId].musicUrl;
    this.audio.play().then((_) => {
      this.isPlaying = true;
    });
  }
  ngOnInit(): void {
    this.audio.addEventListener('timeupdate', () => {
      this.musicCurrentTime = this.audio.currentTime;
      this.musicDuration = this.audio.duration;
      if (this.musicCurrentTime == this.musicDuration) {
        this.nextMusic();
      }
    });
  }
  progressArea(ev: any) {
    if (this.musicArr.length > 0)
      this.audio.currentTime =
        (ev.offsetX / ev.target.clientWidth) * this.musicDuration;
  }
}
