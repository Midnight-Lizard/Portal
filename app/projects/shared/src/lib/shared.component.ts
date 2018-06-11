import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'common-shared',
  template: `
    <p>
      shared works!
    </p>
  `,
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit
{
  constructor() { }

  ngOnInit()
  {
  }
}
