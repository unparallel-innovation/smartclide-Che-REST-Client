# SmartCLIDE Che REST Client

This connector abstracts the Eclipse Che API, providing methods to easily obtain specific information about a user and their workspaces.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the SmartCLIDE connector.

```bash
npm install @unparallel/smartclide-che-rest-client
```

## Usage

```javascript
import Connector from '@unparallel/smartclide-che-rest-client';

let connector = new Connector();

// Create workspace with the given devfile
connector.createWorkspace(token, devfile);

// Get list of all workspaces
connector.getWorkspaces(token);

// Get list of all workspaces of the given type
connector.getWorkspacesWithType(token, type);

// Get N most recent workspaces
connector.getRecentWorkspaces(token, n);

// Get details of a given workspace
connector.getWorkspace(token, workspaceId);

// Check if given workspace exists
connector.workspaceExists(token, workspaceName);

// Launch the given workspace
connector.startWorkspace(token, workspaceId);

// Update the given workspace with the provided data
connector.updateWorkspace(token, workspaceId, data);

// Stop the given workspace
connector.stopWorkspace(token, workspaceId);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
