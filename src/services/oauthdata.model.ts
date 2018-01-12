import { Observable } from "rxjs/Observable";

export interface OAuthData {
    isAuthenticated: boolean;
    authenticationStatus: Observable<boolean>;
    userName: string;
    loginError: string;
    profile: any;
}