import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterModule } from './common/footer/footer.module';
import { HeaderModule } from './common/header/header.module';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './common/sidebar/sidebar.module';



@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    RouterModule,
    SidebarModule
  ]
})
export class LayoutModule { }
