import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BizzblogComponent } from 'src/app/components/bizzclass-components/bizzblog/bizzblog.component';
import { CoursePlayerComponent } from 'src/app/components/bizzclass-components/course-player/course-player.component';
import { CoursesComponent } from 'src/app/components/bizzclass-components/courses/courses.component';
import { VideosComponent } from 'src/app/components/bizzclass-components/videos/videos.component';
import { BizzclassComponent } from './bizzclass.component';
import { QuotesComponent } from 'src/app/components/bizzclass-components/quotes/quotes.component';
import { PodcastsComponent } from 'src/app/components/bizzclass-components/podcasts/podcasts.component';
import { MinuteLessonsComponent } from 'src/app/components/bizzclass-components/minute-lessons/minute-lessons/minute-lessons.component';


const routes: Routes = [
  {
    path: '',
    component: BizzclassComponent,
    children: [
      {
        path: '',
        redirectTo: 'quotes',
        pathMatch: 'full',
      },
      // {
      //   path: 'summary',
      //   component: SummaryComponent,
      // },
     /* {
        path: 'courses',
        component: CoursesComponent,
      },*/
      {
        path: 'quotes',
        component: QuotesComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      },
      {
        path: 'bizzblog',
        component: BizzblogComponent,
      },
      {
        path: 'podcasts',
        component: PodcastsComponent,
      },
      {
        path: 'minute-lessons',
        component: MinuteLessonsComponent,
      },
    ],
  },
  {
    path: 'course-player/:id',
    component: CoursePlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BizzclassRoutingModule {}