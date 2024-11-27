﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using AutoMapper;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using SpeedReaderAPI.DTOs.ParagraphSession;

namespace SpeedReaderAPI
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ArticleCreateRequest, Article>();
            CreateMap<ArticleUpdateRequest, Article>();
            CreateMap<Article, ArticleResponse>();

            CreateMap<QuestionCreateRequest, Question>();
            CreateMap<QuestionUpdateRequest, Question>();
            CreateMap<Question, QuestionResponse>();

            CreateMap<ParagraphCreateRequest, Paragraph>();
            CreateMap<ParagraphUpdateRequest, Paragraph>();
            CreateMap<Paragraph, ParagraphResponse>();

            CreateMap<ValidationSettings, ValidationSettingsResponce>();
            CreateMap<ValidationSettingsUpdateRequest, ValidationSettings>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));;
            
            CreateMap<CategoryCreateRequest, Category>();
            CreateMap<CategoryUpdateRequest, Category>();
            CreateMap<Category, CategoryResponse>();
            CreateMap<ArticleSessionCreateRequest, ArticleSession>();
            CreateMap<ArticleSession, ArticleSessionResponse>();

            CreateMap<ParagraphSessionCreateRequest, ParagraphSession>();
            CreateMap<ParagraphSession, ParagraphSessionDto>();
        }
    }
}
