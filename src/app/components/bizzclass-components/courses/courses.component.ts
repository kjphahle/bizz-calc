import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesFilterType } from 'src/app/enums/coursesFilter.enum';
import { BizzclassService } from 'src/app/services/bizzclass.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CoursesService } from 'src/app/services/courses.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    standalone: false
})
export class CoursesComponent implements OnInit {
  
CoursesFilterType = CoursesFilterType;
activeFilter: CoursesFilterType = CoursesFilterType.ALL;
bizzCourses = [];
purchasedCourses = [];
availableCourses = [];
currentCourses = this.bizzCourses;
//videoUrl: SafeResourceUrl;
safeSrc: SafeResourceUrl | null = null;
allCourses;
loading: boolean = false;
faXmark = faXmark;

constructor(
  private router: Router,
  private bizzClassService: BizzclassService,
  private paymentService: PaymentService,
  private modalService: NgbModal,
  private sanitizer: DomSanitizer,
  private coursesService: CoursesService
) {}

setActiveFilter(filter: CoursesFilterType) {
  this.activeFilter = filter;
  if (filter == CoursesFilterType.AVAILABLE) {
    this.currentCourses = this.availableCourses;
  } else if (filter == CoursesFilterType.PURCHASED) {
    this.currentCourses = this.purchasedCourses;
  } else {
    this.currentCourses = this.bizzCourses;
  }
}

openCourse(course) {
  this.bizzClassService.currentCourse = course;
  this.router.navigate(['main', 'bizzclass', 'course-player', course.id]);
}

buyCourse(course) {
  this.paymentService.setProduct(course);
  this.router.navigateByUrl('/main/payment');
}

// 0 for its purchased 1 for not purchased
filterCourses() {
  this.bizzCourses.forEach((course) => {
    if (course.purchased == 1) {
      this.purchasedCourses.push(course);
    } else {
      this.availableCourses.push(course);
    }
  });
}

setNewVideoSource(id: string) {
  this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://api.asone.global/api/BizzBean/v1/video/' + id
  );
}

openVideoModal(content, id) {
  this.setNewVideoSource(id);
  this.modalService.open(content, { size: 'lg' });
}

closeModal() {
  this.modalService.dismissAll();
}

async ngOnInit() {
  this.bizzCourses = await this.bizzClassService.getBizzCourses();
  this.filterCourses();
  this.currentCourses = this.bizzCourses;

  const courses = await this.coursesService.getCourses();
        this.allCourses = await Promise.all(courses);
}
}


