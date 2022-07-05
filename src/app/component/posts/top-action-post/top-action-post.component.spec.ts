import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActionPostComponent } from './top-action-post.component';

describe('TopLikePostComponent', () => {
  let component: TopActionPostComponent;
  let fixture: ComponentFixture<TopActionPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopActionPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopActionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
