import { useLogInModal } from '@/hooks';
import React, { FC, PropsWithChildren, useCallback } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const loginModal = useLogInModal();
  const logout = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal])
  return (
    <>
        <div className='w-full py-4 px-16 absolute flex items-center justify-between bg-black border-b'>
            <button 
              className='text-white text-xl hover:text-slate-200 active:text-slate-300 transition'
              onClick={logout}
            >Гарах</button>
        </div>
        { children }
    </>
  )
}
