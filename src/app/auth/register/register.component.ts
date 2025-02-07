import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Store} from "@ngrx/store";
import * as AuthActions from "../../store/auth.actions"
import {Observable} from "rxjs";
import type { State } from "../../store/auth.reducer"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
  registerForm: FormGroup
  loading$: Observable<boolean>
  error$: Observable<string | null>
  showPassword = false

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: State }>,
  ) {
    this.loading$ = this.store.select((state) => state.auth.loading)
    this.error$ = this.store.select((state) => state.auth.error)
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.store.dispatch(AuthActions.register(this.registerForm.value))
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }
}

