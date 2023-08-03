import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Converter } from "../model/converter.model";
import { OptionList } from "../model/option-list.model";

@Injectable({ providedIn: "root" })
export class ConverterService {
    constructor(private readonly http: HttpClient) { }

    convert(converter: Converter, optionList?: OptionList): void {
        //TO DO: Add logic for sending a request to the server
        console.log("Sended")
        console.log(converter);
        console.log(optionList);
    }
}
