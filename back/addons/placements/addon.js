// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.placements = onetype.Addon('canon.placements', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Canonical item id, the target addon then the file, like canon:placements:commands.'
        });

        addon.Field('method', {
            type: 'string',
            required: true,
            description: 'Registration method the placement pins down, like EmitRegister.'
        });

        addon.Field('receiver', {
            type: 'string',
            value: '',
            description: 'Variable the call rides on, like commands. Empty matches any receiver.'
        });

        addon.Field('home', {
            type: 'string',
            required: true,
            description: 'Folder segment the registration lives in, like /commands/.'
        });

        addon.Field('description', {
            type: 'string',
            required: true,
            description: 'Why the registration lives there, written as a full sentence.'
        });
    });
});
