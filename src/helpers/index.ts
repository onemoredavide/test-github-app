import { App, Octokit } from "octokit"
import { ShippixGithubRepository } from "../types"

export class ShippixGithubConnection {
  readonly #app: App
  readonly #installationId: number
  octokit: Octokit | undefined

  constructor(options: {
    app: App,
    installationId: number
  }) {
    this.#app = options.app
    this.#installationId = options.installationId
  }


  init = async(): Promise<void> => {
    this.octokit = await this.#app.getInstallationOctokit(this.#installationId)
  }

  listAccessibleRepositories = async(): Promise<ShippixGithubRepository[]> => {
    const data = await this.octokit?.rest.apps.listReposAccessibleToInstallation()
    return data?.data.repositories.map(({ name, id }) => ({ name, id })) || []
  }
}

export const initGithubConnections = async(options: { accounts: string[], app: App }): Promise<{ [account: string]: ShippixGithubConnection }> => {
  const connections: { [account: string]: ShippixGithubConnection } = {}
  for (const account of options.accounts) {
    const { data: installation } = await options.app.octokit.rest.apps.getUserInstallation({ username: account })
    const connection = new ShippixGithubConnection({
      app: options.app,
      installationId: installation.id
    })

    await connection.init()

    connections[account] = connection
  }
  return connections
}