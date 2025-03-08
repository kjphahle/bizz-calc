import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DocumentsType } from 'src/app/enums/documents.enum';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
    standalone: false
})
export class DocumentsComponent implements OnInit {
  documentsType = DocumentsType;
  documentScreen: DocumentsType = this.documentsType.BUTTONS;

  //icons
  faChevronLeft = faChevronLeft;

  constructor() {}

  setContent(screen: DocumentsType) {
    this.documentScreen = screen;
  }

  ngOnInit(): void {}
}
