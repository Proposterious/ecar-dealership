import { RegisterForm } from "./form";
import Link from 'next/link';

function Register() {
    return ( 
        <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
            <section className='shadow-xl p-4 bg-white rounded-md'>
                <h1 className='font-semi-bold text-2xl mb-6 p-4'>Create Your eCar-Dealership Account!</h1>
                <RegisterForm />
                <p className='mt-4 text-center'>
                    Have an account?{' '}
                    <Link href='./login' className="text-orange-600 hover:text-black hover:underline">
                        Sign In
                    </Link>{' '}
                </p>
            </section>
        </div>
    );
}

export default Register;