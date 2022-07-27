/* eslint-disable no-useless-escape */
// Email template pattern
export const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Integer pattern
export const INT_REGEXP = /(?:\s|^)\d+(?=\s|$)/;

// Integer and decimal (2 digit after comma) pattern
export const INT_DEC_REGEXP = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/;

// Currency
export const CURRENCY_REGEXP = /^([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/m;

// Leading zero pattern
export const ZERO_FIRST_REGEXP = /^(0+)/;

// Comma pattern
export const COMMA_REGEXP = /[,\s]/g;

// Number | Description string format pattern
export const NUM_DSCRPTN_REGEXP = /^[0-9]{4,}\|.*/gi;

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

// Barcode valid pattern
export const BARCODE_REGEXP = /^[A-Za-z0-9-]{1,13}$/;

// Mastercard tamplate pattern
export const MASTERCARD_REGEXP = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

//------------- Expiration date card tamplate patterns -------------------//

// 1-9/ | 2-9
export const EXPRTN_DATE_1_REGEXP = /^([1-9]\/|[2-9])$/g;

// 0(1-9) | 1(0-2)
export const EXPRTN_DATE_2_REGEXP = /^(0[1-9]{1}|1[0-2]{1})$/g;

// more then 12
export const EXPRTN_DATE_3_REGEXP = /^([0-1]{1})([3-9]{1})$/g;

// d/dd
export const EXPRTN_DATE_4_REGEXP = /^(\d)\/(\d\d)$/g;

// 0|1(1-9)((0-9)(0-9))
export const EXPRTN_DATE_5_REGEXP = /^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g;

// 0/00..
export const EXPRTN_DATE_6_REGEXP = /^([0]{1,})\/|[0]{1,}$/g;

// Escaped all except: digit | '/'
export const EXPRTN_DATE_7_REGEXP = /[^\d\/]|^[\/]{0,}$/g;

// Two '//'
export const EXPRTN_DATE_8_REGEXP = /\/\//g;

export const ONE_LETTER_MIN = /[a-z]|[A-Z]/;

//Getting the base64 without the file format
export const BASE64 = /^data:(.*,)?/;
