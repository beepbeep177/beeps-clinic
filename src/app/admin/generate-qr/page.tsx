"use client";

import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export default function GenerateQr(){
  const url = 'https://your-deploy.vercel.app/schedule/clinic-general';
  const [img, setImg] = useState('');
  useEffect(()=> {
    QRCode.toDataURL(url).then(setImg);
  },[]);
  return <div><img src={img} alt="qr" /></div>
}
