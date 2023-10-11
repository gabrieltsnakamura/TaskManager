import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { of } from 'rxjs';
import { HttpProviderService } from './services/http-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        HomeComponent
      ],
      providers: [{
        provide : HttpProviderService, useValue: {
          getUserTasks: () => of([{ user_id: 1, id: 1, description: 'Description 1', status: false, date: '2021-08-01 00:00:00' },
          { user_id: 1, id: 2, description: 'Description 2', status: true, date: '2021-08-02 00:00:00' }]),
          createUserTask: () => of([]),
          updateUserTask: () => of([]),
          deleteUserTask: () => of([])
        }
    }]
  }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const homeFixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'taskmanager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('taskmanager');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('taskmanager app is running!');
  // });
});
