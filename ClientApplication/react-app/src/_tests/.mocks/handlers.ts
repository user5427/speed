import { ws } from 'msw'

// const speedreader = ws.link();


import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('*/api/Articles', () => {
        return HttpResponse.json(
            {
                "count": 10,
                "articles": [
                    {
                        "title": "Matematine analize",
                        "id": 2,
                        "categoryTitle": "Matematika",
                        "author": null,
                        "publisher": null,
                        "url": null,
                        "language": null,
                        "paragraphIds": [],
                        "categoryIds": [],
                        "imageFileName": null
                    },
                    {
                        "title": "JavaScript: The Silent Code that's Eating Your Brain Cells",
                        "id": 3,
                        "categoryTitle": "JavaScript",
                        "author": null,
                        "publisher": null,
                        "url": null,
                        "language": null,
                        "paragraphIds": [],
                        "categoryIds": [],
                        "imageFileName": null
                    },
                ]
            }
        ); // Return a JSON response
    }),
];