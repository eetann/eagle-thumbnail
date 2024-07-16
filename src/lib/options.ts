import * as v from "valibot";
import { storage } from "wxt/storage";

const EagleItemTemplateSchema = v.object({
	// 字数制限は無いっぽい
	// https://api.eagle.cool/item/add-from-url
	// テンプレートなので空文字も可能
	// TODO: title=ファイル名で使えない文字をあらかじめチェックする
	title: v.pipe(
		v.string(),
		v.regex(/^[^\r\n]*$/, "Title cannot contain line breaks."),
	),
	annotation: v.string(),
});

type EagleItemTemplate = v.InferOutput<typeof EagleItemTemplateSchema>;

export function parseEagleItemTemplate(data: unknown): string {
	const result = v.safeParse(EagleItemTemplateSchema, data);
	if (result.success) {
		return "";
	}
	const issues = v.flatten<typeof EagleItemTemplateSchema>(result.issues);
	return [issues.nested?.title ?? "", issues.nested?.annotation ?? ""].join(
		"\n",
	);
}

export const eagleItemTemplateStorage = storage.defineItem<EagleItemTemplate>(
	"local:eagleItemTemplate",
	{
		defaultValue: {
			title: "TITLE_HERE by CHANNEL_HERE",
			annotation: "",
		},
	},
);
