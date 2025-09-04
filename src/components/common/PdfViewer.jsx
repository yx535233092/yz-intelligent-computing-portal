import * as pdfjs from 'pdfjs-dist';
import { useEffect, useRef } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `/5.4.54pdf.worker.min.mjs`;

export default function PdfViewer({ pdfUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 创建 loadingTask，并指定 cMapUrl 和 cMapPacked
    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: '/bcmaps/', // 路径指向 public 目录下的 cmaps 文件夹
      cMapPacked: true, // 告诉 PDF.js 使用打包的 cMap 文件
    });

    loadingTask.promise
      .then((pdf) => {
        return pdf.getPage(1);
      })
      .then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        page.render(renderContext);
      })
      .catch((error) => {
        console.error('Error during PDF rendering:', error);
      });
  }, [pdfUrl]);

  return (
    <div className="h-[770px] overflow-y-auto">
      <canvas
        style={{
          width: '100%',
        }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
