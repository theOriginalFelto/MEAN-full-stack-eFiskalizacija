export class Grafico {
    constructor(dan: string) {
        this.Legend = dan;
        this.Value = 0;
    }
    Value: number;
    Color: string = "#0161fc";
    Size: string;
    Legend: string;
}