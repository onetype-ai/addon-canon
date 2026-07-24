// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'modules',
        description: 'No reaching for the dangerous node modules, child processes, vm, workers and the cluster belong to the platform alone.',
        check: (tree, walk, report) =>
        {
            const banned = () =>
            {
                return ['child_process', 'vm', 'worker_threads', 'cluster', 'repl', 'inspector'];
            };

            const name = (value) =>
            {
                return banned().includes(String(value).replace('node:', ''));
            };

            const loads = (node) =>
            {
                const caller = node.callee ? node.callee : {};

                return node.type === 'CallExpression'
                    && (caller.name === 'require'
                        || caller.type === 'ImportExpression')
                    && !!node.arguments
                    && !!node.arguments[0]
                    && node.arguments[0].type === 'Literal'
                    && name(node.arguments[0].value);
            };

            walk((node) =>
            {
                if(node.type === 'ImportDeclaration' && name(node.source.value))
                {
                    report(node.loc.start.line, 'Import of ' + node.source.value + ' found, that power belongs to the platform.');
                }

                if(loads(node))
                {
                    report(node.loc.start.line, 'Loading ' + node.arguments[0].value + ' found, that power belongs to the platform.');
                }

                if(node.type === 'ImportExpression' && node.source.type === 'Literal' && name(node.source.value))
                {
                    report(node.loc.start.line, 'Loading ' + node.source.value + ' found, that power belongs to the platform.');
                }
            });
        }
    });
});
