import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from './services/device-detector.service';
import { CustomCursorComponent } from "./shared/custom-cursor/custom-cursor.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomCursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showCursor: boolean = true;

  constructor(
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.showCursor = this.deviceService.isDesktop();
    console.log("Showing cursor: ", this.showCursor);
  }
}
