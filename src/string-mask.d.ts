declare module 'string-mask' {
  export default class StringMask {
    constructor(mask: string);
    apply(value: string): string;
    unapply(value: string): string;
  }
}
