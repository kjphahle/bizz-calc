import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;

  faPencilAlt = faPencilAlt;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  cancel() {
    this.isEditing = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
