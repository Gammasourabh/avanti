import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { FiUpload, FiDownload, FiFileText } from "react-icons/fi";

const BulkProductImportExport = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle file selection
  const onFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setMessage(null);
    setError(null);
  };

  // Handle Import with progress
  const onImport = async () => {
    if (!file) {
      setError("Please select a file to import.");
      setMessage(null);
      return;
    }

    setIsImporting(true);
    setError(null);
    setMessage(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/products/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setMessage(res.data.message || "Products imported successfully!");
      setFile(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to import products. See console."
      );
      console.error(err);
    } finally {
      setIsImporting(false);
      setUploadProgress(0);
    }
  };

  // Handle Export - triggers file download
  const onExport = async () => {
  try {
    const response = await axios.get('/api/products/export', {
      responseType: 'blob', // important for binary/file responses
    });
    // Create a link to trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products_export.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    setError('Failed to download products. Please try again.');
  }
};


  return (
    <Container fluid className="py-4" style={{ minHeight: "80vh" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={7} xl={6}>
          <Card className="shadow-sm border-0">
            <Card.Header
              className="bg-primary text-white d-flex align-items-center"
              style={{ borderTopLeftRadius: "0.25rem", borderTopRightRadius: "0.25rem" }}
            >
              <FiFileText size={28} className="me-2" />
              <h4 className="mb-0">Bulk Product Import / Export</h4>
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="uploadFile" className="mb-4">
                <Form.Label className="fw-semibold fs-5">
                  Upload CSV or Excel file for import
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={onFileChange}
                  disabled={isImporting}
                />
                <Form.Text className="text-muted">
                  Accepted formats: CSV, XLS, XLSX. Max file size 10MB.
                </Form.Text>
              </Form.Group>

              {isImporting && (
                <ProgressBar
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  striped
                  variant="info"
                  className="mb-3"
                />
              )}

              {message && (
                <Alert variant="success" onClose={() => setMessage(null)} dismissible>
                  {message}
                </Alert>
              )}
              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}

              <Row className="mb-3 justify-content-between">
                <Col xs="auto" className="d-grid mb-2 mb-md-0">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onImport}
                    disabled={isImporting}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    {isImporting && <Spinner animation="border" size="sm" />}
                    <FiUpload />
                    {isImporting ? "Importing..." : "Import Products"}
                  </Button>
                </Col>
                <Col xs="auto" className="d-grid">
                  <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={onExport}
                    disabled={isImporting}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FiDownload />
                    Export All Products
                  </Button>
                </Col>
              </Row>

              <hr />

              <div className="text-muted text-center small fst-italic">
                Make sure your file matches the required format before importing.
                <br />
                You can export products first to get a sample CSV.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BulkProductImportExport;
