import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPredictionComponent } from './community-prediction.component';

describe('CommunityPredictionComponent', () => {
  let component: CommunityPredictionComponent;
  let fixture: ComponentFixture<CommunityPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
