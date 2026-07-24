// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.linter = onetype.Addon('canon.linter', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique rule id, like allman or comments.'
        });

        addon.Field('description', {
            type: 'string',
            required: true,
            description: 'What the rule enforces, written as a full sentence.'
        });

        addon.Field('check', {
            type: 'function',
            required: true,
            description: 'Called with the source, the lines and the report function. Reports a violation with a line number and a message.'
        });
    });
});
