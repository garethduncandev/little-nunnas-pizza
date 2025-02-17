import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NonceService {
  private nonce: string | null = null;

  public setCspNonce(): string | null {
    const nonceMeta = document.querySelector('meta[name="csp-nonce"]');
    return nonceMeta ? nonceMeta.getAttribute('content') : null;
  }

  public getNonce(): string | null {
    console.log(this.nonce);
    return this.nonce;
  }
}
