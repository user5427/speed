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
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.DTOs.Article.Responses;

public class ParagraphServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;
    private readonly ArticleResponse createdArticle;
    public ParagraphServiceTests()
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

        // Initialize ArticleService with mock data
        var request = new ArticleCreateRequest("Test Article", "Test Category"); 
        createdArticle = _articleService.CreateArticle(request);
    }

    [Fact (DisplayName  = "Paragraph creating")]
    public void CreateParagraph ()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        
        // Act
        var result = _paragraphService.CreateParagraph(requestP);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }

    [Fact (DisplayName  = "Paragraph getting")]
    public void GettingParagraph ()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        // Act
        var result = _paragraphService.GetParagraph(createdP.Id);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }

    [Fact (DisplayName  = "Paragraph updating")]
    public void UpdateParagraph ()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);

        var requestP2 = new ParagraphUpdateRequest("Test Paragraph 2", createdArticle.Id, "Test Article");
        
        // Act
        var result = _paragraphService.UpdateParagraph(createdP.Id, requestP2);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Paragraph 2", result.Title);
        Assert.Equal(createdArticle.Id, result.ArticleId);
    }

    [Fact(DisplayName = "Paragraph deleting")]
    public void DeleteParagraph()
    {
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        var createdP = _paragraphService.CreateParagraph(requestP);
        
        // Act
        _paragraphService.DeleteParagraph(createdP.Id);

        // Assert
        var exception = Assert.Throws<ResourceNotFoundException>(() => 
            _paragraphService.GetParagraph(createdP.Id));
    }
}
