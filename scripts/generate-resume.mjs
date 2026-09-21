import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ACCENT = '#2563eb';
const INK = '#111827';
const MUTED = '#4b5563';

function generate(outputPath) {
  const doc = new PDFDocument({ size: 'Letter', margin: 50 });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  // Header
  doc.fillColor(INK).fontSize(22).font('Helvetica-Bold').text('Muhammad Asadullah', { align: 'center' });
  doc.fillColor(ACCENT).fontSize(12).font('Helvetica-Bold').text('Principal Software Engineer', { align: 'center' });
  doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
    'asad@asadcodes.com  |  +92 316 4363605  |  linkedin.com/in/i-asad  |  github.com/iasad95  |  asadcodes.com',
    { align: 'center' }
  );

  doc.moveDown(0.4);
  doc.strokeColor(ACCENT).lineWidth(1.2).moveTo(50, doc.y).lineTo(50 + pageWidth, doc.y).stroke();
  doc.moveDown(0.3);

  function ensureSpace(minHeight) {
    const bottom = doc.page.height - doc.page.margins.bottom;
    if (doc.y + minHeight > bottom) {
      doc.addPage();
    }
  }

  function sectionHeading(text, minHeight = 60) {
    ensureSpace(minHeight);
    doc.moveDown(0.35);
    doc.fillColor(ACCENT).fontSize(11).font('Helvetica-Bold').text(text.toUpperCase());
    doc.moveDown(0.1);
  }

  function bullet(text) {
    doc.fillColor(INK).fontSize(9).font('Helvetica').text(`•  ${text}`, { indent: 0 });
  }

  function jobHeader(role, company, dates, location) {
    ensureSpace(80);
    doc.moveDown(0.2);
    doc.fillColor(INK).fontSize(10).font('Helvetica-Bold').text(`${role}, ${company}`, { continued: false });
    doc.fillColor(MUTED).fontSize(9).font('Helvetica-Oblique').text(`${dates}  |  ${location}`);
    doc.moveDown(0.1);
  }

  // Summary
  sectionHeading('Summary');
  doc.fillColor(INK).fontSize(9).font('Helvetica').text(
    'Principal Software Engineer with 8+ years building cloud-native SaaS and AI-enabled products using Node.js, Python, React, Next.js, Angular, and AWS. Architected systems serving 12M+ users, including a file platform processing 500K+ operations daily; reduced API latency by 45%; led a zero-downtime migration of 50M+ records; and designed a centralized AI middleware and MCP server layer for Claude/OpenAI-based document intelligence and conversational workflows.'
  );

  // Core Skills
  sectionHeading('Core Skills');
  doc.fontSize(9).font('Helvetica');
  const skillLines = [
    ['Backend', 'Node.js, NestJS, Express.js, Python, FastAPI, REST APIs, GraphQL, JWT/OAuth 2.0'],
    ['Frontend', 'React, Next.js, Angular, Redux, NgRx, RxJS, TypeScript, Tailwind CSS'],
    ['Databases', 'MongoDB, PostgreSQL, MySQL, Redis'],
    ['Cloud & DevOps', 'AWS (Lambda, S3, EC2, RDS), Docker, Kubernetes, CI/CD'],
    ['Architecture', 'Microservices, Distributed Systems, Event-Driven, CQRS, System Design'],
    ['AI / LLM', 'Claude & OpenAI APIs, MCP Server Development, RAG & Vector Search, LangChain, n8n, Structured Outputs & Tool Calling'],
    ['Testing', 'Jest, Cypress, Unit/Integration/E2E Testing, TDD'],
    ['Tools', 'Git, Jira, Swagger, OpenAPI, PM2'],
  ];
  for (const [label, value] of skillLines) {
    doc.font('Helvetica-Bold').fillColor(INK).text(`${label}: `, { continued: true });
    doc.font('Helvetica').fillColor(MUTED).text(value);
  }
  doc.moveDown(0.1);
  doc.font('Helvetica-Oblique').fillColor(MUTED).fontSize(8.5).text(
    'Also comfortable with: C#, .NET, ASP.NET Core, Entity Framework, and Django.'
  );

  // Experience
  sectionHeading('Experience');

  jobHeader('Principal Software Engineer', 'Biztree', 'Jan 2023 - Present', 'Remote, Canada');
  [
    'Architected unified microservices backend for 12M+ users, cutting backend effort by 40%',
    'Designed AI middleware & MCP server layer: Claude/OpenAI workflows with secure tool access and token tracking',
    'Built CloudDrive: 500K+ daily file operations with RBAC and secure access',
    'Led zero-downtime MongoDB migration: 50M+ records with rollback-safe batch processing',
    'Reduced API latency by 45% using BullMQ and RabbitMQ',
    'Built HRM backend with PostgreSQL, TypeORM, CQRS',
    'Strengthened engineering foundations: Docker, CI/CD, structured logging, and automated testing',
  ].forEach(bullet);

  jobHeader('Senior Software Engineer', 'ConvertSite (ConvertCalculator), Part-time Contract', 'Jun 2024 - Aug 2025', 'Remote, Netherlands');
  [
    'Evolved a drag-and-drop builder into a prompt-driven AI app generator',
    'Generated calculators, quote forms, and landing pages directly from user intent',
    'Built a rules-driven workflow engine for pricing logic and lead capture',
    'Shipped embeddable integrations for WordPress, Shopify, Wix, and Framer',
    'Delivered full-stack features on a PostgreSQL-backed platform',
  ].forEach(bullet);

  jobHeader('Senior Software Engineer', 'InvoZone', 'Oct 2021 - Jan 2023', 'Lahore, Pakistan');
  [
    'Built enterprise PAM platform: credential and session management',
    'Designed scalable microservices with load balancing and clustering',
    'Added session forensics: keystroke and video recording for auditing',
    'Improved deployment speed by 30% with CI/CD automation',
    'Hardened security: XSS, SQL injection, brute-force protection',
    'Won Globee Gold Award for security innovation (2022)',
  ].forEach(bullet);

  jobHeader('Software Engineer', 'TenX', 'Aug 2018 - Oct 2021', 'Lahore, Pakistan');
  [
    'Built automated contamination detection system, reducing processing time by 90%',
    'Built real-time golf performance tracking with Microsoft, improving accuracy by 40%',
    'Designed distributed systems for high-throughput scientific computing',
    'Doubled release frequency with CI/CD automation and testing',
    'Optimized internal NPM packages to improve developer productivity',
    'Won #3 ranking in global sports innovation awards (Arccos)',
  ].forEach(bullet);

  // Education
  sectionHeading('Education & Certification', 85);
  doc.fillColor(INK).fontSize(9).font('Helvetica-Bold').text('Bachelor of Science in Computer Science (BSCS)');
  doc.fillColor(MUTED).font('Helvetica').text('FAST-NUCES, Lahore, Pakistan · 2014 - 2018');
  doc.moveDown(0.15);
  doc.fillColor(INK).fontSize(9).font('Helvetica-Bold').text('AWS Certified Developer – Associate');
  doc.fillColor(MUTED).font('Helvetica').text('Amazon Web Services');

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('PDF created successfully at:', outputPath);
      resolve();
    });
  });
}

await generate(path.join(__dirname, '../public/Asad-Resume.pdf'));
await generate(path.join(__dirname, '../public/resume.pdf'));
