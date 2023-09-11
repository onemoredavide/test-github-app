import dotenv from "dotenv"
import { App } from "octokit"
import * as fs from "fs"

const { parsed: config } = dotenv.config({ path: ".env" }) as { parsed: { [key: string]: string } }

void(async(): Promise<void> => {
  const privateKeyPath = config.PRIVATE_KEY_PATH

  if (!config.APP_ID) {
    throw "APP_ID is not defined in .env"
  }

  if (privateKeyPath) {
    config.PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf8")
  } else {
    throw "PRIVATE_KEY_PATH is not defined in .env"
  }

  const app = new App({
    appId: config.APP_ID,
    privateKey: config.PRIVATE_KEY,
  })

  const INSTALLATION_ID = 41681620 // shippix-srl Installation Id
  const repos = await(await app!.getInstallationOctokit(INSTALLATION_ID)).rest.repos.listForOrg({ org: "shippix-srl" })

  console.log(repos)
})()
