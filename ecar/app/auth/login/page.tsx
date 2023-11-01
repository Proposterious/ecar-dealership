// Next imports
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
// Component imports
import LoginForm from './form';


async function Login() {
    const session = await getServerSession();
    //redirect user to dashboard if logged in
    if (session != null) { 
        redirect('/dashboard') 
    } 
    
    return ( 
        <main id="login" className='w-full h-full bg-orange-300'>
            <LoginForm />
        </main>
    );
}

export default Login;