import { Component, DoCheck } from '@angular/core';

import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(
    localStorage.getItem('taskList') || '[]'
  );
  constructor() {}

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public setEmitTaskList(event: string): void {
    this.taskList.push({
      task: event,
      checked: false,
    });
  }

  public deletemItemTaskList(index: number): void {
    this.taskList.splice(index, 1);
  }

  public deleteAllTaskList(): void {
    const confirmDeleteAll = confirm('Are you sure you want to delete all?');
    if (confirmDeleteAll) {
      this.taskList = [];
    }
  }

  public validationInput(value: string, index: number): void {
    if (!value.length) {
      const confirmRemove = confirm(
        'Are you sure you want to delete this task?'
      );

      if (confirmRemove) {
        this.deletemItemTaskList(index);
      }
    }
  }

  public setLocalStorage(): void {
    if (this.taskList) {
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );

      localStorage.setItem('taskList', JSON.stringify(this.taskList));
    }
  }
}
