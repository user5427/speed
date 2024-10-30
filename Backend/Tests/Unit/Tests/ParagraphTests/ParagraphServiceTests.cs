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

public class ParagraphServiceTests
{
    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;

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
    }

    
}
