// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

namespace SpeedReaderAPI.DTOs.Article
{
    public class ArticleDTO
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(ValidationConstants.MaxTitleLength,
         MinimumLength = ValidationConstants.MinTitleLength,
         ErrorMessage = "Title must be between {2} and {1} characters.")]
        public string Title { get; init; }
        public int Id { get; set; }
        public string? CategoryTitle { get; set; } //-
    }
}
