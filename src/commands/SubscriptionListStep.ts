/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { AzureWizardPromptStep, createSubscriptionContext, type IAzureQuickPickItem } from "@microsoft/vscode-azext-utils";
import { type AzureSubscription } from "@microsoft/vscode-azureresources-api";
import { l10n } from "vscode";
import { ext } from "../extensionVariables";
import { type IFuncDeployContext } from "./deploy/deploy";

export class SubscriptionListStep extends AzureWizardPromptStep<IFuncDeployContext> {
    private _picks: IAzureQuickPickItem<AzureSubscription>[] = [];
    private _oneSubscription: boolean = false;
    public async prompt(context: IFuncDeployContext): Promise<void> {
        const subscription = (await context.ui.showQuickPick(this._picks, { placeHolder: l10n.t("Select a subscription") })).data;
        context = Object.assign(context, createSubscriptionContext(subscription));
    }

    public shouldPrompt(_: IFuncDeployContext): boolean {
        return !this._oneSubscription;
    }

    public async configureBeforePrompt(context: IFuncDeployContext): Promise<void> {
        this._picks = await this.getPicks(context);
        // auto select if only one subscription
        if (this._picks.length === 1) {
            this._oneSubscription = true;
            context = Object.assign(context, createSubscriptionContext(this._picks[0].data));
        }
    }

    private async getPicks(_: IFuncDeployContext): Promise<IAzureQuickPickItem<AzureSubscription>[]> {
        return (await ext.rgApi.getSubscriptions(true)).map(s => {
            return { label: s.name, description: s.subscriptionId, data: s };
        });
    }
}
