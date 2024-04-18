/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import "../styles/auth.css"
import {  useState } from 'react'
import Button from '../components/Button'
import { Eye, EyeOff } from 'lucide-react'
import { ZodError,  z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCsrfToken } from '../utils/cookie'
import { formRequest } from '../utils/formReuest'
import { useEditTitle } from '../utils/title'

export const Route = createFileRoute('/login')({
  component: Login
})

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})


const loginSchema = z.object({
  message: z.string(),
  redirect: z.string().optional()
})


type LoginResponse = z.infer<typeof loginSchema>

function Login() {
  const queryClient = useQueryClient()
  const navigate = useNavigate({from: '/login'})
  useEditTitle(['Login'])
  const [showParrword, setShowPassword] = useState(false)
  const [errorText, setError] = useState<string>("")
  const {mutate, isPending}= useMutation({
    mutationFn: async (e:React.FormEvent<HTMLFormElement>) => await handleSubmit(e),
    retry:false,
  })

  const disabled = isPending 

  const preprocess = (formData: FormData) => {
    const parseEmail = schema.shape.email.safeParse(formData.get('email'))
    if (!parseEmail.success) {
      setError("Invalid email input")
      return false
    }
    const parsePassword = schema.shape.password.safeParse(formData.get('password'))
    if (!parsePassword.success) {
      setError("Invalid password input")
      return false
    }
    return formData
  }

  const onSuccess = (data: LoginResponse) => {
    // console.log(data)
    if (typeof window !== 'undefined' && data.redirect) {
      const isAdmin = data.redirect === '/admin/'
      if (isAdmin) {
        window.location.href = '/admin/'
        return 
      }
    }
    //invalidate profile query
    queryClient.invalidateQueries({ queryKey: ['profile'] })
    //redirect to homepage
    navigate({to:'/'})
  }

  const onError = (res:Response|null,error:any) => {
    if(res){
      if(res.status === 401){
        setError("Invalid email or password")
        return { message: "Invalid email or password" }
      }
      if(res.status === 426){
        setError("Login only available in secure connection. Please upgrade to HTTPS and secure connection.")
        return { message: "Upgrade Required" }
      }
      if(res.status === 400){
        //invalid email or password parsing, but probably error om csrf token
        window.location.href = '/login'
        return { message: "Invalid payload" }
      }
      if(res.status === 500){
        setError("Server error")
        return { message: "Server error" }
      }
    }
    if (error instanceof ZodError) {
      // console.log('error',error)
      return { message: "Invalid Response Struct" }
    }
    throw error
  }

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    // console.log('submit')
    e.preventDefault()
    setError("")
    
    const formData = new FormData(e.target as HTMLFormElement)
    return await formRequest<LoginResponse>({
      method: 'POST',
      path: ['auth','login'],
      schema: loginSchema,
      body: formData,
      preprocess,
      onSuccess,
      onError,
    })
  }


return (
  <main className='auth  w-full min-h-[75vh] grid justify-center items-center'>
    <form className=' card min-h-[65vh] min-w-[75vw] text-slate-900' onSubmit={mutate} 
    >
      <h1 className='text-3xl font-bold'>Login</h1>
      <hr className='mt-4  mb-8 border-2 border-neutral-900' />
      <div className=' grid space-y-10 '>
        {/* email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type='email'
            name="email"
            placeholder='user123@example.com'
            required
          />
        </div>
        {/* passwof */}
        <div className=''>
          <label htmlFor="email">Password</label>
          <div className='flex space-x-8'>
            <input
              type={showParrword ? 'text' : 'password'}
              name="password"
              required
            />
            <span className='  cursor-pointer'>
              {
                showParrword ?
                  <Eye
                    size={24}
                    onClick={() => setShowPassword(false)}
                  /> :
                  <EyeOff
                    size={24}
                    onClick={() => setShowPassword(true)}
                  />
              }
            </span>
          </div>
        </div>
        <input type='hidden' name='csrf' value={getCsrfToken()} />
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
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    </form>
  </main>
)
}