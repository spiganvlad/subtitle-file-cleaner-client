import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConvertedFile } from "../model/converted-files.model";
import { Converter } from "../model/converter.model";
import { OptionList } from "../model/option-list.model";

@Injectable({ providedIn: "root" })
export class ConvertedFileService {
    constructor(private readonly http: HttpClient) { }

    public create(converter: Converter, optionList?: OptionList): Observable<ConvertedFile> {
        let url = `/FileContext/${converter.type}`;

        const formData = new FormData();
        formData.append("file", converter.file!);

        const requestHeaders = new HttpHeaders();
        requestHeaders.append("Content-Type", "multipart/form-data");

        const urlParams = new URLSearchParams();
        if (optionList !== undefined) {
            optionList.options.forEach((value, type) => {
                if (value) {
                    urlParams.append("postConversionOptions", type.toString());
                }
            });

            const urlParamsString = urlParams.toString();
            if (urlParamsString.length !== 0) {
                url = `${url}?${urlParamsString}`;
            }
        }
        
        return this.http.post<ConvertedFile>(url, formData, { headers: requestHeaders });
    }

    public get(guidId: string): Observable<ConvertedFile> {
        return this.http.get<ConvertedFile>("/FileContext/" + guidId);
    }

    public updateName(guidId: string, name: string): Observable<ConvertedFile> {
        return this.http.patch<ConvertedFile>("/FileContext/" + guidId, { name: name });
    }

    public delete(guidId: string): Observable<ConvertedFile> {
        return this.http.delete<ConvertedFile>("/FileContext/" + guidId);
    }

    public downloadContent(guidId: string): Observable<ArrayBuffer> {
        return this.http.get("/FileContent/" + guidId, { responseType: "arraybuffer" });
    }
}
