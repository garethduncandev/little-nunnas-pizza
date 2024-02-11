import { FormControl } from '@angular/forms';

export interface ContactUsForm {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  date: FormControl<Date | undefined>;
  partySize: FormControl<number>;
  message: FormControl<string>;
}
