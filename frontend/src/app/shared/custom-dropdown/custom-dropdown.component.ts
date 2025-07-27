import {
  Component,
  ElementRef,
  input,
  output,
  HostListener,
} from '@angular/core';
import { LanguageOption } from '../../constants/supported-languages';

@Component({
  selector: 'app-custom-dropdown',
  imports: [],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss',
})
export class CustomDropdownComponent {
  options = input<LanguageOption[]>([]);
  selectedValue = input<string>('');

  selectionChange = output<string>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  get selectedOption(): LanguageOption | undefined {
    return this.options().find((option) => option.value === this.selectedValue());
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: LanguageOption) {
    this.selectionChange.emit(option.value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
