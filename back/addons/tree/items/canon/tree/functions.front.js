// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'functions.front',
        path: 'front/functions/*.js',
        description: 'One function per file.'
    });
});
