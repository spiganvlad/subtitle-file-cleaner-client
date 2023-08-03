import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ 
    name: "storageCapacity",
    standalone: true
})
export class StorageCapacityPipe implements PipeTransform {
    private units = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

    transform(value: any, decimals: number = 2): string {
        const bytes = +value;
        if (Number.isNaN(bytes)) { 
            return '0 Bytes';
        }

        if (decimals < 0) {
            decimals = 0;
        }

        const kiloByteSize = 1024;

        const unitsIndex = Math.floor(Math.log(bytes) / Math.log(kiloByteSize))
        const resultedUnit = parseFloat((bytes / Math.pow(kiloByteSize, unitsIndex)).toFixed(decimals))
        
        return `${resultedUnit} ${this.units[unitsIndex]}`
    }
}
