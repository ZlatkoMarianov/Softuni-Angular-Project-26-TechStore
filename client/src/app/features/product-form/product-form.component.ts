import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);

  isEditMode = false;
  productId: string | null = null;
  isSaving = signal(false);

  readonly categories = ['Phone', 'Laptop', 'Tablet', 'Accessory'];

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [null, [Validators.required, Validators.min(0.01)]],
    category: ['Phone', [Validators.required]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.productService.getById(this.productId).subscribe({
        next: (product) => this.form.patchValue({
          name: product.name,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
          description: product.description,
        }),
        error: () => {
          this.toast.error('Product not found!');
          this.router.navigate(['/catalog']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const productData = this.form.value;
    this.isSaving.set(true);

    const request$ = this.isEditMode && this.productId
      ? this.productService.update(this.productId, productData)
      : this.productService.create(productData);

    request$.subscribe({
      next: (product) => {
        this.toast.success(this.isEditMode ? 'Product updated!' : 'Product created!');
        this.router.navigate(['/products', product._id]);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.toast.error(err?.error?.message || 'Something went wrong');
      },
    });
  }

  get name() { return this.form.get('name')!; }
  get price() { return this.form.get('price')!; }
  get category() { return this.form.get('category')!; }
  get imageUrl() { return this.form.get('imageUrl')!; }
  get description() { return this.form.get('description')!; }
}
