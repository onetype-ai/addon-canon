// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'styles',
        path: 'front/styles/*.css',
        description: 'Global stylesheets of the front, flat and css alone.'
    });
});
