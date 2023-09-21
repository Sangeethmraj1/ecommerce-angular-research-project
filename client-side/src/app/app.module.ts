import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from "@angular/router";
import { FooterModule } from './layout/common/footer/footer.module';
import { Routes } from './app.routing';
import { SignInModule } from './modules/auth/sign-in/sign-in.module';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthModule } from 'src/app/core/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiModule } from './core/api/api.module';
const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [ AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes, routerConfig),
    BrowserAnimationsModule,
    LayoutModule,
    MatSnackBarModule,
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
