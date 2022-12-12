import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | null = null;
	@Input() filterText: string = '';
  @Output() edit = new EventEmitter<Task>();

  defineTask(val: any): any {
    if (val === undefined) {
      return '';
    } else {
      return val;
    }
  }
}