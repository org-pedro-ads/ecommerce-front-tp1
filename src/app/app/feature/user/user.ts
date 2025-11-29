import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;

  constructor() {
    this.id = 'default-id';
    this.name = 'Default Name';
    this.email = 'Default Email';
    this.phone = 'Default Phone';
    this.address = 'Default Address';
    this.createdAt = new Date();
  }
}
