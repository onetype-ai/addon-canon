// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.structure = onetype.Addon('canon.structure', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique rule id, like placement or functions-name.'
        });

        addon.Field('description', {
            type: 'string',
            required: true,
            description: 'What the rule enforces, written as a full sentence.'
        });

        addon.Field('check', {
            type: 'function',
            required: true,
            description: 'Called with the file path, the tree, the walk helper and the report function.'
        });
    });
});
