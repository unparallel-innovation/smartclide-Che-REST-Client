const fetch = require("node-fetch")
const recentProjects = require('./json/mostRecentProjects.json')
const workflows = require('./json/workflows.json')
const services = require('./json/services.json')
const deployments = require('./json/deployments.json')
var utils = require('./utils');

module.exports = class Connector {
  constructor() {

  }

  async getMostRecentProjects(){
    const projects = [...workflows, ...services, ...deployments]
    return utils.sort(projects)
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

  async getDevfiles(token){

    const headers = new fetch.Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + token)

    const options = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    const url = "https://che-smartclide-che.che.smartclide.eu/api/devfile?version=1.0.0"
    console.log("\nFetch URL: " + url)

    try{
      const res = await fetch(url, options)

      if(res.status === 200){
        const jsonData = await res.json()
        return jsonData
      }
      else {
        console.log("Error: " + res.status)
      }
      return null
    } catch(e){
      console.log(e)
      throw e
    }
  }

  async createDevfile(devfile, token){

    const headers = new fetch.Headers();
    headers.append("Accept", "text/html")
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", "Bearer " + token)

    const options = {
      method: 'POST',
      headers: headers,
      redirect: 'follow',
      body: JSON.stringify(devfile)
    };
    console.log("\nCreating devfile...")

    try{
      const res = await fetch(url, options)

      if(res.status === 200){
        const jsonData = await res.json()
        return jsonData
      }
      else {
        console.log("Error: " + res.status)
      }
      return null
    } catch(e){
      console.log(e)
      throw e
    }
  }
}
