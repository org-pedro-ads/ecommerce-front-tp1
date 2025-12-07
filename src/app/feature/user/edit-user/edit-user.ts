import { Component } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-edit-user',
  imports: [],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  user: User;

  constructor() {
    this.user = new User();
  }

}
