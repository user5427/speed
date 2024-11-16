namespace SpeedReaderAPI.Services.Impl;

using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.ParagraphSession;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;

public class ParagraphSessionService : IParagraphSessionService
{
    private readonly CombinedRepositories _context;
    private readonly IMapper _mapper;

    public ParagraphSessionService(ApplicationContext context, IMapper mapper)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
    }

    private async Task<ParagraphSessionDto> CreateParagraphSession(Article article, ArticleSession articleSession, ParagraphSessionCreateRequest request)
    {
        Paragraph? paragraphFound = _context.Paragraph.FindById(request.ParagraphId);
        if (paragraphFound == null)
        {
            throw new ResourceNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
        }
        if (paragraphFound.ArticleId != article.Id)
        {
            throw new Exception("Illegal state: article mismatch");
        }

        ParagraphSession session = _mapper.Map<ParagraphSession>(request);
        session.ArticleSessionId = articleSession.Id;
        session.TotalQuestionCount = paragraphFound.QuestionIds.Count;

        _context.ParagraphSession.Add(session);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParagraphSessionDto>(session);
    }


    public async Task<ParagraphSessionDto[]> CreateParagraphSessions(Article article, ArticleSession articleSession, ParagraphSessionCreateRequest[] requests)
    {
        List<ParagraphSessionDto> paragraphSessionDtos = [];
        foreach (var paragraphRequest in requests)
        {
            var paragraphSessionCreated = await CreateParagraphSession(
                article, articleSession, paragraphRequest
            );
            paragraphSessionDtos.Add(paragraphSessionCreated);
        }
        return paragraphSessionDtos.ToArray();
    }
}
