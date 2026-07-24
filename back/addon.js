// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

const canon = onetype.Addon('canon', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Unique entry id, the short name of the addon.'
    });

    addon.Field('addon', {
        type: 'string',
        required: true,
        description: 'Name of the addon the entry describes, like box.files or @pipelines.'
    });

    addon.Field('path', {
        type: 'object',
        value: {
            front: null,
            back: null
        },
        config: {
            front: {
                type: 'string',
                value: null,
                description: 'Absolute path of the addon front folder. Null when the addon has no front.'
            },
            back: {
                type: 'string',
                value: null,
                description: 'Absolute path of the addon back folder. Null when the addon has no back.'
            }
        },
        description: 'Where the addon lives on disk, one folder per side.'
    });
});

export default canon;
