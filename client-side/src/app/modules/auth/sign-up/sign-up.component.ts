import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastService } from 'src/app/core/toast/toast';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm!: NgForm;
  signUpForm!: UntypedFormGroup
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', Validators.required],
    });
  }


  submit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.authservice.signup(this.signUpForm.value).subscribe({
      next: (res) => {
        this.toast.success('User created')
        this.router.navigateByUrl('/')
      }
    })

  }

}


