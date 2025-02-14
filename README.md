# Maxim's GitHub Actions

Below are **Quick Start** examples for the available actions. Each action has its own setup requirements, example usage, and documentation links.

## Available Actions

- [Test Run Action](#test-run-action)

### Test Run Action
<details>
<summary>Click to expand</summary>

#### Setup Requirements

- **GitHub Secrets**
  - `MAXIM_API_KEY`

- **GitHub Variables**
  - `WORKSPACE_ID`
  - `DATASET_ID`
  - `WORKFLOW_ID`

#### Example Workflow

```yaml
name: Run Test Runs with Maxim

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  TEST_RUN_NAME: "Test Run via GitHub Action"
  CONTEXT_TO_EVALUATE: "context"
  EVALUATORS: "bias, clarity, faithfulness"

jobs:
  test_run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
      - name: Running Test Run
        id: test_run
        uses: maximhq/actions/test-runs@v1
        with:
          api_key: ${{ secrets.MAXIM_API_KEY }}
          workspace_id: ${{ vars.WORKSPACE_ID }}
          test_run_name: ${{ env.TEST_RUN_NAME }}
          dataset_id: ${{ vars.DATASET_ID }}
          workflow_id: ${{ vars.WORKFLOW_ID }}
          context_to_evaluate: ${{ env.CONTEXT_TO_EVALUATE }}
          evaluators: ${{ env.EVALUATORS }}
      - name: Display Test Run Results
        if: success()
        run: |
          printf '%s\n' '${{ steps.test_run.outputs.test_run_result }}'
          printf '%s\n' '${{ steps.test_run.outputs.test_run_failed_indices }}'
          echo 'Test Run Report URL: ${{ steps.test_run.outputs.test_run_report_url }}'
```

#### Documentation Link

- [Test Run Action Documentation](https://getmaxim.ai/docs/cicd/github-actions)

</details>

## Additional Resources

- [Maxim's GitHub Actions Documentation](https://getmaxim.ai/docs/cicd/github-actions)
- [GitHub Actions Overview](https://docs.github.com/en/actions)
