'use client';
import { useEffect } from 'react';
import { useSearchParams,useRouter  } from 'next/navigation';
export default function OAuth() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router= useRouter();
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      router.push("/dashboard");
    }
  }, [token]);
 
  return <div>Redirecting to dashboard</div>;
}
