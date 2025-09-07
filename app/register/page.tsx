"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and Confirm Password not same")
            return;
        }


        try {
            // react-query
            // loading, error, debouncing
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json()
            console.log(data)
            if (data.status !== 200 ) {
                alert(data.error || "Registration Failed")
            }

            router.push("/login")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        // <div className='flex justify-center items-center flex-col h-screen'>
        //     <h1 className='font-bold text-7xl text-amber-500'>Register User</h1>
        //     <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col bg-gray-900 h-2/3'>
        //         <input
        //             type="text"
        //             name="email"
        //             placeholder="Enter your Email"
        //             value={email}
        //             id=""
        //             className='w-80 text-white border px-2 hover:bg-gray-800 py-2 m-1 rounded-lg shadow-2xs'
        //             onChange={(e) => setEmail(e.target.value)} />
        //         <div className='flex flex-row '>

        //             <input
        //                 type="password"
        //                 name="password"
        //                 placeholder="Enter Password"
        //                 value={password}
        //                 id=""
        //                 className='w-80 text-white border hover:bg-gray-800 p-1 m-1'
        //                 onChange={(e) => setPassword(e.target.value)} />


        //         </div>
        //         <input
        //             type="password"
        //             name="confirmPassword"
        //             placeholder="Enter Confirm Password"
        //             value={confirmPassword}
        //             id=""
        //             className='w-80 text-white border hover:bg-gray-800 p-1 m-1'
        //             onChange={(e) => setConfirmPassword(e.target.value)} />
        //         <button type="submit" className=' text-white  hover:bg-gray-800 p-1 m-1'>Register</button>
        //     </form>
        //     <div>Already have an account? <Link href="/login">Login</Link></div>
        // </div>
    
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Image */}
          <div className="hidden lg:block relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10 group">
              <Image
                src="/placeholder.jpeg"
                alt="Modern architecture"
                width={899}
                height={700}
                 className="object-cover grayscale contrast-110 brightness-90 group-hover:grayscale-[80%] group-hover:contrast-125 group-hover:brightness-100 transition-all duration-500"
            
                />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-lg font-light tracking-wide">
                  Modern dark interface • Black & white aesthetic
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex justify-center items-center flex-col space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight">
                Register User
              </h1>
              <p className="text-white/60 text-sm">
                Create your account to get started
              </p>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-md">
              <div className="space-y-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 relative group">
                
                {/* Hover effect line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                
                <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    className="w-full bg-black/40 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 hover:border-white/30"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    className="w-full bg-black/40 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 hover:border-white/30"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    className="w-full bg-black/40 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 hover:border-white/30"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type='submit'
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:transform hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  Register Account
                </button>

                </form>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6 text-white/70">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-white hover:text-white/90 font-medium underline underline-offset-4 hover:underline-offset-2 transition-all duration-300"
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile image for smaller screens */}
        <div className="lg:hidden mt-8">
          <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10">
            <Image
            src="/placeholder.jpeg"
              alt="Modern architecture"
             width={800}
             height={700}
              className="object-cover grayscale contrast-110 brightness-90"
              
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-white/80 text-sm font-light tracking-wide text-center">
                Modern dark interface • Black & white aesthetic
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> 
    )
}

export default Register
