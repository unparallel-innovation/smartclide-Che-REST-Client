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
connector.createWorkspace(keycloakToken, devfile);

// Get list of all workspaces
connector.getWorkspaces(keycloakToken);

// Get list of all workspaces of the given type
connector.getWorkspacesWithType(keycloakToken, workspaceType);

// Get N most recent workspaces
connector.getLatestWorkspaces(keycloakToken, n);

// Get details of a given workspace
connector.getWorkspace(keycloakToken, workspaceID);

// Check if given workspace exists
connector.workspaceExists(keycloakToken, workspaceName);

// Launch the given workspace
connector.startWorkspace(keycloakToken, workspaceID);

// Update the given workspace with the provided data
connector.updateWorkspace(keycloakToken, workspaceID, data);

// Stop the given workspace
connector.stopWorkspace(keycloakToken, workspaceID);

// Delete the given workspace
connector.deleteWorkspace(keycloakToken, workspaceID);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
