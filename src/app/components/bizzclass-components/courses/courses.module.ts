import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';


import { CoursePlayerComponent } from '../course-player/course-player.component';
import { MediaPlayerModule } from '../../media-player/media-player.module';
import { PlaylistModule } from '../../playlist/playlist.module';


@NgModule({
  declarations: [CoursesComponent,
    CoursePlayerComponent,

  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MediaPlayerModule,
    PlaylistModule,
  ],
  exports: [

    CoursePlayerComponent,
 
  ],
})






export class CoursesModule { }