'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import PageContainer from '@/app/components/container/PageContainer';

import Parse from '../../utils/parse';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);

    let clientRequest = new Parse.LiveQueryClient({
      applicationId: "NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR",
      serverURL: "wss://safetech.b4a.io",
      javascriptKey: "1MoUVm7jZKt9RR1t1THGN64LQOI7GUu5gvTnQlwZ"
    });

    clientRequest.open();

    let query = new Parse.Query("Event");

    let subscription = clientRequest.subscribe(query);

    subscription.on('open', () => {
      console.log('connection opened');
    });

    subscription.on('close', () => {
      console.log('connection closed');
    });

    subscription.on('error', (error) => {
      console.log(error);
    });

    subscription.on("create", async event => {
      console.log('create: ', event);
      if (event.attributes.type === "Al que definamos como cordenadas") {
        // Pintar en el mapa
      }
    });

    subscription.on('update', (object) => {
      console.log('object updated:', object);
    });

    subscription.on('enter', (object) => {
      console.log('object entered:', object);
    });

    return () => {
      subscription.unsubscribe();
      clientRequest.close();
    };

  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      
    </PageContainer>
  );
}