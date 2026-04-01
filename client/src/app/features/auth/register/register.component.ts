import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { emailValidator } from '../../../shared/validators/email.validator';
import { passwordsMatchValidator } from '../../../shared/validators/passwordMatch.validator';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  readonly loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, emailValidator()]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    }, { validators: passwordsMatchValidator }),
  });

  get passwordsGroup(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { username, email, passwords } = this.registerForm.value;

    this.authService.register({
      username,
      email,
      password: passwords.password,
      rePassword: passwords.rePassword,
    }).subscribe({
      next: (user) => {
        this.authService.setUser(user);
        this.toast.success(`Welcome, ${user.username}! Your account has been created.`);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || err?.message || 'Registration failed. Please try again.');
      },
    });
  }
}
