"use client";
import { useEffect } from "react";
export function useUnsavedChanges(dirty:boolean){
  useEffect(()=>{
    if(!dirty)return;
    const warn=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue="";};
    const guard=(event:MouseEvent)=>{
      const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>("a[href]"):null;
      if(!link||link.target==="_blank"||link.hasAttribute("download")||event.ctrlKey||event.metaKey||event.shiftKey)return;
      const url=new URL(link.href,window.location.href);
      if(url.pathname===location.pathname&&url.search===location.search)return;
      if(!window.confirm("Có thay đổi chưa lưu. Rời trang và bỏ các thay đổi này?")){event.preventDefault();event.stopPropagation();}
    };
    window.addEventListener("beforeunload",warn);document.addEventListener("click",guard,true);
    return()=>{window.removeEventListener("beforeunload",warn);document.removeEventListener("click",guard,true);};
  },[dirty]);
}
