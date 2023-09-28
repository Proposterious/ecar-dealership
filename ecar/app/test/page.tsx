
'use client'
import menu from './navIcon.css';

export default function Test() {
  function open() {
    const icon = document.getElementById('navIcon') as HTMLElement;
    icon.classList.toggle("open");
  }
  return (
    <article>
      <div id={menu.navIcon} onClick={() => open()}>
        <span>hi</span>
        <span>hi</span>
        <span>hi</span>
      </div>
    </article>
  )
}