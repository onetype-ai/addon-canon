// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.patterns = onetype.Addon('canon.patterns', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique pattern id, like register.emitters.'
        });

        addon.Field('description', {
            type: 'string',
            required: true,
            description: 'What the pattern shapes, written as a full sentence.'
        });

        addon.Field('match', {
            type: 'string',
            required: true,
            description: 'Regular expression source, a file whose path matches is held to the pattern.'
        });

        addon.Field('pattern', {
            type: 'string',
            description: 'The file template. Holes read __name__, a string hole captures a literal, a lone hole in a list captures the list.'
        });

        addon.Field('imports', {
            type: 'boolean',
            value: true,
            description: 'Whether the file may open with imports. A registration on the global onetype needs none.'
        });

        addon.Field('json', {
            type: 'boolean',
            value: false,
            description: 'Whether the file is json, checked as parsed keys against the fields define rather than as source.'
        });

        addon.Field('example', {
            type: 'string',
            value: '',
            description: 'A worked line shown alongside the template when a file breaks the pattern, the idiom spelled out.'
        });

        addon.Field('claims', {
            type: 'string',
            value: '',
            description: 'Path fragment this pattern claims for itself, the generic items law steps aside on a claimed file.'
        });

        addon.Field('assert', {
            type: 'function',
            description: 'Deep check of a matched file, called with the file, the tree and the captured fields, returns violations.'
        });

        addon.Field('fields', {
            type: 'json',
            value: {},
            description: 'Define of the captured fields, one entry per field in canonical order. Nothing outside the define may appear.'
        });
    });
});
