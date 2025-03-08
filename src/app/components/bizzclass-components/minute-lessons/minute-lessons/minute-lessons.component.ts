import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MinuteLessonsService } from 'src/app/services/minute-lessons.service';

@Component({
  selector: 'app-minute-lessons',
  templateUrl: './minute-lessons.component.html',
  styleUrls: ['./minute-lessons.component.scss'],
})
export class MinuteLessonsComponent implements OnInit {
  filterOption: string = 'category';
  videos;
  safeSrc: SafeResourceUrl;
  bizzVideos;
  faXmark = faXmark;
  setFilter(filter: string) {
    this.filterOption = filter;
  }

  openModal(template, id) {
    this.setNewVideoSource(id);
    this.modalService.open(template, { size: 'lg' });
  }

    setNewVideoSource(id: string) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://api.asone.global/api/BizzBean/v1/video/' + id
      );
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
    private minutelessonsService: MinuteLessonsService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const videos = await this.minutelessonsService.getBizzVideos();
    this.bizzVideos = await Promise.all(videos);

  }
}
