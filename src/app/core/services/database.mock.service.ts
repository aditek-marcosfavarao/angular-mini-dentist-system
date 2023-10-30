import { Injectable } from '@angular/core';
import { createServer, Model, Request, Response } from 'miragejs';

import { AuthLogin } from '../@types/auth';

import { profiles } from 'src/app/data/profile';

const AUTH_LOGIN = {
  email: 'admin@admin.com',
  password: 'admin',
};

@Injectable({
  providedIn: 'root',
})
export class DatabaseMockService {
  constructor() {
    console.log('api mock constructor');
  }
  // public deployMirageJsServer(): Server {
  //   return new Server({
  //     routes(): void {
  //       this.namespace = 'api';

  //       this.get('/profiles', () => {
  //         return profiles;
  //       });
  //     },
  //   });
  // }

  public deployMirageJsServer() {
    createServer({
      models: {
        profile: Model,
      },

      seeds(server) {
        server.db.loadData({
          profiles,
        });
      },

      routes() {
        this.namespace = 'api';

        this.post('/login', (schema, request: Request) => {
          const authLogin: AuthLogin = JSON.parse(request.requestBody);

          if (authLogin.email !== AUTH_LOGIN.email) return new Response(401);

          if (authLogin.password !== AUTH_LOGIN.password)
            return new Response(401);

          return new Response(200);
        });

        this.get('/profiles', () => {
          return profiles;
          // return this.schema.all('profile');
        });

        this.get('/profiles/:id', (schema, request: Request) => {
          const profileId = request.params['id'];
          const profile = profiles.find((profile) => profile.id === profileId);

          if (!profile) {
            return new Response(
              404,
              { some: 'header' },
              { errors: ['id de usuário não encontrado'] }
            );
          }

          return profile;
        });
      },
    });
  }
}
