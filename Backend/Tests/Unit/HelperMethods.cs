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
        AddQuestion(context, context.Paragraph.Last().Id);
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

    private static readonly string[] entity = ["help", "C# struggle", "haskell pain"];
    public static void AddQuestion(ApplicationContext context, int paragraphId, string question = "Test Question", string[] answer = default!, int correctAnswerIndex = 1)
    {
        context.Question.Add(new Question { QuestionText = question, AnswerChoices = answer ?? entity, ParagraphId = paragraphId, CorrectAnswerIndex = correctAnswerIndex });
        context.SaveChanges();
    }

    public static int GetFirstArticleId(ApplicationContext context)
    {
        var art = context.Article.FirstOrDefault();
        if (art == null)
        {
            throw new Exception("ArticleId is null. FAILED SEEDING DATA");
        }
        return art.Id;
    }

    public static int GetFirstParagraphId(ApplicationContext context)
    {
        var par = context.Paragraph.FirstOrDefault();
        if (par == null)
        {
            throw new Exception("ParagraphId is null. FAILED SEEDING DATA");
        }
        return par.Id;
    }

    internal static int GetFirstQuestionId(ApplicationContext context)
    {
        var question = context.Question.FirstOrDefault();
        if (question == null)
        {
            throw new Exception("QuestionId is null. FAILED SEEDING DATA");
        }
        return question.Id;
    }
}