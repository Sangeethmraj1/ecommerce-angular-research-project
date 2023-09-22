import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastService } from 'src/app/core/toast/toast';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm
  signInForm!: UntypedFormGroup

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast:ToastService
  ) { }

  ngOnInit(): void {
    console.log('sign in component');
    
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  Submit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.signIn(this.signInForm.value).subscribe({
      next: (response: any) => {
        const token = response.token
        console.log(response.user.role);
        
        localStorage.setItem('token', token)
        localStorage.setItem('role',response.user.role)
        if(response.user.role==='User'){
          this.router.navigateByUrl('/home')

        }else{
          this.router.navigateByUrl('/users')
        }
        this.toast.success('Login successfull')
      },
      error: (error: any) => {
        this.toast.error(error.error.message)
        this.signInNgForm.resetForm()
      }
    })
  }
}
