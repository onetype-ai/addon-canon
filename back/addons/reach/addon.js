// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.reach = onetype.Addon('canon.reach', (addon) =>
    {
        addon.Description('Follows the import graph of a package and answers what nothing reaches and what reaches nothing.');

        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique reach rule id.'
        });

        addon.Field('description', {
            type: 'string',
            required: true,
            description: 'What the rule keeps reachable, written as a full sentence.'
        });

        addon.Field('check', {
            type: 'function',
            required: true,
            description: 'Called with the package root, the alias and a report function that takes a file and a message.'
        });
    });
});
