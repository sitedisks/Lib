using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleCrawler
{
    class Program
    {
        static void Main(string[] args)
        {
            var cityUrl = "http://hotels.ctrip.com/citylist";
            var cityList = new List<City>();
            var cityCrawler = new SimpleCrawler();
            cityCrawler.OnStart += (s, e) => {
                Console.WriteLine("Crawler start craw address: " + e.Uri.ToString());
            };

            cityCrawler.OnError += (s, e) => {
                Console.WriteLine("Crawler error: " + e.Message);
            };

            cityCrawler.OnCompleted += (s, e) => {
                Console.WriteLine(e.PageSource);
                Console.WriteLine("=====================================");
                Console.WriteLine("Crawler complete!");
                Console.WriteLine("Spend: " + e.Milliseconds);
                Console.WriteLine("Thread: " + e.ThreadId);
                Console.WriteLine("Address: " + e.Uri.ToString());
            };

            //cityCrawler.
        }
    }
}
