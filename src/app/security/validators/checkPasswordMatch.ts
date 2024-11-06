import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkPasswordMatch(toCompare: string): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    const passwordControl = confirmPasswordControl.parent?.get(toCompare);
    if (!passwordControl || confirmPasswordControl.value === '') {
      return null
    }
    return confirmPasswordControl.value === passwordControl.value ? null : { mismatch: true };
  };
}
