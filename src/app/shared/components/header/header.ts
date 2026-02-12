import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vapi-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  showBackButton = input<boolean>(false);
  backClick = output<void>();

  onBackClick(): void {
    this.backClick.emit();
  }
}
