import { InvalidArgumentError } from "../errors";
import { AuthenticationClient } from "../oauth-client";
import {
  AnalyticsApi,
  ApisApi,
  ApplicationsApi,
  OrganisationsApi,
  PermissionsApi,
  RolesApi,
  UsersApi,
} from "./api";
import { Configuration } from "./configuration";

export interface ManagementClientOptions {
  authenticationClient: AuthenticationClient;
}

export class ManagementClient {
  readonly authenticationClient: AuthenticationClient;

  readonly users: UsersApi;
  readonly organisations: OrganisationsApi;
  readonly apis: ApisApi;
  readonly applications: ApplicationsApi;
  readonly roles: RolesApi;
  readonly permissions: PermissionsApi;
  readonly analytics: AnalyticsApi;

  constructor(authenticationClient: AuthenticationClient) {
    if (!authenticationClient)
      throw new InvalidArgumentError("AuthenticationClient is required");

    this.authenticationClient = authenticationClient;
    const baseUrl = `https://${authenticationClient.options.domain}/api`;
    const firstlineApiConfig = new Configuration({
      basePath: baseUrl,
    });
    this.users = new UsersApi(firstlineApiConfig);
    this.organisations = new OrganisationsApi(firstlineApiConfig);
    this.apis = new ApisApi(firstlineApiConfig);
    this.applications = new ApplicationsApi(firstlineApiConfig);
    this.roles = new RolesApi(firstlineApiConfig);
    this.permissions = new PermissionsApi(firstlineApiConfig);
    this.analytics = new AnalyticsApi(firstlineApiConfig);
  }
}
