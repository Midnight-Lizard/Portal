import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { readFileSync } from 'fs';
import { resolve } from 'url';

@Injectable()
export class AssetsInterceptor implements HttpInterceptor
{
    constructor(
        @Inject('ORIGIN_URL')
        private readonly baseUrl: string,
        @Inject('DIST_PATH')
        private readonly distPath: string) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if ((req.url.startsWith(resolve(this.baseUrl, '/assets'))))
        {
            return of(new HttpResponse({
                body: readFileSync(join(this.distPath, 'portal-browser',
                    req.url.substr(this.baseUrl.length)), 'utf8')
            }));
        }
        return next.handle(req);
    }
}
