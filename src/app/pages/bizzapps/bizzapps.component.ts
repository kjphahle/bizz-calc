import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BizzappsService } from 'src/app/services/bizzapps.service';

@Component({
    selector: 'app-bizzapps',
    templateUrl: './bizzapps.component.html',
    styleUrls: ['./bizzapps.component.scss'],
    standalone: false
})
export class BizzappsComponent implements OnInit {

  bizzApps;
  safeSrc: SafeResourceUrl | null = null;
  loading: boolean = false;
  faXmark = faXmark;

  openVideoModal(content, id) {
    this.setNewVideoSource(id);
    this.modalService.open(content, { size: 'lg' });
  }

  setNewVideoSource(id: string) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://api.asone.global/api/BizzBean/v1/video/' + id
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  constructor(
    private bizzappsService: BizzappsService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,

  ) { }
  async ngOnInit() {
    const apps = await this.bizzappsService.getBizzApps();
    this.bizzApps = await Promise.all(apps);

  }
}
