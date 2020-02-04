// Email template pattern
export const EMAIL_REGEXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/;

// Integer pattern
export const INT_REGEXP = /(?:\s|^)\d+(?=\s|$)/;

// Integer and decimal (2 digit after comma) pattern
export const INT_DEC_REGEXP = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g;

// Leading zero pattern
export const ZERO_FIRST_REGEXP = /^(0+)/g;

// Comma pattern
export const COMMA_REGEXP = /[,\s]/g;

// Number | Description string format pattern
export const NUM_DSCRPTN_REGEXP = /^[0-9]{4}\|[a-z]+/gi;

// x | y string format pattern
export const X_Y_REGEXP = /[xy]/g;

// Timezone string format pattern
export const TIMEZONE_REGEXP = /([+\-]\d\d)(\d\d)$/;

// Whitespace string format pattern
export const WHITESPACE_REGEXP = /\s/g;

// Only 4 digits string format pattern
export const FOUR_DIGITS_REGEXP = /(\d{4}(?!\s))/g;

// Number | comma | dot format pattern
export const NUM_COMMA_DOT_REGEXP = /^[0-9.,]+$/;

// Mastercard tamplate pattern
export const MASTERCARD_REGEXP = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
