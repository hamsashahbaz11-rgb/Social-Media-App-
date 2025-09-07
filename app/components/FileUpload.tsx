"use client"


import {
    // ImageKitAbortError,
    // ImageKitInvalidRequestError,
    // ImageKitServerError,
    // ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
    onSuccess?: (req: any) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video"
}


const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };



    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (file.type.startsWith("video/mp4")) {
                setError("Please upload a valid Video File");
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100MB")
        }
        return true

    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return
        setDragActive(false);
        setSelectedFile(file)
        setUploading(true)
        setError(null)
        try {
            const authRes = await fetch("/api/imagekit-image")
            const auth = await authRes.json()
            console.log(auth)
            console.log(file)
            console.log(file.name)
            console.log(process.env.NEXT_PUBLIC_PUBLIC_KEY)
            console.log(auth.expire)
            console.log(auth.token)
            console.log(auth.signature)
            const res = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                expire: auth.expire,
                token: auth.token,
                signature: auth.signature,

                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent))
                    }
                    setProgress(Math.round((event.loaded / event.total) * 100))
                },
            })

            console.log(res)
            onSuccess(res)
        } catch (error) {
            setError(error)
            console.error("Error uploading file", error)
        }
        finally {
            setUploading(false)
        }
    }





    return (
        <>
            <div className="w-full">
                <label className="text-white/80 text-sm font-medium mb-2 block">Video File</label>
                <div
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${dragActive
                        ? 'border-white/40 bg-white/[0.05]'
                        : 'border-white/20 hover:border-white/30'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}

                >
                    <input
                        type="file"
                        accept={fileType === "video" ? "video/*" : "image/*"}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                        <div className="text-white/60 text-lg">📹</div>
                        <p className="text-white/70">Drop your video file here or click to browse</p>
                        <p className="text-white/50 text-sm">Supports MP4, MOV, AVI files</p>


                    </div>
                </div>
                {uploading && (
                    <span >Uploading...</span>
                )}

                <br />
                <div className="text-white/70 text-sm font-medium">
                Upload progress: <progress className="w-full bg-green-800" value={progress} max={100}></progress>
                </div>
            </div>
        </>
    );
};

export default FileUpload;