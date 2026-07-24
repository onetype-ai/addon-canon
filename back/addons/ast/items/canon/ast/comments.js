// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'comments',
        description: 'No comments except the banner on the first line, the code and the descriptions on the registrations speak for themselves.',
        check: (tree, walk, report) =>
        {
            for(const comment of tree.comments)
            {
                if(comment.loc.start.line === 1)
                {
                    continue;
                }

                report(comment.loc.start.line, 'Comment found, the code speaks for itself.');
            }
        }
    });
});
