import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../shared/service/validators.service';
import * as customValidators from '../../../shared/validators/validators';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/login.interface';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder);

  public validatorsService = inject(ValidatorsService);
  public authService = inject(AuthService);

  public loginForm = this.formBuilder.group(
    {
      correo: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
      contrasenna: ['', [Validators.required, Validators.minLength(6)]],
    }
  );

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.loginForm, field);
  }

  public getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.loginForm, field);
  }

  get currentLogin(): Login {
    const login = this.loginForm.value as Login;
    return login;
  }

  public onSubmint(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService
      .postLogin(this.currentLogin)
      .subscribe({
        next: ({ jwtToken }) => {
          if (jwtToken) {
            localStorage.setItem('token', jwtToken);
            Swal.fire({
              title: 'Login',
              text: 'Welcome to our service.',
              icon: 'success',
              confirmButtonText: 'Done'
            });
            this.loginForm.reset();
          }
        },
        error: res => console.log(res)
      });
  }
}
