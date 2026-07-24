// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'equality',
        description: 'Only strict equality, the double equals coerces and lies.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(node.type === 'BinaryExpression' && ['==', '!='].includes(node.operator))
                {
                    report(node.loc.start.line, 'Loose ' + node.operator + ' found, the canon compares with ' + node.operator + '=.');
                }
            });
        }
    });
});
