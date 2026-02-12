import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailPage } from './home-detail-page';

describe('HomeDetailPage', () => {
  let component: HomeDetailPage;
  let fixture: ComponentFixture<HomeDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
