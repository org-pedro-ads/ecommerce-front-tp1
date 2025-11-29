import { Component } from '@angular/core';
import { Header } from "../../../../core/header/header";
import { Footer } from "../../../../core/footer/footer";

@Component({
  selector: 'app-list-products',
  imports: [Header, Footer],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

}
