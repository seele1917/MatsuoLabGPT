import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useChatStore } from '@/stores/ChatStore';
import { setUserId } from '@/stores/ChatActions';

interface LoginUser {
  id: string
  username: string;
  email: string;
  isAdmin: boolean;
}

const AuthCheck = (): LoginUser => {
  const [loginUser, setLoginUser] = useState<LoginUser>({ id: '', username: '', email: '', isAdmin: false});
  const router = useRouter();
  const token = useChatStore((state) => state.jwttoken);

  // Retrieve and verify token information
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token || "", process.env.NEXT_PUBLIC_SECRET_KEY as string) as LoginUser;
      setLoginUser(decoded);
      setUserId(decoded.id);
    } catch (error) {
      console.error(error)
      router.push('/login');
    }
  }, [router]);

  return loginUser;
};

export default AuthCheck;
