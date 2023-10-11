import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpProviderService } from './http-provider.service';
import { HttpRequest } from '@angular/common/http';

describe('HttpProviderService', () => {
  let service: HttpProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpProviderService]
    });
    service = TestBed.inject(HttpProviderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user tasks', () => {
    const userTasks = [{ user_id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' }];
    service.getUserTasks().subscribe(data => {
      expect(data).toEqual(userTasks);
    });
    const req = httpMock.expectOne((req: HttpRequest<any>) => req.url.includes('/user_tasks'));
    expect(req.request.method).toBe('GET');
    req.flush(userTasks);
  });

  it('should get user task by id', () => {
    const userTask = { user_id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' };
    service.getUserTask(userTask.user_id).subscribe(data => {
      expect(data).toEqual(userTask);
    });
    const req = httpMock.expectOne((req: HttpRequest<any>) => req.url.includes(`/user_tasks/${userTask.user_id}`));
    expect(req.request.method).toBe('GET');
    req.flush(userTask);
  });

  it('should create user task', () => {
    const userTask = { user_id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' };
    service.createUserTask(userTask).subscribe(data => {
      expect(data).toEqual(userTask);
    });
    const req = httpMock.expectOne((req: HttpRequest<any>) => req.url.includes(`/user_tasks`));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userTask);
    req.flush(userTask);
  });

  it('should update user task', () => {
    const userTask = { id: 1, user_id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' };
    service.updateUserTask(userTask).subscribe(data => {
      expect(data).toEqual(userTask);
    });
    const req = httpMock.expectOne((req: HttpRequest<any>) => req.url.includes(`/user_tasks/${userTask.user_id}`));
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(userTask);
    req.flush(userTask);
  });

  it('should delete user task', () => {
    const userTask = { user_id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' };
    service.deleteUserTask(userTask.user_id).subscribe(data => {
      expect(data).toEqual(userTask);
    });
    const req = httpMock.expectOne((req: HttpRequest<any>) => req.url.includes(`/user_tasks/${userTask.user_id}`));
    expect(req.request.method).toBe('DELETE');
    req.flush(userTask);
  });
});