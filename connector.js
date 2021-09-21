const recentProjects = require('./json/mostRecentProjects.json')
const workflows = require('./json/workflows.json')
const services = require('./json/services.json')
const deployments = require('./json/deployments.json')

module.exports = class Connector {
  constructor() {

  }

  getMostRecentProjects(){
    return recentProjects
  }

  getMostRecentWorkflows(){
    return workflows
  }

  getMostRecentServices(){
    return services
  }

  getMostRecentDeployments(){
    return deployments
  }
}
