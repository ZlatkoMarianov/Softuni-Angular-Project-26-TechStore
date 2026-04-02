import { Component, inject } from '@angular/core';
import { AutofocusDirective } from '../../../shared/directives/autofocus.directive';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../../shared/validators/email.validator';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AutofocusDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  readonly loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required]],
  });

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.authService.setUser(user);
        this.toast.success(`Welcome back, ${user.username}!`);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || err?.message || 'Login failed. Please try again.');
      },
    });
  }
}