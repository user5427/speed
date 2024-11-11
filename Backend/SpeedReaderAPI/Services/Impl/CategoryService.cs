using AutoMapper;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Services.Impl;

public class CategoryService : ICategoryService
{
    private readonly CombinedRepositories _context;
    private readonly IImageService _imageService;
    private readonly ICategoryService _categoryService;
    private readonly IMapper _mapper;

    public CategoryResponse CreateCategory(CategoryCreateRequest request)
    {
        throw new NotImplementedException();
    }

    public void DeleteCategory(int categoryId)
    {
        throw new NotImplementedException();
    }

    public void DeleteImage(int id)
    {
        throw new NotImplementedException();
    }

    public CategoryResponse GetCategory(int id)
    {
        throw new NotImplementedException();
    }

    public long GetCount()
    {
        throw new NotImplementedException();
    }

    public Image GetImage(int id)
    {
        throw new NotImplementedException();
    }

    public PageResponse<CategoryResponse> SearchCategories(QueryParameters queryParameters)
    {
        throw new NotImplementedException();
    }

    public CategoryResponse UpdateCategory(int id, CategoryUpdateRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<CategoryResponse> UploadImage(int id, ImageUploadRequest request)
    {
        throw new NotImplementedException();
    }
}