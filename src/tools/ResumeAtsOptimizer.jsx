import React, { useState } from 'react';
import { pdfjsLib } from '../config/pdfWorker';
import { Button } from '../components/Button';
import { FileUp, Search, CheckCircle2, XCircle, AlertCircle, Briefcase } from 'lucide-react';

export const ResumeAtsOptimizer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const extractTextFromPDF = async (fileData) => {
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileData) });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += pageText + ' ';
    }

    return fullText;
  };

  const extractKeywords = (text) => {
    // Simple word extraction, filtering out common stop words
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not']);
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
    
    const wordCounts = {};
    words.forEach(word => {
      if (word.length > 2 && !stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    // Sort by frequency and return top keywords (let's say we just return unique words for matching)
    return Object.keys(wordCounts);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload your Resume (PDF).');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste the Job Description.');
      return;
    }

    try {
      setError('');
      setIsProcessing(true);
      setResults(null);

      const arrayBuffer = await file.arrayBuffer();
      const resumeText = await extractTextFromPDF(arrayBuffer);
      
      const resumeWords = extractKeywords(resumeText);
      const jdWords = extractKeywords(jobDescription);
      
      // We want to find which important JD words are in the resume.
      // For simplicity, we just check presence.
      
      const foundKeywords = [];
      const missingKeywords = [];
      
      // Let's filter jdWords to most relevant or just all non-stop words. 
      // To avoid massive lists, let's just show all matched/unmatched non-stop words that are in JD.
      // But maybe we want to focus on "skills". We can't do deep NLP in browser easily without massive models,
      // but simple keyword matching is often what basic ATS scanners do.
      
      const resumeWordSet = new Set(resumeWords);
      
      jdWords.forEach(word => {
        if (resumeWordSet.has(word)) {
          foundKeywords.push(word);
        } else {
          missingKeywords.push(word);
        }
      });
      
      const matchScore = jdWords.length > 0 ? Math.round((foundKeywords.length / jdWords.length) * 100) : 0;

      setResults({
        score: matchScore,
        found: foundKeywords,
        missing: missingKeywords
      });

    } catch (err) {
      console.error(err);
      setError('Failed to analyze the resume. Ensure it is a valid text-based PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setResults(null);
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)' }}>1. Upload Resume (PDF)</label>
            <div style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'center',
              background: file ? 'var(--primary-color-alpha)' : 'var(--bg-color)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
            onClick={() => document.getElementById('resume-pdf-input').click()}
            >
              <input
                id="resume-pdf-input"
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <FileUp size={32} style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>
                {file ? file.name : 'Click to select PDF'}
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)' }}>2. Paste Job Description</label>
            <textarea
              className="form-control"
              rows="8"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          {error && (
            <div style={{ padding: '0.75rem', background: 'var(--error-bg)', color: 'var(--error-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <Button variant="primary" onClick={handleAnalyze} disabled={isProcessing} style={{ width: '100%', justifyContent: 'center' }}>
            {isProcessing ? 'Analyzing...' : (
              <>
                <Search size={16} /> Analyze Resume Match
              </>
            )}
          </Button>

        </div>

        {/* Right Column: Results */}
        <div style={{ 
          background: 'var(--bg-color)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem' 
        }}>
          {results ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>ATS Match Score</h3>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: '800', 
                  color: results.score >= 70 ? 'var(--success-color)' : results.score >= 40 ? 'var(--warning-color)' : 'var(--error-color)'
                }}>
                  {results.score}%
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {results.score >= 70 ? 'Excellent match! Your resume is highly optimized.' : results.score >= 40 ? 'Fair match. Consider adding more keywords.' : 'Poor match. Significant keyword optimization needed.'}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--success-color)', marginBottom: '0.75rem' }}>
                  <CheckCircle2 size={16} /> Found Keywords ({results.found.length})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                  {results.found.length > 0 ? results.found.map(kw => (
                    <span key={kw} style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success-color)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '500' }}>
                      {kw}
                    </span>
                  )) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No keywords matched.</span>
                  )}
                </div>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--error-color)', marginBottom: '0.75rem' }}>
                  <XCircle size={16} /> Missing Keywords ({results.missing.length})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                  {results.missing.length > 0 ? results.missing.map(kw => (
                    <span key={kw} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '500' }}>
                      {kw}
                    </span>
                  )) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No missing keywords!</span>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', textAlign: 'center' }}>
              <Briefcase size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Upload your resume and paste a job description to see your ATS match score.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
