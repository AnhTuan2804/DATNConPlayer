import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BaseService } from './services/helpers/base.service';
import { TimeService } from './services/helpers/time.service';
import { UploadFileService } from './services/helpers/upload-file.service';
import { PagerService } from './services/helpers/pager.service';
import { DataCommonService } from './services/helpers/data-common.service';
import { EncodeDecodeService } from './services/helpers/encode-decode.service';


@NgModule({
    providers: [
        BaseService,
        TimeService,
        UploadFileService,
        PagerService,
        DataCommonService,
        EncodeDecodeService
    ]
})
export class SharedServicesModule {
    constructor(@Optional() @SkipSelf() parentModule: SharedServicesModule) {
        if (parentModule) {
            throw new Error('SharedServicesModule is already loaded. Import it in the AppModule only');
        }
    }
}
