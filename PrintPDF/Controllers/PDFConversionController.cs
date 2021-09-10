using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using PrintPDF.Models;

namespace PrintPDF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFConversionController : ControllerBase
    {
        public PDFConversionController()
        {

        }

        [HttpPost("getImagesAsPDF")]
        public Byte[] GetImagesAsPDF(ImageToPDFViewModel images)
        {
            Document doc = new Document(PageSize.A4);
            Document document = new Document();
            string path = "C:\\scans\\combinePages.pdf";
            PdfWriter.GetInstance(document, new FileStream(path, FileMode.Create));
            document.Open();
            images.SanitizedImageList.ForEach(x =>
            {
                string result = Regex.Replace(x, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);
                byte[] pdfBytes = Convert.FromBase64String(result);
                Image image = Image.GetInstance(pdfBytes);
                document.SetPageSize(image);
                document.NewPage();
                image.SetAbsolutePosition(0, 0);
                document.Add(image);
            });
            document.Close();

            byte[] bytes = System.IO.File.ReadAllBytes(path);
            System.IO.File.Delete(path);
            return bytes;

        }
    }
}
