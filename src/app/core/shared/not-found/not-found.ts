import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  @Input() title: string = "Página não encontrada";
  @Input() message: string = "A página que você tentou acessar não existe ou foi removida.";
}
