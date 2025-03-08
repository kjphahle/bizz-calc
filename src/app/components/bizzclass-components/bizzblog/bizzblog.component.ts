import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BizzblogService } from 'src/app/services/bizzblog.service';
import { SwiperContainer } from 'swiper/element/bundle';

@Component({
    selector: 'app-bizzblog',
    templateUrl: './bizzblog.component.html',
    styleUrls: ['./bizzblog.component.scss'],
    standalone: false
})
export class BizzblogComponent implements OnInit {
  filterOption: string = 'category';
  currentBlog;
  blogContent;
  blogs;
  faXmark = faXmark;

  @ViewChild('homeSlide', { static: true }) public homeSlide: SwiperContainer;

  async openModal(template, blog) {
    this.currentBlog = blog;
    this.blogContent = await this.bizzblogService.getComments(
      this.currentBlog.id
    );
    this.modalService.open(template, { size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.currentBlog = undefined;
    this.blogContent = undefined;
  }

  constructor(
    private modalService: NgbModal,
    private bizzblogService: BizzblogService
  ) {}

  swiperBreakpoints = {
    375: { slidesPerView: 1 },
    786: { slidesPerView: 3 }
  };

  async ngOnInit() {
    const blogsResponse = await this.bizzblogService.getBizzBlogs();
    this.blogs = await Promise.all(blogsResponse);

    // Sort blogs in the component
 this.blogs = this.blogs.sort((a, b) => a.productCode.localeCompare(b.productCode));
}

  setFilter(filter: string) {
    this.filterOption = filter;
  }

  goToNextPage() {
    this.homeSlide.swiper.slideNext();
  }

}
