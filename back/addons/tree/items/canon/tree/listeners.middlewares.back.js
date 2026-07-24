// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'listeners.middlewares.back',
        path: 'back/listeners/middlewares/*.js',
        description: 'One middleware listener per file.'
    });
});
