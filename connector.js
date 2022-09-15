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

let c = new Connector();
let token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlMjNGc3kzRlI5dnRUZms3TGlkX1lQOGU0cDNoY0psM20wQTRnckIzNnJJIn0.eyJqdGkiOiI2MDhlZTA5MC1kZDY5LTQyZmQtODU5Ni03MTVmNDUzNmI2ODUiLCJleHAiOjE2NjMyNjA4NzQsIm5iZiI6MCwiaWF0IjoxNjYzMjYwNTc0LCJpc3MiOiJodHRwczovL2tleWNsb2FrLXNtYXJ0Y2xpZGUtY2hlLmNoZS5zbWFydGNsaWRlLmV1L2F1dGgvcmVhbG1zL2NoZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5ZjVjZTE4MC00Nzg5LTQ4YjctYmU1OC00MTE2NTcwN2NmYmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzbWFydGNsaWRlLWZyb250ZW5kIiwibm9uY2UiOiIyZDI5NWIxMC1iNzNhLTQ1ZjgtOGE5YS0yNmM5MmUxMWRhNTAiLCJhdXRoX3RpbWUiOjE2NjMyMzAwMzQsInNlc3Npb25fc3RhdGUiOiI2NmRhNDhhNS1hZjEzLTRjN2EtOTdhNS03NDQwZmNlYjUxNWQiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vaWRlLXRlc3QuY2hlLnNtYXJ0Y2xpZGUuZXUiLCJodHRwczovL2lkZS5zbWFydGNsaWRlLnVucGFyYWxsZWwucHQ6ODA4MCIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImh0dHBzOi8vaWRlLnNtYXJ0Y2xpZGUudW5wYXJhbGxlbC5wdCIsImh0dHBzOi8vaWRlLmNoZS5zbWFydGNsaWRlLmV1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInJlc3QtYWxsIiwiZGV2ZWxvcGVyIiwidW1hX2F1dGhvcml6YXRpb24iLCJraWUtc2VydmVyIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkdvbsOnYWxvIFJvbG8iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnb25jYWxvLnJvbG9AdW5wYXJhbGxlbC5wdCIsImdpdmVuX25hbWUiOiJHb27Dp2FsbyIsImZhbWlseV9uYW1lIjoiUm9sbyIsImVtYWlsIjoiZ29uY2Fsby5yb2xvQHVucGFyYWxsZWwucHQifQ.eQ9bh-WGzpez8kHy91NLqd3XWZ-XsjZZeLmweloQ2FBMwHPJGPbzzJEotciyJknTbtGYO-yHWAN758K--UG4KwVX_hTVWGko3MjYTPnkGb-EwO9PlJI1fgPPLWarDWvNWUVJ5T0LP3M1eVBf7zc8gaVVmWhGemcK9cCeCTiCw4ufjOP7fLb_SfVuQVqkrTdqhNkl7qkR6lIgC0FuAb11rJHAVKfHuMAgdDKQDxaF-lAjwLoRYfHs_rpBS77DV18_6RtQmuudzgwJoOKGNSukP00xjbvkar4PNuRwAvTQrtc_qKm-IJDKVYaK0Usarz8WDpHKdqvNZZpbOeiwKtpejA";
let workspaceID = "workspacewhodjm7hcqce70iw"
c.deleteWorkspace(token, workspaceID)
