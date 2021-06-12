import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ValidEmailService {

    private existEmail: string = "test@test.test";

    fakeHttp(value: string) {
        return of(!this.existEmail.includes(value)).pipe(delay(2000));
    }
}