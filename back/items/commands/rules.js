// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'canon:rules',
        addon: 'canon',
        description: 'Lists every canon rule, placement, tree pattern and verb, grouped by the layer that enforces it.',
        exposed: true,
        method: 'GET',
        endpoint: '/api/canon/rules',
        out: {
            linter: {
                type: 'array',
                each: {
                    type: 'json',
                    description: 'One rule with its id and description.'
                },
                description: 'Text rules, they read the raw lines.'
            },
            ast: {
                type: 'array',
                each: {
                    type: 'json',
                    description: 'One rule with its id and description.'
                },
                description: 'Tree rules, they read the parsed code.'
            },
            structure: {
                type: 'array',
                each: {
                    type: 'json',
                    description: 'One rule with its id and description.'
                },
                description: 'Path rules, they read the file against its place.'
            },
            patterns: {
                type: 'array',
                each: {
                    type: 'json',
                    description: 'One pattern with its id, match, template and fields.'
                },
                description: 'File templates with holes, a matched file follows its template exactly.'
            },
            placements: {
                type: 'array',
                each: {
                    type: 'json',
                    description: 'One placement with its method, receiver and home.'
                },
                description: 'Where every registration lives.'
            },
            tree: {
                type: 'array',
                each: {
                    type: 'json',
                    description: 'One allowed path with its id and description.'
                },
                description: 'Every path a package may hold.'
            }
        },
        callback: async function(properties, resolve)
        {
            this.list = (addon, fields) =>
            {
                return Object.values(addon.Items()).map((item) => item.Get(fields));
            };

            resolve({
                linter: this.list(canon.linter, ['id', 'description']),
                ast: this.list(canon.ast, ['id', 'description']),
                structure: this.list(canon.structure, ['id', 'description']),
                patterns: this.list(canon.patterns, ['id', 'description', 'match', 'pattern', 'fields']),
                placements: this.list(canon.placements, ['id', 'method', 'receiver', 'home', 'description']),
                tree: this.list(canon.tree, ['id', 'description'])
            });
        }
    });
});
