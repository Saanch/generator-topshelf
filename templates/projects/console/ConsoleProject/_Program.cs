namespace <%= applicationname %>
{
    using Topshelf;

    /// <summary>The program.</summary>
    internal class Program
    {
        /// <summary>The main.</summary>
        /// <param name="args">The args.</param>
        private static void Main(string[] args)
        {
            HostFactory.Run(serviceConfig =>
            {
                serviceConfig.UseNLog();

                serviceConfig.Service<SampleService>(serviceInstance =>
                {
                    serviceInstance.ConstructUsing(() => new SampleService());
                    serviceInstance.WhenStarted(execute => execute.Start());
                    serviceInstance.WhenStopped(execute => execute.Stop());
                    serviceInstance.WhenPaused(execute => execute.Pause());
                    serviceInstance.WhenContinued(execute => execute.Continue());
                    serviceInstance.WhenCustomCommandReceived(
                        (execute, hostControl, commandNumber) =>
                            execute.CustomCommand(commandNumber));
                });

                serviceConfig.EnablePauseAndContinue();

                serviceConfig.SetServiceName("<%= servicename %>");
                serviceConfig.SetDisplayName("<%= serviceDisplayName %>");
                serviceConfig.SetDescription("<%= serviceDescription %>");

                serviceConfig.StartAutomatically();
            });
        }
    }
}