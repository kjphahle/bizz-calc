import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('videoContainer') videoContainer: ElementRef;
  @ViewChild('volumeSlider') volumeSlider: ElementRef;
  @ViewChild('timeLineContainer') timeLineContainer: ElementRef;
  @ViewChild('controls') controls: ElementRef;
  isPlaying: boolean = false;
  isFullScreen: boolean = false;
  isMiniPlayer: boolean = false;
  volumeLevel: string = 'high';
  totalTime: any;
  currentTime: any;
  leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  isScrubbing: boolean = false;
  wasPaused: boolean;
  firstTimePlay: boolean = true;
  @Input() currentVideoSource = '';
  @Input() thumbnailId = '';

  togglePlay() {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    } else {
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  startVideo() {
    this.firstTimePlay = false;
    setTimeout(() => {
      this.togglePlay();
    }, 500);
  }

  handleTimeLineUpdate(e) {
    const rect = this.timeLineContainer.nativeElement.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

    if (this.isScrubbing) {
      e.preventDefault();
      this.timeLineContainer.nativeElement.style.setProperty(
        '--progress-position',
        percent
      );
    }
  }

  toggleScrubbing(e) {
    const rect = this.timeLineContainer.nativeElement.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    this.isScrubbing = (e.buttons & 1) === 1;

    if (this.isScrubbing) {
      this.wasPaused = this.videoPlayer.nativeElement.paused;
      this.videoPlayer.nativeElement.pause();
    } else {
      this.videoPlayer.nativeElement.currentTime =
        percent * this.videoPlayer.nativeElement.duration;
      if (!this.wasPaused) this.videoPlayer.nativeElement.play();
    }
  }

  toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
      this.videoContainer.nativeElement.requestFullscreen();
      this.isFullScreen = true;
    } else {
      document.exitFullscreen();
      this.isFullScreen = false;
    }
  }

  toggleMiniPlayerMode() {
    this.videoPlayer.nativeElement.requestPictureInPicture();
    this.isMiniPlayer = true;
  }

  toggleMute() {
    this.videoPlayer.nativeElement.muted =
      !this.videoPlayer.nativeElement.muted;
  }

  setVolume() {
    this.volumeSlider.nativeElement.value =
      this.videoPlayer.nativeElement.volume;
    if (
      this.videoPlayer.nativeElement.muted ||
      this.videoPlayer.nativeElement.volume === 0
    ) {
      this.volumeLevel = 'muted';
      this.volumeSlider.nativeElement.value = 0;
    } else if (this.videoPlayer.nativeElement.volume >= 0.5) {
      this.volumeLevel = 'high';
    } else {
      this.volumeLevel = 'low';
    }
  }

  setTime() {
    this.totalTime = this.formartDuration(
      this.videoPlayer.nativeElement.duration
    );
  }

  updateTime() {
    this.currentTime = this.formartDuration(
      this.videoPlayer.nativeElement.currentTime
    );
    const percent =
      this.videoPlayer.nativeElement.currentTime /
      this.videoPlayer.nativeElement.duration;
    this.timeLineContainer.nativeElement.style.setProperty(
      '--progress-position',
      percent
    );
  }

  formartDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${this.leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${this.leadingZeroFormatter.format(
        minutes
      )}:${this.leadingZeroFormatter.format(seconds)}`;
    }
  }

  updateVolume(e) {
    this.videoPlayer.nativeElement.volume = e.target.value;
    this.videoPlayer.nativeElement.muted = e.target.value === 0;
  }

  skip(duration) {
    this.videoPlayer.nativeElement.currentTime += duration;
  }

  setKeyListner() {
    document.addEventListener('keydown', (e) => {
      const tagName = document.activeElement.tagName.toLowerCase();

      if (tagName === 'input') return;

      switch (e.key.toLowerCase()) {
        case 'f':
          this.toggleFullScreenMode();
          break;
        case 'i':
          this.toggleMiniPlayerMode();
          break;
        case 'm':
          this.toggleMute();
          break;
        case 'arrowleft':
        case 'j':
          this.skip(-5);
          break;
        case 'arrowright':
        case 'l':
          this.skip(5);
          break;
      }
    });
  }

  resetStatus() {
    this.isPlaying = false;
    this.wasPaused = undefined;
    this.firstTimePlay = true;
  }

  resetTimer() {
    let time;
    this.showControls();
    clearTimeout(time);
    time = setTimeout(() => {
      this.hideControls();
    }, 5000);
  }

  showControls() {
    this.controls.nativeElement.style.display = 'block';
  }

  hideControls() {
    this.controls.nativeElement.style.display = 'none';
  }

  ngOnInit(): void {
    this.setKeyListner();
    document.addEventListener('mouseup', (e) => {
      if (this.isScrubbing) this.toggleScrubbing(e);
    });
    document.addEventListener('mousemove', (e) => {
      if (this.isScrubbing) this.handleTimeLineUpdate(e);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('currentVideoSource')) {
      this.resetStatus();
    }
  }

  constructor(private router: Router) {}
}
