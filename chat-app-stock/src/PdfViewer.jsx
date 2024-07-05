import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return <div style={{
    width: '50%',
    height: '100vh',
    overflow: 'auto',
    padding: '20px',
    boxSizing: 'border-box'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <div>
        <button onClick={() => setPageNumber(prevPage => Math.max(prevPage - 1, 1))}>이전</button>
        <span style={{ margin: '0 10px' }}>
          {pageNumber} / {numPages}
        </span>
        <button onClick={() => setPageNumber(prevPage => Math.min(prevPage + 1, numPages))}>다음</button>
      </div>
    </div>
    <Document
      file="/stocktrade_law.pdf"
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={(error) => console.error('문서 로딩 오류:', error)}
    >
      <Page
        pageNumber={pageNumber}
        width={window.innerWidth * 0.45}
        onLoadError={(error) => console.error('페이지 로딩 오류:', error)}
      />
    </Document>
  </div>
};

export default PdfViewer;