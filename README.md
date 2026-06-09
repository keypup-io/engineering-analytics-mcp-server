# Engineering Analytics MCP Server

> Connect your Keypup engineering analytics to any AI assistant through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

Generate answers & visualisations from your engineering data to track software development health — no query language or coding required.

---

## Overview

The Keypup MCP Server is a [Model Context Protocol](https://modelcontextprotocol.io/) server that bridges your Keypup engineering analytics with AI assistants such as Claude, Cursor, Kiro, ChatGPT Desktop, or any other MCP-compatible client.

Instead of writing queries manually, you ask plain-language questions. The AI assistant uses the MCP server's tools to list datasets, discover available fields, construct queries, and return summarised results — all through conversation.

> **Note:** The MCP server is currently in **beta**. Capabilities are expanding. We encourage you to [submit use cases and feedback](https://keypup.io) to help shape its development.

---

## Prerequisites

- A [Keypup](https://keypup.io) account with at least one connected organisation
- An MCP-compatible AI client (Claude Desktop, Cursor, Kiro, ChatGPT Desktop, etc.)
- A valid Keypup API key (generated from your Keypup dashboard)

---

## Installation & Configuration

### 1. Obtain your API key

Log in to your [Keypup dashboard](https://app.keypup.io), navigate to **Settings → API**, and generate a new API key.

### 2. Add the server to your MCP client

Add the following block to your MCP client configuration (the exact file location varies by client — refer to your client's documentation):

```json
{
  "mcpServers": {
    "keypup": {
      "command": "npx",
      "args": ["-y", "@keypup-io/engineering-analytics-mcp-server"],
      "env": {
        "KEYPUP_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

Replace `<your-api-key>` with the API key generated in step 1.

### 3. Restart your AI client

After saving the configuration, restart your AI client so it picks up the new MCP server.

---

## How It Works

A typical AI-assisted session looks like this:

1. **List companies/teams** — the AI fetches all organisations you have access to in Keypup.
2. **Choose a dataset** — pick from issues, pull requests, commits, comments, reviews, or activity events.
3. **Discover fields** — the AI looks up available data fields, operators, and report formulas for the chosen dataset.
4. **Run a query** — the AI translates your plain-language question into a reporting query and executes it.
5. **Receive results** — aggregated, summarised output is returned directly in your conversation.

Data access is scoped to your user's permissions and team settings in Keypup.

---

## Example Questions

### Delivery & Throughput
- *"How many pull requests did we merge each month over the last 6 months?"*
- *"What's our weekly issue closing rate this quarter?"*

### Cycle Time & Performance
- *"What's the average time between PR creation and merge in the last 12 weeks?"*
- *"Show me review turnaround time trends for the last 3 months."*

### Quality & Process
- *"How many bugs were raised vs. closed each week this quarter?"*
- *"What proportion of pull requests resolve at least one issue?"*

### Workload & Collaboration
- *"Who are our most active reviewers this month?"*
- *"How is work distributed across the team right now?"*

---

## Available Datasets

| Dataset | Description |
|---|---|
| `issues` | Issues created, updated, or closed in connected repos |
| `pull_requests` | Pull requests and their lifecycle events |
| `commits` | Commit activity across connected repos |
| `comments` | Issue and PR comments |
| `reviews` | Pull request reviews and approvals |
| `activity_events` | Aggregated developer activity events |

---

## MCP Server vs. GraphQL API

| | MCP Server | GraphQL API |
|---|---|---|
| **Audience** | Anyone (no coding required) | Developers & data engineers |
| **Interface** | Plain-language conversation | Query language |
| **Use case** | Conversational analytics | Scripting & integrations |
| **Query building** | Done by the AI | Done by the developer |

Use the MCP server for day-to-day conversational exploration. Use the [Keypup GraphQL API](https://docs.keypup.io) for automated pipelines, dashboards, and deeper integrations.

---

## Security

- Your API key is passed as an environment variable and is **never** stored by the server.
- All requests are made server-side; no engineering data is sent to third parties beyond your chosen AI client.
- Data access is governed by the permission model of your Keypup account.

---

## Feedback & Support

The MCP server is in active development. To report issues, request new capabilities, or share feedback:

- 📖 [Documentation](https://docs.keypup.io/en/articles/15360547-using-the-mcp-server)
- 💬 [Contact Keypup support](https://keypup.io)
- 🐛 [Open an issue](../../issues) in this repository

---

## License

See [LICENSE](LICENSE) for details.
