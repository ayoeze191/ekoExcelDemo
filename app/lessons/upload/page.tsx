import PdfUploadForm from ".";
import PDFUploader from "./PDFUploader";
import { SchoolSelector } from "./schoolselector";
import { schools } from "@/app/data/schools";
export default function Page() {
  return (
    <div className="max-w-96 mx-auto">
      {/* <SchoolSelector schools={schools} /> */}
      <PdfUploadForm />
    </div>
  );
}
