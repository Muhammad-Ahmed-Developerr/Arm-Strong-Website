"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Upload, X, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [step, setStep] = useState<"form" | "verification" | "success">("form")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [profileImagePreview, setProfileImagePreview] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setProfileImagePreview(URL.createObjectURL(file))
  }

  const removeProfileImage = () => {
    setProfileImagePreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("verification")
    }, 1000)
  }

  const handleVerification = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
      setTimeout(() => {
        setStep("form")
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
        setVerificationCode(["", "", "", "", "", ""])
        removeProfileImage()
        onClose()
      }, 2500)
    }, 1000)
  }

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Join Arm Strong</DialogTitle>
              <DialogDescription>Start your fitness transformation today!</DialogDescription>
            </DialogHeader>

            <Button
              type="button"
              variant="outline"
              className="w-full border-border hover:bg-muted h-12 mb-4"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image (Optional)</Label>
                <div className="flex flex-col items-center gap-4">
                  {profileImagePreview ? (
                    <div className="relative">
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                      />
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-muted/50">
                      <Upload className="w-8 h-8 text-primary/50" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                    id="profileImage"
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    {profileImagePreview ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="join-name" className="required">Full Name</Label>
                <Input
                  id="join-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-email" className="required">Email</Label>
                <Input
                  id="join-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-phone" className="required">Phone Number</Label>
                <Input
                  id="join-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-password" className="required">Password</Label>
                <div className="relative">
                  <Input
                    id="join-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-confirm-password" className="required">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="join-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12">
                {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </>
        )}

        {step === "verification" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Verify Your Email</DialogTitle>
              <DialogDescription>
                Enter the 6-digit code sent to <span className="font-medium text-primary">{formData.email}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-2 justify-center mb-4">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg font-bold"
                />
              ))}
            </div>

            <Button
              onClick={handleVerification}
              className="w-full bg-primary hover:bg-primary/90 h-12"
            >
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Verify Email"}
            </Button>

            <Button
              type="button"
              variant="link"
              className="mt-2 text-sm text-muted-foreground hover:text-foreground w-full text-center"
              onClick={() => setStep("form")}
            >
              ← Back to registration
            </Button>
          </>
        )}

        {step === "success" && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Account Created!</h3>
            <p className="text-muted-foreground">Your account has been successfully created. Welcome to Arm Strong!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
