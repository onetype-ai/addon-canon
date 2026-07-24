// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'manifest.package',
        description: 'The npm manifest names the module, its type, license, author, repository and the imports map that aliases the package to itself.',
        match: '(^|/)package\\.json$',
        json: true,
        fields: {
            name: {
                type: 'string',
                required: true,
                description: 'The scoped npm name, like @onetype/box.'
            },
            description: {
                type: 'string',
                description: 'What the module is, one sentence.'
            },
            type: {
                type: 'string',
                required: true,
                description: 'Always module, the framework is esm.'
            },
            license: {
                type: 'string',
                description: 'The license the code ships under.'
            },
            author: {
                type: 'string',
                description: 'Who wrote it.'
            },
            repository: {
                type: 'object',
                description: 'Where the source lives, an object with type and url.'
            },
            main: {
                type: 'string',
                description: 'The entry the package resolves to, the back load file.'
            },
            exports: {
                type: 'object',
                description: 'The export map, the package root and its subpaths.'
            },
            imports: {
                type: 'object',
                required: true,
                description: 'The alias map object, the package points at itself, like #demo/* to ./back/*.'
            },
            dependencies: {
                type: 'object',
                description: 'Runtime packages the module pulls in.'
            },
            peerDependencies: {
                type: 'object',
                description: 'The framework and platform versions expected.'
            },
            version: {
                type: 'string',
                description: 'The published version.'
            },
            scripts: {
                type: 'object',
                description: 'Named commands for the module.'
            }
        }
    });
});
