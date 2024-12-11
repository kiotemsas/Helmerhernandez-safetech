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
        const userData = { 
          username: credentials.username, 
          password: credentials.password 
        };

        try {
          // Realiza la solicitud de inicio de sesión a la API de Parse
          const { data } = await axios.post(
            'http://3.137.134.27:8080/parse/login',
            userData,
            {
              headers: { 
                "Content-Type": "application/json",
                "X-Parse-REST-API-Key": "deWxXGwOYr6ena7rovZkoLgrDtZhaw9w3cFsA4s1",
                "X-Parse-Application-Id": "NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR",
                "X-Parse-Revocable-Session": "1"
              },
            }
          );

          if (data ) {
            return Promise.resolve({ ...data, id: data.objectId});
          }

        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],

  callbacks: {
    // Propaga el sessionToken al token de sesión JWT
    async jwt({ token, user }) {

      if (user) {
        return {
          ...token,
          id : user.id,
          sessionToken : user.sessionToken,
          name : user.username,      
          email: user.email,
          phone: user.phone,
          city: user.city,
          country: user.country
        }
      }
      return token;
    },

    // Propaga los datos del token al objeto de sesión
    async session({ session, token }) {     

      session.user = {
        ...session.user,
        id: token.id,    
        email: token.email,
        phone: token.phone,
        city: token.city,
        country: token.country     
      };
      session.accessToken = token.sessionToken;
      return session;
    },
  },

  secret: process.env.JWT_SECRET, // Asegúrate de configurar un secreto para JWT
  session: {
    strategy: 'jwt', // Usa JWT para manejar las sesiones
  },
});

export { handler as GET, handler as POST };
