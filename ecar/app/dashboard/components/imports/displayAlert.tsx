'use client'
export function displayAlert() {
    const element = document.getElementById('body')
    const parent = document.createElement('button')
    parent.id = 'replacement'
    parent.textContent = "The 'Save' feature for images currently does not work."
    parent.className = 'alert'
    const child = document.createElement('span')
    child.className = 'closebtn justify-center items-center'
    child.innerHTML = '&times;'
    child.onclick = function() {
        document.getElementById('replacement')?.replaceWith(element!.innerHTML)
        }
    parent.appendChild(child)
    element?.replaceWith(parent)
  }