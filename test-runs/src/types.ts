import { TestRunResult } from "@maximai/maxim-js";

export type TestRunInputs = {
	apiKey: string;
	workspaceId: string;
	testRunName: string;
	datasetId: string;
	contextToEvaluate?: string;
	evaluators?: string[];
	humanEvaluationEmails?: string[];
	humanEvaluationInstructions?: string;
	concurrency?: number;
	timeoutInMinutes?: number;
} & ({ workflowId: string } | { promptVersionId: string });

export interface TestRunOutputs {
	testRunResult: TestRunResult["result"][number];
	testRunReportUrl: string;
	testRunFailedIndices: number[];
}
