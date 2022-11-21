import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData, 
    private router: Router
  ) {}

  cancel(): void {
    this.data.task.id = this.backupTask.id;
    this.data.task.jobName = this.backupTask.jobName;
    this.dialogRef.close(this.data);
  }

  edit(): void {
    this.router.navigate(['/work-order', {id: this.data.task.id, list: this.data.list}]);
    this.dialogRef.close(this.data);
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
  list: 'done' | 'todo' | 'inProgress';
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
