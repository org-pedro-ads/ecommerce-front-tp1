import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService, Produto } from '../products.service';
import { Header } from '../../../core/header/header';
import { Footer } from '../../../core/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-products',
  imports: [ReactiveFormsModule, Header, Footer],
  templateUrl: './register-products.html',
  styleUrl: './register-products.css',
})
export class RegisterProducts {
  isSubmitting = signal(false);
  submitted = signal(false);
  private router = inject(Router);
  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder)

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

  submit() {
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

    this.productsService.cadastrar(produto).subscribe({
      next: (res) => {
        console.log('Produto cadastrado com sucesso:', res);

        this.form.reset({
          categoria: 'Eletrônicos',
          preco: 0,
          quantidadeEstoque: 0
        });

        this.isSubmitting.set(false);
        this.submitted.set(false);

        this.router.navigate(['/products/product-management/list']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto:', err);
        this.isSubmitting.set(false);
      }
    });
  }

  clearForm() {
    this.form.reset({
      categoria: 'Eletrônicos',
      preco: 0,
      quantidadeEstoque: 0
    });
    this.submitted.set(false);
  }
}
