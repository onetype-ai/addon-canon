// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'aliases',
        description: 'No aliasing this into a variable, the right kind of function keeps the right this.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(node.type === 'VariableDeclarator' && node.init && node.init.type === 'ThisExpression')
                {
                    report(node.loc.start.line, 'This aliased into ' + node.id.name + ', an arrow keeps this without a copy.');
                }
            });
        }
    });
});
