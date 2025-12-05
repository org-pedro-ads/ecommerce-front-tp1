import { Component } from '@angular/core';
import { Header } from "../../../../core/header/header";
import { Footer } from "../../../../core/footer/footer";

@Component({
  selector: 'app-register',
  imports: [Header, Footer],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
