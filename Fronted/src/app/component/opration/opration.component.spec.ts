import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OprationComponent } from './opration.component';

describe('OprationComponent', () => {
  let component: OprationComponent;
  let fixture: ComponentFixture<OprationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OprationComponent]
    });
    fixture = TestBed.createComponent(OprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
