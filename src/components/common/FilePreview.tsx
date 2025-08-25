import dynamic from 'next/dynamic';
const PdfViewer = dynamic(() => import('./PdfViewer'), {
  ssr: false,
});

export default function FilePreview({ file }: { file: File | string }) {
  return (
    <div className="">
      <PdfViewer pdfUrl={file}></PdfViewer>
    </div>
  );
}
