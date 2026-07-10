import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import post from './studio/schemas/post';
import speciesPricing from './studio/schemas/speciesPricing';
import kdRates from './studio/schemas/kdRates';
import freightCosts from './studio/schemas/freightCosts';
import quoteSettings from './studio/schemas/quoteSettings';

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
        types: [post, speciesPricing, kdRates, freightCosts, quoteSettings],
    },
});
