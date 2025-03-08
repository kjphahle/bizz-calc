import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BizzclassService } from 'src/app/services/bizzclass.service';
import { CoursesComponent } from '../courses/courses.component';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
    selector: 'app-course-player',
    templateUrl: './course-player.component.html',
    styleUrls: ['./course-player.component.scss'],
    standalone: false
})
export class CoursePlayerComponent implements OnInit {
  hidePlaylist: boolean = false;
  isHidden: boolean = false;
  playlist = [];
  currentVideo = { id: '' };
  currentImage = { id: '' };
  imageList = [];
  courseId;

  imageLookUp = {
    244545: '../../../assets/minified/costrecovery-min.png',
    244546: '../../../assets/minified/profitoptimizer-min.png',
    244547: '../../../assets/minified/financialreports-min.png',
    244548: '../../../assets/minified/businesstools-min.png',
  };

  onVideoChange(videoObj) {
    this.currentVideo = videoObj.video;
    this.currentImage = videoObj.currentImage;
  }

  togglePlaylist() {
    this.hidePlaylist = !this.hidePlaylist;
    if (this.hidePlaylist) {
      setTimeout(() => {
        this.isHidden = !this.isHidden;
      }, 250);
    } else {
      setTimeout(() => {
        this.isHidden = !this.isHidden;
      }, 400);
    }
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  constructor(
    private router: Router,
    private acitvateRoute: ActivatedRoute,
    private bizzclassService: BizzclassService,
    private coursesServce:CoursesService
  ) {}

  async ngOnInit() {
    this.courseId = this.acitvateRoute.snapshot.paramMap.get('id');
    let courseResponse = await this.bizzclassService.getCurrentCourse(this.courseId);
  
    // Set playlist and imageList correctly
    this.playlist = courseResponse.videoList; // Should contain all videos starting from C
    this.imageList = courseResponse.imageList; // Should contain all images starting from C
  
    // Ensure current video and image start from the first respective elements
    this.currentVideo = this.playlist.length > 0 ? this.playlist[0] : {};
    this.currentImage = this.imageList.length > 0 ? this.imageList[0] : {};
  }
}