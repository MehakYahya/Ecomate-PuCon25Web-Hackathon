import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChallengesComponent } from './community-challenges.component';

describe('CommunityChallengesComponent', () => {
  let component: CommunityChallengesComponent;
  let fixture: ComponentFixture<CommunityChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityChallengesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
