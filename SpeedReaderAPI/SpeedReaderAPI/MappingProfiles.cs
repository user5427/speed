// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using AutoMapper;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
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

            CreateMap<Paragraph, ParagraphResponse>();
            CreateMap<ParagraphResponse, Paragraph>();
        }
    }
}
