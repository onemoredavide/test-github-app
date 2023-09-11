import dotenv from "dotenv"
import { App } from "octokit"
import * as fs from "fs"
import { initGithubConnections } from "./helpers"
import { join } from "path"

const { parsed: config } = dotenv.config({ path: join(__dirname, "../.env") }) as { parsed: any }

const {
  APP_ID,
  PRIVATE_KEY_PATH,
  SHIPPIX_INSTALLATION_ACCOUNT,
  CLIENT_INSTALLATION_ACCOUNT
} = config

void(async(): Promise<void> => {
  if (!APP_ID || !PRIVATE_KEY_PATH || !SHIPPIX_INSTALLATION_ACCOUNT || !CLIENT_INSTALLATION_ACCOUNT) {
    throw new Error("Invalid .env configuration")
  }

  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8")

  const app = new App({
    appId: APP_ID,
    privateKey
  })

  const {
    [SHIPPIX_INSTALLATION_ACCOUNT]: shippixConnection,
    [CLIENT_INSTALLATION_ACCOUNT]: clientConnection
  } = await initGithubConnections({ accounts: [SHIPPIX_INSTALLATION_ACCOUNT, CLIENT_INSTALLATION_ACCOUNT], app })

  const availableCustomerRepositories = await clientConnection.listAccessibleRepositories()
  console.log(`######     AVAILABLE REPOSITORIES FOR ${CLIENT_INSTALLATION_ACCOUNT}:    ######`)
  console.log(availableCustomerRepositories)

  const managedRepositories = await shippixConnection.listAccessibleRepositories()
  console.log(`######      MANAGED REPOSITORIES (${SHIPPIX_INSTALLATION_ACCOUNT}):      ######`)
  console.log(managedRepositories)
})()
