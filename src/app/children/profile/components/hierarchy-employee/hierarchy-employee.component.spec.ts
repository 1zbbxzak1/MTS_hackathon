import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyEmployeeComponent } from './hierarchy-employee.component';

describe('HierarchyEmployeeComponent', () => {
  let component: HierarchyEmployeeComponent;
  let fixture: ComponentFixture<HierarchyEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HierarchyEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
