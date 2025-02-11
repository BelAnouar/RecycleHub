import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Store} from "@ngrx/store";

import { Observable } from 'rxjs';
import type { State } from "../../store/auth.reducer"
import { login } from '../../store/auth.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading$: Observable<boolean>
  error$: Observable<string | null>
  showPassword = false

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: State }>,
        private toastr: ToastrService
  ) {
    this.loading$ = this.store.select((state) => state.auth.loading)
    this.error$ = this.store.select((state) => state.auth.error)
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(login(this.loginForm.value))

      this.toastr.success('Registration successful!', 'Success');
      this.loginForm.reset();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }
  ngOnInit(): void {
      
  }
}

