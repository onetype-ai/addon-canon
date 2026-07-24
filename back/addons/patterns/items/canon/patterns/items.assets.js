// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'items.assets',
        description: 'An assets item declares one bundle, its description, its addon and the folders it ships to the browser.',
        match: '/items/onetype/assets/[^/]+\\.js$',
        pattern: 'onetype.assets.ItemAdd({ __fields__ });',
        imports: false,
        fields: {
            id: {
                type: 'string',
                required: true,
                description: 'Unique name of the bundle, like framework or elements.'
            },
            description: {
                type: 'string',
                required: true,
                description: 'What the bundle ships, written as a full sentence.'
            },
            addon: {
                type: 'string',
                required: true,
                description: 'The addon the bundle belongs to.'
            },
            metadata: {
                type: 'object',
                description: 'Extra machine-readable notes about the bundle.'
            },
            js: {
                type: 'string|array',
                description: 'Folder or folders of scripts the bundle ships, relative to the file.'
            },
            css: {
                type: 'string|array',
                description: 'Folder or folders of styles the bundle ships, relative to the file.'
            },
            url: {
                type: 'string',
                required: true,
                description: 'Always import.meta.url, the base the folders resolve from.'
            }
        }
    });
});
