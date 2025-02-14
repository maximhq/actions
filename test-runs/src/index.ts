import * as core from "@actions/core";
import { runTest } from "./runner";
import { TestRunInputs, TestRunOutputs } from "./types";

async function run(): Promise<void> {
	try {
		if (core.getInput("workflow_id") && core.getInput("prompt_version_id")) {
			throw new Error("Cannot specify both workflow_id and prompt_version_id");
		}

		const concurrency =
			core.getInput("concurrency") && !isNaN(parseInt(core.getInput("concurrency")))
				? parseInt(core.getInput("concurrency"))
				: undefined;

		const timeoutInMinutes =
			core.getInput("timeout_in_minutes") && !isNaN(parseInt(core.getInput("timeout_in_minutes")))
				? parseInt(core.getInput("timeout_in_minutes"))
				: undefined;

		const inputs: TestRunInputs = {
			apiKey: core.getInput("api_key", { required: true }),
			workspaceId: core.getInput("workspace_id", { required: true }),
			testRunName: core.getInput("test_run_name", { required: true }),
			datasetId: core.getInput("dataset_id", { required: true }),
			workflowId: core.getInput("workflow_id"),
			promptVersionId: core.getInput("prompt_version_id"),
			contextToEvaluate: core.getInput("context_to_evaluate"),
			evaluators:
				core.getInput("evaluators") && core.getInput("evaluators").includes(",")
					? core.getInput("evaluators").replaceAll(", ", ",").split(",")
					: undefined,
			humanEvaluationEmails:
				core.getInput("human_evaluation_emails") && core.getInput("human_evaluation_emails").includes(",")
					? core.getInput("human_evaluation_emails").replaceAll(", ", ",").split(",")
					: undefined,
			humanEvaluationInstructions: core.getInput("human_evaluation_instructions"),
			concurrency,
			timeoutInMinutes,
		};

		const outputs: TestRunOutputs = await runTest(inputs);

		core.setOutput("test_run_result", outputs.testRunResult);
		core.setOutput("test_run_failed_indices", outputs.testRunFailedIndices);
		core.setOutput("test_run_report_url", outputs.testRunReportUrl);
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error);
		} else {
			core.setFailed("An unexpected error occurred: " + JSON.stringify(error));
		}
	}
}

run();

export { run };
