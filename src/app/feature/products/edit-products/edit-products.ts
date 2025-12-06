import { Component, inject } from '@angular/core';
import { ProductsService, Produto } from '../products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-products.html',
  styleUrl: './edit-products.css',
})

export class EditProducts {
  product!: Produto;
  caracteristicasInput = "";

  private produtosService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('>>>>>>>>>>>>>>>>>>>>', id)
    this.product = { ...this.produtosService.buscarPorId(id) };
    this.caracteristicasInput = this.product.caracteristicas.join(', ');
  }

  save() {
    this.product.caracteristicas = this.caracteristicasInput
      .split(',')
      .map(c => c.trim());

    this.produtosService.atualizar(this.product.id, this.product);

    alert('Produto atualizado com sucesso!');
    this.router.navigate(['/produtos']);
  }
}
