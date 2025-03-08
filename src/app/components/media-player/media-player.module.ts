import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPlayerComponent } from './media-player.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MediaPlayerComponent],
  imports: [CommonModule, NgbProgressbarModule],
  exports: [MediaPlayerComponent],
})
export class MediaPlayerModule {}
