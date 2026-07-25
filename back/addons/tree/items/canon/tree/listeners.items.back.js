// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'listeners.items.back',
        path: 'back/listeners/items/*/*.js',
        description: 'One catch per file for another addon items, the folder names the addon and the file names the moment.'
    });
});
