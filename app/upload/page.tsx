"use client"
import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'

export interface IHandleSuccess {
  thumbnailUrl?: string;
  url: string;
}
const UplaodVideo = () => {
  const [title,  setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
 
  const [thumbnailUrl, setThumbnailUrl] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl
        })
      })


      const data = await res.json()
      console.log(data)
      alert("Video Uploaded Successfully")
    } catch (error) {
      console.error(error)
    }
  }

  const handleSuccess = async (req: IHandleSuccess) => {
     setVideoUrl(req.url)
    if(req.thumbnailUrl){
      setThumbnailUrl(req.thumbnailUrl)
    }
  }
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-2/5 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight mb-4">
            Upload Video
          </h1>
          <p className="text-white/60 text-sm">
            Share your content with the world
          </p>
          <div className="mt-4">
            <p className="text-white/40 text-sm font-light tracking-wide">
              Modern dark interface • Black & white aesthetic
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 relative group">
          
          {/* Hover effect line */}
          <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
          
          <div className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Video Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter video title"
                value={title}
                className="w-full bg-black/40 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 hover:border-white/30"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Video Description</label>
              <textarea
                name="description"
                placeholder="Enter video description"
                value={description}
                rows={4}
                className="w-full bg-black/40 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 hover:border-white/30 resize-none"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
            </div>

            {/* File Upload Component */}
            <FileUpload onSuccess={handleSuccess} />

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:transform hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Upload Video
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-white/50 text-sm">
          <p>Maximum file size: 100MB • Supported formats: MP4, MOV, AVI</p>
        </div>
      </div>
    </div>
  )
}

export default UplaodVideo
