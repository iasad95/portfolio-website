"use client"

import SectionHeading from "@/components/ui/section-heading"

export default function FeaturedCaseStudy() {
  return (
    <section className="py-24 px-4 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Featured Case Study" subtitle="CloudDrive: 500K Daily Operations at Scale" />
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">The Problem</h3>
            <p className="text-gray-300 leading-relaxed">
              Biztree needed a unified file storage and management system that could handle 500K daily operations, support multiple SaaS applications, and provide role-based access control with enterprise-grade security—all while maintaining sub-100ms response times.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">The Solution</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              I architected CloudDrive as a distributed microservice using NestJS with event-driven processing. The system leverages AWS S3 for storage, Lambda for thumbnail generation, and BullMQ for async job processing—handling peak loads without degradation.
            </p>
            <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-3 font-semibold">Key Architecture Decisions:</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <span className="font-semibold">Async Processing:</span> BullMQ queues for thumbnail generation and metadata processing</li>
                <li>• <span className="font-semibold">Caching Layer:</span> Redis for frequently accessed file metadata</li>
                <li>• <span className="font-semibold">AWS Integration:</span> S3 presigned URLs for secure direct uploads, Lambda for image optimization</li>
                <li>• <span className="font-semibold">RBAC:</span> Fine-grained permission system with role inheritance</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Impact & Results</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-300 mb-1">500K+</div>
                <div className="text-sm text-gray-400">Daily Operations</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-300 mb-1">45%</div>
                <div className="text-sm text-gray-400">Faster Uploads</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-300 mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["NestJS", "TypeScript", "AWS S3", "Lambda", "BullMQ", "Redis", "MongoDB", "Docker", "Kubernetes"].map((tech) => (
                <span key={tech} className="bg-gray-900/60 border border-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
