import { AxiosResponse } from "axios";
import { InvalidArgumentError } from "../errors";
import { OauthV3Api } from "./api";
import { Configuration } from "./configuration";

export interface AuthenticationClientOptions {
  domain: string;
  client_id: string;
  client_secret: string;
  scopes: string[];
}

export class AuthenticationClient {
  readonly options: AuthenticationClientOptions;
  readonly oauth: OauthV3Api;

  constructor(options: AuthenticationClientOptions) {
    if (!options) throw new InvalidArgumentError("Options are required");
    if (
      !options.domain ||
      !options.client_id ||
      !options.client_secret ||
      !options.scopes
    )
      throw new InvalidArgumentError(
        "Options domain, clientId, clientSecret and scopes are required"
      );

    this.options = options;
    const baseUrl = `https://${options.domain}/api`;
    const firstlineApiConfig = new Configuration({
      basePath: baseUrl,
    });
    this.oauth = new OauthV3Api(firstlineApiConfig);
  }

  async getAccessToken(): Promise<string> {
    const response: AxiosResponse = await this.oauth.exchangeCodeForToken(
      "client_credentials",
      this.options.client_id,
      this.options.scopes,
      this.options.client_secret,
      undefined,
      undefined,
      undefined,
      undefined,
      `https://${this.options.domain}/api/v3`
    );

    return response.data.access_token;
  }
}
