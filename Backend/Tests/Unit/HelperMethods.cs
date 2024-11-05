using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class HelperMethods
{
    // Separate method to handle initial data seeding
    public static void SeedInitialData(ApplicationContext context)
    {
         AddArticle(context);
         AddParagraph(context, context.Article.Last().Id);
    }

    public static void AddArticle(ApplicationContext context, string title = "Sample Article", string categoryTitle = "Sample Category")
    {
        context.Article.Add(new Article { Title = title, CategoryTitle = categoryTitle });
         context.SaveChanges();
    }

    public static void AddParagraph(ApplicationContext context, int articleId, string title = "Test Paragraph", string text = "Test Content")
    {
        context.Paragraph.Add(new Paragraph { Title = title, Text = text, ArticleId = articleId });
         context.SaveChanges();
    }

    public static int? GetFirstArticleId(ApplicationContext context)
    {
        var art =  context.Article.FirstOrDefault();
        if (art == null)
        {
            return null;
        }
        return art.Id;
    }

    public static int? GetFirstParagraphId(ApplicationContext context)
    {
        var par =  context.Paragraph.FirstOrDefault();
        if (par == null)
        {
            return null;
        }
        return par.Id;
    }
}