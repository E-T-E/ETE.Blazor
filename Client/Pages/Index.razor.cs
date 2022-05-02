namespace ETE.Blazor.Client.Pages
{
    public partial class Index
    {
        public List<ETEHistory> Histories { get; set; }
        private bool ShowAddETEDialog { get; set; } = false;
        private string Address { get; set; } = string.Empty;
        private DateTime ETETime { get; set; } = DateTime.Now;
        private string Reason { get; set; } = string.Empty;
        private string Slogan { get; set; } = string.Empty;
        private string ETEUserCode { get; set; } = string.Empty;

        public int ETETotalCount { get; set; }
        public List<User> Users { get; set; } = new List<User>
        {
            new User("Alec.Ji","https://blog.jichao.top","https://blog.jichao.top/img/headimg.jpg","black"),
            new User("Shawn.Xia","https://blog.x-cosmos.top/","https://blog.x-cosmos.top/img/avatar.png","green")
        };

        public Index()
        {
            Histories = new()
            {
                new ETEHistory
                {
                    Address = "Shawn Office",
                    ETETime=DateTime.Parse("2020-11-18 09:11:03"),
                    Reason="Shawn.xia was late and unhappy, boom!",
                    Slogan="BOOM",
                    Users = Users.ToList(),
                },new ETEHistory
                {
                    Address = "Neusoft Gateway",
                    ETETime=DateTime.Parse("2022-02-28 11:28:03"),
                    Reason="Alec.ji didn't want to learn, it was uncomfortable, boom!",
                    Slogan="",
                    Users = Users.Where(t=>t.Name=="Shawn.Xia").ToList(),
                }
            };
            ETETotalCount = 2;
        }

        public void Add()
        {
            Histories.Add(new ETEHistory
            {
                Address = Address,
                ETETime = ETETime,
                Reason = Reason,
                Slogan = Slogan,
                Users = Users.Any(t => t.Name == ETEUserCode) ? Users.Where(t => t.Name == ETEUserCode).ToList() : null
            });
            ShowAddETEDialog = false;
        }
    }

    public class ETEHistory
    {
        public DateTime ETETime { get; set; }
        public string Slogan { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public List<User>? Users { get; set; } = new();
    }

    public class User
    {

        public string Name { get; set; }
        public string Link { get; set; }
        public string Avator { get; set; }
        public string Color { get; set; }

        public User(string name, string link, string avator, string color)
        {
            Name = name;
            Link = link;
            Avator = avator;
            Color = color;
        }
    }
}
