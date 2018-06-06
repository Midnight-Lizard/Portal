import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new Subject();
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}