// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.tree', (tree) =>
{
    tree.Item({
        id: 'item.functions.front',
        path: 'front/item/functions/*.js',
        description: 'One item function per file.'
    });
});
