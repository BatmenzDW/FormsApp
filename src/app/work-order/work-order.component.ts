import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private store: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.workOrderModel.exists = true;
      this.workOrderModel.id = this.route.snapshot.paramMap.get('id');
      this.list = this.nullList(this.route.snapshot.paramMap.get('list'));
      this.databaseDocument = this.store.doc<Task>(`${this.list}/${this.workOrderModel.id}`);
      this.databaseUpdate = this.databaseDocument.valueChanges();
      this.databaseUpdate.subscribe((data: Task) => {
        this.workOrderModel = this.nullOrder(data);
        this.nullComponents();
        this.dateConvert();
      });
    }
  }

  onSave(task: Task): void {
    //console.log("Saving Work Order");
    if (this.workOrderModel.exists) {
      this.store.collection(this.list).doc(this.nullString(this.workOrderModel.id)).update(this.workOrderModel);
    } else {
      //console.log("New Work Order");
      task = JSON.parse(JSON.stringify(this.workOrderModel));
      this.list = 'todo';
      //console.log(typeof task);
      this.store.collection(this.list).add(task);
      this.router.navigate(['/dashboard']);
    }
  }

  showEditable: boolean = false;
  editRowId: any;



  timeToDate(time: any) {
    var date = new Date(time.seconds * 1000);
    var datestring = date.toISOString();
    return datestring;
  }

  dateConvert() {
    this.workOrderModel.date = this.timeToDate(this.workOrderModel.date);
    this.workOrderModel.startingDate = this.timeToDate(this.workOrderModel.startingDate);
    this.workOrderModel.dateCompleted = this.timeToDate(this.workOrderModel.dateCompleted);
  }

  nullList(list: any) {
    if (list === null)
      return 'todo'
    else
      return list
  }

  nullComponents() {
    if (this.workOrderModel.materialIDs == null) {
      this.databaseDocument.update({ materialIDs: [] });
      this.databaseDocument.update({ materialDescriptions: [] });
      this.databaseDocument.update({ materialQuantities: [] });
      this.databaseDocument.update({ materialPrices: [] });
      this.databaseDocument.update({ materialAmounts: [] });
      this.databaseDocument.update({ otherIDs: [] });
      this.databaseDocument.update({ otherDescriptions: [] });
      this.databaseDocument.update({ otherPrices: [] });
      this.databaseDocument.update({ laborIDs: [] });
      this.databaseDocument.update({ laborDescriptions: [] });
      this.databaseDocument.update({ laborHrs: [] });
      this.databaseDocument.update({ laborRates: [] });
      this.databaseDocument.update({ laborAmounts: [] });
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
      return ""
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
    this.workOrderModel.materialDescriptions.push();
    this.workOrderModel.materialQuantities.push();
    this.workOrderModel.materialPrices.push();
    this.workOrderModel.materialAmounts.push();
  }

  addOther() {
    let indexForId = this.workOrderModel.otherIDs.length + 1
    this.workOrderModel.otherIDs.push(indexForId);
    this.workOrderModel.otherDescriptions.push();
    this.workOrderModel.otherPrices.push();
  }

  addLabor() {
    let indexForId = this.workOrderModel.laborIDs.length + 1
    this.workOrderModel.laborIDs.push(indexForId);
    this.workOrderModel.laborDescriptions.push();
    this.workOrderModel.laborHrs.push();
    this.workOrderModel.laborRates.push();
    this.workOrderModel.laborAmounts.push();
  }

  // toggle(val: any) {
  //   this.editRowId = val;
  // }

}


// --------------------------------
// @ Models
// --------------------------------

export class WorkOrder {

  constructor(
    public id?: string | null,
    public exists: boolean = false,
    public invoiceID?: number,
    public phone?: string,
    public date?: any,
    public takenBy?: string,
    public orderNum?: string,
    public dayWorkBol: boolean = false,
    public contractBol: boolean = false,
    public extraBol: boolean = false,
    public jobName?: string,
    public jobLocation?: string,
    public jobPhone?: string,
    public startingDate?: any,
    public jobTo?: string,
    public jobDescription?: string,
    public dateCompleted?: any,
    public totalMaterials?: number,
    public totalOther?: number,
    public totalLabor?: number,
    public tax?: number,
    public total?: number,
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
  ) { }
}

export class Material {
  constructor(
    public id: number,
    public quantity: number,
    public description: string,
    public price: number,
    public amount: number
  ) { }
}

export class OtherCharges {
  constructor(
    public id: number = 0,
    public description: string = '',
    public price: number = 0
  ) { }
}

export class Labor {
  constructor(
    public id: number = 0,
    public description: string = '',
    public hrs: number = 0,
    public rate: number = 0,
    public amount: number = 0
  ) { }
}
