import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from 'src/app/services/video.service';
import { PodcastsService } from 'src/app/services/podcasts.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-podcasts',
    templateUrl: './podcasts.component.html',
    styleUrls: ['./podcasts.component.scss'],
    standalone: false
})
export class PodcastsComponent implements OnInit {
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
    private podcastService: PodcastsService,
    private sanitizer: DomSanitizer

  ) {}

  async ngOnInit() {
    const videosResponse = await this.podcastService.getBizzVideos();
    this.videos = await Promise.all(videosResponse);
  }
}