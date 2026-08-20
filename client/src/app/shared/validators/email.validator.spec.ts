import { FormControl } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { emailValidator } from './email.validator';

describe('emailValidator', () => {
  const validator = emailValidator();

  it('accepts a valid email address', () => {
    const control = new FormControl('student@example.com');

    expect(validator(control)).toBeNull();
  });

  it('rejects an invalid email address', () => {
    const control = new FormControl('student@invalid');

    expect(validator(control)).toEqual({ invalidEmail: true });
  });

  it('leaves empty values to the required validator', () => {
    const control = new FormControl('   ');

    expect(validator(control)).toBeNull();
  });
});
