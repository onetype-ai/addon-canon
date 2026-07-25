// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'addon.front',
        description: 'The front addon file names the addon once and never exports, the shared globals carry it.',
        match: '^(?!.*/addons/).*/front/addon\\.js$',
        pattern: 'const __name__ = onetype.Addon(\'__addon__\', __callback__);'
    });
});
