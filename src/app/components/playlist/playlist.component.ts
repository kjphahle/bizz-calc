import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BizzclassService } from 'src/app/services/bizzclass.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss'],
    standalone: false
})
export class PlaylistComponent implements OnInit {
 
  constructor(
    private bizzclassService: BizzclassService,
    private acitvateRoute: ActivatedRoute,
    
  ) {}
  @Input() videos: Array<{}>;
  @Input() images: Array<{}>;
  @Output() videoClicked: any = new EventEmitter();
  currentVideo: any = {};
  currentImage: any = {};
  currentVideoIndex = 0;
  courseImageId: string;
  downloadLink: string = '';

  mediaB1: string = '';

  async downloadContent() {
    this.downloadLink = await this.bizzclassService.donwloadContent(
      this.courseImageId
    );
    let link = document.createElement('a');
    link.href = this.downloadLink;
    link.click();
  }

  onVideoClick(video, index) {
    this.currentVideo = video;
    this.currentVideoIndex = index;
    this.currentImage = this.images[index];
    const videoObj = {
      video,
      currentImage: this.currentImage,
    };
    this.videoClicked.emit(videoObj);
  }

  async ngOnInit() {
    // Retrieve the current course details, including the B1 media
    this.courseImageId = this.acitvateRoute.snapshot.paramMap.get('id');
    const currentCourseData = await this.bizzclassService.getCurrentCourse(this.courseImageId);
    

    // Set the videos and images from the current course
    this.videos = currentCourseData.videoList;
    this.images = currentCourseData.imageList;

    // Get the B1 image URL
    this.mediaB1 = currentCourseData.mediaB1;

    // Initialize current video and image
    this.currentVideo = this.videos[0];
    this.currentImage = this.images[0];
  }
}