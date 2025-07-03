import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeContributionComponent } from './challenge-contribution.component';

describe('ChallengeContributionComponent', () => {
  let component: ChallengeContributionComponent;
  let fixture: ComponentFixture<ChallengeContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeContributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
