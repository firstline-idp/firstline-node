# Firstline Node.js

### Installation

```bash
npm install @first-line/firstline-node
```

```bash
yarn add @first-line/firstline-node
```

### Usage

```ts
const {
  AuthenticationClient,
  ManagementClient,
} = require("@first-line/firstline-node");

or

import { AuthenticationClient, ManagementClient } from "@first-line/firstline-node";

const authenticationClient = new AuthenticationClient({
    domain: "{YOUR_TENANT}.firstline.sh",
    client_id: "{MANAGEMENT_CLIENT_ID}",
    client_secret: "{MANAGEMENT_CLIENT_SECRET}",
    scopes: ["{REQUESTED_SCOPE_1}", ..., "{REQUESTED_SCOPE_N}"],
});
const managementClient = new ManagementClient(authenticationClient);

try {
    const accessToken = await authenticationClient.getAccessToken();
    const users = await managementClient.users
        .getAll({
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

    console.log("Your Users:", users)
} catch (e) {
    console.log("An error occured:", e);
}
```
