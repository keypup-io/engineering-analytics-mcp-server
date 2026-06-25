import * as vscode from 'vscode';

/**
 * Streamable HTTP endpoint of the Keypup MCP server.
 *
 * Authentication is handled by VS Code's built-in MCP OAuth 2.1 flow: on first
 * connection the user is taken through the browser-based Keypup authorization
 * prompt. No token needs to be stored in the extension.
 */
const KEYPUP_MCP_ENDPOINT = 'https://hq.keypup.io/mcp';

/** Must match the `id` declared in package.json -> contributes.mcpServerDefinitionProviders. */
const PROVIDER_ID = 'keypup.engineering-analytics';

/** globalState key used to detect the first activation after install. */
const FIRST_RUN_KEY = 'keypup.firstRunNotified';

/**
 * Candidate command ids for "MCP: List Servers", in order of preference.
 * VS Code does not document a stable id for this, so we resolve whichever one
 * is actually registered at runtime instead of hard-coding a single guess.
 */
const MCP_LIST_COMMANDS = ['workbench.mcp.listServer', 'workbench.action.mcp.listServer'];

export function activate(context: vscode.ExtensionContext): void {
  const provider: vscode.McpServerDefinitionProvider = {
    provideMcpServerDefinitions: async () => {
      return [
        new vscode.McpHttpServerDefinition(
          'Keypup',
          vscode.Uri.parse(KEYPUP_MCP_ENDPOINT),
          // No static headers: OAuth is negotiated by VS Code at connection time.
          {},
          context.extension.packageJSON.version
        )
      ];
    },

    // The remote server advertises its OAuth metadata, so VS Code resolves and
    // performs the authorization handshake on its own. Nothing extra to do here.
    resolveMcpServerDefinition: async (server) => server
  };

  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider(PROVIDER_ID, provider)
  );

  // On the first activation after install, nudge the user to connect the
  // server. Connecting is what triggers VS Code's OAuth flow — there is no
  // supported API to force it at install time, so we guide the user there.
  void maybeShowFirstRunPrompt(context);
}

export function deactivate(): void {
  // No-op: VS Code disposes the registered provider via context.subscriptions.
}

async function maybeShowFirstRunPrompt(context: vscode.ExtensionContext): Promise<void> {
  if (context.globalState.get<boolean>(FIRST_RUN_KEY)) {
    return;
  }
  // Mark first run handled up front so the prompt never shows twice, even if
  // the user dismisses it.
  await context.globalState.update(FIRST_RUN_KEY, true);

  const connect = 'Connect Keypup';
  const choice = await vscode.window.showInformationMessage(
    'Keypup Engineering Analytics is installed. Connect the MCP server to sign in and start asking about your engineering data.',
    connect
  );

  if (choice === connect) {
    await openMcpServerList();
  }
}

/**
 * Opens the MCP server management UI so the user can start (and thereby
 * authorize) the Keypup server. Falls back to opening Chat if no MCP list
 * command is available in this VS Code build.
 */
async function openMcpServerList(): Promise<void> {
  const available = new Set(await vscode.commands.getCommands(true));

  for (const command of MCP_LIST_COMMANDS) {
    if (available.has(command)) {
      await vscode.commands.executeCommand(command);
      return;
    }
  }

  // Fallback: open Chat. Using the server in agent mode also starts it, which
  // triggers the OAuth flow.
  if (available.has('workbench.action.chat.open')) {
    await vscode.commands.executeCommand('workbench.action.chat.open');
  }
}
