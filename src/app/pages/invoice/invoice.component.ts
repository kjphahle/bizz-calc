import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss'],
    standalone: false
})
export class InvoiceComponent {
  @ViewChild('content', {static: false}) el!: ElementRef;
  
  title = 'Invoice';
  makePDF() {
    // Use html2canvas to capture the entire content as an image
    html2canvas(this.el.nativeElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'A4');
      const imgProps = pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('TaxInvoice.pdf');
    });
  }
}