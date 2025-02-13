# Maxim Github Actions


## Test Run Action

```yaml
name: Run Maxim Test
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run Maxim Test
      uses: maximhq/maxim-test-run-action@v1
      with:
        api_key: ${{ secrets.MAXIM_API_KEY }}
        workspace_id: maxim-workspace-id
        workflow_ids: workflow-id-1,workflow-id-2
        dataset_id: dataset-id
        test_run_name: GitHub Action Test Run
        evaluators: bias, privacy
```
