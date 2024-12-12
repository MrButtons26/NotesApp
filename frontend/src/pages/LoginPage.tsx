import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import { login,signUp } from "../services/AuthServices";
import { useMutation } from "@tanstack/react-query";
console.log('hello')
type LoginData = {
    username?:string,
    email: string,
    password: string
  }
export default function LoginPage():JSX.Element{
    const navigate=useNavigate();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const [activeForm,setActiveForm]=useState<string>('login')
    const { isPending:isLoginPending, mutate: mutateLogin,isError } = useMutation({
        mutationFn: ({ email, password }) => login({ email, password }),
        onSuccess: (data) => {
            localStorage.setItem(
                "auth",
                JSON.stringify({ _id: data.data._id, token: data.data.token })
            );
            navigate('/notes')
        },
        onError: (error) => {
            console.log(error)
        },
    });

    const { isPending , mutate:mutateSignUp,isError:isErrorSignUp } = useMutation({
        mutationFn: ({ username, email, password }) =>
            signUp({ username, email, password }),
        onSuccess: (data) => {
            localStorage.setItem(
                "auth",
                JSON.stringify({ _id: data.data._id, token: data.data.token })
            );
            navigate('/notes')
        },
        onError: (error) => {

        },
    });

    const onSubmit = handleSubmit(({username,email,password}) =>{
        console.log(12)
   if(activeForm==='login'){
    mutateLogin({email,password})
}
else{
    mutateSignUp({username,email,password})
}
});
return(<>
<div className="flex  mx-5 py-3 items-center " style={{fontFamily:'oswald'}}>
    <h1 onClick={()=>navigate('/')} className="navbar-heading text-[22px] border-[1px] px-2 border-black cursor-pointer" >Notes</h1>
</div>
{localStorage.getItem("auth")===null?<div className="flex flex-col w-full mt-32" style={{fontFamily:'oswald'}}>
    <div className=" self-center flex flex-col ">
        <h1 className="text-[28px]">Think it.Make it.</h1>
        <h1 className="text-[28px] text-gray-600">Log in to your <span className="text-black font-bold">Notes</span> Account</h1>
        <form onSubmit={onSubmit} className="flex flex-col  mt-12 font-sans  font-semibold">
        {activeForm=='signup'&&<h1 className="mb-1 text-gray-500 font-thin">Username</h1>}
    {errors.username?.type&&<h1 className="text-black text-[12px] font-thin"><span className="font-bold">Username</span>{errors?.username?.message}</h1>}
        {activeForm=='signup'&&<input type="text" placeholder="Enter your username..." className="mb-5 border-[1px] border-gray-400 w-full rounded-md px-2 py-1 outline-none focus:border-blue-400 " {...register("username",{ required: " is Required",maxLength:{value:20,message:' should be less than 8 Characters.'},minLength:{value:5,message:' should be more than 5 Characters.'}})} />}
        <h1 className="mb-1 text-gray-500 font-thin">Email</h1>
        {errors?.email&&<h1  className="text-black text-[12px] font-thin"><span className="font-bold">Email</span>{errors?.email?.message}</h1>}
        <input type="text" placeholder="Enter your email addresss..."  className="mb-5 border-[1px] border-gray-400 w-full rounded-md px-2 py-1 focus:border-blue-400 outline-none input-email" {...register("email",{ required: " is Required.",pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
,message:'Invalid'}})}/>
        <h1 className="mb-1 text-gray-500 font-thin">Password</h1>
        {errors?.password&&<h1 className="text-black text-[12px] font-thin"><span className="font-bold">Password</span>{errors?.password.message}</h1>}
        <input type="password"  placeholder="Enter your password..."   className=" mb-5 border-[1px] border-gray-400 w-full rounded-md px-2 py-1 focus:border-blue-400 outline-none" {...register("password",{required:' is Required.',minLength:{value:8,message:' should be more than 8 Characters.'}})}/>
        {activeForm=='login'&&isError&&<h1 className="font-bold self-center mb-1">Invalid Credentials.</h1>}
        {activeForm=='signup'&&isErrorSignUp&&<h1 className="font-bold self-center mb-1">Email is Already Taken.</h1>}
        <button className="bg-[black] text-white py-1.5 rounded-md" style={{fontFamily:'oswald'}}>{activeForm==='login'?'Login':'SignUp'}</button>
        </form>
        {isPending||isLoginPending &&<div className="loader self-center mt-1"></div>}
        {activeForm=='login'&&<h1 className="self-center mt-2"><span className="font-semibold cursor-pointer hover:underline" onClick={()=>setActiveForm('signup')}>Sign Up</span> to create an account.</h1>}
        {activeForm=='signup'&&<h1 className="self-center mt-2">Already have an account <span className="font-semibold cursor-pointer hover:underline" onClick={()=>setActiveForm('login')}>Login</span> to start working.</h1>}  
    </div>
</div>:<h1 className="text-center mt-32 text-[24px] font-thin"><span className="font-semibold">Logged</span> In Successfully Start <span className="font-semibold">Dribbling .</span><span onClick={()=>{localStorage.clear() 
    navigate('/')}} className="ml-3 underline font-bold cursor-pointer">Logout</span></h1>}
</>)
}