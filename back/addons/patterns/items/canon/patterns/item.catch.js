// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'item.catch',
        description: 'An item catch file hooks one moment of the item life with ItemOn, the file name is the moment.',
        match: '/item/catch/(?:add|added|modify|modified|remove|removed)\\.js$',
        pattern: "__addon__.ItemOn('__file__', __callback__);"
    });
});
