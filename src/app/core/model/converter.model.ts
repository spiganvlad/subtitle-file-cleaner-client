import { ConverterType } from "./converter-type.enum";

export class Converter {
    file: File | undefined;

    public constructor(
        public readonly name: string,
        public readonly type: ConverterType
    ) { }
}
