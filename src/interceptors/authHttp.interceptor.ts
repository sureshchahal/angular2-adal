import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import { AdalService } from 'ngx-adal-test/services/adal.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    private authHeaders: HttpHeaders;
    constructor(
        private adalService: AdalService,
    ) {
    }

    private _setAuthHeaders(access_token: any, token_type = 'Bearer') {
        this.authHeaders = new HttpHeaders();
        this.authHeaders = this.authHeaders.append('Authorization', token_type + ' ' + access_token);
        this.authHeaders = this.authHeaders.append('Content-Type', 'application/json');
    }

    handleInterception(
        token: string,
        request: HttpRequest<any>,
        next: HttpHandler
      ) {
        if (this.adalService.userInfo.isAuthenticated) {
            // setting authHeaders
            this._setAuthHeaders(token);
             request =   request.clone({
                    headers: this.authHeaders
                });
        } else {
            throw new Error('User Not Authenticated.');
        }
        return next.handle(request).catch(this.handleError);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         const resource: any  = this.adalService.GetResourceForEndpoint(request.url);
         const token: any = this.adalService.acquireToken(resource);
        if (resource) {
            if (token instanceof Observable) {
                return token.mergeMap((asyncToken: string) => {
                    return this.handleInterception(asyncToken, request, next);
                });
            } else {
                return this.handleInterception(token, request, next);
            }
        } else {
            return next.handle(request);
        }
      }

      private handleError(error: any) {
        return Observable.throw(error);
    }
}
