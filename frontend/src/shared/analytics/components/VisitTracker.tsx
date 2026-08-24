"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function VisitTracker(){ const pathname=usePathname(); useEffect(()=>{ const key="vgg_visitor_id"; let visitorId=localStorage.getItem(key); if(!visitorId){visitorId=crypto.randomUUID();localStorage.setItem(key,visitorId)} fetch("/api/analytics/visit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({path:pathname,locale:pathname.split("/")[1],visitorId}),keepalive:true}).catch(()=>undefined); },[pathname]); return null; }
