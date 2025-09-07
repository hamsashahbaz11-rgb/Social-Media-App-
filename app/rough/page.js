<div className="font-sans min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 pb-20 sm:p-20">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold   mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Video Gallery
      </h1>
      <p className="text-slate-300 text-lg">Discover amazing content</p>
    </div>
    
    {videos && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video._id} className="">
            
            {/* Video Container */}
               <video 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                controls
                poster={video.thumbnailUrl || "/placeholder.jpeg"}
              >
                <source src={`${video.videoUrl}?tr=orig`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play Button Overlay */}
            
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                {video.title}
              </h3>
              
              <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                {video.description}
              </p>
              
              {/* Thumbnail Preview */}
              <div className="relative">
                <Image
                  src={video.thumbnailUrl || "/placeholder.jpeg"}
                  alt={video.title}
                  width={120}
                  height={80}
                  className="rounded-lg object-cover border border-white/10 opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                  Watch Now
                </button>
                <button className="px-4 py-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 rounded-lg text-sm transition-all duration-300">
                  Save
                </button>
              </div>
            </div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          </div>
        ))}
      </div>
    )}
    
    {/* Empty State */}
    {!videos || videos.length === 0 && (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/20 rounded-lg"></div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
        <p className="text-slate-400">Videos will appear here when they're added</p>
      </div>
    )}
  </div>
</div>


//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    
//     {videos && ( videos.map((video) => (
//       <div key={video._id}
//       className=''>
//         <span>{video.title}</span>
//         <span>{video.description}</span>
// {/* <Video
//         src={`/${video.videoUrl}?tr=orig`}
//         alt={video.title}
//         urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
//         controls 
//         width={600}
//         height={400}
//       /> */}
//       <video width="600" height="400" controls>
//         <source src={`${video.videoUrl}?tr=orig`} type="video/mp4" />
//         Your browser does not support the video tag.        
//       </video>
//       <Image
//         src={video.thumbnailUrl || "/placeholder.jpeg"}
//         alt={video.title}
//         width={500}
//         height={500}
//       />
//       </div>
//     )))}
//     </div>
