const workflows = require('./json/workflows.json')
const services = require('./json/services.json')
const deployments = require('./json/deployments.json')
const axios = require("axios")
const utils = require('./utils');

class Connector {

  async getMostRecentWorkflows(){
    return utils.sort(workflows);
  }

  async getMostRecentServices(){
    return utils.sort(services);
  }

  async getMostRecentDeployments(){
    return utils.sort(deployments);
  }

  async createWorkspace(keycloakToken, devfile){
    const url = "https://che-smartclide-che.che.smartclide.eu/api/workspace/devfile";

    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`,
      }
    };

    try{
      const res = await axios.post(url, devfile, config);
      return res.data;
    } catch(e){
      throw e;
    }
  }

  async getWorkspaces(keycloakToken){
    const config = {
      method: 'GET',
      url: 'https://che-smartclide-che.che.smartclide.eu/api/workspace',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`
      }
    }

    try{
      const res = await axios(config);
      return res.data;
    } catch(e){
      throw e;
    }
  }

  async getWorkspacesWithType(keycloakToken, workspaceType){
    const ws = await this.getWorkspaces(keycloakToken);

    if(ws)
      return ws.filter(a => a.devfile.attributes.type === workspaceType);

    return [];
  }

  async getLatestWorkspaces(keycloakToken, limit = 5){
    const workspaces = await this.getWorkspaces(keycloakToken);

    if(workspaces){
      const sorted = utils.sortByUpdated(workspaces);
      return sorted.slice(0, limit);
    }

    return [];
  }

  async getWorkspace(keycloakToken, workspaceID){
    const config = {
      method: 'GET',
      url: `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceID}?includeInternalServers=false`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`
      }
    }

    try{
      const res = await axios(config);
      return res.data;
    } catch(e){
      throw e;
    }
  }

  async workspaceExists(keycloakToken, workspaceName){
    const workspaces = await this.getWorkspaces(keycloakToken);
    const names = workspaces.map((workspace) => {return workspace.devfile.metadata.name});

    return names.includes(workspaceName);
  }

  async startWorkspace(keycloakToken, workspaceID){
    const url = `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceID}/runtime?debug-workspace-start=false`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`
      }
    }

    try{
      const res = await axios.post(url, {}, config);
      return res.data;
    } catch(e){
      throw e;
    }
  }

  async updateWorkspace(keycloakToken, workspaceID, data){
    const url = `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceID}`;
    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`
      },
    }

    try{
      const res = await axios.put(url, data, config);
      return res.data;
    } catch(e){
      throw e;
    }
  }

  async stopWorkspace(keycloakToken, workspaceID){
    const config = {
      method: 'delete',
      url: `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceID}/runtime`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`
      }
    }

    try{
      const res = await axios(config);
      return res.data;
    } catch(e){
      throw e;
    }
  }

  async deleteWorkspace(keycloakToken, workspaceID){
    const config = {
      method: 'delete',
      url: `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceID}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${keycloakToken}`
      }
    }

    try{
      const res = await axios(config);
      console.log(res.data)
      return res.data;
    } catch(e){
      throw e;
    }
  }
}

exports.Connector = Connector
