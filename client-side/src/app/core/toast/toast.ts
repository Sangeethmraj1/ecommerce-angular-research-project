import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar
} from '@angular/material/snack-bar';

const config: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'center',
  verticalPosition: 'top'
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _matSnackBar: MatSnackBar) {}
 success(
    message: string,
    action = 'OK',
    options?: MatSnackBarConfig
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this._matSnackBar.open(message, action, {
      panelClass: 'bg-primary',
      ...config,
      ...options
    });
  }

  error(
    message: string,
    action = 'OK',
    options?: MatSnackBarConfig
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this._matSnackBar.open(message, action, {
      panelClass: 'bg-warn',
      ...config,
      ...options
    });
  }
}
