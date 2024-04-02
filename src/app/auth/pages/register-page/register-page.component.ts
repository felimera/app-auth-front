import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  private formBuilder = inject(FormBuilder);

  public validatorsService = inject(ValidatorsService);
  public authService = inject(AuthService);

  public userForm = this.formBuilder.group(
    {
      nombres: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
      correo: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
      contrasenna: ['', [Validators.required, Validators.minLength(6)]],
      contrasenna2: ['', [Validators.required]],
    }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('contrasenna', 'contrasenna2')
    ]
  });

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.userForm, field);
  }

  public getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.userForm, field);
  }

  get currentUser(): User {
    const user = this.userForm.value as User;
    return user;
  }

  public onSubmint() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.authService
      .createUserAll(this.currentUser)
      .subscribe({
        next: (resp) => {
          if (resp) {
            Swal.fire({
              title: 'Signup',
              text: `Creation of ${resp.userDto.nombres}' record was successes.`,
              icon: 'success',
              timer: 2500,
              confirmButtonText: 'Done'
            });
            setTimeout(() => {
              this.userForm.reset();
              localStorage.setItem('token', resp.loginResponseDto.jwtToken);
            }, 2500);
          }
        }
      })
  }
}
