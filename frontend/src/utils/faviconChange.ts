import { useEffect } from "react"
export default function FaviconChange():void{
useEffect(()=>{
    const favicon=document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    function updateFavicon(){
    console.log(favicon?.getAttribute('href'))
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('hello dark')
      favicon?.setAttribute('href','/assets/notesIconWhite.svg')
    }
    else{
      console.log('hello white')
      favicon?.setAttribute('href','/assets/notesIcon.svg')
    }
    }
    updateFavicon();
    const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMedia.addEventListener('change', updateFavicon);
    
    return()=> colorSchemeMedia.removeEventListener('change',updateFavicon)
    
    },[])
}