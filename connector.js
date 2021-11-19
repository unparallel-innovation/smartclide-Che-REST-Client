const workflows = require('./json/workflows.json')
const services = require('./json/services.json')
const deployments = require('./json/deployments.json')
const axios = require("axios")
const utils = require('./utils');

module.exports = class Connector {
  constructor() {

  }

  async getProjectDetails(id){
    const projects = [...workflows, ...services, ...deployments]
    return projects.find(element => element.workspaceID === id);
  }

  async getMostRecentProjects(limit = 5){
    const projects = [...workflows, ...services, ...deployments]
    const sortedArray = utils.sort(projects)
    return sortedArray.slice(0, limit)
  }

  async getMostRecentWorkflows(){
    return utils.sort(workflows)
  }

  async getMostRecentServices(){
    return utils.sort(services)
  }

  async getMostRecentDeployments(){
    return utils.sort(deployments)
  }

  async getWorkspaces(token){
    const config = {
      method: 'GET',
      url: 'https://che-smartclide-che.che.smartclide.eu/api/workspace',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    console.log("Get workspaces list")

    try{
      const res = await axios(config)
      return res.data
    } catch(e){
      console.log(e)
      throw e
    }
  }

  async getWorkspacesWithType(token, type){
    const ws = await this.getWorkspaces(token)
    if(ws){
      return ws.filter(a => a.devfile.attributes.type === type)
    }
    return []
  }

  async getRecentWorkspaces(token, limit = 5){
    const workspaces = await this.getWorkspaces(token)
    if(workspaces){
      const sorted = utils.sortByUpdated(workspaces)
      return sorted.slice(0, limit)
    }
    return []
  }

  async startWorkspace(token, workspaceId){
    const url = `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceId}/runtime?debug-workspace-start=false`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    console.log("Start workspace: " + workspaceId)

    try{
      const res = await axios.post(url, {}, config)
      return JSON.stringify(res.data)
    } catch(e){
      console.log(e)
      throw e
    }
  }

  async stopWorkspace(token, workspaceId){
    const config = {
      method: 'delete',
      url: `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceId}/runtime`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    console.log("Stop workspace: " + workspaceId)

    try{
      const res = await axios(config)
      return JSON.stringify(res.data)
    } catch(e){
      console.log(e)
      throw e
    }
  }

  async getWorkspace(token, workspaceId){
    const config = {
      method: 'GET',
      url: `https://che-smartclide-che.che.smartclide.eu/api/workspace/${workspaceId}?includeInternalServers=false`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    console.log("Details workspace: " + workspaceId)

    try{
      const res = await axios(config)
      return res.data
    } catch(e){
      console.log(e)
      throw e
    }
  }
}
