// DropdownMenu.js
'use client'
import React from 'react';
import styles from "./drop-down.module.css"
import UserSession from '@/utils/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const DropdownMenu = () => {
  const router = useRouter();
  const handleLogout = () => {
    const userSession = UserSession.getInstance();
    userSession.setUser(null);
    router.push('/sigin')
  }
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Welcome user</button>
      <div className={styles.dropdownContent}>
        <a href="#">Chang password</a>
        <Link href="/sigin" onClick={handleLogout}>Log out</Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
