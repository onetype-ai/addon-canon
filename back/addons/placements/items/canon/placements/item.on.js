// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.placements', (placements) =>
{
    placements.Item({
        id: 'item.on',
        method: 'ItemOn',
        home: ['/item/catch/', '/listeners/items/'],
        description: 'An item catch hooks a moment of the item life, its own addon from item catch and another from listeners items, the folder naming it.'
    });
});
