import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { ApiServices } from './api.service';
import { environment } from '../../environment/environment';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: 'BASE_URL', useValue:  environment.apiUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    ApiServices
  ]
})
export class ApiModule {}