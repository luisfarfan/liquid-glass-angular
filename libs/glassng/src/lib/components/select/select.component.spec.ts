import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { GngSelect } from './select.component';
import { GngSelectOption } from './select-option.component';
import { GngSelectGroup } from './select-group.component';
import { GngSelectHeader, GngSelectFooter } from './select-templates.directive';
import { describe, it, expect, beforeEach, vi } from 'vitest';

@Component({
  standalone: true,
  imports: [GngSelect, GngSelectOption, GngSelectGroup, GngSelectHeader, GngSelectFooter, FormsModule, ReactiveFormsModule],
  template: `
    <gng-select 
      [label]="label" 
      [placeholder]="placeholder" 
      [multiple]="multiple"
      [searchable]="searchable"
      [clearable]="clearable"
      [formControl]="control"
    >
      <ng-template lgSelectHeader>
        <div class="test-header">Header</div>
      </ng-template>

      <gng-option-group label="Group 1">
        <gng-option value="opt1">Option 1</gng-option>
        <gng-option value="opt2">Option 2</gng-option>
      </gng-option-group>
      <gng-option value="opt3" [disabled]="true" label="Option 3">Option 3</gng-option>

      <ng-template lgSelectFooter>
        <div class="test-footer">Footer</div>
      </ng-template>
    </gng-select>
  `
})
class TestHostComponent {
  label = 'Select Item';
  placeholder = 'Choose...';
  multiple = false;
  searchable = false;
  clearable = false;
  control = new FormControl<any>(null);
}

describe('GngSelect', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent, 
        GngSelect, 
        GngSelectOption, 
        GngSelectGroup,
        GngSelectHeader,
        GngSelectFooter,
        OverlayModule, 
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should create and render trigger with placeholder', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const trigger = nativeElement.querySelector('.gng-select-trigger');
    expect(trigger).toBeTruthy();
  });

  it('should toggle panel state', async () => {
    fixture.detectChanges();
    const selectInstance = fixture.debugElement.children[0].componentInstance as GngSelect;
    
    selectInstance.toggle();
    fixture.detectChanges();
    expect(selectInstance.isOpen()).toBe(true);

    selectInstance.close();
    fixture.detectChanges();
    expect(selectInstance.isOpen()).toBe(false);
  });

  it('should select an option and update value', async () => {
    fixture.detectChanges();
    const selectInstance = fixture.debugElement.children[0].componentInstance as GngSelect;
    
    await fixture.whenStable();
    const option = selectInstance.options()[0];
    expect(option).toBeTruthy();

    selectInstance.selectOption(option!);
    fixture.detectChanges();
    
    expect(component.control.value).toBe('opt1');
  });

  it('should support multiple selection mode', async () => {
    component.multiple = true;
    component.control.setValue([]);
    fixture.detectChanges();
    
    const selectInstance = fixture.debugElement.children[0].componentInstance as GngSelect;
    await fixture.whenStable();
    
    const options = selectInstance.options();
    selectInstance.selectOption(options[0]!);
    fixture.detectChanges();
    selectInstance.selectOption(options[1]!);
    fixture.detectChanges();

    expect(component.control.value).toEqual(['opt1', 'opt2']);
    
    // Deselect
    selectInstance.deselectValue('opt1');
    fixture.detectChanges();
    expect(component.control.value).toEqual(['opt2']);
  });

  it('should search options', async () => {
    component.searchable = true;
    fixture.detectChanges();
    const selectInstance = fixture.debugElement.children[0].componentInstance as GngSelect;
    await fixture.whenStable();

    selectInstance.searchQuery.set('Option 2');
    (selectInstance as any)._onSearchInput();
    fixture.detectChanges();

    const options = selectInstance.options();
    expect(options[0]!.isVisible()).toBe(false);
    expect(options[1]!.isVisible()).toBe(true);
    expect(selectInstance.noResults()).toBe(false);

    selectInstance.searchQuery.set('Not found');
    (selectInstance as any)._onSearchInput();
    fixture.detectChanges();
    expect(selectInstance.noResults()).toBe(true);
  });

  it('should handle keyboard navigation methods', () => {
    fixture.detectChanges();
    const selectInstance = fixture.debugElement.children[0].componentInstance as GngSelect;
    
    // Toggle via Enter
    selectInstance.onKeyDown({ key: 'Enter', preventDefault: () => {} } as any);
    expect(selectInstance.isOpen()).toBe(true);

    // Escape
    selectInstance.onKeyDown({ key: 'Escape', preventDefault: () => {} } as any);
    expect(selectInstance.isOpen()).toBe(false);

    // ArrowDown
    selectInstance.onKeyDown({ key: 'ArrowDown', preventDefault: () => {} } as any);
    expect(selectInstance.isOpen()).toBe(true);
  });

  it('should handle clearSelection', () => {
    component.clearable = true;
    component.control.setValue('opt1');
    fixture.detectChanges();
    const selectInstance = fixture.debugElement.children[0].componentInstance as GngSelect;

    selectInstance.clearSelection();
    fixture.detectChanges();
    expect(component.control.value).toBe(null);
  });
});
