import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { ICellEditorAngularComp } from 'ag-grid-angular';
import { Autowired, ValueFormatterService } from 'ag-grid-community';

@Component({
  selector: 'custom-lookup-dropdown',
  template: `         
              <select  #input class="ag-cell-edit-input"  [(ngModel)]="value">
               <option hidden disabled selected value></option>
               <option *ngFor="let item of options" value="{{item.key}}">{{item.value}}</option>
              </select>
            `,
})
export class SelectEditor implements ICellEditorAngularComp, AfterViewInit {
  private params: any;
  public value: number;
  public options: any;
  @Autowired('valueFormatterService')
  private valueFormatterService: ValueFormatterService;
  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    this.options = params.values;
    const valueFormatted = this.valueFormatterService.formatValue(
      params.column,
      null,
      this,
      this.value
    );
  }

  getValue(): any {
    return this.value;
  }

  ngAfterViewInit() {}
}
