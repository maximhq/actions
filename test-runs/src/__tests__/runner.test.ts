import "dotenv/config";
import { runTest } from "../runner";
import { TestRunInputs } from "../types";

describe("Test Runner", () => {
	const TIMEOUT = 15;
	let mockInputs: TestRunInputs;
	beforeEach(() => {
		mockInputs = {
			apiKey: process.env.MAXIM_API_KEY!,
			workspaceId: "cm4qluf0p0047bhrlic3nf301",
			testRunName: `sdk test run ${Date.now()}`,
			datasetId: "cm6ghhby1017cxp0wcb4ejb05",
			concurrency: 10,
			timeoutInMinutes: TIMEOUT,
			evaluators: ["bias", "clarity", "faithfulness"],
			humanEvaluationEmails: ["dhwanil@getmaxim.ai"],
			humanEvaluationInstructions: "Please provide feedback",
			workflowId: "cm6giyt0t019nxp0wnq0dqcm1",
			contextToEvaluate: "myContext",
		};
	});

	test(
		"should return expected output structure",
		async () => {
			const result = await runTest(mockInputs as TestRunInputs);

			console.log(result);

			expect(result).toHaveProperty("testRunResult");
			expect(result).toHaveProperty("testRunFailedIndices");
			expect(result).toHaveProperty("testRunReportUrl");
		},
		1000 * 60 * TIMEOUT,
	);
});
