using System;
using System.IO;
using Topshelf.Logging;

namespace <%= applicationname %>
{
    class SampleService
    {
        //private static readonly LogWriter _log = HostLogger.Get<SampleService>();

        public bool Start()
        {
            return true;
        }

        public bool Pause()
        {
            return true;
        }

        public bool Continue()
        {
            return true;
        }


        public bool Stop()
        {
            return true;
        }
        
        public bool CustomCommand(int commandNumber)
        {
            return true;
        }
    }
}
