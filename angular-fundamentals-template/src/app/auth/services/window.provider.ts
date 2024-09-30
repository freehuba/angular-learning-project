import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');

export function windowProvider(): Window {
  return window; 
}
