import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, observable, of } from 'rxjs';

import { TaskComponent } from '../task/task.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let userTasks: Task[] = [
    { user_id: 1, id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' },
    { user_id: 1, id: 2, description: 'Description 2', status: true, date: '2021-08-02 00:00:00' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [TaskComponent],
      providers: [{
        provide: HttpProviderService, useValue: {
          getUserTasks: () => of([{ user_id: 1, id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' },
          { user_id: 1, id: 2, description: 'Description 2', status: true, date: '2021-08-02 00:00:00' }]),
          createUserTask: () => of([]),
          updateUserTask: () => of([]),
          deleteUserTask: () => of([])
        }
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.userTasks = [
      { user_id: 1, id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' },
      { user_id: 1, id: 2, description: 'Description 2', status: true, date: '2021-08-02 00:00:00' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user tasks on init', () => {
    component.ngOnInit();
    expect(component.userTasks).toContain(userTasks[0]);
  });

  it('should create a new user task', () => {
    component.addNewTask();
    expect(component.userTasks).toContain(userTasks[0]);
  });

  it('should update a user task', () => {
    const userTask: Task = { user_id: 1, id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' };
    const target: any = { checked: true };
    const event: any = { target }
    component.updateTask(userTask, event);
    expect(component.userTasks).toContain(userTasks[0]);
  });

  it('should delete a user task', () => {
    const userTask: Task = { user_id: 1, id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' };
    component.deleteTask(userTask);
    userTasks = userTasks.filter(task => task.id !== userTask.id);
    expect(component.userTasks).not.toEqual(userTasks);
  });
});