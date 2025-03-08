import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';

import { VideosComponent } from './videos/videos.component';
//import { CoursePlayerComponent } from './course-player/course-player.component';
import { MediaPlayerModule } from '../media-player/media-player.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BizzblogComponent } from './bizzblog/bizzblog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuotesComponent } from './quotes/quotes.component';
import { MinuteLessonsComponent } from './minute-lessons/minute-lessons/minute-lessons.component';
import { PodcastsComponent } from './podcasts/podcasts.component';

@NgModule({
  declarations: [
    SummaryComponent,
    //CoursesComponent,
    VideosComponent,
    //CoursePlayerComponent,
    BizzblogComponent,
    QuotesComponent,
    MinuteLessonsComponent,
    PodcastsComponent,
  ],
  imports: [
    CommonModule,
    MediaPlayerModule,
    PlaylistModule,
    NgbDropdownModule,
    NgbModalModule,
    FontAwesomeModule,
    //Swiper,
    //SwiperModule,
    //,
  ],
  exports: [
    SummaryComponent,
    //CoursesComponent,
    VideosComponent,
    //CoursePlayerComponent,
    BizzblogComponent,
    QuotesComponent,
    MinuteLessonsComponent,
    PodcastsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BizzclassComponentsModule {}
