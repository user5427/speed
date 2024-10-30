using System;
using Moq;
using Xunit;
using SpeedReaderAPI.Services;
using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI;
using SpeedReaderAPI.Exceptions;

public class ArticleServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;

    public ArticleServiceTests()
    {
        // Create the context creator
        _contextCreator = new ContextCreator();
        var context = _contextCreator.CreateContext();

         // Set up AutoMapper with the actual mappings
        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfiles>(); // Replace with your actual AutoMapper profile(s)
        });
        _mapper = mapperConfig.CreateMapper();

        // Create the ImageService
        _imageService = new ImageService();
        // _mockMapper.Object

        _questionService = new QuestionService(context, _mapper, _imageService);

        _paragraphService = new ParagraphService(context, _mapper, _imageService, _questionService);

        // Initialize ArticleService with mocks and context
        _articleService = new ArticleService(context, _mapper, 
                                             _imageService, 
                                             _paragraphService);
    }

    [Fact (DisplayName  = "Article creating")]
    public void CreateArticle ()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category");
        
        // Act
        var result = _articleService.CreateArticle(request);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Article", result.Title);
        Assert.Equal("Test Category", result.CategoryTitle);
    }

    [Fact (DisplayName  = "Article getting")]
    public void GettingArticle ()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category"); 
        var created = _articleService.CreateArticle(request);
        
        // Act
        var result = _articleService.GetArticleById(created.Id);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(created.Id, result.Id);
    }

    [Fact (DisplayName  = "Article updating")]
    public void UpdateArticle ()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category"); 
        var created = _articleService.CreateArticle(request);
        var updateRequest = new ArticleUpdateRequest("Updated Article", "Updated Category", null);
        
        // Act
        var result = _articleService.UpdateArticle(created.Id, updateRequest);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Updated Article", result.Title);
        Assert.Equal("Updated Category", result.CategoryTitle);
    }

    [Fact(DisplayName = "Article deleting")]
    public void DeleteArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest("Test Article", "Test Category"); 
        var created = _articleService.CreateArticle(request);
        
        // Act
        _articleService.DeleteArticle(created.Id);

        // Assert
        var exception = Assert.Throws<ResourceNotFoundException>(() => 
            _articleService.GetArticleById(created.Id));
        Assert.Equal($"Article with ID {created.Id} not found.", exception.Message);
    }

}
