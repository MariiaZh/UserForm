import { ValidEmailService } from './async-validator.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class AsyncEmailValidator {
    static createValidator(validEmailService: ValidEmailService): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return validEmailService.fakeHttp(control.value).pipe(
                map((result: boolean) => result ? null : { invalidAsync: true })
            );
        };
    }
}
