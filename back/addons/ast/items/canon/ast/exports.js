// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'exports',
        description: 'Only the package root back addon.js and load.js export, a sub addon under addons registers through AddonReady and exports nothing.',
        check: (tree, walk, report, file) =>
        {
            const root = !!file
                && /(^|\/)back\/(addon|load)\.js$/.test(file)
                && !/\/back\/addons\//.test(file);

            if(!file || root)
            {
                return;
            }

            walk((node) =>
            {
                if(['ExportNamedDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration'].includes(node.type))
                {
                    report(
                        node.loc.start.line,
                        'Export found, only the root addon.js and load.js export. A sub addon assigns onetype.Addon onto its parent in AddonReady, no export.'
                    );
                }
            });
        }
    });
});
