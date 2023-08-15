import { AbstractControl, ValidationErrors } from "@angular/forms";


export function passwordMatch(passwordFormControl: AbstractControl) {
  return (rePassFormControl: AbstractControl) => {
    if(passwordFormControl.value !== rePassFormControl.value) {
      return {
        passwordMatch: true
      }
    }
    return null;
  }
}
