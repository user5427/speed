using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services.Impl;



public class ArticleService : IArticleService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public ArticleService(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public ArticlePageResponse GetArticles(QueryParameters queryParameters)
    {
        long articleCount = _context.Article.Count();
        List<Article> articles = _context.Article
                                        .Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                                        .Take(queryParameters.PageSize)
                                        .ToList();
        List<ArticleResponse> articleResponseList = _mapper.Map<List<ArticleResponse>>(articles);
        return new ArticlePageResponse(articleCount, articleResponseList);
    }

    public ArticleResponse GetArticleById(int id)
    {
        Article? articleFound = _context.Article.Where(a => a.Id == id).FirstOrDefault();
        if (articleFound == null)
        {
            throw new KeyNotFoundException($"Article with ID {id} not found.");
        }
        return _mapper.Map<ArticleResponse>(articleFound);
    }

    public ArticleResponse CreateArticle(ArticleCreateRequest request)
    {
        Article createdArticle = _mapper.Map<Article>(request);
        if(createdArticle.ParagraphIds == null){
            createdArticle.ParagraphIds = new List<int>();
        }
        _context.Article.Add(createdArticle);
        _context.SaveChanges();
        return _mapper.Map<ArticleResponse>(createdArticle);
    }


    public ArticleResponse UpdateArticle(int id, ArticleUpdateRequest request)
    {
        Article? articleFound = _context.Article.Where(x => x.Id == id).FirstOrDefault();
        if (articleFound == null)
        {
            throw new KeyNotFoundException($"Article with ID {id} not found.");
        }

        if (request.Title != null)
        {
            articleFound.Title = request.Title;
        }
        if (request.CategoryTitle != null)
        {
            articleFound.CategoryTitle = request.CategoryTitle;
        }
        _context.SaveChanges();
        return _mapper.Map<ArticleResponse>(articleFound);
    }


    public void DeleteArticle(int articleId)
    {
        Article? articleFound = _context.Article.Where(x => x.Id == articleId).FirstOrDefault();
        if (articleFound != null)
        {
            _context.Article.Remove(articleFound);
            _context.SaveChanges();
        }else{
            throw new KeyNotFoundException($"Question with ID {articleId} not found.");
        }
    }
}
