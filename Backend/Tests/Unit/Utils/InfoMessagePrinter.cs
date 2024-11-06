public static class InfoMessagePrinter
{
    public const string SetupDBName = "SetupDB: ";
    public static void DisplaySetupDBName(string message) => Console.WriteLine(SetupDBName + message);
}