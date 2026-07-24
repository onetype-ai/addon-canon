// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'manifest.onetype',
        description: 'The onetype manifest names the package to the instance, its slug, name, description, status and the shape it wears in the dock.',
        match: '(^|/)onetype\\.json$',
        json: true,
        fields: {
            type: {
                type: 'string',
                options: ['package', 'addon'],
                description: 'What the manifest describes. A package ships to the platform, an addon extends the framework.'
            },
            slug: {
                type: 'string',
                required: true,
                description: 'The package slug, the scope then the name, like onetype/box.'
            },
            name: {
                type: 'string',
                required: true,
                description: 'The name shown in the instance.'
            },
            description: {
                type: 'string',
                required: true,
                description: 'What the package is, one sentence.'
            },
            icon: {
                type: 'string',
                required: true,
                description: 'The material icon name of the package, like home_storage.'
            },
            color: {
                type: 'string',
                required: true,
                description: 'The accent color, an rgba string like rgba(59, 130, 246, 1).'
            },
            status: {
                type: 'string',
                required: true,
                description: 'Whether the package ships enabled or disabled, the string enabled or disabled.'
            },
            depends: {
                type: 'array',
                required: true,
                description: 'Slugs the package needs present, an empty array when none.'
            },
            supports: {
                type: 'array',
                description: 'Slugs the package integrates with when they are present, an empty array when none.'
            },
            runtimes: {
                type: 'array',
                description: 'Runtimes the package belongs to, an empty array when none.'
            },
            permissions: {
                type: 'array',
                description: 'Powers the package asks the instance for, an empty array when none.'
            },
            bundle: {
                type: 'array',
                description: 'Slugs shipped together with the package, an empty array when none.'
            },
            limits: {
                type: 'object',
                description: 'Plan limits the package enforces.'
            },
            features: {
                type: 'object',
                description: 'Feature flags the plan toggles.'
            }
        }
    });
});
