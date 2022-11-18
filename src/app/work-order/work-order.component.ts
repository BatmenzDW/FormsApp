import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  workOrderModel = new WorkOrder();
  otherModel = new OtherCharges();
  laborModel = new Labor();

  constructor() {
    this.rows = [];
  }

  ngOnInit(): void {
  }

  onSave(): void {
    console.log("Saving Work Order");
  }

  rows: any[] = [];
  showEditable: boolean = false;
  editRowId: any;

  addMaterial() {
    let indexForId = this.rows.length + 1
    this.rows.push({
      id: indexForId,
      quantity: 0,
      description: 'description',
      price: 0,
      amount: 0
    })
  }

  toggle(val: any) {
    this.editRowId = val;
  }

}


// --------------------------------
// @ Models
// --------------------------------

export class WorkOrder {

  constructor(
    public invoiceID: string = '',
    public phone: string = '',
    public date: string = '',
    public takenBy: string = '',
    public orderNum: string = '',
    public dayWorkBol: boolean = false,
    public contractBol: boolean = false,
    public extraBol: boolean = false,
    public jobName: string = '',
    public jobLocation: string = '',
    public jobPhone: string = '',
    public startingDate: string = '',
    public jobTo: string = '',
    public jobDescription: string = '',
    public dateCompleted: string = '',
    public totalMaterials: number = 0,
    public totalOther: number = 0,
    public totalLabor: number = 0,
    public tax: number = 0,
    public total: number = 0,
    // TODO: Add Digital Signature field
  ) {}
}

export class OtherCharges {
  constructor(
    public description: string = '',
    public price: number = 0
  ) {}
}

export class Labor {
  constructor(
    public description: string = '',
    public hrs: number = 0,
    public rate: number = 0,
    public amount: number = 0
  ) {}
}