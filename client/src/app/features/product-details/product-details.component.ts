import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { finalize } from 'rxjs';
import { Comment } from '../../shared/interfaces/comment';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-product-details',
  imports: [DecimalPipe, DatePipe, TitleCasePipe, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private toast = inject(ToastService);

  product = signal<Product | null>(null);
  comments = signal<Comment[]>([]);
  commentText = '';
  isSubmitting = signal(false);

  get isOwner(): boolean {
    const user = this.authService.currentUser();
    return !!user && !!this.product() && user._id === this.product()?.owner?._id;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.toast.error('Invalid product ID');
      this.router.navigate(['/catalog']);
      return;
    }

    this.loadProduct(id);
    this.loadComments(id);
  }

  loadProduct(id: string): void {
    this.productService.getById(id)
      .subscribe({
        next: (data) => this.product.set(data),
        error: () => {
          this.toast.error('Product not found');
          this.router.navigate(['/catalog']);
        },
      });
  }

  loadComments(productId: string): void {
    this.productService.getComments(productId).subscribe({
      next: (data) => this.comments.set(data),
      error: () => this.comments.set([]),
    });
  }

  onDelete(): void {
    const product = this.product();
    if (!product) return;

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.delete(product._id).subscribe({
      next: () => {
        this.toast.success('Product deleted successfully');
        this.router.navigate(['/catalog']);
      },
      error: () => this.toast.error('Failed to delete product'),
    });
  }

  onEdit(): void {
    const product = this.product();
    if (!product) return;
    this.router.navigate(['/products', product._id, 'edit']);
  }

  onAddComment(): void {
    const product = this.product();
    if (!product || !this.commentText.trim()) return;

    this.isSubmitting.set(true);
    this.productService.addComment(product._id, this.commentText.trim())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (comment) => {
          this.comments.update(comments => [...comments, comment]);
          this.commentText = '';
        },
        error: () => this.toast.error('Failed to add comment'),
      });
  }
}

