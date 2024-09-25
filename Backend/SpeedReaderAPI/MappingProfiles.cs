// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using AutoMapper;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Paragraph;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Article, ArticleShortResponse>();
            CreateMap<Article, ArticleLongResponse>();
            CreateMap<ArticleShortResponse, Article>();
            CreateMap<ArticleLongResponse, Article>();

            CreateMap<CreateArticleRequest, Article>();
            CreateMap<Article, CreateArticleRequest>();

            CreateMap<Question, QuestionResponse>();
            CreateMap<QuestionResponse, Question>();

            CreateMap<Question, QuestionRequest>();
            CreateMap<QuestionRequest, Question>();

            CreateMap<Question, QuestionDTO>();
            CreateMap<QuestionDTO, Question>();

            CreateMap<Paragraph, CreateParagraphResponse>();
            CreateMap<CreateParagraphResponse, Paragraph>();
            CreateMap<Paragraph, ParagraphRequest>();
            CreateMap<ParagraphRequest, Paragraph>();
            CreateMap<Paragraph, ParagraphDTO>();
            CreateMap<ParagraphDTO, Paragraph>();
        }
    }
}
