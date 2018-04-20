import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DataSource } from "@angular/cdk/table";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MatSort, MatPaginator } from "@angular/material";

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit
{
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public data: WeatherSource;
    public readonly displayedColumns = ["dateFormatted", "temperatureC", "temperatureF", "summary"];

    constructor(protected http: Http, @Inject('BASE_URL') protected originUrl: string)
    {
    }

    ngOnInit(): void
    {
        this.data = new WeatherSource(this.http, this.originUrl, this.sort, this.paginator);
    }
}

export class WeatherSource extends DataSource<WeatherForecast>
{
    protected readonly _data: BehaviorSubject<WeatherForecast[]> = new BehaviorSubject([]);
    constructor(http: Http, originUrl: string, protected _sort: MatSort, protected _paginator: MatPaginator)
    {
        super();
        http.get(originUrl + 'api/SampleData/WeatherForecasts').subscribe(result =>
        {
            this._data.next(result.json() as WeatherForecast[]);
        });
    }

    connect(): Observable<WeatherForecast[]>
    {
        return Observable.merge(
            this._data.asObservable(),
            this._sort.sortChange,
            this._paginator.page).map(() =>
            {
                return this.getSortedData();
            });
    }

    protected getSortedData()
    {
        const data = this._data.value;
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        if (!this._sort.active || this._sort.direction == '')
        {
            return data.splice(startIndex, this._paginator.pageSize);
        }
        return data.sort((a, b) =>
        {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active)
            {
                case 'dateFormatted': [propertyA, propertyB] = [a.dateFormatted, b.dateFormatted]; break;
                case 'temperatureC': [propertyA, propertyB] = [a.temperatureC, b.temperatureC]; break;
                case 'temperatureF': [propertyA, propertyB] = [a.temperatureF, b.temperatureF]; break;
                case 'summary': [propertyA, propertyB] = [a.summary, b.summary]; break;
            }

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        }).splice(startIndex, this._paginator.pageSize);
    }

    disconnect(): void { }
}

interface WeatherForecast
{
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
