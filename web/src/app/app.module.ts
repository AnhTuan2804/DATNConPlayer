import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedServicesModule } from './shared/shared.services.module';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { Routing } from './app.routing';
import { ToastrModule } from 'ngx-toastr'
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedServicesModule,
    SharedModule,
    RouterModule,
    AdminModule,
    UserModule,
    Routing,
    AngularFireModule.initializeApp(environment.firebase.appConfig),
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      enableHtml: true,
      positionClass: 'toast-top-center'
    })
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
