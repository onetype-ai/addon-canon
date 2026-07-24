// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'ternary',
        description: 'A ternary never nests inside another, a chain of questions becomes an if with early returns.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(node.type === 'ConditionalExpression'
                    && [node.test, node.consequent, node.alternate].some((part) => part.type === 'ConditionalExpression'))
                {
                    report(node.loc.start.line, 'Nested ternary found, flatten it into one if and else if chain with early returns.');
                }
            });
        }
    });
});
