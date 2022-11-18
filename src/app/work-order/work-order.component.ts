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

  constructor() {}

  ngOnInit(): void {
  }

  onSave(): void {
    console.log("Saving Work Order");
  }

  //rows: any[] = [];
  showEditable: boolean = false;
  editRowId: any;

  addMaterial() {
    let indexForId = this.workOrderModel.materials.length + 1
    this.workOrderModel.materials.push({
      id: indexForId,
      quantity: 0,
      description: 'description',
      price: 0,
      amount: 0
    })
  }

  addOther() {
    let indexForId = this.workOrderModel.otherCharges.length + 1
    this.workOrderModel.otherCharges.push({
      id: indexForId,
      description: 'description',
      price: 0
    })
  }

  addLabor() {
    let indexForId = this.workOrderModel.labor.length + 1
    this.workOrderModel.labor.push({
      id: indexForId,
      description: 'description',
      hrs: 0,
      rate: 0,
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
    public invoiceID: string = 'id',
    public phone: string = 'phone',
    public date: string = '2000-01-01T05:00:00.000Z',
    public takenBy: string = 'taken By',
    public orderNum: string = 'orderNum',
    public dayWorkBol: boolean = false,
    public contractBol: boolean = false,
    public extraBol: boolean = false,
    public jobName: string = 'jobName',
    public jobLocation: string = 'jobLocation',
    public jobPhone: string = 'jobPhone',
    public startingDate: string = '2000-01-01T05:00:00.000Z',
    public jobTo: string = 'jobTo',
    public jobDescription: string = 'jobDescription',
    public dateCompleted: string = '2000-01-01T05:00:00.000Z',
    public totalMaterials: number = 0,
    public totalOther: number = 0,
    public totalLabor: number = 0,
    public tax: number = 0,
    public total: number = 0,
    // TODO: Add Digital Signature field
    public materials: Material[] = [],
    public otherCharges: OtherCharges[] = [],
    public labor: Labor[] = []
  ) {}
}

export class Material {
  constructor(
    public id: number = 0,
    public quantity: number = 0,
    public description: string = '',
    public price: number = 0,
    public amount: number = 0
  ) {}
}

export class OtherCharges {
  constructor(
    public id: number = 0,
    public description: string = '',
    public price: number = 0
  ) {}
}

export class Labor {
  constructor(
    public id: number = 0,
    public description: string = '',
    public hrs: number = 0,
    public rate: number = 0,
    public amount: number = 0
  ) {}
}