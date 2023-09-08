/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IBindingSetting } from './IBindingTemplate';
import { ParsedJob, RawTemplateV2 } from './script/parseScriptTemplatesV2';

export enum TemplateCategory {
    Core = '$temp_category_core'
}

/**
 * Describes a template used for creating a function trigger (i.e. an HttpTrigger or TimerTrigger)
 */
export interface IFunctionTemplate {
    id: string;
    name: string;
    defaultFunctionName: string;
    language: string;
    isHttpTrigger: boolean;
    isTimerTrigger: boolean;
    isSqlBindingTemplate: boolean;
    userPromptedSettings: IBindingSetting[];
    categories: TemplateCategory[];
    categoryStyle?: string;
    isDynamicConcurrent: boolean;
    // a defined triggerType means that the template is from the new programming model
    triggerType?: string;
}

export interface FunctionV2Template extends RawTemplateV2 {
    id: string;
    isHttpTrigger: boolean;
    isTimerTrigger: boolean;

    // jobs translate to Azure Wizards
    wizards: ParsedJob[];
}


export type FunctionTemplates = IFunctionTemplate | FunctionV2Template;
