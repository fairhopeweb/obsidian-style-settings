import {CSSSettingsManager} from "../../SettingsManager";
import {CSSSetting} from "../../SettingHandlers";
import {getDescription, getTitle} from "../../Utils";
import fuzzysort from "fuzzysort";

export abstract class AbstractSettingComponent {
	sectionId: string;
	sectionName: string;
	setting: CSSSetting;
	settingsManager: CSSSettingsManager;
	isView: boolean;


	constructor(sectionId: string, sectionName: string, setting: CSSSetting, settingsManager: CSSSettingsManager, isView: boolean) {
		this.sectionId = sectionId;
		this.sectionName = sectionName;
		this.setting = setting;
		this.settingsManager = settingsManager;
		this.isView = isView;

		this.onInit();
	}

	onInit(): void {

	}

	match(str: string): number {
		if (!str) {
			return Number.NEGATIVE_INFINITY;
		}

		return Math.max(
			fuzzysort.single(str, getTitle(this.setting))?.score ?? Number.NEGATIVE_INFINITY,
			fuzzysort.single(str, getDescription(this.setting))?.score ?? Number.NEGATIVE_INFINITY,
		);
	}

	decisiveMatch(str: string) {
		return this.match(str) > -100000;
	}

	abstract render(containerEl: HTMLElement): void;

	abstract destroy(): void;
}