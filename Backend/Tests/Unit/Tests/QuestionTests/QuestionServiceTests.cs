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
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.Exceptions;

public class QuestionServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;
    private readonly ArticleResponse createdArticle;
    private readonly ParagraphResponse createdParagraph;

    public QuestionServiceTests()
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

        // Initialize ParagraphService with mock data
        var requestP = new ParagraphCreateRequest("Test Paragraph", createdArticle.Id, "Test Article");
        createdParagraph = _paragraphService.CreateParagraph(requestP);
    }

    [Fact (DisplayName  = "Question creating")]
    public void CreateQuestion ()
    {
        // Arrange
        var request = new QuestionCreateRequest(createdParagraph.Id, "Test Question", ["answer 1", "answer 2"], 0);
        
        // Act
        var result = _questionService.CreateQuestion(request);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Question", result.QuestionText);
        Assert.Equal(createdParagraph.Id, result.ParagraphId);
    }

    [Fact (DisplayName  = "Question getting")]
    public void GettingQuestion ()
    {
        // Arrange
        var request = new QuestionCreateRequest(createdParagraph.Id, "Test Question", ["answer 1", "answer 2"], 0);
        var created = _questionService.CreateQuestion(request);
        
        // Act
        var result = _questionService.GetQuestion(created.Id);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Question", result.QuestionText);
        Assert.Equal(createdParagraph.Id, result.ParagraphId);
    }

    [Fact (DisplayName  = "Question updating")]
    public void UpdateQuestion ()
    {
        // Arrange
        var request = new QuestionCreateRequest(createdParagraph.Id, "Test Question", ["answer 1", "answer 2"], 0);
        var created = _questionService.CreateQuestion(request);
        
        // Act
        var request2 = new QuestionUpdateRequest(createdParagraph.Id, "Test Question 2", ["answer 1", "answer 2"], 0);
        var result = _questionService.UpdateQuestion(created.Id, request2);
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Question 2", result.QuestionText);
        Assert.Equal(createdParagraph.Id, result.ParagraphId);
    }

    [Fact(DisplayName = "Question deleting")]
    public void DeleteQuestion()
    {
        // Arrange
        var request = new QuestionCreateRequest(createdParagraph.Id, "Test Question", ["answer 1", "answer 2"], 0);
        var created = _questionService.CreateQuestion(request);
        
        // Act
        _questionService.DeleteQuestion(created.Id);
        var exception = Assert.Throws<ResourceNotFoundException>(() => 
            _questionService.GetQuestion(created.Id));
    }

    
}
