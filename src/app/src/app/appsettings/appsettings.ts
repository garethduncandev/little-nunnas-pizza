export class AppSettings {
  public constructor(
    public readonly buildTime: string,
    public readonly domain: string,
    public readonly subDomain: string,
    public readonly apiUrl: string,
    public readonly aspNetCoreEnvironment: string,
    public readonly stackName: string
  ) {}
}
