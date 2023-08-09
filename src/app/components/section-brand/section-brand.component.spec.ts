import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBrandComponent } from './section-brand.component';

describe('SectionBrandComponent', () => {
  let component: SectionBrandComponent;
  let fixture: ComponentFixture<SectionBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionBrandComponent]
    });
    fixture = TestBed.createComponent(SectionBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
