// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'addon.back',
        description: 'The back addon file names the addon once, bare or with its fields, and hands it back through a default export.',
        match: '/back/(?!addons/)addon\\.js$',
        pattern: 'const __name__ = onetype.Addon(__arguments__);\n\nexport default __same__;',
        example: 'const demo = onetype.Addon(\'demo\', (addon) => { ... });\n\nexport default demo;'
    });
});
