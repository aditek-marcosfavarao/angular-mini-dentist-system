import { Injectable } from '@angular/core';
import { Server, createServer, Model } from 'miragejs';
import { profiles } from 'src/app/data/profile';

@Injectable({
  providedIn: 'root',
})
export class DatabaseMockService {
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

        this.get('/profiles', () => {
          return profiles;
          // return this.schema.all('profile');
        });
      },
    });
  }
}
