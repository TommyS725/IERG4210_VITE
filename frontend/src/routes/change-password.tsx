/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import "../styles/auth.css"
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { Eye, EyeOff, Link, Loader2 } from 'lucide-react'
import { ZodError, z } from 'zod'
import { getCsrfToken } from '../utils/cookie'
import { useUser } from '../context/UserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formRequest } from '../utils/formReuest'
import { useEditTitle } from '../utils/title'

export const Route = createFileRoute('/change-password')({
  component: ResetPw
})

const passwordSchema = z.string().min(1)

const changePasswordSchema = z.object({
  message: z.string(),
})

type ChangePasswordResponse = z.infer<typeof changePasswordSchema>


function ResetPw() {
  const {isLoading:isLoadingUser,user} = useUser()
  const [showPassword,setShowPassword] = useState<{
    old:boolean,
    new:boolean,
    confirm:boolean
  }>({
    old:false,
    new:false,
    confirm:false
  })
  const [errorText, setError] = useState<string>("")
  const {mutate,isPending} = useMutation({
    mutationFn: async (e:React.FormEvent<HTMLFormElement>) => await handleSubmit(e),
    retry:false,
  })
  const navigate = useNavigate({from: '/change-password'})
  useEditTitle(['Change Password'])
  const queryClient = useQueryClient()


  useEffect(()=>{
    if(!user && !isLoadingUser){
      navigate({to:'/login'})
    }
  },[user,navigate,isLoadingUser])

  if(isLoadingUser ){
    return <LoadingView />
  }

  if(!user){
    return <div className='w-full min-h-[75vh] grid justify-center items-center'>
      <h1 className='text-3xl font-bold'>You are not logged in</h1>
      <Link to='/login' className='text-blue-900'>Login</Link>
    </div>
  }
    
  const disabled = isPending

  const preprocess = (formData: FormData) => {
    const oldPassword = formData.get('oldPassword')
    const newPassword = formData.get('newPassword')
    const newPasswordConfirm = formData.get('newPasswordConfirm')
    const oldPasswordParse = passwordSchema.safeParse(oldPassword)
    if (!oldPasswordParse.success) {
      setError("Invalid old password input")
      return false
    }
    const newPasswordParse = passwordSchema.safeParse(newPassword)
    if (!newPasswordParse.success) {
      setError("Invalid new password input")
      return false
    }
    const newPasswordConfirmParse = passwordSchema.safeParse(newPasswordConfirm)
    if (!newPasswordConfirmParse.success) {
      setError("Invalid new password confirm input")
      return false
    }
    const samePassword = newPassword === oldPassword
    if (samePassword) {
      setError("New password cannot be the same as old password")
      return false
    }
    const samePasswordConfirm = newPassword === newPasswordConfirm
    if (!samePasswordConfirm) {
      setError("New password and confirm password are not the same")
      return false
    }
    return formData
  }

  const onSuccess = () => {
    //logged out
    queryClient.invalidateQueries({ queryKey: ['profile'] })
    navigate({to:'/'})
  } 

  const onError = async (res:Response|null,error:any) => {
    if(res){
      if(res.status === 401){
        //session or user profile not found
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        navigate({to:'/login'})
        return { message: "Session expired" }
      }
      if(res.status === 400){
        const text = await res.text()
        const isUnmatchedOldPassword = "Original password is incorrect" === text
        if(isUnmatchedOldPassword){
          setError("Original password is incorrect")
          return { message: "Old password is incorrect" }
        }
        //invalid patload parsing, but probably error om csrf token
        window.location.href = '/change-password'
        return { message: "Invalid payload" }
      }
      if(res.status === 500){
        setError("Server error")
        return { message: "Server error" }
      }
    }
    if (error instanceof ZodError) {
      console.log('error',error)
      return { message: "Invalid Response Struct" }
    }
    throw error
  }
  
  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.target as HTMLFormElement)
    return await  formRequest<ChangePasswordResponse>({
      method: 'PUT',
      path: ['auth','change-password'],
      schema: changePasswordSchema,
      body: formData,
      preprocess,
      onSuccess,
      onError
    })

  }

  return (
    <div className=' w-full min-h-[85vh] grid justify-center items-center auth'>
      <form className='card min-h-[65vh]  min-w-[75vw] text-slate-900' onSubmit={mutate} >
        <h1 className='text-3xl font-bold'>Change Password</h1>
        <hr className='mt-4  mb-8 border-2 border-neutral-900' />
        <div className=' grid space-y-10 '>
          <div className=''>
            <label htmlFor="email">Original Password</label>
            <div className='flex space-x-8'>
              <input
                type={showPassword.old ? 'text' : 'password'}
                name="oldPassword"
                required
              />
              <span className='  cursor-pointer'>
                {
                  showPassword.old ?
                    <Eye
                      size={24}
                      onClick={() => setShowPassword({ ...showPassword, old: false })}
                    /> :
                    <EyeOff
                      size={24}
                      onClick={() => setShowPassword({ ...showPassword, old: true })}
                    />
                }
              </span>
            </div>
          </div>
          <div className=''>
            <label htmlFor="email">New Password</label>
            <div className='flex space-x-8'>
              <input
                type={showPassword.new ? 'text' : 'password'}
                name="newPassword"
                required
              />
              <span className='  cursor-pointer'>
                {
                  showPassword.new ?
                    <Eye
                      size={24}
                      onClick={() => setShowPassword({ ...showPassword, new: false })}
                    /> :
                    <EyeOff
                      size={24}
                      onClick={() => setShowPassword({ ...showPassword, new: true })}
                    />
                }
              </span>
            </div>
          </div>
          <div className=''>
            <label htmlFor="email">Confirm New Password</label>
            <div className='flex space-x-8'>
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                name="newPasswordConfirm"
                required
              />
              <span className='  cursor-pointer'>
                {
                  showPassword.confirm ?
                    <Eye
                      size={24}
                      onClick={() => setShowPassword({ ...showPassword, confirm: false })}
                    /> :
                    <EyeOff
                      size={24}
                      onClick={() => setShowPassword({ ...showPassword, confirm: true })}
                    />
                }
              </span>
            </div>
          </div>
          <input type='hidden' name='csrf' value={getCsrfToken()} />
          <input type='hidden' name='email' value={user.email} />
            <div className=''>
              <p className='text-red-600 font-medium'>{errorText}</p>
            </div>
            <div className=' justify-end  flex  mx-4'>
          <Button
            type='submit'
            disabled={disabled}
          className={`${isPending ? 'bg-gray-400' : 'bg-blue-900'} 
           font-medium text-xl px-6 py-4 rounded-lg
            hover:opacity-70 text-white transition-all duration-300`}
          >
            {isPending ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
          </div>
      </form>
    </div>
  )
}



function LoadingView(){
  return <div className='w-full min-h-[75vh] grid justify-center items-center'>
    <Loader2 size={128} 
    className='text-slate-800 animate-spin'
     />
  </div>
}
