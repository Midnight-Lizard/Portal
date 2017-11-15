import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ExternalScriptLoader
{
    constructor(protected readonly http: HttpClient) { }

    load(url: string)
    {
        return this.http.get(url, { observe: "response", responseType: 'text' })
            .toPromise();
    }
}