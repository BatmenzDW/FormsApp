import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  workOrderModel = new WorkOrder();
  otherModel = new OtherCharges();
  laborModel = new Labor();
  list: any;
  databaseDocument: any;
  databaseUpdate: any;

  constructor(private store: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.workOrderModel.id = this.nullString(this.route.snapshot.paramMap.get('id'));
    this.list = this.nullList(this.route.snapshot.paramMap.get('list'));
    this.databaseDocument = this.store.doc<Task>(`${this.list}/${this.route.snapshot.paramMap.get('id')}`);
    this.databaseUpdate = this.databaseDocument.valueChanges();
    this.databaseUpdate.subscribe((value: Task) => {
      this.workOrderModel = this.nullOrder(value);
      this.nullComponents();
    });
  }

  onSave(): void {
    console.log("Saving Work Order");
    this.store.collection(this.list).doc(this.workOrderModel.id).update(this.workOrderModel);
  }

  showEditable: boolean = false;
  editRowId: any;

  nullList(list: any){
    if (list === null)
      return 'todo'
    else
      return list
  }

  nullComponents() {
    if (this.workOrderModel.materialIDs == null) {
      this.databaseDocument.update({materialIDs: []});
      this.databaseDocument.update({materialDescriptions: []});
      this.databaseDocument.update({materialQuantities: []});
      this.databaseDocument.update({materialPrices: []});
      this.databaseDocument.update({materialAmounts: []});
      this.databaseDocument.update({otherIDs: []});
      this.databaseDocument.update({otherDescriptions: []});
      this.databaseDocument.update({otherPrices: []});
      this.databaseDocument.update({laborIDs: []});
      this.databaseDocument.update({laborDescriptions: []});
      this.databaseDocument.update({laborHrs: []});
      this.databaseDocument.update({laborRates: []});
      this.databaseDocument.update({laborAmounts: []});
    }
  }

  nullOrder(order: any) {
    if (order === null)
      return new WorkOrder()
    else
      return order
  }

  nullString(val: any) {
    if (val === null)
      return ''
    else
      return val
  }

  nullArray(val: any) {
    if (val === null)
      return []
    else
      return val
  }


  addMaterial() {
    let indexForId = this.workOrderModel.materialIDs.length + 1
    this.workOrderModel.materialIDs.push(indexForId);
    this.workOrderModel.materialDescriptions.push('');
    this.workOrderModel.materialQuantities.push(0);
    this.workOrderModel.materialPrices.push(0);
    this.workOrderModel.materialAmounts.push(0);
  }

  addOther() {
    let indexForId = this.workOrderModel.otherIDs.length + 1
    this.workOrderModel.otherIDs.push(indexForId);
    this.workOrderModel.otherDescriptions.push('');
    this.workOrderModel.otherPrices.push(0);
    }

  addLabor() {
    let indexForId = this.workOrderModel.laborIDs.length + 1
    this.workOrderModel.laborIDs.push(indexForId);
    this.workOrderModel.laborDescriptions.push('');
    this.workOrderModel.laborHrs.push(0);
    this.workOrderModel.laborRates.push(0);
    this.workOrderModel.laborAmounts.push(0);
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
    public id?: string,
    public invoiceID: number = 0,
    public phone: string = 'phone',
    public date: number = 0,
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
    public materialIDs: number[] = [],
    public materialQuantities: number[] = [],
    public materialDescriptions: string[] = [],
    public materialPrices: number[] = [],
    public materialAmounts: number[] = [],
    public otherIDs: number[] = [],
    public otherDescriptions: string[] = [],
    public otherPrices: number[] = [],
    public laborIDs: number[] = [],
    public laborDescriptions: string[] = [],
    public laborHrs: number[] = [],
    public laborRates: number[] = [],
    public laborAmounts: number[] = []
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