import { JsonFormatter } from './JsonFormatter';
import { JsonValidator } from './JsonValidator';
import { UuidGenerator } from './UuidGenerator';
import { Base64Tool } from './Base64Tool';
import { UrlEncoderTool } from './UrlEncoderTool';
import { TimestampConverter } from './TimestampConverter';
import { PasswordGenerator } from './PasswordGenerator';
import { WordCounter } from './WordCounter';
import { CaseConverter } from './CaseConverter';
import { ColorConverter } from './ColorConverter';
import { ImageCompressor } from './ImageCompressor';
import { ImageResizer } from './ImageResizer';
import { JpgToPng } from './JpgToPng';
import { PngToJpg } from './PngToJpg';
import { PercentageCalculator } from './PercentageCalculator';
import { QrCodeGenerator } from './QrCodeGenerator';
import { HashGenerator } from './HashGenerator';
import { LoremIpsumGenerator } from './LoremIpsumGenerator';
import { RegexTester } from './RegexTester';
import { TextDiffChecker } from './TextDiffChecker';
import { MetaTagGenerator } from './MetaTagGenerator';
import { PdfMerger } from './PdfMerger';
import { PdfSplitter } from './PdfSplitter';
import { ImagesToPdf } from './ImagesToPdf';
import { PdfToImages } from './PdfToImages';
import { BackgroundRemover } from './BackgroundRemover';
import { MarkdownConverter } from './MarkdownConverter';
import { CodeMinifier } from './CodeMinifier';
import { PdfCompressor } from './PdfCompressor';
import { SignatureExtractor } from './SignatureExtractor';

export const TOOL_COMPONENTS = {
  'json-formatter': JsonFormatter,
  'json-validator': JsonValidator,
  'uuid-generator': UuidGenerator,
  'base64': Base64Tool,
  'url-encoder': UrlEncoderTool,
  'timestamp-converter': TimestampConverter,
  'password-generator': PasswordGenerator,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'color-converter': ColorConverter,
  'image-compressor': ImageCompressor,
  'image-resizer': ImageResizer,
  'jpg-to-png': JpgToPng,
  'png-to-jpg': PngToJpg,
  'percentage-calculator': PercentageCalculator,
  'qr-code-generator': QrCodeGenerator,
  'hash-generator': HashGenerator,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'regex-tester': RegexTester,
  'text-diff-checker': TextDiffChecker,
  'meta-tag-generator': MetaTagGenerator,
  'pdf-merger': PdfMerger,
  'pdf-splitter': PdfSplitter,
  'images-to-pdf': ImagesToPdf,
  'pdf-to-images': PdfToImages,
  'pdf-compressor': PdfCompressor,
  'signature-extractor': SignatureExtractor,
  'background-remover': BackgroundRemover,
  'markdown-converter': MarkdownConverter,
  'code-minifier': CodeMinifier,
};
