// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon', (canon) =>
{
    canon.tree = onetype.Addon('canon.tree', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'The short readable name of the node, like schemas or readme.'
        });

        addon.Field('path', {
            type: 'string',
            required: true,
            description: 'Path pattern the node allows, relative to the package root. A star is one segment, two stars any depth, addon nesting folds away.'
        });

        addon.Field('required', {
            type: 'boolean',
            value: false,
            description: 'Whether the path has to exist in every package, the sweep reports it when it is missing.'
        });

        addon.Field('pair', {
            type: 'string',
            description: 'Extension a matched file must carry beside it, same name different suffix, like css.'
        });

        addon.Field('description', {
            type: 'string',
            required: true,
            description: 'What lives on the path, written as a full sentence.'
        });
    });
});
