/*-----Angular------*/
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InputTrimModule } from 'ng2-trim-directive';

/*-----Environment------*/
import { environment as config } from '../../environments/environment';


/*-----Authentication------*/
import { AuthGuard } from './guards/auth.guard';

/*-----Class------*/
import { ComponentActions } from './classes/utils/component-actions';


/*-----Service------*/
import { TimeService } from './services/helpers/time.service';
import { PagerService } from './services/helpers/pager.service';

/*-----Component------*/
import { ModelSearchComponent } from './components/model-search/model-search.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModelContainerViewComponent } from './components/model-container-view/model-container-view.component';
import { AlertConfirmComponent } from './components/alert-confirm/alert-confirm.component';
import { SelectDropdownComponent } from './components/select-dropdown/select-dropdown.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { UploadComponent } from './components/upload/upload.component';
import { ModelRemarkComponent } from './components/model-remark/model-remark.component';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { LoadingComponent } from './components/loading/loading.component';
import { PrimaryLayoutComponent } from './layout/primary-layout/primary-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HeaderComponent } from './components/core/header/header.component';
import { SideNavComponent } from './components/core/side-nav/side-nav.component';
import { LoginComponent } from '../common/login/login.component';
import { RegisterComponent } from '../common/register/register.component';
import { ResetPasswordComponent } from '../common/reset-password/reset-password.component';
import { User } from './classes/user/user';
import { Area } from './classes/area';
import { AuthGuardAdmin } from './guards/auth-admin.guard';
import { Level } from './classes/level';
import { Team } from './classes/team';
import { Gridiron } from './classes/gridiron';
import { Career } from './classes/career';
import { InfoCommon } from './classes/info-common';
import { Match } from './classes/match';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(config.firebase.appConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        InputTrimModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [
        ModelContainerViewComponent,
        AlertConfirmComponent,
        DataTableComponent,
        SelectDropdownComponent,
        ModelSearchComponent,
        DatePickerComponent,
        UploadComponent,
        ModelRemarkComponent,
        LoadingComponent,
        PrimaryLayoutComponent,
        MainLayoutComponent,
        FooterComponent,
        HeaderComponent,
        SideNavComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent
    ],
    exports: [
        ReactiveFormsModule,
        HttpModule,
        ModelContainerViewComponent,
        AlertConfirmComponent,
        DataTableComponent,
        SelectDropdownComponent,
        ModelSearchComponent,
        DatePickerComponent,
        UploadComponent,
        LoadingComponent,
        PrimaryLayoutComponent,
        MainLayoutComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent
    ],
    providers: [
        User,
        ComponentActions,
        AuthGuard,
        AuthGuardAdmin,
        Area,
        Level,
        Team,
        Gridiron,
        Career,
        InfoCommon,
        Match
    ]
})
export class SharedModule { }
