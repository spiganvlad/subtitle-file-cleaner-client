import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class GuidService {
    public isGuidValid(guid: string): boolean {
        const regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i);
        
        return regex.test(guid);
    }
}
