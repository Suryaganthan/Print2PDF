using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrintPDF.Models
{
    public class ImageToPDFViewModel
    {
        public long DocumentID { get; set; }
        public string DocumentName { get; set; }
        public List<string> ImageList { get; set; }
        public List<string> SanitizedImageList { get; set; }
    }
}
