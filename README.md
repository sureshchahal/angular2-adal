# ng2-adal

`master` branch of this repo is now Angular 4+ compatible. Thanks to @Cyberdada.
For Angular2, I have created a separate `Angular 2` branch. NPM package starting from version 2.0 is for Angular 4. Packages 1.x are for Angular 2.

**BREAKING CHANGE**: Make sure you're importing AdalService like this: `import { AdalService } from "ng2-adal/dist/core"`

**Note**: NPM package 1.02 is also Angular 4 and was published by mistake, you can ignore that one


To do authentication against Microsoft Windows Azure AD, using the Microsoft ADAL library underneath. Note this library is extracted from the <b>adal-angular</b> package.

This also provide `AuthHttp` class, which actually gets token in background for external webapis.

NPM Package: https://www.npmjs.com/package/ng2-adal

Example and guideline: 
https://github.com/ranveeraggarwal/angular-adal-quickstart (An example for Angular 4 is on master - Angular 2 has its own branch)

Pop-Up example : https://github.com/mazhisai/ng2-adal-QuickStart

**BREAKING CHANGE **
Usage Http Interceptor

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor} from 'ng2-adal/dist/core'; 

Then in the providers section add:
{
    provide:  HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
}

Do a http request / service example: (Replace the old AuthHttp with the normal HttpClient in your constructor)
 constructor(
            private router: Router,
            private authHttp: HttpClient // AuthHttp = old
            ) { }

 public gettest(): Observable<any> {
        return this.authHttp.get<any>('https://yoururl.com');
 }