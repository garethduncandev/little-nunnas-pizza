using NLog.AWS.Logger;
using NLog.Config;
using NLog;
using LogLevel = NLog.LogLevel;
using NLog.Targets;
namespace Web.Logging;

public static class NlogConfiguration
{
    public static void ConfigureNlog(string environment)
    {
        var config = new LoggingConfiguration();

        var layout =
            "${longdate}|${level:uppercase=true}|${logger}|${aspnet-request-url}|${aspnet-request-querystring}|${message}";

        var awsTarget = new AWSTarget
        {
            LogGroup = $"LittleNunnasPizza.{environment}.Web",
            Layout = layout,
        };

        config.AddTarget("aws", awsTarget);

        // logger pattern with aspnetcore request url

        config.LoggingRules.Add(new LoggingRule("*", LogLevel.Error, awsTarget));

        var consoleTarget = new ColoredConsoleTarget
        {
            Layout = layout,
        };

        config.AddTarget("console", consoleTarget);
        config.LoggingRules.Add(new LoggingRule("*", LogLevel.Trace, consoleTarget));

        LogManager.Configuration = config;
    }
}