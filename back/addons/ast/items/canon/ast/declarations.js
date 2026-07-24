// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'declarations',
        description: 'No var, a binding is const or let. Var hoists and leaks, the canon leaves it behind.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(node.type === 'VariableDeclaration' && node.kind === 'var')
                {
                    report(node.loc.start.line, 'Var declaration found, the binding is const or let.');
                }
            });
        }
    });
});
