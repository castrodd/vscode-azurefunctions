/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DeploymentsTreeItem, DeploymentTreeItem } from "vscode-azureappservice";
import { IActionContext } from "vscode-azureextensionui";
import { ext } from "../../extensionVariables";

export async function disconnectRepo(context: IActionContext, node?: DeploymentsTreeItem): Promise<void> {
    if (!node) {
        node = await ext.tree.showTreeItemWizard<DeploymentsTreeItem>({ id: DeploymentTreeItem.contextValueId, scmType: /^((?!none).)*$/i }, context);
    }
    await node.disconnectRepo(context);
}
