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

public class QuestionServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly Mock<IMapper> _mockMapper;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly QuestionService _questionService;

    public QuestionServiceTests()
    {
        // Create the context creator
        _contextCreator = new ContextCreator();
        var context = _contextCreator.CreateContext();

        // Mock dependencies
        _mockMapper = new Mock<IMapper>();
        _mockMapper.Setup(m => m.Map<Article>(It.IsAny<ArticleCreateRequest>()))
                   .Returns((ArticleCreateRequest request) => new Article 
                   { 
                       Title = request.Title, 
                       CategoryTitle = request.CategoryTitle 
                   });

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
    }

    
}
