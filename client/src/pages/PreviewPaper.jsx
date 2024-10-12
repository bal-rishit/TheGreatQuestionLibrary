import { useLocation } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { publicRequest } from '../requestMethods';
import { useSelector } from 'react-redux';

const PreviewContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #333;
  margin-bottom: 40px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 30px;
`;

const QuestionText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const OptionText = styled.p`
  font-size: 16px;
  margin-left: 20px;
  margin-bottom: 5px;
`;

const DownloadButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 40px;
  border-radius: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const PdfLink = styled.a`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
`;

const PreviewPaper = () => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const { selectedQuestions } = location.state || { selectedQuestions: [] };
  const printRef = useRef();
  
  // State for user input
  const [course, setCourse] = useState('');
  const [paperTitle, setPaperTitle] = useState('New Paper'); // New state for paper title
  
  // State for storing the generated PDF URL
  const [pdfUrl, setPdfUrl] = useState(null);

  // Function to generate the PDF and send it to the backend for Dropbox upload
  const generatePdf = () => {
    const element = printRef.current;

    const options = {
      margin: 10,
      filename: `${paperTitle}_paper.pdf`, // Use paperTitle in the filename
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(options)
      .outputPdf('blob') // Output PDF as Blob
      .then((pdfBlob) => {
        const formData = new FormData();
        formData.append('file', pdfBlob, `${paperTitle}_paper.pdf`);
        formData.append('userId', user._id);
        formData.append('paperTitle', paperTitle);

        // Send the PDF file to the backend for Dropbox upload
        uploadToDropbox(formData);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  // Function to send PDF to the backend for Dropbox upload
  const uploadToDropbox = async (formData) => {
    try {
      const res = await publicRequest.post("/submit/uploadDropbox", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Dropbox Upload Response:", res.data);
      savePaperLink(user._id, paperTitle, res.data.viewableLink);
      setPdfUrl(res.data.viewableLink); // Set the Dropbox URL
    } catch (error) {
      console.error('Error uploading to Dropbox:', error);
    }
  };

  const savePaperLink = async (userId, paperTitle, paperLink) => {
    try {
      const res = await publicRequest.post("/submit/submitPaper", { userId, paperTitle, paperLink });
      console.log("Successfully saved Paper:", res.data);
    } catch (error) {
      console.error('Error saving paper link:', error);
    }
  };

  // Clean up the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <PreviewContainer>
      {/* Input section for course and paper title */}
      <Header>
        <Title>Customize Question Paper</Title>
        <Input
          type="text"
          placeholder="Enter Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter Paper Title"
          value={paperTitle}
          onChange={(e) => setPaperTitle(e.target.value)}
        />
      </Header>

      <Divider />

      {/* Ref to the content to be downloaded */}
      <div ref={printRef}>
        <Header>
          <Title>{course || "Course Name"}</Title>
          <p>{paperTitle || "Paper Title"}</p>
        </Header>
        <Divider />

        {selectedQuestions.map((questionObj, index) => (
          <QuestionWrapper key={questionObj._id}>
            <QuestionText>{`Q${index + 1}: ${questionObj.question}`}</QuestionText>
            {Object.entries(questionObj.givenOptions).map(([key, value], index) => (
              <OptionText key={index}>{`${key}: ${value}`}</OptionText>
            ))}
          </QuestionWrapper>
        ))}
      </div>

      {/* Button to generate the PDF link */}
      <DownloadButton onClick={generatePdf}>Generate PDF Link</DownloadButton>

      {/* Render the PDF download link if available */}
      {pdfUrl && (
        <PdfLink href={pdfUrl} download={`${paperTitle}_paper.pdf`}>
          Click here to download your PDF
        </PdfLink>
      )}
    </PreviewContainer>
  );
};

export default PreviewPaper;
