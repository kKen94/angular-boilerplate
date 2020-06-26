import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult,
} from 'sweetalert2';

export enum SweetAlertDuration {
  Medium,
  Short,
  Long,
}

export let queue = [];

export class SweetHelper {
  /**
   * Lancia uno sweet alert date le impostazioni
   * @param options: sweetAlertOptions (@SweetAlertOptions)
   */
  static async fireWithOptions(
    options: SweetAlertOptions,
  ): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  /**
   * Lancia un toast
   * @param message: testo del toast (stringa o html)
   * @param icon: tipo di toast
   * @param duration: durata del toast
   * @param overridePrevious: specifica se il toast precedente deve essere sovrascritto dal nuovo
   */
  static fireToast(
    message: string,
    icon: SweetAlertIcon,
    duration = SweetAlertDuration.Medium,
    overridePrevious = false,
  ): void {
    const options: any = {
      icon,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: SweetHelper.duration(duration),
    };
    if (message.includes('</') && message.includes('>')) {
      options.html = message;
    } else {
      options.title = message;
    }
    SweetHelper.fireLoop(options, overridePrevious);
  }

  private static fireLoop(
    options: any,
    overridePrevious = false,
    external = true,
  ): void {
    if (Swal.isVisible() && !overridePrevious && external) {
      queue.push(options);
    } else {
      if (overridePrevious) {
        queue = [];
      }
      Swal.fire(options).then(() => {
        const newOptions = queue.length > 0 ? queue[0] : undefined;
        if (newOptions) {
          queue.shift();
          SweetHelper.fireLoop(newOptions, false, false);
        }
      });
    }
  }

  /**
   * Lancia uno sweet alert dato il titolo, il testo e il tipo
   * @param title: il titolo
   * @param text: il testo
   * @param icon: il tipo
   */
  static async fire(
    title?: string,
    text?: string,
    icon?: SweetAlertIcon,
  ): Promise<SweetAlertResult> {
    return Swal.fire(title, text, icon);
  }

  /**
   * Restituisce la durata dell'alert espressa in millisecondi
   * @param duration: l'enumeratore che decide quanto tempo deve rimanere visibile l'alert
   * @dynamic
   */
  private static duration(duration: SweetAlertDuration): number {
    if (duration === SweetAlertDuration.Medium) {
      return 3000;
    }
    if (duration === SweetAlertDuration.Short) {
      return 1000;
    }
    if (duration === SweetAlertDuration.Long) {
      return 5000;
    }
    return 2000;
  }
}
