import { NgModule } from '@angular/core';

import { AdalModule } from './adal.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthHttpInterceptor } from './../interceptors/authHttp.interceptor'

@NgModule({
    imports: [AdalModule],
    exports: [],
    declarations: [],
    providers: [ {
        provide:  HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true
    }],
})
export class AuthHttpModule { }
