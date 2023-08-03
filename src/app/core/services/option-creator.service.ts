import { Injectable } from "@angular/core";
import { ConverterType } from "../model/converter-type.enum";
import { OptionList } from "../model/option-list.model";
import { OptionType } from "../model/option-type.enum";

@Injectable({ providedIn: "root" })
export class OptionCreatorService {
    public create(type?: ConverterType): OptionList {
        const optionList = new OptionList();

        this.setAllOptions(optionList);

        if (type !== undefined) {
            this.setDefaultOptions(optionList, type);
        }

        return optionList;
    }

    private setAllOptions(optionList: OptionList): void {
        Object.values(OptionType)
            .filter(o => !Number.isNaN(+o))
            .forEach(o => {
                optionList.options.set(<OptionType>o, false);
            });
    }

    private setDefaultOptions(optionList: OptionList, type: ConverterType): void {
        switch (type) {
            case ConverterType.Ass:
                optionList.options.set(OptionType.DeleteAssTags, true);
                break;
            case ConverterType.Sbv:
                optionList.options.set(OptionType.DeleteBasicTags, true);
                break;
            case ConverterType.Srt:
                optionList.options.set(OptionType.DeleteBasicTags, true);
                break;
            case ConverterType.Sub:
                optionList.options.set(OptionType.DeleteSubTags, true);
                break;
            case ConverterType.Vtt:
                optionList.options.set(OptionType.DeleteBasicTags, true);
                break;
        }
    }
}
