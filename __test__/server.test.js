const request = require('supertest');
const app = require('../src/server/index');
const fetch = require('node-fetch');

jest.mock('node-fetch');

const mockGeonamesResponse = {
    geonames: [
        {
            lat: "34.052235",
            lng: "-118.243683"
        }
    ]
};

const mockPixabayResponse = {
    hits: [
        {
            id: 1,
            previewURL: 'https://pixabay.com/photo1.jpg'
        },
        {
            id: 2,
            previewURL: 'https://pixabay.com/photo2.jpg'
        }
    ]
};

const mockWeatherbitResponse = {
    data: [
        { datetime: '2023-09-10', temp: 20 },
        { datetime: '2023-09-11', temp: 22 },
        { datetime: '2023-09-12', temp: 24 },
        { datetime: '2023-09-13', temp: 25 }
    ]
};

describe('POST /travel', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return location, available dates weather, and location images', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockGeonamesResponse)
            })
        )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockPixabayResponse)
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockWeatherbitResponse)
                })
            );

        const res = await request(app)
            .post('/travel')
            .send({
                location: 'Los Angeles',
                departureDate: '2023-09-11'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('location', 'Los Angeles');
    });

    it('should return empty weather if location is not found', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ geonames: [] }) // No location found
            })
        )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockPixabayResponse)
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockWeatherbitResponse)
                })
            );

        const res = await request(app)
            .post('/travel')
            .send({
                location: 'Unknown City',
                departureDate: '2023-09-11'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('location', 'Unknown City');
    });
});
