using SpeedReaderAPI.DTOs.Paragraph.Responses;

namespace SpeedReaderAPI.DTOs.Article.Responses;

public class ArticleLongResponse : ArticleShortResponse
{
    public ICollection<CreateParagraphResponse> Paragraphs { get; set; }
};
