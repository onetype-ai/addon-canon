// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'params',
        description: 'A function takes at most four parameters, the rest arrives as one object destructured in the signature.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(['FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)
                    && node.params.length > 4)
                {
                    report(
                        node.loc.start.line,
                        'Function of ' + node.params.length + ' parameters, the canon stops at four. '
                            + 'Group what belongs together, the rest arrives as one destructured object.'
                    );
                }
            });
        }
    });
});
