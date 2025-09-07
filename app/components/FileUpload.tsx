// "use client"


// import { upload } from "@imagekit/next";
// import { useState } from "react";
// import { IHandleSuccess } from "../upload/page";

// interface FileUploadProps {
//     onSuccess?: (req) => object;
//     onProgress?: (progress: number) => void;
//     fileType?: "image" | "video"
// }


// const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
//     const [uploading, setUploading] = useState(false)
//     const [error, setError] = useState<string | null>(null)
//     const [progress, setProgress] = useState(0)
//     const [dragActive, setDragActive] = useState(false);


//     const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true);
//         } else if (e.type === "dragleave") {
//             setDragActive(false);
//         }
//     };



//     const validateFile = (file: File) => {
//         if (fileType === "video") {
//             if (file.type.startsWith("video/mp4")) {
//                 setError("Please upload a valid Video File");
//             }
//         }
//         if (file.size > 100 * 1024 * 1024) {
//             setError("File size must be less than 100MB")
//         }
//         return true

//     }

//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file || !validateFile(file)) return
//         setDragActive(false);

//         setUploading(true)
//         setError(null)
//         try {
//             const authRes = await fetch("/api/imagekit-image")
//             const auth = await authRes.json()
//             console.log(auth)
//             console.log(file)
//             console.log(file.name)
//             console.log(process.env.NEXT_PUBLIC_PUBLIC_KEY)
//             console.log(auth.expire)
//             console.log(auth.token)
//             console.log(auth.signature)
//             const res = await upload({
//                 file,
//                 fileName: file.name,
//                 publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
//                 expire: auth.expire,
//                 token: auth.token,
//                 signature: auth.signature,

//                 onProgress: (event) => {
//                     if (event.lengthComputable && onProgress) {
//                         const percent = (event.loaded / event.total) * 100;
//                         onProgress(Math.round(percent))
//                     }
//                     setProgress(Math.round((event.loaded / event.total) * 100))
//                 },
//             })

//             if (!res) {
//                 setError("Error uploading file")
//             }
//             onSuccess(res)
//         } catch (error) {
//             setError(String(error))
//             console.error("Error uploading file", error)
//         }
//         finally {
//             setUploading(false)
//         }
//     }





//     return (
//         <>
//             <div className="w-full">
//                 <label className="text-white/80 text-sm font-medium mb-2 block">Video File</label>
//                 <div
//                     className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${dragActive
//                         ? 'border-white/40 bg-white/[0.05]'
//                         : 'border-white/20 hover:border-white/30'
//                         }`}
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}

//                 >
//                     <input
//                         type="file"
//                         accept={fileType === "video" ? "video/*" : "image/*"}
//                         onChange={handleFileChange}
//                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                     <div className="space-y-2">
//                         <div className="text-white/60 text-lg">📹</div>
//                         <p className="text-white/70">Drop your video file here or click to browse</p>
//                         <p className="text-white/50 text-sm">Supports MP4, MOV, AVI files</p>


//                     </div>
//                 </div>
//                 {uploading && (
//                     <span >Uploading...</span>
//                 )}

//                 <br />
//                 <div className="text-white/70 text-sm font-medium">
//                     Upload progress: <progress className="w-full bg-green-800" value={progress} max={100}></progress>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default FileUpload;

"use client"

import { upload } from "@imagekit/next";
import { useState } from "react";

 
interface UploadResponse {
    fileId: string;
    name: string;
    size: number;
    filePath: string;
    url: string;
    fileType: string;
    height?: number;
    width?: number;
    thumbnailUrl?: string;
    AITags?: string[];
}

interface FileUploadProps {
    onSuccess?: (response: UploadResponse) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType = "video" }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                handleUpload(file);
            }
        }
    };

    const validateFile = (file: File): boolean => {
        setError(null);
        
        // Fixed: Changed condition to check if file is NOT mp4 for video type
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid Video File");
                return false;
            }
        } else if (fileType === "image") {
            if (!file.type.startsWith("image/")) {
                setError("Please upload a valid Image File");
                return false;
            }
        }
        
        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100MB");
            return false;
        }
        
        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return;
        
        setSelectedFile(file);
        handleUpload(file);
    };

    const handleUpload = async (file: File) => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const authRes = await fetch("/api/imagekit-image");
            
            if (!authRes.ok) {
                throw new Error("Failed to get authentication token");
            }
            
            const auth = await authRes.json();
            
            // Check if required auth data exists
            if (!auth.token || !auth.signature || !auth.expire) {
                throw new Error("Invalid authentication response");
            }

            const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
            if (!publicKey) {
                throw new Error("Public key is not configured");
            }

            const res = await upload({
                file,
                fileName: file.name,
                publicKey,
                expire: auth.expire,
                token: auth.token,
                signature: auth.signature,
                onProgress: (event) => {
                    if (event.lengthComputable) {
                        const percent = Math.round((event.loaded / event.total) * 100);
                        setProgress(percent);
                        if (onProgress) {
                            onProgress(percent);
                        }
                    }
                },
            });

            if (!res) {
                throw new Error("Upload failed - no response received");
            }

            // Call onSuccess with proper typing
            if (onSuccess) {
                onSuccess(res as UploadResponse);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setError(errorMessage);
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full space-y-4">
            <label className="text-white/80 text-sm font-medium mb-2 block">
                {fileType === "video" ? "Video File" : "Image File"}
            </label>
            
            {/* Drag and Drop Area */}
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive 
                        ? 'border-white/40 bg-white/[0.05] scale-[1.02]' 
                        : 'border-white/20 hover:border-white/30 hover:bg-white/[0.02]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept={fileType === "video" ? "video/*" : "image/*"}
                    disabled={uploading}
                />
                <div className="space-y-4">
                    {selectedFile ? (
                        <div className="text-white/90 space-y-2">
                            <div className="text-4xl">
                                {fileType === "video" ? "🎬" : "🖼️"}
                            </div>
                            <p className="font-medium text-lg">{selectedFile.name}</p>
                            <p className="text-sm text-white/60">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="text-5xl opacity-60">
                                {fileType === "video" ? "📹" : "🖼️"}
                            </div>
                            <div>
                                <p className="text-white/70 text-lg font-medium">
                                    Drop your {fileType} file here
                                </p>
                                <p className="text-white/50 text-sm mt-1">
                                    or click to browse
                                </p>
                            </div>
                            <p className="text-white/40 text-xs">
                                {fileType === "video" 
                                    ? "Supports MP4, MOV, AVI files" 
                                    : "Supports JPG, PNG, GIF files"
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
            )}

            {/* Upload Status */}
            {uploading && (
                <div className="space-y-3 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white/70 rounded-full animate-spin"></div>
                        <span className="text-white/80 font-medium">Uploading...</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Upload progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-black/40 rounded-full h-2 border border-white/10">
                            <div 
                                className="bg-gradient-to-r from-white/60 to-white/40 h-full rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;