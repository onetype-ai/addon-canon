// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'listeners.emitters.front',
        path: 'front/listeners/emitters/*.js',
        description: 'One emitter listener per file.'
    });
});
