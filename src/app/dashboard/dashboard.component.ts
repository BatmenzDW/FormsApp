import {Component} from '@angular/core';
import { Task } from '../task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogResult, TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, observable } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { MatCard } from '@angular/material/card';
import { NonNullableFormBuilder } from '@angular/forms';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})



export class DashboardComponent {

	filterText: string = '';

  todo = getObservable(this.store.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.store.collection('done')) as Observable<Task[]>;


  constructor(private dialog: MatDialog, private store: AngularFirestore, private router: Router) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.task); //Database call
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        list,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(this.NullID(task.id)).delete();
      } else {
        this.store.collection(list).doc(this.NullID(task.id)).update(task);
      }
    });
  }

  NullID(val: any): any {
    if(val == null) {
      return 0;
    }
    else {
      return val;
    }
  }

  drop(event: CdkDragDrop<Task[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(this.NullID(item.id)).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}
