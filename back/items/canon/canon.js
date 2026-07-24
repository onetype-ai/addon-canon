// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.Item({
        id: 'canon',
        addon: 'canon',
        path: {
            front: null,
            back: new URL('../../', import.meta.url).pathname
        }
    });
});
