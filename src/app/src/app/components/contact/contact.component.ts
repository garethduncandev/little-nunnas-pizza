/* eslint-disable @typescript-eslint/unbound-method */
import { Component, computed, signal } from '@angular/core';

import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InViewportModule } from 'ng-in-viewport';
import { ContactUsClient, ContactUsFormModel } from '../../web-api-client';
import { ContactUsForm } from './contact-us-form-group';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InViewportModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public contactUsFormGroup!: FormGroup<ContactUsForm>;

  public isInViewport = signal<boolean>(false);
  public submitting = signal<boolean>(false);
  public submitted = signal<boolean>(false);
  public submitError = signal<boolean>(false);
  public showContactUsForm = computed(
    () => !this.submitError() && !this.submitted() && !this.submitting()
  );

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private contactUsClient: ContactUsClient
  ) {
    this.contactUsFormGroup = this.createFormGroup();
  }

  public submit(): void {
    const contactUs = new ContactUsFormModel();
    contactUs.name = this.contactUsFormGroup.value.name!;
    contactUs.email = this.contactUsFormGroup.value.email!;
    contactUs.phoneNumber = this.contactUsFormGroup.value.phone;
    contactUs.eventDate = new Date(this.contactUsFormGroup.value.date!);
    contactUs.partySize = this.contactUsFormGroup.value.partySize!;
    contactUs.message = this.contactUsFormGroup.value.message!;

    this.contactUsFormGroup.disable();

    this.submitError.set(false);
    this.submitted.set(false);
    this.submitting.set(true);

    this.contactUsClient
      .postContactUs(contactUs)
      .pipe(
        catchError((error) => {
          this.contactUsFormGroup.enable();
          console.error('Error submitting contact us form', error);
          this.submitError.set(true);
          this.submitted.set(false);
          this.submitting.set(false);
          throw error;
        })
      )
      .subscribe(() => {
        this.submitError.set(false);
        this.submitted.set(true);
        this.submitting.set(false);
        this.contactUsFormGroup.reset();
        console.log('Contact us form submitted');
      });
  }

  private createFormGroup(): FormGroup<ContactUsForm> {
    const result = this.formBuilder.group<ContactUsForm>({
      name: this.formBuilder.control<string>('', Validators.required),
      email: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      phone: this.formBuilder.control<string | undefined>(undefined),
      date: this.formBuilder.control<Date>(new Date(), Validators.required),
      partySize: this.formBuilder.control<number>(20, [
        Validators.required,
        Validators.min(20),
        Validators.max(500),
      ]),
      message: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });

    return result;
  }
}
