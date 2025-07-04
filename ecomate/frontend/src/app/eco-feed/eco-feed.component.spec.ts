import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoFeedComponent } from './eco-feed.component';

describe('EcoFeedComponent', () => {
  let component: EcoFeedComponent;
  let fixture: ComponentFixture<EcoFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcoFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcoFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
