namespace CMDB.ViewModels
{
    public class PagerViewModel
    {
        public int PageNumber { get; private set; }
        public int PageSize { get; private set; }
        public int TotalItems { get; private set; }
        public int TotalPages { get; private set; }
        public int[] PageSizeOptions { get; private set; }

        public PagerViewModel(int pageNumber, int pageSize, int totalItems, int[] pageSizeOptions)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalItems = totalItems;
            TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            PageSizeOptions = pageSizeOptions;
        }

        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;
    }
}
