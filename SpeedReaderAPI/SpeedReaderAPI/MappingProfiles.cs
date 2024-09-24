// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using AutoMapper;
using SpeedReaderAPI.DTOs.Responses;
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

            CreateMap<Question, QuestionResponse>();
            CreateMap<QuestionResponse, Question>();

            CreateMap<Paragraph, ParagraphResponse>();
            CreateMap<ParagraphResponse, Paragraph>();
        }
    }
}
