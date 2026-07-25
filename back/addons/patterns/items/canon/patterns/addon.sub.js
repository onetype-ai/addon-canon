// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'addon.sub',
        description: 'A sub addon file registers through AddonReady onto its parent and exports nothing, the parent barrel already carries it.',
        match: '/(back|front)/addons/.*addon\\.js$',
        pattern: 'onetype.AddonReady(\'__name__\', __callback__);',
        example: 'onetype.AddonReady(\'demo\', (demo) =>\n{\n    demo.store = onetype.Addon(\'demo.store\', (addon) => { ... });\n});'
    });
});
