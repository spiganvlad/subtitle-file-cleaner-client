import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from "@angular/core";
import { NgIf } from "@angular/common";
import { ConverterType } from "src/app/core/model/converter-type.enum";
import { OptionCreatorService } from "src/app/core/services/option-creator.service";
import { OptionList } from "src/app/core/model/option-list.model";
import { OptionType } from "src/app/core/model/option-type.enum";

@Component({
    selector: "app-additional-options",
    templateUrl: "./additional-options.component.html",
    imports: [NgIf],
    providers: [OptionCreatorService]
})
export class AdditionalOptionsComponent implements OnInit, OnChanges {
    @Input("converterType")
    public converterType: ConverterType | undefined;
    public optionList: OptionList | undefined;

    constructor(private readonly optionCreator: OptionCreatorService) { }

    public ngOnInit(): void {
        this.createOptionList();
    }

    public ngOnChanges(): void {
        this.createOptionList();
    }

    private createOptionList(): void {
        this.optionList = this.optionCreator.create(this.converterType);
        this.optionsChanged();
    }

    //#region Options changed event
    @Output("optionsChanged")
    private optionsChangedEvent = new EventEmitter<OptionList>();

    private optionsChanged(): void {
        this.optionsChangedEvent.emit(this.optionList);
    }
    //#endregion

    //#region Options switchability
    public OptionType = OptionType;

    public toggleOption(option: OptionType): void {
        const currentValue = this.optionList?.options.get(option);
        if (currentValue === undefined) {
            return;
        }

        this.optionList?.options.set(option, !currentValue);
        this.optionsChanged();
    }
    //#endregion

    //#region Tags visibility
    public isTagsDisplayed: boolean = false;

    public toggleTagDisplay(): void {
        this.isTagsDisplayed = !this.isTagsDisplayed;
    }
    //#endregion
}
