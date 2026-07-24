// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'addon.front',
        path: 'front/addon.js',
        description: 'The addon definition of the front, its registrations run off the shared globals.'
    });
});
