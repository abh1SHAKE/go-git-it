import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class DeviceDetectorService {
    private userAgent: string;

    constructor() {
        this.userAgent = navigator.userAgent.toLowerCase();
    }

    isMobile(): boolean {
        return /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(this.userAgent);
    }

    isTablet(): boolean {
        return /ipad|tablet/i.test(this.userAgent);
    }

    isDesktop(): boolean {
        return !this.isMobile() && !this.isTablet();
    }
}