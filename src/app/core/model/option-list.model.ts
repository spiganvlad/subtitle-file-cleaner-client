import { OptionType } from "./option-type.enum";

export class OptionList {
    public readonly options = new Map<OptionType, boolean>();
}
