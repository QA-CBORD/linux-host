
// Email template pattern
export const EMAIL_REGEXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/;

// Integer pattern
export const INT_REGEXP = /(?:\s|^)\d+(?=\s|$)/;

// Integer and decimal (2 digit after comma) pattern
export const INT_DEC_REGEXP = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g;

// Leading zero pattern 
export const ZERO_FIRST_REGEXP = /^(0+)/g;
