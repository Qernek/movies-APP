import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  /**
   * Success modal window
   * @param title title of the modal
   * @param content content of the modal
   */
  success(title: string, content: string) {
    swal.fire({
      icon: 'success',
      title: title,
      text: content,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  }

  /**
   * Error modal window
   * @param title title of the modal
   * @param content content of the modal
   */
  error(title: string, content: string) {
    swal.fire({
      icon: 'error',
      title: title,
      text: content,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  }
}
