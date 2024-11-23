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

          // Si se recibe un token de sesión, retorna el usuario
          if (data && data.sessionToken) {
            return {
              id: data.objectId,
              username: data.username,
              email: data.email,
              phone: data.phone,
              city: data.city,
              country: data.country,
              sessionToken: data.sessionToken, // Agrega el token al objeto de usuario
              ...data, // Incluye otros datos relevantes del usuario
            };
          }

          return null; // Devuelve null si no hay datos válidos
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Propaga el sessionToken al token de sesión JWT
    async jwt({ token, user }) {
      if (user) {
        token.sessionToken = user.sessionToken; // Guarda el token de sesión
        console.log('Session Token:', sessionToken); // Asegúrate de que no sea undefined
        token.id = user.id; // Guarda el ID del usuario
      }
      return token;
    },

    // Propaga los datos del token al objeto de sesión
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id, // Incluye el ID del usuario en el objeto de sesión
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
