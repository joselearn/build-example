
const request = require('supertest');
const {Cat} = require('../../models/cat');

let server;

describe('/api/cats', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
      await server.close(); 
      await Cat.remove({});
    });
  
    describe('GET /', () => {
      it('should return all cats', async () => {
        const genres = [
          { name: 'Poi test' },
          { name: 'Zelda test' },
        ];
        
        await Cat.collection.insertMany(genres);
  
        const res = await request(server).get('/api/cats');
        
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body.some(g => g.name === 'Poi test')).toBeTruthy();
        expect(res.body.some(g => g.name === 'Zelda test')).toBeTruthy();
      });
    });
})