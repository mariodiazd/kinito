import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinitoComponent } from './kinito.component';

describe('KinitoComponent', () => {
  let component: KinitoComponent;
  let fixture: ComponentFixture<KinitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KinitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KinitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
