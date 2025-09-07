"use client"
import { Video } from '@imagekit/next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/video');
      const data = await res.json();

      setVideos(data);
    }
   fetchVideos();
  }, [])
  
  return (
 <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/5 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/5 w-64 h-64 bg-white/[0.015] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-2/5 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 font-sans grid grid-rows-[80px_1fr_80px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight">
            Video Gallery
          </h1>
        </div>

        {/* Video Grid */}
        {videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
            {videos.map((video, index) => (
              <div 
                key={video._id}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 transition-all duration-500 hover:transform hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/40"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Hover effect line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                
                {/* Content */}
                <div className="space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white leading-tight tracking-tight">
                    {video.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    {video.description}
                  </p>
                  
                  {/* Video Player */}
                  <div className="relative rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-white/30 transition-all duration-300">
                    <video 
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    >
                      <source src={`${video.videoUrl}?tr=orig`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Thumbnail */}
                  <div className="relative rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <Image
                      src={video.thumbnailUrl !== "" ? video.thumbnailUrl : "/placeholder.jpeg"}
                      alt={video.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover grayscale contrast-110 brightness-90 group-hover:grayscale-[80%] group-hover:contrast-125 group-hover:brightness-100 group-hover:scale-105 transition-all duration-400"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-white/60 text-lg">No videos available yet</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/40 text-sm font-light tracking-wide">
            Modern dark interface • Black & white aesthetic
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        /* Custom scrollbar for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}


