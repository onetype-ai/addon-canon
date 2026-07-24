// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'exposed.back',
        path: 'back/functions/exposed/*.js',
        description: 'One exposed function per file.'
    });
});
