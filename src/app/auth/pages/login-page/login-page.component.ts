import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../shared/service/validators.service';
import * as customValidators from '../../../shared/validators/validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder);

  public validatorsService = inject(ValidatorsService);

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

  public onSubmint(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('this.loginForm.value ', this.loginForm.value);
  }
}
