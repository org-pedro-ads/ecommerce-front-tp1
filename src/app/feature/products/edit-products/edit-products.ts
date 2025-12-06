import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService, Produto } from '../products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Header } from '../../../core/header/header';
import { Footer } from '../../../core/footer/footer';

@Component({
  selector: 'app-edit-products',
  imports: [ReactiveFormsModule, Header, Footer, RouterLink],
  templateUrl: './edit-products.html',
  styleUrl: './edit-products.css',
})
export class EditProducts {
  isSubmitting = signal(false);
  submitted = signal(false);
  productId!: number;

  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup = this.fb.nonNullable.group({
    nome: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    quantidadeEstoque: new FormControl(0, [Validators.required, Validators.min(0)]),
    descricao: new FormControl('', Validators.required),
    caracteristicas: new FormControl(''),
  });

  canSubmit = computed(() => this.form.valid && !this.isSubmitting());

  categoriaMap: Record<string, string> = {
    'Eletrônicos': 'ELETRONICOS',
    'Roupas': 'ROUPAS',
    'Alimentos': 'ALIMENTOS',
    'Esporte': 'ESPORTE',
    'Moveis': 'MOVEIS',
    'Livros': 'LIVROS'
  };

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.buscarPorId(this.productId).subscribe({
      next: (produto) => {
        // Preenche o formulário com os valores do produto
        this.form.patchValue({
          nome: produto.nome,
          categoria: Object.keys(this.categoriaMap).find(
            key => this.categoriaMap[key] === produto.categoria
          ) || '',
          preco: produto.preco,
          quantidadeEstoque: produto.quantidadeEstoque,
          descricao: produto.descricao,
          caracteristicas: produto.caracteristicas?.join(', ') || ''
        });
      },
      error: (err) => {
        console.error('Erro ao carregar produto:', err);
        alert('Erro ao carregar produto.');
        this.router.navigate(['product-management/edit-products']);
      }
    });
  }

  save() {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    const produto: Partial<Produto> = {
      nome: this.form.value.nome,
      categoria: this.form.value.categoria ? this.categoriaMap?.[this.form.value.categoria] : '',
      preco: this.form.value.preco,
      quantidadeEstoque: this.form.value.quantidadeEstoque,
      descricao: this.form.value.descricao,
      caracteristicas: this.form.value?.caracteristicas
        ?.split(',')
        ?.map((c: string) => c.trim())
    };

    this.productsService.atualizar(this.productId, produto).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitted.set(false);
        this.router.navigate(['/product-management/list']);
      },
      error: (err) => {
        console.error('Erro ao atualizar produto:', err);
        this.isSubmitting.set(false);
      }
    });
  }

  clearForm() {
    this.form.reset();
    this.submitted.set(false);
  }
}
