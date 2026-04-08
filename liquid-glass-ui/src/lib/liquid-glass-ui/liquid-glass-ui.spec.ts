import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiquidGlassUi } from './liquid-glass-ui';

describe('LiquidGlassUi', () => {
  let component: LiquidGlassUi;
  let fixture: ComponentFixture<LiquidGlassUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidGlassUi],
    }).compileComponents();

    fixture = TestBed.createComponent(LiquidGlassUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
