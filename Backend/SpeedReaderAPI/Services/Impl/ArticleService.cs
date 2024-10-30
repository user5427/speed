using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.helpers;
namespace SpeedReaderAPI.Services.Impl;



public class ArticleService : IArticleService
{
    private readonly CombinedRepositories _context;
    private readonly IImageService _imageService;
    private readonly IParagraphService _paragraphService;
    private readonly IMapper _mapper;

    // Production constructor
    public ArticleService(ApplicationContext context, IMapper mapper,
        IImageService imageService, IParagraphService paragraphService)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _imageService = imageService;
        _paragraphService = paragraphService;
    }

    public ArticlePageResponse GetArticles(QueryParameters queryParameters)
    {
        long articleCount = _context.Article.Count();
        List<Article> articles = _context.Article.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize);
        List<ArticleResponse> articleResponseList = _mapper.Map<List<ArticleResponse>>(articles);
        return new ArticlePageResponse(articleCount, articleResponseList);
    }

    public ArticleResponse GetArticleById(int id)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }
        return _mapper.Map<ArticleResponse>(articleFound);
    }

    public ArticleResponse CreateArticle(ArticleCreateRequest request)
    {
        Article createdArticle = _mapper.Map<Article>(request);
        _context.Article.Add(createdArticle);
        _context.SaveChanges();
        return _mapper.Map<ArticleResponse>(createdArticle);
    }


    public ArticleResponse UpdateArticle(int id, ArticleUpdateRequest request)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }

        if (request.Title != null)
        {
            articleFound.Title = request.Title;
        }
        if (request.CategoryTitle != null)
        {
            articleFound.CategoryTitle = request.CategoryTitle;
        }
        if (request.ParagraphIds != null)
        {
            var difference = articleFound.ParagraphIds.Except(request.ParagraphIds);
            if (difference.Any() || articleFound.ParagraphIds.Count != request.ParagraphIds.Count)
            {
                throw new InvalidParagraphIdListException();
            }
            articleFound.ParagraphIds = request.ParagraphIds;
        }
        _context.SaveChanges();
        return _mapper.Map<ArticleResponse>(articleFound);
    }


    public void DeleteArticle(int articleId)
    {
        Article? articleFound = _context.Article.FindById(articleId);
        if (articleFound != null)
        {
            if (articleFound.Image != null && articleFound.Image.HasValue)
            {
                _imageService.Delete((Image)articleFound.Image);
            }
            var copyOfParaphIds = articleFound.ParagraphIds.ToList();
            copyOfParaphIds.ForEach(_paragraphService.DeleteParagraph);
            _context.Article.Remove(articleFound);
            _context.SaveChanges();
        }
        else
        {
            throw new ResourceNotFoundException($"Article with ID {articleId} not found.");
        }
    }

    public PageResponse<ArticleResponse> SearchArticles(QueryParameters queryParameters)
    {
        long articleCount = _context.Article.Count();
        List<Article> articles = _context.Article.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize)
                                                    .Where(a => string.IsNullOrEmpty(queryParameters.Search) || a.Title.Contains(queryParameters.Search))
                                                    .ToList();
        var sortedArticles = Sorter.SortList(articles);                                
        List<ArticleResponse> articleResponseList = _mapper.Map<List<ArticleResponse>>(sortedArticles);
        return new PageResponse<ArticleResponse>(articleCount, articleResponseList);
    }

    public async Task<ArticleResponse> UploadImage(int id, ImageUploadRequest request)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }
        if (articleFound.Image.HasValue)
        {
            throw new ResourceAlreadyExistsException($"Article with ID {id} has an image.");
        }
        articleFound.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();

        return _mapper.Map<ArticleResponse>(articleFound);
    }

    public Image GetImage(int id)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }
        try
        {
            if (!articleFound.Image.HasValue) throw new Exception();
            Image img = articleFound.Image.Value;
            Stream? stream = _imageService.Get(img);
            if (stream == null) throw new Exception();
            img.FileStream = stream;
            return img;
        }
        catch (Exception)
        {
            throw new ResourceNotFoundException($"Article with ID {id} doesn't have an image.");
        }
    }

    public void DeleteImage(int id)
    {
        Article? articleFound = _context.Article.FindById(id);
        if (articleFound == null)
        {
            throw new ResourceNotFoundException($"Article with ID {id} not found.");
        }
        if (articleFound.Image == null || !articleFound.Image.HasValue) return;
        _imageService.Delete((Image)articleFound.Image);

        articleFound.Image = null;
        _context.SaveChanges();
    }

    public int GetCount()
    {
        return _context.Article.Count();
    }
}
