'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function OAuthInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      router.push('/dashboard');
    }
  }, [token, router]);

  return <div>Redirecting to dashboard...</div>;
}

export default function OAuth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthInner />
    </Suspense>
  );
}
