# Shippix GitHub Connections POC

---

### Setup

1. Install packages (node 18): ```npm install```
2. [Install the demo GitHub app on your GitHub account](https://github.com/apps/test-shippix/installations/new)
3. Copy the environment file ```cp .env.sample .env```
4. Edit the *CLIENT_INSTALLATION_ACCOUNT* env variable to match the account on which you installed the *test-shippix* GitHub app
5. Download the private key `shippix.pem` from the shared 1Password "Shippix" vault (Shippix GitHub App POC Private Key) and move it in the project root folder
6. Build the application: ```npm run build``` or run ```npx tsc -w``` to start compilation in watch mode


### Test the application

Run ```npm run dev``` in order to test the application.

Sample output:

```
AVAILABLE REPOSITORIES FOR <YOUR_ACCOUNT>:
[
  { name: 'templates', id: 123456789 }
]
MANAGED REPOSITORIES (shippix-srl):
[
  { name: 'shippix-infra-templates', id: 653975931 }
]
```

