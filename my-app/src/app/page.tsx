import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <nav>
        <li>
          <ul><a href="about">About</a></ul>
          <ul><a href="blog">Blog</a></ul>
        </li>
        </nav>
    </main>
  )
}
