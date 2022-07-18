import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from '@ag-grid-community/angular';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { SelectEditor } from './SelectEditor';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs = [
    {
      headerName: 'Make',
      field: 'make',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    {
      headerName: 'Price',
      field: 'price',
      sortable: true,
      filter: true,
      cellEditorFramework: SelectEditor, // can be same as cellEditor https://stackoverflow.com/a/49889932
      cellEditorParams: {},
      valueFormatter: (params) => `$${params.value}`,
    },
  ];

  rowData: any = [{ make: 'honda', model: 'accord', price: '200' }];

  modules = AllCommunityModules;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.rowData = [{ make: 'honda', model: 'accord', price: '200' }];
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + ' ' + node.model)
      .join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
