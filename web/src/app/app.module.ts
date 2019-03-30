import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedServicesModule } from './shared/shared.services.module';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { Routing } from './app.routing';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    RegisterComponent,
    PageErrorComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    SharedServicesModule,
    SharedModule,
    RouterModule,
    AdminModule,
    UserModule,
    Routing,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
