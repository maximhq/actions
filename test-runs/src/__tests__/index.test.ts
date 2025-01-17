import * as core from "@actions/core";
import { run } from "../index";

// Mock the core module
jest.mock("@actions/core");

describe("GitHub Action", () => {
	let inputs: { [key: string]: string };

	beforeEach(() => {
		inputs = {
			api_key: "test-api-key",
			workspace_id: "test-workspace",
			test_run_name: "Test Run 1",
		};

		// Mock getInput
		(core.getInput as jest.Mock).mockImplementation((name: string) => inputs[name]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("should handle valid inputs", async () => {
		await run();

		expect(core.setFailed).not.toHaveBeenCalled();
		expect(core.setOutput).toHaveBeenCalledWith("test_run_result", expect.any(String));
	});

	test("should fail when both dataset_id and csv_file_path are provided", async () => {
		inputs["dataset_id"] = "test-dataset";
		inputs["csv_file_path"] = "path/to/file.csv";

		await run();

		expect(core.setFailed).toHaveBeenCalledWith("Cannot specify both dataset_id and csv_file_path");
	});

	test("should fail when both workflow_id and prompt_version_id are provided", async () => {
		inputs["workflow_id"] = "test-workflow";
		inputs["prompt_version_id"] = "test-prompt-version";

		await run();

		expect(core.setFailed).toHaveBeenCalledWith("Cannot specify both workflow_id and prompt_version_id");
	});
});
