import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CustomCursorService {
    private _enabled = new BehaviorSubject<boolean>(true);
    enabled$ = this._enabled.asObservable();

    enable() {
        this._enabled.next(true);
    }

    disable() {
        this._enabled.next(false);
    }

    toggle() {
        this._enabled.next(!this._enabled.value);
    }

    get isEnabled() {
        return this._enabled.value;
    }
}