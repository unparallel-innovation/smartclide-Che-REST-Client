# SmartCLIDE Connector

This connector abstracts the Eclipse Che API, providing methods to easily obtain specific information about a user and their workspaces.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the SmartCLIDE connector.

```bash
npm install connector-smartclide
```

## Usage

```javascript
import Connector from 'connector-smartclide';

let connector = new Connector();

// Get list of all workspaces
connector.getWorkspaces(token);

// Get list of all workspaces of the given type
connector.getWorkspacesWithType(token, type);

// Get N most recent workspaces
connector.getRecentWorkspaces(token, n);

// Get details of a given workspace
connector.getWorkspace(token, workspaceId);

// Launch the given workspace
connector.startWorkspace(token, workspaceId);

// Stop the given workspace
connector.stopWorkspace(token, workspaceId);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
