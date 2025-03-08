import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  filterOption: string = 'category';
  videos;
  safeSrc: SafeResourceUrl;
  faXmark = faXmark;

  setFilter(filter: string) {
    this.filterOption = filter;
  }

  openModal(template, video) {
    this.setNewVideoSource(video.productUrl);
    this.modalService.open(template, { size: 'lg' });
  }

  setNewVideoSource(url: string) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  swiperBreakpoints = {
    375: { slidesPerView: 1 },
    786: { slidesPerView: 3 }
  };

  constructor(
    private modalService: NgbModal,
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const videosResponse = await this.videoService.getBizzVideos();
    this.videos = await Promise.all(videosResponse);
  }
}
