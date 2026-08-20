import { FormControl, FormGroup } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { passwordsMatchValidator } from './passwordMatch.validator';

describe('passwordsMatchValidator', () => {
  it('accepts matching passwords', () => {
    const group = new FormGroup({
      password: new FormControl('Angular123'),
      rePassword: new FormControl('Angular123'),
    });

    expect(passwordsMatchValidator(group)).toBeNull();
  });

  it('rejects different passwords', () => {
    const group = new FormGroup({
      password: new FormControl('Angular123'),
      rePassword: new FormControl('Different123'),
    });

    expect(passwordsMatchValidator(group)).toEqual({ passwordsMismatch: true });
  });

  it('does not report a mismatch while a field is empty', () => {
    const group = new FormGroup({
      password: new FormControl('Angular123'),
      rePassword: new FormControl(''),
    });

    expect(passwordsMatchValidator(group)).toBeNull();
  });
});
