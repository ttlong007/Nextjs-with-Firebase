import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image'
import Alert from '../components/Alert/alert';
import Profile from './profile/Profile';
import 'semantic-ui-css/semantic.min.css';
import {SWRConfig} from 'swr';
import App from "./posts/content";
import React, { Fragment, useEffect } from 'react';
import {fetch} from 'isomorphic-fetch';

import { useRouter } from 'next/router'
import { Container, Header } from 'semantic-ui-react';
import layoutCss from '../components/layout.module.css';
import firebase from './../config/firebase';
import "firebase/auth";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== '/' && as !== '/other') {
        // Have SSR render bad routes as a 404.
        window.location.href = as
        return false
      }

      return true
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      
         <Header size="huge">Hello!!</Header> 
               


      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
