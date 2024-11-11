using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;

namespace SpeedReaderAPI.Services.Impl;

public class CategoryService : ICategoryService
{
    private readonly CombinedRepositories _context;
    private readonly IImageService _imageService;
    private readonly ICategoryService _categoryService;
    private readonly IMapper _mapper;

    public CategoryService(ApplicationContext context, IMapper mapper, IImageService imageService, ICategoryService categoryService)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _imageService = imageService;
        _categoryService = categoryService;
    }

    public CategoryResponse CreateCategory(CategoryCreateRequest request)
    {
        Category createdCategory = _mapper.Map<Category>(request);
        _context.Category.Add(createdCategory);
        _context.SaveChanges();
        return _mapper.Map<CategoryResponse>(createdCategory);
    }

    public void DeleteCategory(int categoryId)
    {
        Category? categoryFound = _context.Category.FindById(categoryId);
        if (categoryFound != null) {
            if (categoryFound.Image != null && categoryFound.Image.HasValue)
            {
                _imageService.Delete((Image)categoryFound.Image);
            }

            _context.Category.Remove(categoryFound);
            _context.SaveChanges();
        }
        else
        {
            throw new ResourceNotFoundException($"Category with ID {categoryId} not found.");
        }
    }

    public void DeleteImage(int id)
    {
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null) {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        if (categoryFound.Image == null || !categoryFound.Image.HasValue) return;
        _imageService.Delete((Image)categoryFound.Image);

        categoryFound.Image = null;
        _context.SaveChanges();
    }

    public CategoryResponse GetCategoryById(int id)
    {
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        return _mapper.Map<CategoryResponse>(categoryFound);
    }

    public long GetCount()
    {
        return _context.Category.Count();
    }

    public Image GetImage(int id)
    {
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        try
        {
            if (!categoryFound.Image.HasValue) throw new Exception();
            Image img = categoryFound.Image.Value;
            Stream? stream = _imageService.Get(img);
            if (stream == null) throw new Exception();
            img.FileStream = stream;
            return img;
        }
        catch (Exception)
        {
            throw new ResourceNotFoundException($"Category with ID {id} doesn't have an image.");
        }
    }

    public PageResponse<CategoryResponse> SearchCategories(QueryParameters queryParameters)
    {
        long categoryCount = _context.Category.Count();
        List<Category> categories = _context.Category.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize)
                                                        .Where(a => string.IsNullOrEmpty(queryParameters.Search) || a.Title.Contains(queryParameters.Search))
                                                        .ToList();
        List<CategoryResponse> categoryResponseList = _mapper.Map<List<CategoryResponse>>(categories);
        return new PageResponse<CategoryResponse>(categoryCount, categoryResponseList);
    }

    public CategoryResponse UpdateCategory(int id, CategoryUpdateRequest request)
    {
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }

        if (request.Title != null)
        {
            categoryFound.Title = request.Title;
        }
    }

    public Task<CategoryResponse> UploadImage(int id, ImageUploadRequest request)
    {
        throw new NotImplementedException();
    }
}