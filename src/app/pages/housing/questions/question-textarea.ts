export class TextareaQuestion {

    controlType = 'textarea';
    // type = 'string';
    rows: number;
    cols: number;

    constructor(options) {
        this.rows = options.rows === '' ? 6 : parseInt(options.rows, 10);
        this.cols = options.cols === '' ? 30 : parseInt(options.cols, 10);
    }
}
