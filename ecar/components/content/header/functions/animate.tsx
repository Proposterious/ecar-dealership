import menu from '../nav-icon.module.css'; // style

function animate() {
    // Get HTMLElements from Document
    const container = document.getElementById('container') as HTMLElement;
    const icon = document.getElementById(menu.navIcon) as HTMLElement;
    const block = document.getElementById('block') as HTMLElement;
    const content = document.getElementById('content') as HTMLElement;

    // Close navigation
    if (icon.classList.contains(menu.open)) { // checks if already open
        icon?.classList.remove(menu.open) // if open, close
        container?.classList.remove('min-h-screen'); // remove styles
        container?.classList.remove('w-screen'); // remove styles
        container?.classList.remove('bg-orange-600'); // remove
        block?.classList.remove('bg-slate-100'); // remove
        content?.classList.add('hidden') // hide list
        return
    } 
    // Open navigation
    else {
        icon?.classList.add(menu.open)  // if closed, open
        container?.classList.add('min-h-screen'); // add styles
        container?.classList.add('w-screen'); // add styles
        container?.classList.add('bg-orange-600'); // add
        block?.classList.add('bg-slate-100'); // add
        content?.classList.remove('hidden') // show list
        return 
    }
}

export default animate;