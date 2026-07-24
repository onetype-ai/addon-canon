// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'items.back',
        path: 'back/items/**/*.js',
        description: 'Registrations into another addon, the folder names it.'
    });
});
