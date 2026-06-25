# Keypup Engineering Analytics for VS Code

> Ask your Keypup engineering data in plain language to track delivery, quality and team workload.

This extension registers the [Keypup MCP server](https://www.keypup.io/mcp-server)
with VS Code so you can query your engineering analytics conversationally from
agent mode in GitHub Copilot Chat. No configuration files to edit, no token to
paste — install the extension and the Keypup tools appear in your MCP server list.

## What it does

Once installed, the extension contributes a remote MCP server pointing at
`https://hq.keypup.io/mcp`. VS Code handles authentication through its built-in
OAuth 2.1 flow: the first time the server starts, a browser window opens for you
to sign in to Keypup and authorize access.

The server exposes a focused set of **read-only** tools:

| Tool | Description |
| --- | --- |
| `list_companies` | List the companies (teams) you belong to. |
| `list_datasets` | List the datasets (facts) available for querying. |
| `list_dataset_fields` | List the fields available on a given dataset. |
| `list_formula_operators` | List operators/functions usable in custom formulas. |
| `query_dataset` | Run an aggregated report against a dataset. |
| `generate_dataset_query` | Turn a natural-language prompt into a structured query. |

## Getting started

1. Install the extension.
2. Open the Chat view and switch to **agent mode**.
3. Run **MCP: List Servers** from the Command Palette and start the
   **Keypup Engineering Analytics** server (or just ask a question — VS Code
   starts it on demand).
4. Authorize access in the browser window that opens.
5. Ask away, for example:
   - "How many pull requests did we merge each month over the last 6 months?"
   - "Who are our most active reviewers this month?"
   - "Summarize our engineering activity over the last month."

## Authentication

Authentication uses VS Code's native MCP OAuth 2.1 support. You do not need to
generate or store an API token for this extension. Queries are automatically
scoped to the companies you are a member of.

## Resources

- [Using the MCP server (documentation)](https://docs.keypup.io/en/articles/15360547-using-the-mcp-server)
- [MCP server product page](https://www.keypup.io/mcp-server)
- [Security FAQ](https://docs.keypup.io/en/articles/8108804-security-faq)

## License

MIT
