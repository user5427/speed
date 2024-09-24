namespace SpeedReaderAPI.DTOs.Responses;

public class ArticleLongResponse : ArticleShortResponse {
    public ICollection<ParagraphResponse> Paragraphs { get; set; }
};
