import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: 'profile/:id',
        renderMode: RenderMode.Prerender,
        getPrerenderParams: () => {
            return Promise.resolve([
                {id: '123'},
                {id: '456'}
            ]);
        }
    },
    {
        path: '**',
        renderMode: RenderMode.Prerender
    }
];
