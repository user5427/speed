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

namespace Unit;

public class QuestionServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    // private readonly Mock<IMapper> _mockMapper;
    private readonly ImageService _imageService;
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;
    private readonly ArticleResponse createdArticle;
    private readonly ParagraphResponse createdParagraph;

    public QuestionServiceTests()
    {
        // Create the context creator
        var context = ContextCreator.CreateIsolatedContext();

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
        var request = new ArticleCreateRequest("Test Article", "Test Category", null, null, null, null, null);
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

    [Fact(DisplayName = "Question creating with paragraph id 0")]
    public void CreateQuestionWithParagraphId0()
    {
        // Arrange
        var request = new QuestionCreateRequest(0, "Test Question", ["answer 1", "answer 2"], 0);
        
        // Act
        var exception = Assert.Throws<ResourceNotFoundException>(() => 
            _questionService.CreateQuestion(request));
    }

    [Fact(DisplayName = "Question searching")]
    public void SearchQuestion()
    {
        // Arrange
        var request = new QuestionCreateRequest(createdParagraph.Id, "Test Question", ["answer 1", "answer 2"], 0);
        var created = _questionService.CreateQuestion(request);

        var request2 = new QuestionCreateRequest(createdParagraph.Id, "Test Questien 2", ["answer 1", "answer 2"], 0);
        var created2 = _questionService.CreateQuestion(request2);
        
        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Question";
        var result = _questionService.SearchQuestions(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Items);
        Assert.Equal("Test Question", result.Items[0].QuestionText);
        Assert.Equal(createdParagraph.Id, result.Items[0].ParagraphId);
    }

    [Fact(DisplayName = "Question searching empty")]
    public void SearchQuestionsEmpty()
    {
        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test Questioneeeee";
        var result = _questionService.SearchQuestions(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
    }

    [Fact(DisplayName = "Question searching, multiple results")]
    public void SearchQuestionMulti()
    {
        // Arrange
        var request = new QuestionCreateRequest(createdParagraph.Id, "Test999 Question", ["answer 1", "answer 2"], 0);
        var created = _questionService.CreateQuestion(request);

        var request2 = new QuestionCreateRequest(createdParagraph.Id, "Test999 Questien 2", ["answer 1", "answer 2"], 0);
        var created2 = _questionService.CreateQuestion(request2);
        
        // Act
        var queryParam = new QueryParameters();
        queryParam.Search = "Test999";
        var result = _questionService.SearchQuestions(queryParam);
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Items);
        Assert.Equal(2, result.Items.Count);
    }
    [Fact(DisplayName = "Category count")]
    public void CategoryCount(){
        long count = _questionService.GetCount();
        Assert.Equal(0, count);
    }
}
