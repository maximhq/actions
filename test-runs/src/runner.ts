import { Maxim } from "@maximai/maxim-js";
import { TestRunInputs, TestRunOutputs } from "./types";

export async function runTest(inputs: TestRunInputs): Promise<TestRunOutputs> {
	const maxim = new Maxim({ apiKey: inputs.apiKey });

	let testRun = maxim.createTestRun(inputs.testRunName, inputs.workspaceId).withData(inputs.datasetId);

	if (inputs.evaluators) {
		testRun = testRun.withEvaluators(...inputs.evaluators);
	}

	if ("workflowId" in inputs && inputs.workflowId.length > 0) {
		testRun = testRun.withWorkflowId(inputs.workflowId, inputs.contextToEvaluate);
	} else if ("promptVersionId" in inputs && inputs.promptVersionId.length > 0) {
		testRun = testRun.withPromptVersionId(inputs.promptVersionId, inputs.contextToEvaluate);
	} else {
		throw new Error("Either workflowId or promptVersionId must be specified");
	}

	if (inputs.concurrency) {
		testRun = testRun.withConcurrency(inputs.concurrency);
	}

	if (inputs.humanEvaluationEmails) {
		testRun = testRun.withHumanEvaluationConfig({
			emails: inputs.humanEvaluationEmails,
			instructions: inputs.humanEvaluationInstructions,
		});
	}

	const result = await testRun.run();
	return {
		testRunResult: result.testRunResult.result[0],
		testRunFailedIndices: result.failedEntryIndices,
		testRunReportUrl: result.testRunResult.link,
	};
}
