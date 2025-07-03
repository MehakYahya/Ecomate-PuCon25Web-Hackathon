import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCreateChallengeComponent } from './community-create-challenge.component';

describe('CommunityCreateChallengeComponent', () => {
  let component: CommunityCreateChallengeComponent;
  let fixture: ComponentFixture<CommunityCreateChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityCreateChallengeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityCreateChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
