import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import post from './studio/schemas/post';

export default defineConfig({
    name: 'default',
    title: 'R&J Wood Trading',

    projectId: '2alzdb48',
    dataset: 'production',

    basePath: '/studio',

    plugins: [
        deskTool(),
        visionTool(),
    ],

    schema: {
        types: [post],
    },
});
