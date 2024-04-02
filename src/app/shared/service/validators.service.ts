import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required.';

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} caracters.`;

        case 'pattern':
          return this.getMessageReturn(form, field);
      }
    }
    return null;
  }

  private getMessageReturn(form: FormGroup, field: string): string | null {
    if (field === 'nombres')
      return `The full name must have at least two strings of characters separated by a blank space.`;
    if (field === 'correo')
      return `The email ( ${form.get('correo')?.value} ) is not formatted correctly. Ex: value@value.com`;

    return null;
  }
}
