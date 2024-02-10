import { FormControl } from '@angular/forms';

export interface ContactUsForm {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string | undefined>;
  date: FormControl<Date>;
  partySize: FormControl<number>;
  message: FormControl<string>;
}
