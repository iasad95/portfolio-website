import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const doc = new PDFDocument({ size: 'Letter', margin: 50 });
const outputPath = path.join(__dirname, '../public/resume/asad-resume.pdf');

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Title
doc.fontSize(24).font('Helvetica-Bold').text('Muhammad Asad', { align: 'center' });
doc.fontSize(11).font('Helvetica').text('Senior Full-Stack Developer', { align: 'center' });
doc.fontSize(9).text('asad@asadcodes.com | +923164363605 | linkedin.com/in/i-asad | asadcodes.com', { align: 'center' });

doc.moveDown(0.5);
doc.moveTo(50, doc.y).lineTo(562, doc.y).stroke();

// Summary
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('SUMMARY');
doc.fontSize(9).font('Helvetica').text('Senior Full-Stack Developer with 8+ years of experience building and scaling SaaS platforms using Node.js, NestJS, React, Angular, TypeScript, and AWS. Strong in microservices, event-driven systems, distributed architecture, and AI-assisted development. Proven record of reducing API latency by 45%, cutting backend development effort by 40%, and delivering zero-downtime migrations for systems serving 12M+ users.');

// Core Skills
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('CORE SKILLS');
doc.fontSize(9).font('Helvetica');
doc.text('Backend: Node.js, NestJS, Express.js, REST APIs, GraphQL');
doc.text('Frontend: React, Angular, Redux, NgRx, RxJS, HTML5, CSS3, Tailwind CSS, Bootstrap');
doc.text('Databases: MongoDB, PostgreSQL, MySQL, MSSQL, Redis');
doc.text('Cloud & DevOps: AWS, Lambda, S3, EventBridge, EC2, IAM, SQS, SNS, RDS, Docker, Kubernetes, CI/CD');
doc.text('Architecture: Microservices, Distributed Systems, Event-Driven Architecture, CQRS, System Design');
doc.text('AI / LLM Tools: Claude, Cursor, AI-assisted development, AI middleware, Document workflows');
doc.text('Testing: Jest, Cypress, Unit Testing, Integration Testing, TDD, BDD');
doc.text('Tools: Git, Bitbucket, Jira, Swagger, OpenAPI, PM2');

// Experience
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('EXPERIENCE');

doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').text('Biztree — Senior Software Engineer — Jan 2023 to Present');
doc.fontSize(9).font('Helvetica');
doc.text('• Architected a unified NestJS microservices backend powering 5+ SaaS applications serving 12M+ users');
doc.text('• Built CloudDrive supporting 500K daily file operations with RBAC, presigned S3 access, AWS Lambda');
doc.text('• Led zero-downtime MongoDB migration for 50M+ records using safe batch processing and rollback');
doc.text('• Implemented BullMQ and RabbitMQ queues to reduce API latency by 45%');
doc.text('• Built HRM backend services with PostgreSQL, TypeORM, CQRS, audit logs, and scheduled workers');
doc.text('• Developed AI middleware for document workflows and chat features with token tracking');

doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').text('InvoZone — Senior Software Engineer — Oct 2021 to Jan 2023');
doc.fontSize(9).font('Helvetica');
doc.text('• Delivered enterprise PAM platform for credential management, session recording, access workflows');
doc.text('• Designed scalable microservices architecture with load balancing and multi-instance clustering');
doc.text('• Refactored legacy modules into modular service-oriented components, improved deployment speed');
doc.text('• Built session forensics and audit capabilities including keystroke and video recording');
doc.text('• Strengthened security against XSS, SQL injection, directory traversal, and brute-force attacks');

doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').text('TenX — Software Engineer — Aug 2018 to Oct 2021');
doc.fontSize(9).font('Helvetica');
doc.text('• Built full-stack applications for enterprise and scientific use cases with automated detection');
doc.text('• Improved processing speed and throughput through distributed system design');
doc.text('• Helped improve release frequency by 2x through CI/CD and testing workflows');
doc.text('• Reworked internal packages and front-end components to improve performance');
doc.text('• Contributed to sports analytics platform with measurable impact on strategy outcomes');

// Education
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('EDUCATION');
doc.fontSize(9).font('Helvetica');
doc.text('Bachelor of Science in Computer Science');
doc.text('FAST-NUCES, 2014 to 2018');

// Certification
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('CERTIFICATION');
doc.fontSize(9).font('Helvetica');
doc.text('AWS Certified Developer Associate');

doc.end();

stream.on('finish', () => {
  console.log('PDF created successfully at:', outputPath);
});
