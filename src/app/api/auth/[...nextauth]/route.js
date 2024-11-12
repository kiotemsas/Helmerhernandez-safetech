import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';


const handler = NextAuth({ 
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
         password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {


        const userData = { username: credentials.username, password: credentials.password};
        
        const { data } = await axios.post('https://parseapi.back4app.com/login', userData, {
          headers: { 
            "Content-Type": "application/json",
            "X-Parse-REST-API-Key": "deWxXGwOYr6ena7rovZkoLgrDtZhaw9w3cFsA4s1",
            "X-Parse-Application-Id": "NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR",
            "X-Parse-Revocable-Session": "1"
          },
      });
 
       
      if (data ) {
        return Promise.resolve({ data });
      }

      return Promise.resolve(null);

      },
    }),
    // ...add more providers here
  ],
 
  
});

export { handler as GET, handler as POST };

