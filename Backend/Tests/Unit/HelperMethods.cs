using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class HelperMethods
{
    // Separate method to handle initial data seeding
    public static async Task SeedInitialData(ApplicationContext context)
    {
        await AddArticle(context);
        await AddParagraph(context, context.Article.Last().Id);
    }

    public static async Task AddArticle(ApplicationContext context, string title = "Sample Article", string categoryTitle = "Sample Category")
    {
        context.Article.Add(new Article { Title = title, CategoryTitle = categoryTitle });
        await context.SaveChangesAsync();
    }

    public static async Task AddParagraph(ApplicationContext context, int articleId, string title = "Test Paragraph", string text = "Test Content")
    {
        context.Paragraph.Add(new Paragraph { Title = title, Text = text, ArticleId = articleId });
        await context.SaveChangesAsync();
    }

    public static int GetFirstArticleId(ApplicationContext context)
    {
        return context.Article.First().Id;
    }

    public static int GetFirstParagraphId(ApplicationContext context)
    {
        return context.Paragraph.First().Id;
    }
}